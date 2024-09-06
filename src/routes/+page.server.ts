import { fetchChampions, fetchComps, fetchItems } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		comps: await fetchComps(),
		champions: (await fetchChampions()).sort((a, b) => (a.name > b.name ? 1 : -1)),
		items: await fetchItems(),
	};
}) satisfies PageServerLoad;
