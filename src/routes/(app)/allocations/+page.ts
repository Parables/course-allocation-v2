import type { FilterableProgramme, ProgrammeRawType } from '$lib/data/types/programme';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
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
