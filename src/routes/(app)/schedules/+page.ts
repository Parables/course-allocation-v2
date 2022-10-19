import type { LecturerType } from '$lib/data/types/lecturer';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/lecturers/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: LecturerType[] = await response.json();
	console.log(allLecturers);
	if (Array.isArray(allLecturers) && allLecturers.length > 0 && allLecturers[0].key) {
		console.log('Lecturers is not empty... redirect to the first lecturer');
		throw redirect(303, `/schedules/${allLecturers[0].key}`);
	}

	return { allLecturers };
};
