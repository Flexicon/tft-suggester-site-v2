import { Tiers, type Comp } from '$lib/types';

const countMatchesInComp = (
	comp: Comp,
	selectedNames: string[],
	selectedSet?: Set<string>,
): number => {
	if (!selectedNames.length) return 0;

	const names = selectedSet ?? new Set(selectedNames);
	return comp.champions.reduce((count, c) => (names.has(c.name) ? count + 1 : count), 0);
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
		const matchCount = comp.champions.reduce(
			(count, champion) => (selectedSet.has(champion.name) ? count + 1 : count),
			0,
		);

		return {
			comp,
			tierIndex: Tiers.indexOf(comp.tier),
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

	const getMatchCount = (comp: Comp) => {
		const cached = matchCounts.get(comp);
		if (cached !== undefined) return cached;

		const count = countMatchesInComp(comp, selectedNames, selectedSet);
		matchCounts.set(comp, count);
		return count;
	};

	return (a: Comp, b: Comp) => {
		const aCount = getMatchCount(a);
		const bCount = getMatchCount(b);

		if (aCount !== bCount) {
			return bCount - aCount;
		}

		const aTierIndex = Tiers.indexOf(a.tier);
		const bTierIndex = Tiers.indexOf(b.tier);

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
	({ selectedNames, playstyle }: CompFilterOpts) =>
	(comp: Comp) => {
		if (!selectedNames && !playstyle) return true;

		if (selectedNames && countMatchesInComp(comp, selectedNames) === 0) {
			return false;
		}

		if (playstyle && comp.playstyle !== playstyle) {
			return false;
		}

		return true;
	};
