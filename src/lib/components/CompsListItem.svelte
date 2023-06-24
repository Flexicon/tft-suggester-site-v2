<script lang="ts">
	import type { Comp, Item } from '$lib/types';

	export let comp: Comp;
	export let selectedNames: string[];
	export let cheatsheetItems: Item[];

	$: compChampNames = comp.champions.map((c) => c.name);
	$: selectedInComp = selectedNames.filter((name) => compChampNames.includes(name));
</script>

<li>
	{comp.name} - {comp.tier}
	{comp.playstyle} - cheatsheat count: {cheatsheetItems.length} - selected count: {selectedInComp.length}
</li>
