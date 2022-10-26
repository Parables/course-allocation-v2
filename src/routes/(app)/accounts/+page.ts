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

	// TODO: filter out already registered lecturers
	const unregisteredLecturers = allLecturers.filter((l) => !l.userId || l.userId === 'null');

	return { allLecturers, unregisteredLecturers };
};
