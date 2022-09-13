import { requestToJson } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

const getAssignedCourses = async (url: string) => {
  // get the lecturer's courses
  const lecturerResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturer = await lecturerResponse.json();

  return lecturer.assigned_courses
    ? JSON.parse(lecturer.assigned_courses)
    : null;
};

export const actions: Actions = {
  addCourses: async ({ url, request }) => {
    // extract data from request
    const data = await request.formData();
    const key = data.get("key") as string;
    const strAddCourses = data.get("addCourses") as string;
    const addCourses: any[] = strAddCourses ? JSON.parse(strAddCourses) : [];

    console.log("key", key, "addCourses", strAddCourses);

    const assignedCourses: Record<string, any> =
      (await getAssignedCourses(`${url.origin}/api/lecturers/${key}`)) ?? {};

    addCourses.forEach((a) => {
      assignedCourses[a.key] = a;
    });

    console.log("adding these courses", assignedCourses);

    const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ assigned_courses: assignedCourses }),
    });

    const result = await response.json();

    console.log("Assigned Courses to Lecturer Response:-->", result);
    if (result === null) {
      throw redirect(307, `/schedules`);
    }
  },
  removeCourses: async ({ url, request }) => {
    // extract data from request
    const { key, ...data } = await requestToJson(request);

    console.log("key", key, "data", data.assigned_courses);

    const response = await fetch(`${url.origin}/api/lecturers/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("Assigned Courses to Lecturer Response:-->", result);
    if (result === null) {
      throw redirect(307, `/schedules`);
    }
  },
};
