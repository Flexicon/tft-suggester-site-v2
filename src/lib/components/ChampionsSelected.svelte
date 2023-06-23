<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Champion } from '$lib/types';
	import ChampionAvatar from './ChampionAvatar.svelte';

	const dispatch = createEventDispatcher();

	export let champions: Champion[];
</script>

<div class="champions-selected">
	{#each champions as champion}
		<ChampionAvatar {champion} cancellable on:click={() => dispatch('deselect', champion)} />
	{/each}
</div>

<style lang="postcss">
	.champions-selected {
		@apply grid grid-cols-8 gap-1 py-4 px-1;
		@apply md:gap-2 md:grid-cols-[repeat(16,1fr)] lg:grid-cols-[repeat(20,1fr)];
	}
</style>
