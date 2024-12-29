<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { compFilterFn, compSortFn } from '$lib/data/comps';
	import type { Champion, Comp, Item } from '$lib/types';
	import CompsListItem from './CompsListItem.svelte';
	import Select from './Select.svelte';

	const dispatch = createEventDispatcher();

	export let comps: Comp[];
	export let playstyles: string[];
	export let selected: Champion[];
	export let cheatsheetItems: Item[];
	export let topLimit: number;

	let playstyleFilter = '';

	$: selectedNames = selected.map((c) => c.name);
	$: sortedComps = comps.sort(compSortFn(selectedNames));
	$: filteredComps = selected.length
		? sortedComps.filter(compFilterFn({ selectedNames, playstyle: playstyleFilter }))
		: sortedComps.filter(compFilterFn({ playstyle: playstyleFilter })).slice(0, topLimit);

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

	{#each filteredComps as comp (`${comp.name}-${comp.tier}-${comp.playstyle}`)}
		<CompsListItem
			{comp}
			{selectedNames}
			{cheatsheetItems}
			on:select-champion={selectChampion}
			on:deselect-champion={deselectChampion}
		/>
	{/each}
</div>
