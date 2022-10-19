import { UpdateLecturerSchema } from '$lib/data/types/lecturer';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url, params }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());
		const { staffID, fullName, gender, email, phoneNumber, qualifications } = data;

		const validated = UpdateLecturerSchema.try({
			key: params.id,
			staffID,
			fullName,
			gender,
			email,
			phoneNumber,
			qualifications: JSON.parse(qualifications)
		});

		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const { key, ...updated } = validated;

		const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(updated)
		});

		const result = await response.json();

		console.log('result', result);
		if (result === null) {
			throw redirect(303, '/lecturers');
		}
		return invalid(400, { ...data, error: { message: result.message } });
	}
};
