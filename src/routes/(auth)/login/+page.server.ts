import { LoginSchema } from '$lib/data/types/auth';
import { auth } from '$lib/server/lucia';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

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
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
				error.message === 'AUTH_INVALID_PASSWORD'
			) {
				return invalid(400, {
					message: 'Incorrect username or password.'
				});
			}
			// database connection error
			console.error(error);
			return invalid(500, {
				message: 'Unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
