import { requestToJson } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, url }) => {
		// extract data from request
		const data = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/courses`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		console.log('Create Course Response:-->', result);
		if (result.key) {
			throw redirect(307, '/courses');
		}
	},
	update: async ({ request, url }) => {
		// extract data from request
		const { key, ...data } = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/courses/${key}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		console.log('Edit Course Response:-->', result);
		if (result === null) {
			throw redirect(307, '/courses');
		}
	},
	delete: async ({ request, url }) => {
		// extract data from request
		const { key } = await requestToJson(request);

		const response = await fetch(`${url.origin}/api/courses/${key}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		const result = await response.json();

		console.log('Delete Course Response:-->', result);
		if (result === null) {
			throw redirect(307, '/courses');
		}
	}
};
