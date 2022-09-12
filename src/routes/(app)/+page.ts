import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const lecturerResponse = await fetch(`/api/lecturers`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const lecturers = await lecturerResponse.json();

	const courseResponse = await fetch(`/api/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const courses = await courseResponse.json();

	return {
		lecturerCount: Array.isArray(lecturers) ? lecturers.length : 0,
		courseCount: Array.isArray(courses) ? courses.length : 0
	};
};
