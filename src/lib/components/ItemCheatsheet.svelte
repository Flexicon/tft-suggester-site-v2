<script lang="ts">
	import type { Champion, Comp, Item, SimpleItem } from '$lib/types';
	import Icon from '@iconify/svelte';
	import ChampionAvatar from './ChampionAvatar.svelte';
	import Tooltip from './Tooltip.svelte';

	export let comp: Comp;
	export let cheatsheetItems: Item[];

	$: championsWithItems = comp.champions.filter((c) => c.items?.length);
	$: cheatsheet = Object.fromEntries(cheatsheetItems.map((i) => [i.name.toLowerCase(), i]));

	function uniqueItemsFor(champion: Champion): SimpleItem[] {
		const memo = new Set();
		return (
			champion.items?.filter((i) => {
				if (memo.has(i.name)) return false;
				memo.add(i.name);
				return true;
			}) ?? []
		);
	}

	function componentsFor(item: SimpleItem): SimpleItem[] {
		return cheatsheet[item.name.toLowerCase()]?.components ?? [];
	}
</script>

<div class="item-cheatsheet mt-6">
	{#each championsWithItems as champion}
		<div class="flex gap-4 mb-5">
			<div class="w-12">
				<ChampionAvatar {champion} noItems noClick />
			</div>

			<div>
				{#each uniqueItemsFor(champion) as item}
					{@const components = componentsFor(item)}
					<div class="flex items-center gap-3 mb-2">
						{#if components.length}
							<div class="flex gap-1">
								{#each components as component}
									<Tooltip title={component.name}>
										<img
											class="composite-item"
											src={component.image}
											alt={component.name}
											loading="lazy"
										/>
									</Tooltip>
								{/each}
							</div>
							<Icon class="text-2xl" icon="mingcute:arrow-right-fill" />
						{/if}
						<Tooltip title={item.name}>
							<img class="composite-item" src={item.image} alt={item.name} loading="lazy" />
						</Tooltip>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.composite-item {
		@apply block w-12 border-2 rounded-sm border-gray-500;
		filter: drop-shadow(1px 5px 3px rgba(50, 50, 0, 0.5));
	}
</style>
