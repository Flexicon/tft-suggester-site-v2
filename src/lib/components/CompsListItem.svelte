<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { Champion, Comp, Item } from '$lib/types';
	import ChampionAvatar from './ChampionAvatar.svelte';
	import ItemCheatsheet from './ItemCheatsheet.svelte';

	const dispatch = createEventDispatcher();

	export let comp: Comp;
	export let selectedNames: string[];
	export let cheatsheetItems: Item[];

	let isCheatsheetOpen = false;

	$: compChampNames = comp.champions.map((c) => c.name);
	$: selectedInComp = selectedNames.filter((name) => compChampNames.includes(name));

	function toggleCheatsheet() {
		isCheatsheetOpen = !isCheatsheetOpen;
	}

	function onChampionClick(champion: Champion) {
		dispatch(
			selectedInComp.includes(champion.name) ? 'deselect-champion' : 'select-champion',
			champion,
		);
	}
</script>

<div class="comps-list-item">
	<div class="title">
		<span class={`tier tier-${comp.tier.toLowerCase()}`}>{comp.tier}</span>
		<div class="name-and-playstyle" on:click={toggleCheatsheet} on:keydown={toggleCheatsheet}>
			<div class="name">
				<span>{comp.name}</span>
				<Icon class="text-2xl" icon={isCheatsheetOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
			</div>
			<div class="playstyle">{comp.playstyle}</div>
		</div>
	</div>

	<div class="champions">
		{#each comp.champions as champion}
			<ChampionAvatar
				{champion}
				selected={selectedInComp.includes(champion.name)}
				on:click={() => onChampionClick(champion)}
			/>
		{/each}
	</div>

	{#if isCheatsheetOpen}
		<ItemCheatsheet {comp} {cheatsheetItems} />
	{/if}
</div>

<style lang="postcss">
	.comps-list-item {
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

	.playstyle {
		@apply inline-flex items-center justify-center p-3 bg-zinc-700 text-zinc-300 text-xs leading-6 h-[2em] rounded;
	}

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
