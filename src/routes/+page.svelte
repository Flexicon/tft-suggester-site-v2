<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { get } from 'svelte/store';

	import ChampionSelector from '$lib/components/ChampionsSelector.svelte';
	import ChampionsSelected from '$lib/components/ChampionsSelected.svelte';
	import CompsList from '$lib/components/CompsList.svelte';
	import type { Champion } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps, playstyles, champions, items } = data;

	const topLimit = 5;
	let showTop = false;

	const initialSelectedNames = (get(page).url.searchParams.get('selected') ?? '')
		.split(',')
		.filter(Boolean);
	let selected = champions.filter((c) => initialSelectedNames.includes(c.name));

	function onChampSelected({ detail: champ }: CustomEvent<Champion>) {
		selected = [...selected, champ].sort((a, b) => (a.name > b.name ? 1 : -1));
		showTop = false;
	}

	function onChampDeselected({ detail: champ }: CustomEvent<Champion>) {
		selected = selected.filter((c) => c.name !== champ.name);
	}
</script>

<ChampionSelector {champions} {selected} hideGrid={showTop} on:select={onChampSelected} />

<ChampionsSelected champions={selected} on:deselect={onChampDeselected} />

{#if !selected.length}
	<button on:click={() => (showTop = !showTop)} class="button mb-5">
		<Icon icon={showTop ? 'mdi:hide' : 'mdi:show'} />
		{showTop ? 'Hide top' : 'Show top'}
		{topLimit}
	</button>
{/if}

{#if selected.length || showTop}
	<CompsList
		{comps}
		{playstyles}
		{selected}
		cheatsheetItems={items}
		{topLimit}
		on:select-champion={onChampSelected}
		on:deselect-champion={onChampDeselected}
	/>
{/if}
