import { invalidateAll } from '$app/navigation';
import { UpdateCourseLecturerSchema } from '$lib/data/types/course';
import { formDataToJson, redirectTo } from '$lib/utils';
import { invalid, redirect } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import type { Actions } from './$types';

export const actions: Actions = {
	addCourses: async ({ url, request }) => {
		const redirectTo = url.searchParams.get('redirectTo') ?? '/schedules';
		try {
			// extract data from request
			const data = formDataToJson(await request.formData());

			console.log(data);
			const validated = UpdateCourseLecturerSchema.try(data);

			console.log(validated);

			if (validated instanceof ValidationError) {
				return invalid(400, { ...data, error: { message: validated.message } });
			}

			const { addCourses, lecturer } = validated;

			for await (const course_key of addCourses ?? []) {
				updateCourseLecturer(url, lecturer, course_key);
			}

			return {
				success: {
					message: `${
						addCourses?.length ?? 0
					} Courses have been assigned to lecturer. Refresh the page to see the changes`
				}
			};
		} catch (error) {
			throw redirect(303, redirectTo);
		}
	},

	removeCourses: async ({ url, request }) => {
		const redirectTo = url.searchParams.get('redirectTo') ?? '/schedules';
		try {
			// extract data from request
			const data = formDataToJson(await request.formData());

			console.log(data);
			const validated = UpdateCourseLecturerSchema.try(data);

			if (validated instanceof ValidationError) {
				return invalid(400, { ...data, error: { message: validated.message } });
			}

			const { removeCourses } = validated;

			for await (const course_key of removeCourses ?? []) {
				updateCourseLecturer(url, null, course_key);
			}

			return {
				success: {
					message: `${
						removeCourses?.length ?? 0
					} Courses have been unassigned from lecturer. Refresh the page to see the changes`
				}
			};
		} catch (error) {
			throw redirect(303, redirectTo);
		}
	}
};

const updateCourseLecturer = async (url: URL, lecturer: string | null, key: string) => {
	const response = await fetch(`${url.origin}/api/courses/${key}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ lecturer })
	});

	const result = await response.json();

	console.log(result);
	return result;
};
