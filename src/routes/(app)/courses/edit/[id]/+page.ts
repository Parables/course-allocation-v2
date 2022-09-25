import type { CourseType } from '$lib/data/types/course';
import type { LecturerType } from '$lib/data/types/lecturer';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const courseResponse = await fetch(`/api/courses/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const course: CourseType = await courseResponse.json();

	/*   const lecturersResponse = await fetch(`/api/lecturers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturers: LecturerType[] = await lecturersResponse.json();
 */
	return { course /* , lecturers: lecturers ?? [] */ };
};
