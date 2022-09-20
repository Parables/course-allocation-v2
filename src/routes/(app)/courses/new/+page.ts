import type { LecturerType } from "$lib/data/types/lecturer";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const lecturersResponse = await fetch(`/api/lecturers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturers: LecturerType[] = await lecturersResponse.json();

  return { lecturers: lecturers ?? [] };
};
