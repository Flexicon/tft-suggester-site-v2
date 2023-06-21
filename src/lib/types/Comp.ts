import type { Champion } from './Champion';
import type { Item } from './Item';

export interface Comp {
	name: string;
	champions: Champion[];
	tier: string;
	playstyle: string;
	item_recommendations: ItemRecommendation[];
}

export interface ItemRecommendation {
	champion: string;
	items: Pick<Item, 'name' | 'image'>[];
}
