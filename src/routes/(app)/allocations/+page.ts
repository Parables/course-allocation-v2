import type { FilterableProgramme, ProgrammeRawType } from '$lib/data/types/programme';
import type { PageLoad } from './$types';
import { getUser } from 'lucia-sveltekit/load';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const { fetch } = event;

	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');

	if (user.role !== 'admin' && user.role !== 'lecturer') throw redirect(302, '/');

	const response = await fetch(`/api/programmes?filterable=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const data: {
		filterableProgrammes: FilterableProgramme[];
		rawProgrammes: ProgrammeRawType[];
	} = await response.json();

	return { ...data };
};
