import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  delete: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();
    console.log("🚀 ~ file: +page.server.ts ~ line 8 ~ delete: ~ data", data)

    const key = data.get("key");

    const response = await fetch(`${url.origin}/api/courses/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (result === null) {
      throw redirect(303, "/courses");
    }
  },
};
