import util from 'node:util';
import child_process from 'node:child_process';

import type { LayoutServerLoad } from './$types';

const exec = util.promisify(child_process.exec);
const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' });

export const load = (async () => {
	return {
		buildTime: dateFormatter.format(new Date()),
		versionHash: (await exec('git rev-parse HEAD')).stdout,
	};
}) satisfies LayoutServerLoad;
