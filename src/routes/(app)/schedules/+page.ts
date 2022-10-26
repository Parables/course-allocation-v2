import type { LecturerType } from '$lib/data/types/lecturer';
import type { PageLoad } from './$types';

import { getUser } from 'lucia-sveltekit/load';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const { fetch } = event;

	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');

	if (user.role !== 'admin') throw redirect(302, '/');

	const response = await fetch(`/api/lecturers/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: LecturerType[] = await response.json();
	if (Array.isArray(allLecturers) && allLecturers.length > 0 && allLecturers[0].key) {
		throw redirect(303, `/schedules/${allLecturers[0].key}`);
	}

	return { allLecturers };
};
