<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { buildCompListRows, filterAndSortCompRows } from '$lib/data/comps';
	import type { Champion, Comp, Item } from '$lib/types';
	import CompsListItem from './CompsListItem.svelte';
	import Select from './Select.svelte';

	const dispatch = createEventDispatcher();
	const resultBatchSize = 15;

	export let comps: Comp[];
	export let playstyles: string[];
	export let selected: Champion[];
	export let cheatsheetItems: Item[];
	export let topLimit: number;

	let playstyleFilter = '';
	let visibleLimit = topLimit;

	$: selectedNames = selected.map((c) => c.name);
	$: selectedKey = selectedNames.join('|');
	$: compRows = buildCompListRows(comps, selectedNames);
	$: filteredRows = selected.length
		? filterAndSortCompRows(compRows, { selectedNames, playstyle: playstyleFilter })
		: filterAndSortCompRows(compRows, { playstyle: playstyleFilter }).slice(0, topLimit);
	$: {
		selectedKey;
		playstyleFilter;
		visibleLimit = selected.length ? resultBatchSize : topLimit;
	}
	$: visibleRows = filteredRows.slice(0, visibleLimit);
	$: hasMoreRows = selected.length > 0 && visibleRows.length < filteredRows.length;
	$: showingCount = visibleRows.length;
	$: totalCount = filteredRows.length;

	function showMore() {
		visibleLimit += resultBatchSize;
	}

	function selectChampion({ detail: champion }: CustomEvent<Champion>) {
		dispatch('select-champion', champion);
	}

	function deselectChampion({ detail: champion }: CustomEvent<Champion>) {
		dispatch('deselect-champion', champion);
	}
</script>

<div class="comps-list">
	{#if playstyles.length > 1}
		<Select
			id="playstyle"
			class="w-full sm:w-64 max-w-full mb-4"
			bind:value={playstyleFilter}
			options={playstyles}
			initialValue="All Playstyles"
		/>
	{/if}

	{#if selected.length && totalCount}
		<p class="results-summary">Showing {showingCount} of {totalCount} matching comps</p>
	{/if}

	{#each visibleRows as row (row.key)}
		<CompsListItem
			comp={row.comp}
			{selectedNames}
			{cheatsheetItems}
			on:select-champion={selectChampion}
			on:deselect-champion={deselectChampion}
		/>
	{/each}

	{#if hasMoreRows}
		<button class="button mx-auto block" on:click={showMore}>Show more</button>
	{/if}
</div>

<style lang="postcss">
	.results-summary {
		@apply mb-4 text-sm text-zinc-400;
	}
</style>
