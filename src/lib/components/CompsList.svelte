<script lang="ts">
	import { compFilterFn, compSortFn } from '$lib/data/comps';
	import type { Champion, Comp, Item } from '$lib/types';
	import CompsListItem from './CompsListItem.svelte';

	export let comps: Comp[];
	export let selected: Champion[];
	export let cheatsheetItems: Item[];
	export let topLimit: number;

	$: selectedNames = selected.map((c) => c.name);
	$: sortedComps = comps.sort(compSortFn(selectedNames));
	$: filteredComps = selected.length
		? sortedComps.filter(compFilterFn(selectedNames))
		: sortedComps.slice(0, topLimit);
</script>

<ul>
	{#each filteredComps as comp}
		<CompsListItem {comp} {selectedNames} {cheatsheetItems} />
	{/each}
</ul>
