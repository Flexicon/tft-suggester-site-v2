import { fetchChampions, fetchComps, fetchItems } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const comps = await fetchComps();
	const playstyles = new Set<string>(comps.map((c) => c.playstyle));

	return {
		comps,
		playstyles: Array.from(playstyles).sort(),
		champions: (await fetchChampions()).sort((a, b) => (a.name > b.name ? 1 : -1)),
		items: await fetchItems(),
	};
}) satisfies PageServerLoad;
