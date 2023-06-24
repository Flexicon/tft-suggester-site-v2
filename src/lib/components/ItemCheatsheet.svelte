<script lang="ts">
	import type { Comp, Item } from '$lib/types';

	export let comp: Comp;
	export let cheatsheetItems: Item[];
</script>

<ul>
	{#each cheatsheetItems as item}
		<li>{item.name}</li>
	{/each}
</ul>
