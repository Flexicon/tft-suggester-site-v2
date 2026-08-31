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

export const compSortFn = (selectedNames: string[]) => {
	const selectedSet = new Set(selectedNames);
	const matchCounts = new WeakMap<Comp, number>();
	const tierIndexes = new WeakMap<Comp, number>();

	const getMatchCount = (comp: Comp) => {
		const cached = matchCounts.get(comp);
		if (cached !== undefined) return cached;

		const count = countMatchesInComp(comp, selectedSet);
		matchCounts.set(comp, count);
		return count;
	};

	const getTier = (comp: Comp) => {
		const cached = tierIndexes.get(comp);
		if (cached !== undefined) return cached;

		const tierIndex = getTierIndex(comp.tier);
		tierIndexes.set(comp, tierIndex);
		return tierIndex;
	};

	return (a: Comp, b: Comp) => {
		const aCount = getMatchCount(a);
		const bCount = getMatchCount(b);

		if (aCount !== bCount) {
			return bCount - aCount;
		}

		const aTierIndex = getTier(a);
		const bTierIndex = getTier(b);

		if (aTierIndex !== bTierIndex) {
			return aTierIndex - bTierIndex;
		}

		return a.name.localeCompare(b.name);
	};
};

export type CompFilterOpts = {
	selectedNames?: string[];
	playstyle?: string;
};

export const compFilterFn =
	({ selectedNames, playstyle }: CompFilterOpts) => {
		const selectedSet = new Set(selectedNames ?? []);
		const shouldFilterBySelection = selectedNames !== undefined;

		return (comp: Comp) => {
			if (!selectedNames && !playstyle) return true;

			if (shouldFilterBySelection && countMatchesInComp(comp, selectedSet) === 0) {
				return false;
			}

			if (playstyle && comp.playstyle !== playstyle) {
				return false;
			}

			return true;
		};
	};
