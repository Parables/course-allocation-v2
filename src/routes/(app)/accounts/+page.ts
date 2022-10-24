import type { LecturerType } from '$lib/data/types/lecturer';
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

	// TODO: filter out already registered lecturers
	const unregisteredLecturers = allLecturers.filter((l) => !l.userID || l.userID === 'null');

	return { allLecturers, unregisteredLecturers };
};
