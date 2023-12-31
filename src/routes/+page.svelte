<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	import ChampionSelector from '$lib/components/ChampionsSelector.svelte';
	import ChampionsSelected from '$lib/components/ChampionsSelected.svelte';
	import CompsList from '$lib/components/CompsList.svelte';
	import type { Champion } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps, champions, items } = data;

	const topLimit = 5;
	let showTop = false;

	$: selectedNames = browser ? ($page.url.searchParams.get('selected') ?? '').split(',') : [];
	$: selected = champions.filter((c) => selectedNames.includes(c.name));

	function updateQueryParams() {
		if (!selected.length) {
			goto('/');
		} else {
			goto(`/?${new URLSearchParams({ selected: selected.map((c) => c.name).join(',') })}`);
		}
	}

	function onChampSelected({ detail: champ }: CustomEvent<Champion>) {
		selected = [...selected, champ].sort((a, b) => (a.name > b.name ? 1 : -1));
		showTop = false;
		setTimeout(() => updateQueryParams(), 100);
	}

	function onChampDeselected({ detail: champ }: CustomEvent<Champion>) {
		selected = selected.filter((c) => c.name !== champ.name);
		setTimeout(() => updateQueryParams(), 100);
	}
</script>

<ChampionSelector {champions} {selected} on:select={onChampSelected} />

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
		{selected}
		cheatsheetItems={items}
		{topLimit}
		on:select-champion={onChampSelected}
		on:deselect-champion={onChampDeselected}
	/>
{/if}
