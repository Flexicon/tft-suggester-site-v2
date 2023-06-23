<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';
	import ChampionsGrid from './ChampionsGrid.svelte';

	const dispatch = createEventDispatcher();

	export let champions: Champion[];
	export let selected: Champion[];

	let query = '';

	function filterChampions(champions: Champion[], selectedNames: string[], query: string) {
		if (!query && !selectedNames.length) return champions;

		return champions.filter(
			({ name }) => name.toLowerCase().includes(query) && !selectedNames.includes(name),
		);
	}

	function selectChampion({ detail: champ }: CustomEvent<Champion>) {
		query = '';
		dispatch('select', champ);
	}

	$: showGrid = selected.length === 0 || query;
	$: placeholder = selected.length ? 'Add a champion...' : 'Pick a champion...';
	$: selectedNames = selected.map((c) => c.name);
	$: filteredChampions = filterChampions(champions, selectedNames, query.toLowerCase());
</script>

<input class="mb-5" type="text" name="query" bind:value={query} {placeholder} />

{#if showGrid}
	<ChampionsGrid champions={filteredChampions} on:select={selectChampion} />

	{#if !filteredChampions.length}
		<p class="text-gray-500">
			No matching champions for <em>{query}</em>
		</p>
	{/if}
{/if}
