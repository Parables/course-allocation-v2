import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { ObjectType } from 'deta/dist/types/types/basic';
import type { CourseType, FilterableCourse } from '$lib/data/types/course';
import alasql from 'alasql';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('courses');

export const GET: RequestHandler = async ({ url }) => {
	const filterable = url.searchParams.get('filterable') ?? false;
	const simpleJoin = url.searchParams.get('simpleJoin') ?? false;

	let res = await db.fetch();
	let allItems = res.items;

	// continue fetching until last is not seen
	while (res.last) {
		res = await db.fetch({}, { last: res.last });
		allItems = allItems.concat(res.items);
	}

	if (filterable) {
		return getFilterableCourses(url, allItems);
	} else if (simpleJoin) {
		return getSimpleJoinCourses(url, allItems);
	}

	return json(allItems);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		return json(await db.put(await request.json()));
	} catch (err) {
		throw error(400, 'Failed to create course');
	}
};

const getSimpleJoinCourses = async (url: URL, rawCourses: ObjectType[]) => {
	const lecturersResponse = await fetch(`${url.origin}/api/lecturers`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: ObjectType[] = await lecturersResponse.json();

	const simpleJoinCourses: CourseType[] = alasql(
		`SELECT l.*, c.* 
  		FROM ? as c 
  		LEFT JOIN ? AS l ON c.lecturer = l.key`,
		[rawCourses, allLecturers]
	);

	return json({ simpleJoinCourses, rawCourses });
};

const getFilterableCourses = async (url: URL, rawCourses: ObjectType[]) => {
	const lecturersResponse = await fetch(`${url.origin}/api/lecturers`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: ObjectType[] = await lecturersResponse.json();

	const filterableCourses: FilterableCourse[] = alasql(
		`SELECT 
    @{key: (c.key), title: (c.title), code: (c.code)} AS header, 
    @{key: (l.key), fullName: (l.fullName), phoneNumber: (l.phoneNumber), email: (l.email)} AS lecturer_header, 
    l.fullName AS lecturer_fullName, 
    l.phoneNumber AS lecturer_phoneNumber, 
    l.email AS lecturer_email, 
    l.gender AS lecturer_gender, 
    l.degree AS lecturer_degree, 
    l.masters AS lecturer_masters, 
    l.PhD AS lecturer_PhD, 
    c.* 
  FROM ? as c 
  LEFT JOIN ? AS l ON c.lecturer = l.key`,
		[rawCourses, allLecturers]
	);

	return json({ filterableCourses, rawCourses });
};
