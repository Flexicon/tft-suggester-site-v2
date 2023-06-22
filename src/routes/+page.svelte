<script lang="ts">
	import ChampionPicker from '$lib/components/ChampionPicker.svelte';
	import ChampionsSelected from '$lib/components/ChampionsSelected.svelte';
	import CompsList from '$lib/components/CompsList.svelte';
	import type { Champion } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comps, champions, items } = data;

	const topLimit = 5;
	let showTop = false;
	let selected: Champion[] = [];

	function onChampSelected(event: CustomEvent<Champion>) {
		console.log('Champion selected:', event.detail);
	}

	function onChampDeselected(event: CustomEvent<Champion>) {
		console.log('Champion deselected:', event.detail);
	}
</script>

<ChampionPicker {champions} on:select={onChampSelected} />

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
