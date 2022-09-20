import type { RequestHandler } from "./$types";
import { Deta } from "deta"; // import Deta
import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base("lecturers");

export const GET: RequestHandler = async () => {
  let res = await db.fetch();
  let allItems = res.items;

  // continue fetching until last is not seen
  while (res.last) {
    res = await db.fetch({}, { last: res.last });
    allItems = allItems.concat(res.items);
  }

  return json(allItems);
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    return json(await db.put(await request.json()));
  } catch (err) {
    throw error(400, "Failed to create lecturer");
  }
};
