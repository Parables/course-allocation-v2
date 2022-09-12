import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { DETA_PROJECT_KEY } from '$env/static/private';
import { requestToJson } from '$lib/utils';

// Initialize with a Project Key
const deta = Deta(DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('courses');

export const GET: RequestHandler = async ({ url, params }) => {
	let res = await db.fetch();
	let allItems = res.items;

	// continue fetching until last is not seen
	while (res.last) {
		res = await db.fetch({}, { last: res.last });
		allItems = allItems.concat(res.items);
	}

	return json(allItems);
};

export const POST: RequestHandler = async ({ request }) => {
	// extract data from request
	const data = await requestToJson(request);

	try {
		return json(await db.put(data));
	} catch (error) {
		console.log(error);
	}
	throw error(400, 'Failed to create course');
};
