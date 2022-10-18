import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	try {
		const session = await auth.validateRequest(request);
		return { session };
	} catch {
		throw redirect(303, '/login');
	}
};
