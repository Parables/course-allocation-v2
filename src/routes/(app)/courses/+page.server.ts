import {
  CourseSchema,
  CreateCourseSchema,
  UpdateCourseSchema,
} from "$lib/data/types/course";
import { formDataToJson } from "$lib/utils";
import { invalid, redirect } from "@sveltejs/kit";
import { ValidationError } from "myzod";
import type { Actions } from "./$types";

export const actions: Actions = {
  /*   create: async ({ request, url }) => {
    // extract data from request
    const data = formDataToJson(await request.formData());

    const validated = CreateCourseSchema.try(data);

    if (validated instanceof ValidationError) {
      console.log("validation error", JSON.stringify(validated));
      return invalid(400, { ...data });
    } else {
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
    }
  }, */
  /*   update: async ({ request, url }) => {
    // extract data from request
    const data = formDataToJson(await request.formData());

    const validated = UpdateCourseSchema.try(data);

    if (validated instanceof ValidationError) {
      console.log("validation error", validated);
      return invalid(400, { ...data, errors: validated.collectedErrors });
    }

    const response = await fetch(`${url.origin}/api/courses/${validated.key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validated),
    });

    const result = await response.json();

    if (result === null) {
      throw redirect(303, "/courses");
    }
  }, */
  delete: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

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
