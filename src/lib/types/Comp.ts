import type { Champion } from './Champion';
import type { Item } from './Item';

export const Tiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '?'] as const;
export type Tier = (typeof Tiers)[number];

export interface Comp {
	name: string;
	champions: Champion[];
	tier: Tier;
	playstyle: string;
	item_recommendations: ItemRecommendation[];
}

export interface ItemRecommendation {
	champion: string;
	items: Pick<Item, 'name' | 'image'>[];
}
