import { Tiers, type Comp } from '$lib/types';

const countMatchesInComp = (comp: Comp, selectedNames: string[]): number => {
	if (!selectedNames.length) return 0;

	const selectedSet = new Set(selectedNames);
	return comp.champions.reduce((count, c) => (selectedSet.has(c.name) ? count + 1 : count), 0);
};

export const compSortFn = (selectedNames: string[]) => (a: Comp, b: Comp) => {
	const aCount = countMatchesInComp(a, selectedNames);
	const bCount = countMatchesInComp(b, selectedNames);

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
