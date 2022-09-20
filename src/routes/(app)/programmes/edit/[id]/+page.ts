import type { CourseType } from "$lib/data/types/course";
import type { UpdateProgrammeInput } from "$lib/data/types/programme";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const programmeResponse = await fetch(`/api/programmes/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const programme: UpdateProgrammeInput = await programmeResponse.json();

  const coursesResponse = await fetch(`/api/courses/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const courses: CourseType[] = await coursesResponse.json();

  return { programme, courses: courses ?? [] };
};
