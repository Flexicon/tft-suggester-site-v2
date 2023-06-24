import type { Comp } from '$lib/types';

const countMatchesInComp = (comp: Comp, selectedNames: string[]): number =>
	comp.champions.filter((c) => selectedNames.includes(c.name)).length;

export const compSortFn = (selectedNames: string[]) => (a: Comp, b: Comp) => {
	const aCount = countMatchesInComp(a, selectedNames);
	const bCount = countMatchesInComp(b, selectedNames);

	if (aCount !== bCount) {
		return aCount > bCount ? -1 : 1;
	}

	if (a.tier === b.tier) {
		return a.name < b.name ? -1 : 1;
	} else if (a.tier === 'S') {
		return -1;
	} else if (b.tier === 'S') {
		return 1;
	}
	return a.tier < b.tier ? -1 : 1;
};

export const compFilterFn = (selectedNames: string[]) => (comp: Comp) => {
	const compChamps = comp.champions.map((c) => c.name);

	return selectedNames.some((name) => compChamps.includes(name));
};
