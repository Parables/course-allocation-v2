import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.

export const GET: RequestHandler = async ({ params }) => {
	try {
		const drive = deta.Drive(params.driveName);
		const file = await drive.get(params.fileName);
		const buffer = await file?.arrayBuffer();
		if (buffer) return new Response(Buffer.from(buffer));
		throw error(400, 'File not found');
	} catch (err) {
		throw error(400, 'File not found');
	}
};
