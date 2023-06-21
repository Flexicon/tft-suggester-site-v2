<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps } = data;

	let showAll = false;

	$: visibleComps = showAll ? comps : comps.slice(0, 5);
</script>

<h1 class="text-center mt-10 text-3xl font-bold">SvelteKit + Tailwind + TFT = TFT Suggesting 🧞</h1>

<ul>
	{#each visibleComps as comp}
		<li>{comp.name} - {comp.tier} {comp.playstyle}</li>
	{/each}
</ul>

<button on:click={() => (showAll = !showAll)} class="button">
	{#if showAll}
		Show less
	{:else}
		Show more
	{/if}
</button>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
