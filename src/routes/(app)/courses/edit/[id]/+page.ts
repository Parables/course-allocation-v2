import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, params }) => {
	const response = await fetch(`${url.origin}/api/courses/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const course = await response.json();

	console.log('Request:-->', course);
	return { course };
};
