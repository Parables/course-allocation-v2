import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  create: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

    const full_name = data.get("full_name");
    const gender = data.get("gender");
    const email = data.get("email");
    const phone_number = data.get("phone_number");
    const degree = data.get("degree");
    const masters = data.get("masters");

    const response = await fetch(`${url.origin}/api/lecturers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name,
        gender,
        email,
        phone_number,
        degree,
        masters,
      }),
    });

    const result = await response.json();

    if (result.key) {
      throw redirect(303, "/lecturers");
    }
  },

  update: async ({ request, url }) => {
    // extract data from request
    const data = await request.formData();

    const key = data.get("key");
    const full_name = data.get("full_name");
    const gender = data.get("gender");
    const email = data.get("email");
    const phone_number = data.get("phone_number");
    const degree = data.get("degree");
    const masters = data.get("masters");

    const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name,
        gender,
        email,
        phone_number,
        degree,
        masters,
      }),
    });

    const result = await response.json();

    if (result === null) {
      throw redirect(303, "/lecturers");
    }
  },
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
