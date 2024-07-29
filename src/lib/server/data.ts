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
	return fetchResource(`${apiBase}/comps`);
}

export async function fetchChampions(): Promise<Champion[]> {
	return fetchResource(`${apiBase}/champions`);
}

export async function fetchItems(): Promise<Item[]> {
	return fetchResource(`${apiBase}/items`);
}
