import type { RequestHandler } from "./$types";
import { Deta } from "deta"; // import Deta
import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base("programmes");

export const GET: RequestHandler = async ({ params }) => {
  return json(await db.get(params.id));
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    return json(await db.update(await request.json(), params.id));
  } catch (err) {
    console.log(err);
    throw error(400, "Failed to update programme");
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    return json(await db.delete(params.id));
  } catch (err) {
    console.log(err);
    throw error(400, "Failed to delete programme");
  }
};
