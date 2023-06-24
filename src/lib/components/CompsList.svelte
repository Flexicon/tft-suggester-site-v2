<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { compFilterFn, compSortFn } from '$lib/data/comps';
	import type { Champion, Comp, Item } from '$lib/types';
	import CompsListItem from './CompsListItem.svelte';

	const dispatch = createEventDispatcher();

	export let comps: Comp[];
	export let selected: Champion[];
	export let cheatsheetItems: Item[];
	export let topLimit: number;

	$: selectedNames = selected.map((c) => c.name);
	$: sortedComps = comps.sort(compSortFn(selectedNames));
	$: filteredComps = selected.length
		? sortedComps.filter(compFilterFn(selectedNames))
		: sortedComps.slice(0, topLimit);

	function selectChampion({ detail: champion }: CustomEvent<Champion>) {
		dispatch('select-champion', champion);
	}

	function deselectChampion({ detail: champion }: CustomEvent<Champion>) {
		dispatch('deselect-champion', champion);
	}
</script>

<div class="comps-list">
	{#each filteredComps as comp}
		<CompsListItem
			{comp}
			{selectedNames}
			{cheatsheetItems}
			on:select-champion={selectChampion}
			on:deselect-champion={deselectChampion}
		/>
	{/each}
</div>
