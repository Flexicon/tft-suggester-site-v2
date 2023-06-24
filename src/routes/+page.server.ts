import { fetchChampions, fetchComps, fetchItems } from '$lib/server/data';
import type { Comp, ItemRecommendation } from '$lib/types';
import type { PageServerLoad } from './$types';

type ChampItems = Record<string, ItemRecommendation['items']>;

export const load = (async () => {
	return {
		title: 'Comps',
		comps: (await fetchComps()).map(mapCompItemsToChamps),
		champions: (await fetchChampions()).sort((a, b) => (a.name > b.name ? 1 : -1)),
		items: await fetchItems(),
	};
}) satisfies PageServerLoad;

function mapCompItemsToChamps({ item_recommendations, ...comp }: Comp): Comp {
	const itemsByChamp = item_recommendations.reduce<ChampItems>(
		(map, ir) => ({ ...map, [ir.champion]: ir.items }),
		{},
	);

	return {
		...comp,
		item_recommendations,
		champions: comp.champions.map((c) => ({ ...c, items: itemsByChamp[c.name] ?? [] })),
	} satisfies Comp;
}
