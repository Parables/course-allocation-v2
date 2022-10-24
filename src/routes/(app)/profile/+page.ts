import type { CourseType } from '$lib/data/types/course';
import type { LecturerType } from '$lib/data/types/lecturer';
import type { PageLoad } from './$types';
import { getUser } from 'lucia-sveltekit/load';
export const load: PageLoad = async (event) => {
	const { fetch } = event;

	// TODO: get the user
	const user = await getUser(event);

	const response = await fetch(`/api/lecturers/hyasex5ofwoy`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const lecturer: LecturerType = await response.json();

	const assignedCoursesResponse = await fetch(`/api/lecturers/hyasex5ofwoy/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const assignedCourses: CourseType[] = await assignedCoursesResponse.json();

	return { lecturer, assignedCourses };
};
