import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, params }) => {
	const response = await fetch(`${url.origin}/api/lecturers/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const lecturer = await response.json();

	console.log('Request:-->', lecturer);
	return { lecturer };
};
