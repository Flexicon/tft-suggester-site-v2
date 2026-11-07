import type { Comp } from '$lib/types';
import { assert, describe, it } from 'vitest';
import { buildCompListRows, filterAndSortCompRows } from './comps';

describe('data:comps:filterAndSortCompRows', () => {
	const comps: Comp[] = buildSampleComps();

	it('should filter to comps matching the selected names', () => {
		const rows = buildCompListRows(comps, ['Ashe', 'Akshan']);
		const result = filterAndSortCompRows(rows, { selectedNames: ['Ashe', 'Akshan'] });

		assert.deepEqual(compNames(result.map((row) => row.comp)), namesByIndex(comps, [1]));
	});

	it('should order by match count before tier', () => {
		const rows = buildCompListRows(comps, ['Galio', 'Lissandra']);
		const result = filterAndSortCompRows(rows, { selectedNames: ['Galio', 'Lissandra'] });

		assert.deepEqual(compNames(result.map((row) => row.comp)), namesByIndex(comps, [2, 1]));
	});

	it('should keep rows when selected list is omitted or empty', () => {
		const rows = buildCompListRows(comps, []);

		assert.deepEqual(
			compNames(filterAndSortCompRows(rows, {}).map((row) => row.comp)),
			namesByIndex(comps, [2, 0, 4, 1, 3]),
		);
		assert.deepEqual(
			compNames(filterAndSortCompRows(rows, { selectedNames: [] }).map((row) => row.comp)),
			namesByIndex(comps, [2, 0, 4, 1, 3]),
		);
	});

	it('should filter by playstyle', () => {
		const rows = buildCompListRows(comps);

		assert.deepEqual(
			compNames(filterAndSortCompRows(rows, { playstyle: 'Fast 8' }).map((row) => row.comp)),
			namesByIndex(comps, [4, 1, 3]),
		);
	});

	it('should not reorder the input rows', () => {
		const rows = buildCompListRows(comps, ['Ashe', 'Akshan']);
		const before = rows.map((row) => row.comp.name);

		filterAndSortCompRows(rows, { selectedNames: ['Ashe', 'Akshan'] });

		assert.deepEqual(
			rows.map((row) => row.comp.name),
			before,
		);
	});
});

function compNames(comps: Comp[]): string[] {
	return comps.map((c) => c.name);
}

function namesByIndex(comps: Comp[], indexes: number[]): string[] {
	return indexes.map((i) => comps[i].name);
}

function buildSampleComps(): Comp[] {
	return [
		{
			name: 'Demacian Sorcerers',
			champions: [
				{
					name: 'Malzahar',
					image: 'https://rerollcdn.com/characters/Skin/9/Malzahar.png',
					cost: 1,
				},
				{
					name: 'Sona',
					image: 'https://rerollcdn.com/characters/Skin/9/Sona.png',
					cost: 3,
				},
				{
					name: 'Swain',
					image: 'https://rerollcdn.com/characters/Skin/9/Swain.png',
					cost: 2,
				},
				{
					name: 'Taric',
					image: 'https://rerollcdn.com/characters/Skin/9/Taric.png',
					cost: 3,
				},
				{
					name: 'Velkoz',
					image: 'https://rerollcdn.com/characters/Skin/9/Velkoz.png',
					cost: 3,
				},
				{
					name: 'Jarvan IV',
					image: 'https://rerollcdn.com/characters/Skin/9/JarvanIV.png',
					cost: 4,
				},
				{
					name: 'Lux',
					image: 'https://rerollcdn.com/characters/Skin/9/Lux.png',
					cost: 4,
				},
				{
					name: 'Ahri',
					image: 'https://rerollcdn.com/characters/Skin/9/Ahri.png',
					cost: 5,
				},
			],
			tier: 'A',
			playstyle: 'Standard',
			item_recommendations: [],
		},
		{
			name: 'Freljord Deadeyes',
			champions: [
				{
					name: 'Ashe',
					image: 'https://rerollcdn.com/characters/Skin/9/Ashe.png',
					cost: 2,
				},
				{
					name: 'Akshan',
					image: 'https://rerollcdn.com/characters/Skin/9/Akshan.png',
					cost: 3,
				},
				{
					name: 'Lissandra',
					image: 'https://rerollcdn.com/characters/Skin/9/Lissandra.png',
					cost: 3,
				},
				{
					name: 'Taric',
					image: 'https://rerollcdn.com/characters/Skin/9/Taric.png',
					cost: 3,
				},
				{
					name: 'Aphelios',
					image: 'https://rerollcdn.com/characters/Skin/9/Aphelios.png',
					cost: 4,
				},
				{
					name: 'Sejuani',
					image: 'https://rerollcdn.com/characters/Skin/9/Sejuani.png',
					cost: 4,
				},
				{
					name: 'Shen',
					image: 'https://rerollcdn.com/characters/Skin/9/Shen.png',
					cost: 4,
				},
				{
					name: 'Urgot',
					image: 'https://rerollcdn.com/characters/Skin/9/Urgot.png',
					cost: 4,
				},
			],
			tier: 'B',
			playstyle: 'Fast 8',
			item_recommendations: [],
		},
		{
			name: 'Ionia Invokers',
			champions: [
				{
					name: 'Galio',
					image: 'https://rerollcdn.com/characters/Skin/9/Galio.png',
					cost: 2,
				},
				{
					name: 'Soraka',
					image: 'https://rerollcdn.com/characters/Skin/9/Soraka.png',
					cost: 2,
				},
				{
					name: 'Karma',
					image: 'https://rerollcdn.com/characters/Skin/9/Karma.png',
					cost: 3,
				},
				{
					name: 'Lissandra',
					image: 'https://rerollcdn.com/characters/Skin/9/Lissandra.png',
					cost: 3,
				},
				{
					name: 'Taric',
					image: 'https://rerollcdn.com/characters/Skin/9/Taric.png',
					cost: 3,
				},
				{
					name: 'Shen',
					image: 'https://rerollcdn.com/characters/Skin/9/Shen.png',
					cost: 4,
				},
				{
					name: 'Ahri',
					image: 'https://rerollcdn.com/characters/Skin/9/Ahri.png',
					cost: 5,
				},
				{
					name: 'Ryze Bandle City',
					image: 'https://rerollcdn.com/characters/Skin/9/RyzeBandleCity.png',
					cost: 5,
				},
			],
			tier: 'S',
			playstyle: 'Slow Roll (7)',
			item_recommendations: [],
		},
		{
			name: 'Experimental',
			champions: [
				{
					name: 'Chogath',
					image: 'https://rerollcdn.com/characters/Skin/9/Chogath.png',
					cost: 1,
				},
				{
					name: 'Malzahar',
					image: 'https://rerollcdn.com/characters/Skin/9/Malzahar.png',
					cost: 1,
				},
				{
					name: 'Kassadin',
					image: 'https://rerollcdn.com/characters/Skin/9/Kassadin.png',
					cost: 2,
				},
				{
					name: 'RekSai',
					image: 'https://rerollcdn.com/characters/Skin/9/RekSai.png',
					cost: 3,
				},
				{
					name: 'Velkoz',
					image: 'https://rerollcdn.com/characters/Skin/9/Velkoz.png',
					cost: 3,
				},
				{
					name: 'Kaisa',
					image: 'https://rerollcdn.com/characters/Skin/9/Kaisa.png',
					cost: 4,
				},
				{
					name: 'Yasuo',
					image: 'https://rerollcdn.com/characters/Skin/9/Yasuo.png',
					cost: 4,
				},
				{
					name: 'Belveth',
					image: 'https://rerollcdn.com/characters/Skin/9/Belveth.png',
					cost: 5,
				},
			],
			tier: '?',
			playstyle: 'Fast 8',
			item_recommendations: [],
		},
		{
			name: 'Voids',
			champions: [
				{
					name: 'Chogath',
					image: 'https://rerollcdn.com/characters/Skin/9/Chogath.png',
					cost: 1,
				},
				{
					name: 'Malzahar',
					image: 'https://rerollcdn.com/characters/Skin/9/Malzahar.png',
					cost: 1,
				},
				{
					name: 'Kassadin',
					image: 'https://rerollcdn.com/characters/Skin/9/Kassadin.png',
					cost: 2,
				},
				{
					name: 'RekSai',
					image: 'https://rerollcdn.com/characters/Skin/9/RekSai.png',
					cost: 3,
				},
				{
					name: 'Velkoz',
					image: 'https://rerollcdn.com/characters/Skin/9/Velkoz.png',
					cost: 3,
				},
				{
					name: 'Kaisa',
					image: 'https://rerollcdn.com/characters/Skin/9/Kaisa.png',
					cost: 4,
				},
				{
					name: 'Yasuo',
					image: 'https://rerollcdn.com/characters/Skin/9/Yasuo.png',
					cost: 4,
				},
				{
					name: 'Belveth',
					image: 'https://rerollcdn.com/characters/Skin/9/Belveth.png',
					cost: 5,
				},
			],
			tier: 'A',
			playstyle: 'Fast 8',
			item_recommendations: [],
		},
	];
}
