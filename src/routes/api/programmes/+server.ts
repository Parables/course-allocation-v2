import type { RequestHandler } from './$types';
import { Deta } from 'deta'; // import Deta
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { FilterableProgramme } from '$lib/data/types/programme';
import alasql from 'alasql';
import type { ObjectType } from 'deta/dist/types/types/basic';
import type { CourseType, FilterableCourse } from '$lib/data/types/course';

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base('programmes');

export const GET: RequestHandler = async ({ url }) => {
	const filterable = url.searchParams.get('filterable') ?? false;

	let res = await db.fetch();
	let allItems = res.items;

	// continue fetching until last is not seen
	while (res.last) {
		res = await db.fetch({}, { last: res.last });
		allItems = allItems.concat(res.items);
	}

	if (!filterable) {
		return json({ filterableProgrammes: [], rawProgrammes: allItems });
	}

	return getFilterableProgrammes(url, allItems);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		return json(await db.put(await request.json()));
	} catch (err) {
		throw error(400, 'Failed to create programme');
	}
};

const getFilterableProgrammes = async (url: URL, rawProgrammes: ObjectType[]) => {
	const coursesResponse = await fetch(`${url.origin}/api/courses/?filterable=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allCourses: { filterableCourses: FilterableCourse[]; rawCourses: CourseType[] } =
		await coursesResponse.json();

	alasql.fn.keys = function (obj) {
		return Object.keys(obj);
	};

	const allProgrammes = alasql(
		`SEARCH 
      KEYS() EX($0->(_)) AS @p 
      outline AS @o 
      KEYS() AS @y EX(@o->(_)) AS @s 
      KEYS() AS @sem EX(@s->(_)) 
      / AS @course 
    RETURN(
      @{key: (@p->key), title: (@p->title), code: (@p->code)} AS header, 
      @p->key AS key, 
      @p->title AS title, 
      @p->code AS code, 
      LEN(keys(@o)) AS duration, 
      @y AS year, 
      @sem AS sem, 
      @course AS course_key 
    ) FROM ?`,
		[rawProgrammes]
	);

	const filterableProgrammes: FilterableProgramme[] = alasql(
		`SELECT 
      @{key: (c.key), title: (c.title), code: (c.code)} AS course_header, 
      c.title AS course_title, 
      c.code AS course_code, 
      c.creditHours AS course_creditHours,
      c.contactHours AS course_contactHours,
      c.profile AS course_profile,
      c.session AS course_session,
      c.studentCount AS course_studentCount, 
	  c.lecturer_header AS course_lecturer_header,
	  c.lecturer_fullName AS course_lecturer_fullName,
	  c.lecturer_phoneNumber AS course_lecturer_phoneNumber,
	  c.lecturer_email AS course_lecturer_email,
	  c.lecturer_gender AS course_lecturer_gender,
	  c.lecturer_degree AS course_lecturer_degree,
	  c.lecturer_masters AS course_lecturer_masters,
	  c.lecturer_PhD AS course_lecturer_PhD,
      p.* 
    FROM ? as p 
    LEFT JOIN ? AS c ON p.course_key = c.key`,
		[allProgrammes, allCourses.filterableCourses]
	);

	return json({ filterableProgrammes, rawProgrammes });
};
