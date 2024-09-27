<script lang="ts">
	import CompsListItem from '$lib/components/CompsListItem.svelte';
	import ItemCheatsheet from '$lib/components/ItemCheatsheet.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { comp, items } = data;
</script>

<CompsListItem {comp} selectable={false} />

<div class="py-3 px-5 mb-4 text-white bg-stone-600 rounded shadow-md shadow-stone-500/70">
	<ItemCheatsheet {comp} cheatsheetItems={items} />
</div>
