import type { RequestHandler } from "./$types";
import { Deta } from "deta"; // import Deta
import { error, json } from "@sveltejs/kit";
import { DETA_PROJECT_KEY } from "$env/static/private";

// Initialize with a Project Key
const deta = Deta(DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base("courses");

export const GET: RequestHandler = async ({ params }) => {
  return json(await db.get(params.id));
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    return json(await db.update(await request.json(), params.id));
  } catch (error) {
    //
  }
  throw error(400, "Failed to update course");
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    return json(await db.delete(params.id));
  } catch (error) {
    //
  }
  throw error(400, "Failed to delete course");
};
