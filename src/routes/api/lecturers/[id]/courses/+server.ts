import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { CourseType } from '$lib/data/types/course';
import alasql from 'alasql';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('courses');

export const GET: RequestHandler = async ({ params }) => {
	let res = await db.fetch();
	let allItems = res.items;

	// continue fetching until last is not seen
	while (res.last) {
		res = await db.fetch({}, { last: res.last });
		allItems = allItems.concat(res.items);
	}

	const assignedCourses: CourseType[] = alasql('SELECT * FROM ? WHERE lecturer = ?', [
		allItems ?? [],
		params.id
	]);

	return json(assignedCourses);
};
