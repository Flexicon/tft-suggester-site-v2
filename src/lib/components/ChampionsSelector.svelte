<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let champions: Champion[];
	export let selected: Champion[];

	function filterChampions(champions: Champion[], selectedNames: string[], query: string) {
		if (!query && !selectedNames.length) return champions;

		const q = query.toLowerCase();
		return champions.filter(
			({ name }) => name.toLowerCase().includes(q) && !selectedNames.includes(name),
		);
	}

	function selectChampion(champ: Champion) {
		query = '';
		dispatch('select', champ);
	}

	let query = '';

	$: showGrid = selected.length === 0 || query;
	$: placeholder = selected.length ? 'Add a champion...' : 'Pick a champion...';
	$: selectedNames = selected.map((c) => c.name);
	$: filteredChampions = filterChampions(champions, selectedNames, query);
</script>

<input type="text" name="query" bind:value={query} {placeholder} />

{#if showGrid}
	<div class="champions-grid">
		{#each filteredChampions as champ}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="cursor-pointer" on:click={() => selectChampion(champ)}>
				<img src={champ.image} alt="" />
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.champions-grid {
		@apply grid gap-1 grid-cols-4 mb-8 sm:grid-cols-8 md:grid-cols-10;
		@apply lg:grid-cols-12 xl:grid-cols-[repeat(14,minmax(0,1fr))];
	}
</style>
