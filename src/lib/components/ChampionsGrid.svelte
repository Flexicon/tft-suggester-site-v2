<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';
	import ChampionAvatar from './ChampionAvatar.svelte';

	const dispatch = createEventDispatcher();

	export let champions: Champion[];

	function selectChampion(champ: Champion) {
		dispatch('select', champ);
	}
</script>

<div class="champions-grid">
	{#each champions as champion}
		<ChampionAvatar {champion} on:click={() => selectChampion(champion)} />
	{/each}
</div>

<style lang="postcss">
	.champions-grid {
		@apply grid gap-1 grid-cols-4 mb-8 sm:grid-cols-8 md:grid-cols-10;
		@apply lg:grid-cols-12 xl:grid-cols-[repeat(14,minmax(0,1fr))];
	}
</style>
