import flat from "flat";
import { CreateProgrammeSchema } from "$lib/data/types/programme";
import { formDataToJson } from "$lib/utils";
import { invalid, redirect } from "@sveltejs/kit";
import { ValidationError } from "myzod";
import type { Actions } from "./$types";

const { flatten, unflatten } = flat;

export const actions: Actions = {
  default: async ({ request, url }) => {
    // extract data from request
    const data = formDataToJson(await request.formData());

    const validated = CreateProgrammeSchema.try(unflatten(flatten(data)));

    if (validated instanceof ValidationError) {
      return invalid(400, { ...data, error: { message: validated.message } });
    }

    const response = await fetch(`${url.origin}/api/programmes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validated),
    });

    const result = await response.json();

    if (result.key) {
      throw redirect(303, "/programmes");
    }
  },
};
