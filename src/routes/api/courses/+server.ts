import type { RequestHandler } from "./$types";
import { Deta } from "deta"; // import Deta
import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { courses } from "$lib/data/mocks/courses";
import { dev } from "$app/environment";

// Initialize with a Project Key
const deta = Deta(env.DETA_PROJECT_KEY);

// This how to connect to or create a database.
const db = deta.Base("courses");

export const GET: RequestHandler = async () => {
  /*   if (dev) {
    return json(courses);
  } */

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
    /*     if (dev) {
      return json([...courses, await request.json()]);
    } */

    return json(await db.put(await request.json()));
  } catch (error) {
    //
  }
  throw error(400, "Failed to create course");
};
