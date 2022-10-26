import type { LecturerType } from '$lib/data/types/lecturer';
import type { PageLoad } from './$types';
import { getUser } from 'lucia-sveltekit/load';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');

	const { params, fetch } = event;

	if (user.role === 'lecturer') {
		if (params.id !== user.lecturerKey) throw redirect(302, `/lecturers/view/${user.lecturerKey}`);
	} else if (user.role !== 'admin') {
		throw redirect(302, '/');
	}

	const response = await fetch(`/api/lecturers/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const lecturer: LecturerType = await response.json();

	return { lecturer };
};
