import { requestToJson } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, url }) => {
		// extract data from request
		const data = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/lecturers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		console.log('Create Lecturer Response:-->', result);
		if (result.key) {
			throw redirect(307, '/lecturers');
		}
	},
	assign: async ({ request, url }) => {
		// extract data from request
		const data = await requestToJson(request);
		console.log(data.assignedCourses);
		// const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
		// 	method: 'PATCH',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json'
		// 	},
		// 	body: JSON.stringify(data)
		// });

		// const result = await response.json();

		// console.log('Edit Lecturer Response:-->', result);
		// if (result === null) {
		// 	throw redirect(307, '/lecturers');
		// }
	},
	update: async ({ request, url }) => {
		// extract data from request
		const { key, ...data } = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		console.log('Edit Lecturer Response:-->', result);
		if (result === null) {
			throw redirect(307, '/lecturers');
		}
	},
	delete: async ({ request, url }) => {
		// extract data from request
		const { key } = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		const result = await response.json();

		console.log('Delete Lecturer Response:-->', result);
		if (result === null) {
			throw redirect(307, '/lecturers');
		}
	}
};
