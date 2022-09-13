import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/(app)/lecturers/view/[id]/$types';

export const load: PageLoad = async ({ url, params, fetch }) => {
	const response = await fetch(`/api/lecturers/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const lecturers = await response.json();

	const courseResponse = await fetch(`/api/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const courses = await courseResponse.json();
	// console.log('Request:-->', lecturers, courses);

	return { lecturers,  courses };
};
