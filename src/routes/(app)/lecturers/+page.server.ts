import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  delete: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

    const key = data.get("key");

    const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (result === null) {
      throw redirect(303, "/lecturers");
    }
  },
};
