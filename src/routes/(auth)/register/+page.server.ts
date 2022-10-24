import { RegisterSchema } from '$lib/data/types/auth';
import { auth } from '$lib/server/lucia';
import { formDataToJson } from '$lib/utils';
import { invalid, json, redirect, type Actions } from '@sveltejs/kit';
import { ValidationError } from 'myzod';

export const actions: Actions = {
	default: async ({ url, request, cookies }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		const validated = RegisterSchema.try(data);

		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const { username, email, password } = validated;
		try {
			const user = await auth.createUser('email', email, {
				password,
				attributes: {
					username,
					role: 'admin' // default role is guest
				}
			});

			const { setSessionCookie } = await auth.createSession(user.userId);

			setSessionCookie(cookies);
		} catch (e) {
			const error = e as Error;
			console.error(e);
			if (
				error.message === 'AUTH_DUPLICATE_PROVIDER_ID' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return invalid(400, {
					error: {
						message: 'User already exists'
					}
				});
			}
			return invalid(500, {
				error: {
					message: 'Unknown error occurred... please contact administrators'
				}
			});
		}
		throw redirect(302, '/');
	}
};
