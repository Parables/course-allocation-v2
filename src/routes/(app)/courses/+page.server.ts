import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  create: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

    const course_name = data.get("course_name");
    const course_code = data.get("course_code");
    const year_group = data.get("year_group");
    const course_type = data.get("course_type");
    const student_count = data.get("student_count");

    const response = await fetch(`${url.origin}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        course_name,
        course_code,
        year_group,
        course_type,
        student_count,
      }),
    });

    const result = await response.json();

    if (result.key) {
      throw redirect(303, "/courses");
    }
  },
  update: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

    const key = data.get("key");
    const course_name = data.get("course_name");
    const course_code = data.get("course_code");
    const year_group = data.get("year_group");
    const course_type = data.get("course_type");
    const student_count = data.get("student_count");

    const response = await fetch(`${url.origin}/api/courses/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        course_name,
        course_code,
        year_group,
        course_type,
        student_count,
      }),
    });

    const result = await response.json();

    if (result === null) {
      throw redirect(303, "/courses");
    }
  },
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
