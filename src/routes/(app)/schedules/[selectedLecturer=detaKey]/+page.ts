import type { CourseType } from '$lib/data/types/course';
import type { LecturerType } from '$lib/data/types/lecturer';
import alasql from 'alasql';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const selectedLecturer = params.selectedLecturer;

	const response = await fetch(`/api/lecturers/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: LecturerType[] = await response.json();

	const courseResponse = await fetch(`/api/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allCourses: CourseType[] = await courseResponse.json();

	const unassignedCourses: typeof allCourses = alasql(`SELECT * FROM ? WHERE lecturer = 'null'`, [
		allCourses ?? []
	]);

	const assignedCourses: typeof allCourses = alasql(`SELECT * FROM ? WHERE lecturer = ?`, [
		allCourses ?? [],
		selectedLecturer
	]);

	return {
		allLecturers: allLecturers ?? [],
		allCourses: allCourses ?? [],
		unassignedCourses: unassignedCourses ?? [],
		assignedCourses: assignedCourses ?? []
	};
};
