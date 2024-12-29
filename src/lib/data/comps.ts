import { Tiers, type Comp } from '$lib/types';

const countMatchesInComp = (comp: Comp, selectedNames: string[]): number =>
	comp.champions.filter((c) => selectedNames.includes(c.name)).length;

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
	return a.tier < b.tier ? -1 : 1;
};

export const compFilterFn = (selectedNames: string[]) => (comp: Comp) => {
	const compChamps = comp.champions.map((c) => c.name);

	return selectedNames.some((name) => compChamps.includes(name));
};
