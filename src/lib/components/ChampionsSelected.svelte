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
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-gap: 5px;
		padding: 1rem 0.25rem;
	}

	@media screen and (min-width: 768px) {
		.champions-selected {
			grid-template-columns: repeat(16, 1fr);
			grid-gap: 8px;
		}
	}

	@media screen and (min-width: 1024px) {
		.champions-selected {
			grid-template-columns: repeat(20, 1fr);
		}
	}
</style>
