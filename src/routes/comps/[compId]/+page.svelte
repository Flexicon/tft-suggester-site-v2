<script lang="ts">
	import ChampionAvatar from '$lib/components/ChampionAvatar.svelte';
	import ItemCheatsheet from '$lib/components/ItemCheatsheet.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comp, items } = data;
</script>

<div class="comp-header">
	<div class="title">
		<span class={`tier tier-${comp.tier.toLowerCase()}`}>{comp.tier}</span>
		<div class="name-and-playstyle">
			<div class="name">{comp.name}</div>
			<div class="playstyle">{comp.playstyle}</div>
		</div>
	</div>

	<div class="champions">
		{#each comp.champions as champion}
			<ChampionAvatar {champion} noClick noItems />
		{/each}
	</div>
</div>

<div class="py-3 px-5 mb-4 text-white bg-stone-600 rounded shadow-md shadow-stone-500/70">
	<ItemCheatsheet {comp} cheatsheetItems={items} />
</div>

<style lang="postcss">
	.comp-header {
		@apply grid grid-cols-1 py-3 px-5 mb-4 text-white bg-stone-600 rounded shadow-md shadow-stone-500/70;
		@apply md:grid-cols-[40%60%] lg:grid-cols-[50%auto];
	}

	.title {
		@apply flex justify-start items-center mb-3 md:mb-0;
	}

	.name-and-playstyle {
		@apply cursor-pointer hover:text-gray-300;
	}

	.name {
		@apply flex items-center gap-1;
	}

	/* TODO: refactor this for reuse - tag component? */
	.playstyle {
		@apply inline-flex items-center justify-center p-3 bg-zinc-700 text-zinc-300 text-xs leading-6 h-[2em] rounded;
	}

	/* TODO: refactor this for reuse - tier component? global css? */
	.tier {
		@apply flex justify-center items-center text-white w-9 py-1 px-2 rounded-md mr-5;
	}

	.tier-s {
		@apply bg-red-500;
	}

	.tier-a {
		@apply bg-orange-500;
	}

	.tier-b {
		@apply bg-yellow-500;
	}

	.tier-c {
		@apply bg-green-500;
	}

	.champions {
		@apply grid gap-2 grid-cols-4 sm:grid-cols-8;
	}
</style>
