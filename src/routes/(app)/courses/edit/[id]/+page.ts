import type { CourseType } from "$lib/data/types/course";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params }) => {
  const response = await fetch(`${url.origin}/api/courses/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const course: CourseType = await response.json();

  return { course };
};
