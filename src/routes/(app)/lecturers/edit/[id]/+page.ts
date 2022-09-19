import type { LecturerType } from "$lib/data/types/lecturer";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params }) => {
  const response = await fetch(`${url.origin}/api/lecturers/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturer: LecturerType = await response.json();

  return { lecturer };
};
