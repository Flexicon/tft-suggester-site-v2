<script lang="ts">
	import Icon from '@iconify/svelte';
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

<div class="form-control">
	<input type="text" name="query" bind:value={query} {placeholder} />
	<div class="icon">
		<Icon icon="mdi:search" />
	</div>
</div>

{#if showGrid}
	<ChampionsGrid champions={filteredChampions} on:select={selectChampion} />

	{#if !filteredChampions.length}
		<p class="text-gray-500">
			No matching champions for <em>{query}</em>
		</p>
	{/if}
{/if}

<style lang="postcss">
	.form-control {
		@apply relative;
	}

	.form-control input {
		@apply pl-12 pr-4 py-3 mb-5 w-full rounded text-xl border shadow-inner;
		@apply hover:border-zinc-300;
	}

	.form-control .icon {
		@apply absolute text-zinc-300 text-4xl top-2 left-2;
	}

	input:focus + .icon {
		@apply text-zinc-500;
	}
</style>
