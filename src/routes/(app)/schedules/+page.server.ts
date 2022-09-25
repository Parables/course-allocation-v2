import { formDataToJson } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	addCourses: async ({ url, request }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());
		console.log(data);
	},

	removeCourses: async ({ url, request }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());
		console.log(data);
	}
};
