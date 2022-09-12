import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { DETA_PROJECT_KEY } from '$env/static/private';
import { requestToJson } from '$lib/utils';

console.log('Dweta', DETA_PROJECT_KEY);

// Initialize with a Project Key
const deta = Deta(DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('lecturers');

export const GET: RequestHandler = async ({ params }) => {
	return json(await db.get(params.id));
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	// extract data from request
	const data = await requestToJson(request);

	try {
		return json(await db.update(data, params.id));
	} catch (error) {
		console.log(error);
	}
	throw error(400, 'Failed to update lecturer');
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		console.log('delete ne:', params.id);
		return json(await db.delete(params.id));
	} catch (error) {
		console.log(error);
	}
	throw error(400, 'Failed to delete lecturer');
};
