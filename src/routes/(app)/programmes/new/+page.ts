import type { CourseType } from "$lib/data/types/course";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const coursesResponse = await fetch(`/api/courses/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const courses: CourseType[] = await coursesResponse.json();

  return { courses: courses ?? [] };
};
