<script lang="ts">
	import ChampionSelector from '$lib/components/ChampionsSelector.svelte';
	import ChampionsSelected from '$lib/components/ChampionsSelected.svelte';
	import CompsList from '$lib/components/CompsList.svelte';
	import type { Champion } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps, champions, items } = data;

	const topLimit = 5;
	let showTop = false;
	let selected: Champion[] = [];

	function onChampSelected({ detail: champ }: CustomEvent<Champion>) {
		selected = [...selected, champ];
	}

	function onChampDeselected({ detail: champ }: CustomEvent<Champion>) {
		selected = selected.filter((c) => c.name !== champ.name);
	}
</script>

<ChampionSelector {champions} {selected} on:select={onChampSelected} />

<ChampionsSelected {selected} on:deselect={onChampDeselected} />

{#if !selected.length}
	<button on:click={() => (showTop = !showTop)} class="button mb-5">
		{showTop ? 'Hide top' : 'Show top'}
		{topLimit}
	</button>
{/if}

{#if selected.length || showTop}
	<CompsList {comps} {selected} cheatsheetItems={items} {topLimit} />
{/if}
