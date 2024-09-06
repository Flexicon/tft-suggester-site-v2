import { fetchComps, fetchItems } from '$lib/server/data';

import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';

// Preload all comps and items ahead SSG
const allComps = await fetchComps();
const allItems = await fetchItems();

export const entries: EntryGenerator = async () => {
	return allComps.map((c) => ({ compId: slugify(c.name) }));
};

export const load = (async ({ params: { compId } }) => {
	const comp = allComps.find((c) => slugify(c.name) === compId);

	if (!comp) {
		throw new Error(`Comp ${compId} not found`);
	}

	const compItemNames = new Set(
		comp.item_recommendations.flatMap((ir) => ir.items.map((i) => i.name)),
	);
	const items = allItems.filter((i) => compItemNames.has(i.name));

	return {
		compId,
		comp,
		items,
	};
}) satisfies PageServerLoad;

function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/ /g, '-');
}
