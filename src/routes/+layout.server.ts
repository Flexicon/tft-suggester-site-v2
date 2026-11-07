import type { LayoutServerLoad } from './$types';

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' });

export const load = (async () => {
	return {
		buildTime: dateFormatter.format(new Date()),
		versionHash: __COMMIT_SHA__,
	};
}) satisfies LayoutServerLoad;
