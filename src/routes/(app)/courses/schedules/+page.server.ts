import { invalidateAll } from '$app/navigation';
import { UpdateCourseLecturerSchema } from '$lib/data/types/course';
import { formDataToJson, redirectTo } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ url, request }) => {
		try {
			// extract data from request
			const data = formDataToJson(await request.formData());

			const validated = UpdateCourseLecturerSchema.try(data);

			if (validated instanceof ValidationError) {
				return invalid(400, { ...data, error: { message: validated.message } });
			}

			const { courses, lecturer } = validated;

			courses.forEach(async (key) => {
				const response = await fetch(`${url.origin}/api/courses/${key}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ lecturer: lecturer })
				});

				await response.json();
			});

			return {
				success: {
					message: `${courses?.length ?? 0} courses have been ${
						lecturer ? 'assigned to lecturer' : 'unassigned'
					}`
				}
			};
		} catch (err) {
			throw redirect(303, '/courses/schedules');
		}
	}
};
