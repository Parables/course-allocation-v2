import sgMail from '@sendgrid/mail';
import { RegisterSchema } from '$lib/data/types/auth';
import { auth } from '$lib/server/lucia';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import { SENDGRID_API_KEY } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		// const validated = RegisterSchema.try(data);

		// if (validated instanceof ValidationError) {
		// 	return invalid(400, { ...data, error: { message: validated.message } });
		// }

		try {
			sgMail.setApiKey(SENDGRID_API_KEY);
			const msg = {
				to: data.email, // Change to your recipient
				from: 'support@ttu.gh', // Change to your verified sender
				templateId: ': d-03f48efc655e4c65acd3dc052e25993'
			};
			sgMail
				.send(msg)
				.then(() => {
					console.log('Email sent');
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (e) {
			console.log('🚀 ~ file: +page.server.ts ~ line 37 ~ default: ~ e', e);
		}
		throw redirect(302, '/accounts');
	}
};
