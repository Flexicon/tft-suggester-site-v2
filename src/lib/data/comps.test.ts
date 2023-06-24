import type { Comp } from '$lib/types';
import { assert, describe, it } from 'vitest';
import { compFilterFn, compSortFn } from './comps';

describe('data:comps:compSortFn', () => {
	const comps: Comp[] = buildSampleComps();

	it('should sort according to tier only when given empty list', () => {
		const result = comps.slice().sort(compSortFn([]));

		assert.deepEqual(result, [comps[2], comps[0], comps[1]]);
	});

	it('should sort according to selected list and tier', () => {
		const result = comps.slice().sort(compSortFn(['Ashe', 'Akshan']));

		assert.deepEqual(result, [comps[1], comps[2], comps[0]]);
	});
});

describe('data:comps:compFilterFn', () => {
	const comps: Comp[] = buildSampleComps();

	it('should filter everything when given empty list', () => {
		const result = comps.filter(compFilterFn([]));
		assert.deepEqual(result, []);
	});

	it('should filter everything when given list ["Foo"]', () => {
		const result = comps.filter(compFilterFn(['Foo']));
		assert.deepEqual(result, []);
	});

	it('should filter to match given list ["Ashe"]', () => {
		const result = comps.filter(compFilterFn(['Ashe']));
		assert.deepEqual(result, [comps[1]]);
	});

	it('should filter to match given list ["Galio"]', () => {
		const result = comps.filter(compFilterFn(['Galio']));
		assert.deepEqual(result, [comps[2]]);
	});

	it('should filter to match given list ["Galio"]', () => {
		const result = comps.filter(compFilterFn(['Galio']));
		assert.deepEqual(result, [comps[2]]);
	});

	it('should filter to match given list ["Galio", "Foo"]', () => {
		const result = comps.filter(compFilterFn(['Galio', 'Foo']));
		assert.deepEqual(result, [comps[2]]);
	});

	it('should filter to match given list ["Galio", "Foo", "Lissandra", "Taric"]', () => {
		const result = comps.filter(compFilterFn(['Galio', 'Foo', 'Lissandra', 'Taric']));
		assert.deepEqual(result, comps);
	});
});

function buildSampleComps() {
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
			item_recommendations: [
				{
					champion: 'Malzahar',
					items: [],
				},
				{
					champion: 'Sona',
					items: [],
				},
				{
					champion: 'Swain',
					items: [
						{
							name: 'Ionic Spark',
							image: 'https://rerollcdn.com/items/IonicSpark.png',
						},
						{
							name: 'Sunfire Cape',
							image: 'https://rerollcdn.com/items/SunfireCape.png',
						},
						{
							name: "Warmog's Armor",
							image: 'https://rerollcdn.com/items/WarmogsArmor.png',
						},
					],
				},
				{
					champion: 'Taric',
					items: [],
				},
				{
					champion: 'Velkoz',
					items: [],
				},
				{
					champion: 'Jarvan IV',
					items: [],
				},
				{
					champion: 'Lux',
					items: [
						{
							name: 'Hextech Gunblade',
							image: 'https://rerollcdn.com/items/HextechGunblade.png',
						},
						{
							name: 'Jeweled Gauntlet',
							image: 'https://rerollcdn.com/items/JeweledGauntlet.png',
						},
					],
				},
				{
					champion: 'Ahri',
					items: [],
				},
			],
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
			item_recommendations: [
				{
					champion: 'Ashe',
					items: [],
				},
				{
					champion: 'Akshan',
					items: [],
				},
				{
					champion: 'Lissandra',
					items: [],
				},
				{
					champion: 'Taric',
					items: [],
				},
				{
					champion: 'Aphelios',
					items: [
						{
							name: 'Giant Slayer',
							image: 'https://rerollcdn.com/items/GiantSlayer.png',
						},
						{
							name: "Guinsoo's Rageblade",
							image: 'https://rerollcdn.com/items/GuinsoosRageblade.png',
						},
						{
							name: 'Infinity Edge',
							image: 'https://rerollcdn.com/items/InfinityEdge.png',
						},
					],
				},
				{
					champion: 'Sejuani',
					items: [
						{
							name: 'Redemption',
							image: 'https://rerollcdn.com/items/Redemption.png',
						},
						{
							name: 'Sunfire Cape',
							image: 'https://rerollcdn.com/items/SunfireCape.png',
						},
						{
							name: "Warmog's Armor",
							image: 'https://rerollcdn.com/items/WarmogsArmor.png',
						},
					],
				},
				{
					champion: 'Shen',
					items: [],
				},
				{
					champion: 'Urgot',
					items: [],
				},
			],
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
			item_recommendations: [
				{
					champion: 'Galio',
					items: [],
				},
				{
					champion: 'Soraka',
					items: [],
				},
				{
					champion: 'Karma',
					items: [
						{
							name: 'Giant Slayer',
							image: 'https://rerollcdn.com/items/GiantSlayer.png',
						},
						{
							name: 'Hextech Gunblade',
							image: 'https://rerollcdn.com/items/HextechGunblade.png',
						},
						{
							name: 'Jeweled Gauntlet',
							image: 'https://rerollcdn.com/items/JeweledGauntlet.png',
						},
					],
				},
				{
					champion: 'Lissandra',
					items: [],
				},
				{
					champion: 'Taric',
					items: [
						{
							name: 'Ionic Spark',
							image: 'https://rerollcdn.com/items/IonicSpark.png',
						},
						{
							name: 'Redemption',
							image: 'https://rerollcdn.com/items/Redemption.png',
						},
						{
							name: "Warmog's Armor",
							image: 'https://rerollcdn.com/items/WarmogsArmor.png',
						},
					],
				},
				{
					champion: 'Shen',
					items: [],
				},
				{
					champion: 'Ahri',
					items: [],
				},
				{
					champion: 'Ryze Bandle City',
					items: [],
				},
			],
		},
	];
}
