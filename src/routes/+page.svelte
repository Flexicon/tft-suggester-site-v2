<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps } = data;

	let showAll = false;

	$: visibleComps = showAll ? comps : comps.slice(0, 5);
</script>

<button on:click={() => (showAll = !showAll)} class="button mb-5">
	{#if showAll}
		Show Less
	{:else}
		Show More
	{/if}
</button>

<ul>
	{#each visibleComps as comp}
		<li>{comp.name} - {comp.tier} {comp.playstyle}</li>
	{/each}
</ul>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
