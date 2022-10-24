import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { writeFileSync } from 'fs';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('lecturers');
const drive = deta.Drive('photos');

export const GET: RequestHandler = async ({ params }) => {
	return json(await db.get(params.id));
};

// endpoint to handle uploads
export const POST: RequestHandler = async ({ request, params }) => {
	try {
		const { profilePicture: data } = await request.json();
		console.log('image recieved', data);

		writeFileSync(`static/avatar.png`, data, 'base64');

		const buffer = Buffer.from(data, 'base64');
		drive.put(`lecturers/${params.id}.png`, { data: buffer, contentType: 'image/png' });
	} catch (err) {
		throw error(400, `Image upload failed... ${err}`);
	}
	return json({ message: 'upload was successful' });
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	try {
		const data = await request.json();
		console.log(
			'🚀 ~ file: +server.ts ~ line 37 ~ constPATCH:RequestHandler= ~ await request.json(), params.id',
			data,
			params.id
		);
		return json(await db.update(data, params.id));
	} catch (err) {
		console.log('🚀 ~ file: +server.ts ~ line 43 ~ constPATCH:RequestHandler= ~ err', err);
		throw error(400, 'Failed to update lecturer');
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		return json(await db.delete(params.id));
	} catch (err) {
		throw error(400, 'Failed to delete lecturer');
	}
};
