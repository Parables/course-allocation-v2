import { CreateCourseSchema } from "$lib/data/types/course";
import { formDataToJson } from "$lib/utils";
import { invalid, redirect } from "@sveltejs/kit";
import { ValidationError } from "myzod";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, url }) => {
    // extract data from request
    const data = formDataToJson(await request.formData());

    const validated = CreateCourseSchema.try(data);

    if (validated instanceof ValidationError) {
      return invalid(400, { ...data, error: { message: validated.message } });
    }

    const response = await fetch(`${url.origin}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validated),
    });

    const result = await response.json();

    if (result.key) {
      throw redirect(303, "/courses");
    }
  },
};
