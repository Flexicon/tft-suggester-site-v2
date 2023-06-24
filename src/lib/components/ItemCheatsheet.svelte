<script lang="ts">
	import type { Champion, Comp, Item, SimpleItem } from '$lib/types';
	import Icon from '@iconify/svelte';
	import ChampionAvatar from './ChampionAvatar.svelte';

	type Cheatsheet = Record<string, Item>;

	export let comp: Comp;
	export let cheatsheetItems: Item[];

	$: championsWithItems = comp.champions.filter((c) => c.items?.length);
	$: cheatsheet = cheatsheetItems.reduce<Cheatsheet>(
		(sheet, i) => ({ ...sheet, [i.name.toLowerCase()]: i }),
		{},
	);

	function uniqueItemsFor(champion: Champion): SimpleItem[] {
		const itemNames = new Set(champion.items?.map((i) => i.name) ?? []);

		return champion.items?.filter((item) => itemNames.has(item.name)) ?? [];
	}

	function componentsFor(item: SimpleItem): SimpleItem[] {
		return cheatsheet[item.name.toLowerCase()]?.components ?? [];
	}
</script>

<div class="item-cheatsheet mt-6">
	{#each championsWithItems as champion}
		<div class="flex gap-4 mb-5">
			<div class="w-12">
				<ChampionAvatar {champion} noItems />
			</div>

			<div>
				{#each uniqueItemsFor(champion) as item}
					<div class="flex items-center gap-3 mb-2">
						<div class="flex gap-1">
							{#each componentsFor(item) as component}
								<img class="composite-item" src={component.image} alt={component.name} />
							{/each}
							{#if !componentsFor(item).length}
								<span class="text-3xl">🤷‍♂️</span>
							{/if}
						</div>
						<Icon class="text-2xl" icon="mingcute:arrow-right-fill" />
						<img class="composite-item" src={item.image} alt={item.name} />
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.composite-item {
		@apply block w-12 border-2 rounded-sm border-gray-500;
	}
</style>
