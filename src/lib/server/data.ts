import type { Champion, Comp, Item } from '$lib/types';

const apiBase = 'https://tft-suggester-api.nerfthis.xyz';

export async function fetchResource<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (res.status !== 200) {
		throw new Error(`Failed to fetch ${url} : ${await res.text()}`);
	}

	return await res.json();
}

export async function fetchComps(): Promise<Comp[]> {
	return (await fetchResource<Comp[]>(`${apiBase}/comps`)).map(mapCompItems);
}

export async function fetchChampions(): Promise<Champion[]> {
	return fetchResource(`${apiBase}/champions`);
}

export async function fetchItems(): Promise<Item[]> {
	return fetchResource(`${apiBase}/items`);
}

function mapCompItems(comp: Comp): Comp {
	const itemsByChamp = Object.fromEntries(
		comp.item_recommendations.map((ir) => [ir.champion, ir.items]),
	);

	return {
		...comp,
		champions: comp.champions.map((c) => ({ ...c, items: itemsByChamp[c.name] ?? [] })),
	} satisfies Comp;
}
