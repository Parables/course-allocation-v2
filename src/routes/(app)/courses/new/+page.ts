import type { PageLoad } from './$types';
import { getUser } from 'lucia-sveltekit/load';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');

	if (user.role !== 'admin') throw redirect(302, '/courses');
};
