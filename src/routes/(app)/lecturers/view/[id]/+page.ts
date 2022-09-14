import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
  const response = await fetch(`/api/lecturers/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturer = await response.json();

  return { lecturer };
};
