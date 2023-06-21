import { fetchChampions, fetchComps, fetchItems } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Comps',
		comps: await fetchComps(),
		champions: await fetchChampions(),
		items: await fetchItems(),
	};
}) satisfies PageServerLoad;
