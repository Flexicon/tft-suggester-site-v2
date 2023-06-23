import type { Item } from './Item';

export interface Champion {
	name: string;
	image: string;
	cost: number;
	items?: Pick<Item, 'name' | 'image'>[];
}
