import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, params, fetch }) => {
	const response = await fetch(`/api/lecturers/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const lecturer = await response.json();

	const courseResponse = await fetch(`/api/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const courses = await courseResponse.json();
	console.log('Request:-->', lecturer, courses);

	return { lecturer, courses };
};
