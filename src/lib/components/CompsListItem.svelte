<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { Champion, Comp, Item } from '$lib/types';
	import ChampionAvatar from './ChampionAvatar.svelte';
	import ItemCheatsheet from './ItemCheatsheet.svelte';

	const dispatch = createEventDispatcher();

	export let comp: Comp;
	export let selectedNames: string[] = [];
	export let cheatsheetItems: Item[] = [];
	export let selectable = true;

	let isCheatsheetOpen = false;

	$: compChampNames = comp.champions.map((c) => c.name);
	$: selectedInComp = selectedNames.filter((name) => compChampNames.includes(name));
	$: noCheatsheet = cheatsheetItems.length === 0;

	function toggleCheatsheet() {
		isCheatsheetOpen = !isCheatsheetOpen;
	}

	function toggleCheatsheetKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			toggleCheatsheet();
		}
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
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="name-and-playstyle"
			class:noCheatsheet
			on:click={noCheatsheet ? undefined : toggleCheatsheet}
			on:keydown={noCheatsheet ? undefined : toggleCheatsheetKeydown}
			role={noCheatsheet ? undefined : 'button'}
			tabindex={noCheatsheet ? undefined : 0}
		>
			<div class="name">
				<span>{comp.name}</span>
				{#if !noCheatsheet}
					<Icon class="text-2xl" icon={isCheatsheetOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
				{/if}
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
				noClick={!selectable}
				noTooltip
			/>
		{/each}
	</div>

	{#if isCheatsheetOpen && cheatsheetItems.length}
		<ItemCheatsheet {comp} {cheatsheetItems} />
	{/if}
</div>

<style lang="postcss">
	.comps-list-item {
		@apply grid grid-cols-1 py-3 px-5 mb-4 text-white bg-stone-600 rounded shadow-md shadow-stone-500/70;
		@apply md:grid-cols-[40%60%] lg:grid-cols-[35%65%] xl:grid-cols-[40%auto];
	}

	.title {
		@apply flex justify-start items-center mb-3 md:mb-0;
	}

	.name-and-playstyle:not(.noCheatsheet) {
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
		@apply grid gap-1 grid-cols-4 sm:grid-cols-8;
	}
</style>
