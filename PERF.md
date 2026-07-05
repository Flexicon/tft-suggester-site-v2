# UI Performance Plan

The current data set is modest, but interactions like champion selection and playstyle filtering can still trigger a lot of UI work at once. The main risks are duplicate reactive/navigation passes, repeated sort/filter work, and repainting hundreds of image-heavy champion tiles.

## Phase 0: Measure The Baseline

Goal: get a lightweight baseline before broad UI changes. A headless agent can do this with
Playwright/Chromium tracing when browser dependencies are available; otherwise skip to Phase 1 and
use the existing hotspots as the starting point.

Actions:

1. Run the app locally and record a Chromium trace for these flows:
   - Select one champion from the initial grid.
   - Select/deselect several champions rapidly from comp results.
   - Change the playstyle filter while results are visible.
   - Open and close an item cheatsheet.
2. Capture current result counts from the live API:
   - `comps`: about 47 currently.
   - `champions`: about 63 currently.
   - Visible comp champion avatars when all comps render: about 376 currently.
3. Note these metrics per trace:
   - Long tasks above 50ms.
   - Scripting time after selection/filter changes.
   - Recalculate style/layout/paint time.
   - Number of visible comp cards and champion avatars.
   - Whether image decode or network work appears during interaction.

Done when:

1. We have at least one trace or timing note that reproduces the freeze/jank.
2. We know whether to prioritize JavaScript work, DOM size, or paint cost first.
3. If tracing is not available in the agent environment, record that and continue with Phase 1.

## Phase 1: Remove Duplicate Navigation Work

Goal: prevent champion selection from rendering once locally and then rendering/navigating again through SvelteKit URL updates.

Current hotspot:

1. `src/routes/+page.svelte` derives `selected` from `$page.url.searchParams`.
2. `onChampSelected` and `onChampDeselected` mutate `selected`, then queue `goto()` in a `setTimeout`.
3. `goto()` updates the route URL and can cause another reactive pass shortly after the original click.

Actions:

1. Make selected champions normal component state by default.
2. Remove the delayed `setTimeout(() => updateQueryParams(), 100)` calls.
3. If shareable URLs are still wanted later, use a debounced `history.replaceState` update rather than SvelteKit `goto()`.
4. If URL state is kept, avoid deriving `selected` from `$page.url` after every local selection; initialize from the URL once on load instead.

Expected impact:

1. Removes a likely second render/navigation pass after every selection.
2. Reduces queued work when users click several champions quickly.
3. Simplifies the state model.

Validation:

1. Selecting and deselecting champions updates the UI immediately.
2. Rapid selection does not queue delayed URL changes.
3. `npm run check` passes.
4. Re-profile selection and compare long-task count against Phase 0.

## Phase 2: Make Comp Sorting And Filtering Cheap And Pure

Goal: stop repeated derived work from scaling with comparator calls and avoid mutating page data.

Current hotspots:

1. `src/lib/components/CompsList.svelte` calls `comps.sort(...)`, which mutates the `comps` prop in place.
2. `src/lib/data/comps.ts` rebuilds a `Set` inside `countMatchesInComp` for every comparator/filter call.
3. Sorting calls `countMatchesInComp` many times per interaction, so match counts are recomputed repeatedly.

Actions:

1. Replace `comps.sort(...)` with a non-mutating sort like `comps.slice().sort(...)` as the minimum safe fix.
2. Create one `selectedSet` per reactive update.
3. Compute each comp's `matchCount` once per selected/filter change.
4. Sort/filter enriched rows rather than recomputing matches inside the comparator.
5. Precompute stable comp metadata when data is loaded or when `comps` changes:
   - `championNames` as a `Set<string>` or array.
   - `tierIndex` from `Tiers.indexOf(comp.tier)`.
   - a stable key if we want to avoid rebuilding string keys in the template.

Expected impact:

1. Lower scripting time during selection/filter changes.
2. Removes data mutation side effects.
3. Makes future result-list optimizations easier.

Validation:

1. Existing comp sorting/filtering tests still pass.
2. Add or adjust tests to cover that sorting helpers do not require mutating the input array.
3. `npm test` passes.
4. Re-profile selection and filter changes.

## Phase 3: Reduce Result List DOM Churn

Goal: avoid updating and painting every matching comp card at once when only the first few are most useful.

Current hotspot:

1. `CompsList` renders every filtered comp when any champion is selected.
2. With current data, showing all comps means roughly 47 cards and 376 comp champion avatars.
3. Every selected-name change is passed into every visible `CompsListItem`, so each visible card recalculates selected state.

Actions:

1. Add a result limit for selected states, not just the empty-state “Show top” flow.
2. Start with a small default like 10 or 15 matching comps.
3. Add a “Show more” button that increases the visible count in batches.
4. Reset the visible count when the selected champions or playstyle filter changes.
5. Consider showing a summary like “Showing 15 of 34 matching comps”.
6. If the list grows substantially in the future, replace batching with virtualization.

Expected impact:

1. Less DOM created and updated per interaction.
2. Less style/layout/paint work from champion tiles.
3. Better mobile responsiveness.

Validation:

1. Selection results remain correct and sorted.
2. “Show more” reveals additional matches without changing ordering.
3. Changing the selected champions or playstyle resets to the initial batch.
4. Re-profile common-champion selection on a throttled mobile profile.

## Phase 4: Add A Lightweight Comp-List Avatar Variant

Goal: reduce per-avatar paint cost where hundreds of avatars can be visible.

Current hotspot:

1. `ChampionAvatar` uses nested clipped hexagon elements with CSS background images.
2. `.champion-avatar` applies `filter: drop-shadow(...)`, which can be expensive across many clipped elements.
3. The full avatar component supports names, item overlays, tooltip wrappers, selected/cancellable icons, and click behavior, but comp-list rows only need a compact selectable image.

Actions:

1. Add a `compact` or `variant="compact"` mode to `ChampionAvatar`, or create a small dedicated comp-list avatar component.
2. For comp list usage, avoid optional features that are not needed:
   - no tooltip wrapper.
   - no item overlays.
   - no centered champion name.
3. Replace CSS background images with `<img>` where practical:
   - `loading="lazy"`.
   - `decoding="async"`.
   - explicit `alt` text.
4. Replace `filter: drop-shadow(...)` with a cheaper `box-shadow`, or remove shadows in dense comp lists.
5. Keep the richer avatar in the champion picker if it is not the bottleneck.

Expected impact:

1. Lower paint cost for large result lists.
2. Less style complexity per visible avatar.
3. Better image decode behavior.

Validation:

1. Visual appearance remains acceptable on desktop and mobile.
2. Selected champions remain obvious in comp rows.
3. Accessibility does not regress for clickable avatars.
4. Performance trace shows reduced paint time when many results are visible.

## Phase 5: Throttle Tooltip Pointer Updates

Goal: prevent hover movement from causing unbounded component updates.

Current hotspot:

1. `src/lib/components/Tooltip.svelte` updates `x` and `y` on every `mousemove`.
2. This is most relevant in the champion picker and item cheatsheet; comp-list avatars already pass `noTooltip`.

Actions:

1. Wrap tooltip position updates in `requestAnimationFrame` so they run at most once per frame.
2. Cancel any pending frame on mouse leave.
3. Consider using `position: fixed` and `clientX/clientY` instead of document-relative `pageX/pageY` if scroll behavior is easier to reason about.
4. Consider disabling pointer-following movement entirely and only position on mouse enter if traces still show tooltip churn.

Expected impact:

1. Smoother hover interactions in dense champion/item grids.
2. Reduced reactive updates during pointer movement.

Validation:

1. Tooltips still appear near the hovered item.
2. Moving the mouse over the champion grid does not create excessive scripting work.
3. Keyboard focus behavior still works.

## Phase 6: Clean Up Smaller Rendering Costs

Goal: remove avoidable per-render allocations and make Svelte updates more predictable.

Actions:

1. Use keyed `{#each}` blocks for champion lists where object identity might change:
   - `ChampionsGrid.svelte` keyed by `champion.name`.
   - `ChampionsSelected.svelte` keyed by `champion.name`.
   - `CompsListItem.svelte` keyed by `champion.name`.
2. Avoid inline event closures in large repeated lists when easy to do so.
3. In `CompsListItem`, avoid recomputing `comp.champions.map(...)` when `comp` is stable by precomputing names upstream.
4. Use `Set.has(...)` rather than repeated `Array.includes(...)` for selected lookups in dense lists.
5. Keep item cheatsheet data derived once per `cheatsheetItems` input rather than rebuilding object maps per open cheatsheet if it becomes visible in traces.

Expected impact:

1. Smaller gains than Phases 1-4, but low-risk cleanup.
2. Less repeated allocation during reactive updates.

Validation:

1. UI behavior remains unchanged.
2. `npm run check` and `npm test` pass.
3. No regression in selected/deselected champion behavior.

## Phase 7: Re-Measure And Decide On Bigger Changes

Goal: avoid over-engineering if smaller fixes remove the freezes.

Actions:

1. Repeat the Phase 0 traces after each major phase.
2. Compare scripting, layout, and paint timings.
3. If jank remains and the list is still the source, implement list virtualization.
4. If image decode/network remains visible during interaction, preload visible champion images or rely more heavily on actual `<img loading="lazy">` elements.
5. If mobile paint remains high, simplify the visual treatment further for dense result rows.

Done when:

1. Selection and filtering no longer produce noticeable freezes on a throttled mobile profile.
2. No selection/filter interaction creates long tasks above 50ms in the common path.
3. The optimized behavior is covered by existing tests plus any new tests added for derived comp ordering/filtering.

## Suggested Implementation Order

1. Phase 1: remove `goto()`-driven selected-state persistence.
2. Phase 2: make sorting/filtering pure and precomputed.
3. Phase 3: batch visible comp results.
4. Phase 4: simplify dense comp-list avatars.
5. Phase 5 and Phase 6: polish tooltip and repeated-list cleanup.
6. Phase 7: re-measure and decide whether virtualization is needed.

## Implementation Notes

### Phase 0 Baseline

- Local Playwright loaded the app at `http://127.0.0.1:5173/`.
- Initial render showed 63 champion picker avatars and no comp cards.
- Selecting the first champion changed the URL to `/?selected=Aatrox`, rendered 13 comp cards,
  and rendered 105 comp-list champion avatars.
- The baseline confirms the first fixes should prioritize duplicate URL navigation work,
  repeated sort/filter scripting, and dense comp-list rendering/paint cost.

### Phase 7 Re-Measure

- Local Playwright smoke-tested the optimized app at `http://127.0.0.1:5173/`.
- Selecting the first champion stayed on `/`, confirming selection no longer triggers SvelteKit URL
  navigation work.
- The same selection rendered 13 matching comp cards and 105 comp-list avatars, all using compact
  lazy/async `<img>` elements.
- This path is below the 15-result batch limit, so it does not need virtualization. If future data
  pushes common selections above the batch size and traces still show long tasks, list virtualization
  is the next larger change to consider.
