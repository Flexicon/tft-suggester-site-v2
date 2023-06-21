<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps, champions } = data;

	let showAll = false;

	$: visibleComps = showAll ? comps : comps.slice(0, 5);
</script>

<div class="champions-grid">
	{#each champions as champ}
		<div>
			<img src={champ.image} alt="" />
		</div>
	{/each}
</div>

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
	.champions-grid {
		@apply grid gap-1 grid-cols-4 mb-8 sm:grid-cols-8 md:grid-cols-10;
		@apply lg:grid-cols-12 xl:grid-cols-[repeat(14,minmax(0,1fr))];
	}
</style>
