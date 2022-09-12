import { requestToJson } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/lecturers`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const lecturers = await response.json();

	if (lecturers) {
		return {
			lecturers
		};
	}
};
