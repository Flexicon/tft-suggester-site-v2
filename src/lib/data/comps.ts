import { Tiers, type Comp } from '$lib/types';

const tierIndexByName = new Map(Tiers.map((tier, index) => [tier, index]));

const getTierIndex = (tier: Comp['tier']) => tierIndexByName.get(tier) ?? Tiers.length;

const countMatchesInComp = (comp: Comp, selectedSet: Set<string>): number => {
	if (selectedSet.size === 0) return 0;

	return comp.champions.reduce((count, c) => (selectedSet.has(c.name) ? count + 1 : count), 0);
};

export type CompListRow = {
	comp: Comp;
	tierIndex: number;
	key: string;
	matchCount: number;
};

export type CompFilterOpts = {
	selectedNames?: string[];
	playstyle?: string;
};

export const buildCompListRows = (comps: Comp[], selectedNames: string[] = []): CompListRow[] => {
	const selectedSet = new Set(selectedNames);

	return comps.map((comp) => {
		const matchCount = countMatchesInComp(comp, selectedSet);

		return {
			comp,
			tierIndex: getTierIndex(comp.tier),
			key: `${comp.name}-${comp.tier}-${comp.playstyle}`,
			matchCount,
		};
	});
};

const compareCompRows = (a: CompListRow, b: CompListRow) => {
	if (a.matchCount !== b.matchCount) {
		return b.matchCount - a.matchCount;
	}

	if (a.tierIndex !== b.tierIndex) {
		return a.tierIndex - b.tierIndex;
	}

	return a.comp.name.localeCompare(b.comp.name);
};

export const filterAndSortCompRows = (
	rows: CompListRow[],
	{ selectedNames, playstyle }: CompFilterOpts,
) => {
	const hasSelectedNames = Boolean(selectedNames?.length);

	return rows
		.filter((row) => {
			if (hasSelectedNames && row.matchCount === 0) {
				return false;
			}

			if (playstyle && row.comp.playstyle !== playstyle) {
				return false;
			}

			return true;
		})
		.sort(compareCompRows);
};
