import type { CourseType, FilterableCourse } from '$lib/data/types/course';
import type { LecturerType } from '$lib/data/types/lecturer';
import { redirectTo } from '$lib/utils';
import alasql from 'alasql';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const selectedLecturer = url.searchParams.get('lecturer');

	const response = await fetch(`/api/lecturers/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const allLecturers: LecturerType[] = await response.json();

	if (!selectedLecturer) {
		return redirectTo(`schedules?lecturer=${allLecturers[0].key}`);
	}

	const courseResponse = await fetch(`/api/courses`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	const {
		rawCourses: allCourses
	}: { filterableCourses: FilterableCourse[]; rawCourses: CourseType[] } =
		await courseResponse.json();

	const unassignedCourses: typeof allCourses = alasql(`SELECT * FROM ? WHERE lecturer = 'null'`, [
		allCourses
	]);

	const assignedCourses: typeof allCourses = alasql(`SELECT * FROM ? WHERE lecturer = ?`, [
		allCourses,
		selectedLecturer
	]);

	return { allLecturers, selectedLecturer, allCourses, unassignedCourses, assignedCourses };
};
