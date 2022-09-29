import { UpdateCourseSchema } from '$lib/data/types/course';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url, params }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		const validated = UpdateCourseSchema.try({ data, key: params.id });

		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const { key, ...updated } = validated;

		const response = await fetch(`${url.origin}/api/courses/${key}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(updated)
		});

		const result = await response.json();

		if (result === null) {
			throw redirect(303, '/courses');
		}
		return invalid(400, { ...data, error: { message: result.message } });
	}
};
