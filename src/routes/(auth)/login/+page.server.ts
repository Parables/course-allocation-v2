import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { ValidationError } from 'myzod';
import { formDataToJson } from '$lib/utils';
import { LoginSchema } from '$lib/data/types/auth';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		const validated = LoginSchema.try(data);

		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const { email, password } = validated;

		try {
			const user = await auth.authenticateUser('email', email, password);

			const { setSessionCookie } = await auth.createSession(user.userId);

			setSessionCookie(cookies);
		} catch (e) {
			console.log(e);
			// email already in use
			return invalid(400, { error: { message: 'Authentication failed... please try again' } });
		}
		throw redirect(302, '/');
	}
};
