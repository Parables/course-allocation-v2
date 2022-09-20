import flat from "flat";
import { UpdateProgrammeSchema } from "$lib/data/types/programme";
import { formDataToJson } from "$lib/utils";
import { invalid, redirect } from "@sveltejs/kit";
import { ValidationError } from "myzod";
import type { Actions } from "./$types";

const { flatten, unflatten } = flat;

export const actions: Actions = {
  default: async ({ request, url }) => {
    // extract data from request
    const data = formDataToJson(await request.formData());

    const validated = UpdateProgrammeSchema.try(unflatten(flatten(data)));

    console.log(validated);

    if (validated instanceof ValidationError) {
      return invalid(400, { ...data, error: { message: validated.message } });
    }

    const { key, ...updated } = validated;

    const response = await fetch(`${url.origin}/api/programmes/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updated),
    });

    const result = await response.json();

    console.log(result);

    if (result === null) {
      throw redirect(303, "/programmes");
    }
  },
};
