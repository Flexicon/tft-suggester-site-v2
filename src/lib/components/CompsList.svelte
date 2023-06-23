<script lang="ts">
	import type { Champion, Comp, Item } from '$lib/types';

	export let comps: Comp[];
	export let selected: Champion[];
	export let cheatsheetItems: Item[];
	export let topLimit: number;

	$: visibleComps = selected.length ? [] : comps.slice(0, topLimit);
</script>

<ul>
	{#each visibleComps as comp}
		<li>{comp.name} - {comp.tier} {comp.playstyle}</li>
	{/each}
</ul>
