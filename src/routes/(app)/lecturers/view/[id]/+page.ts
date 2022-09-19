import type { CourseType } from "$lib/data/types/course";
import type { LecturerType } from "$lib/data/types/lecturer";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/lecturers/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturer: LecturerType = await response.json();

  const coursesResponse = await fetch(`/api/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const courses: CourseType[] = await coursesResponse.json();

  return { lecturer, courses };
};
