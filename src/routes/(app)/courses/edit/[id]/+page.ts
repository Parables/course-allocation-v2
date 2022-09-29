import type { CourseType } from '$lib/data/types/course';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const courseResponse = await fetch(`/api/courses/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const course: CourseType = await courseResponse.json();

	return { course };
};
