import { CreateLecturerSchema } from '$lib/data/types/lecturer';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());
		console.log('🚀 ~ file: +page.server.ts ~ line 11 ~ default: ~ data', data);

		const { profilePicture, staffID, fullName, gender, email, phoneNumber, qualifications } = data;
		const validated = CreateLecturerSchema.try({
			profilePicture,
			staffID,
			fullName,
			gender,
			email,
			phoneNumber,
			qualifications: JSON.parse(qualifications)
		});

		console.log(validated);
		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const response = await fetch(`${url.origin}/api/lecturers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(validated)
		});

		const result = await response.json();

		if (result.key) {
			throw redirect(303, '/lecturers');
		}
	}
};
