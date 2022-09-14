import type { RequestHandler } from "./$types";
import { Deta } from "deta"; // import Deta
import { error, json } from "@sveltejs/kit";
import { DETA_PROJECT_KEY } from "$env/static/private";

// Initialize with a Project Key
const deta = Deta(DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base("courses");

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
  } catch (error) {}
  throw error(400, "Failed to create course");
};
