export interface Item {
	name: string;
	image: string;
	components: SimpleItem[];
}

export type SimpleItem = Pick<Item, 'name' | 'image'>;
