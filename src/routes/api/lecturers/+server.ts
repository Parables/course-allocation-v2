import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('lecturers');
const drive = deta.Drive('photos');

export const GET: RequestHandler = async () => {
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
	try {
		const { profilePicture, ...data } = await request.json();
		const result = await db.put(data);

		if (result?.key && profilePicture) {
			const buffer = Buffer.from(profilePicture, 'base64');
			const name = await drive.put(`lecturers/${result.key}.png`, {
				data: buffer,
				contentType: 'image/png'
			});
			console.log('Image upload was successful', name);
		}

		return json(result);
	} catch (err) {
		throw error(400, 'Failed to create lecturer');
	}
};
