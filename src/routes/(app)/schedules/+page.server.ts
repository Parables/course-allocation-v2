import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

const getAssignedCourses = async (endpoint: string) => {
  // get the lecturer's courses
  const lecturerResponse = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const lecturer = await lecturerResponse.json();

  return lecturer.assigned_courses ?? null;
};

const updateAssignedCourses = async (
  endpoint: string,
  assignedCourses: Record<string, any>,
  redirectTo: string | null
) => {
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ assigned_courses: assignedCourses }),
  });

  const result = await response.json();

  if (result === null) {
    if (redirectTo) {
      throw redirect(303, redirectTo);
    }
    return {
      success: ` ${
        Object.keys(assignedCourses).length
      } Courses allocated to lecturer`,
    };
  }
  return {
    error: `Something went wrong... please check your internet connection and try again`,
  };
};

export const actions: Actions = {
  addCourses: async ({ url, request }) => {
    // extract data from request
    const data = await request.formData();
    const key = data.get("key") as string;
    const strAddCourses = data.get("addCourses") as string;
    const addCourses: any[] = strAddCourses ? JSON.parse(strAddCourses) : [];

    const endpoint = `${url.origin}/api/lecturers/${key}`;
    const assignedCourses: Record<string, any> =
      (await getAssignedCourses(endpoint)) ?? {};

    addCourses.forEach((a) => {
      assignedCourses[a.key] = a;
    });

    const redirectTo = url.searchParams.get("redirectTo");
    return updateAssignedCourses(endpoint, assignedCourses, redirectTo);
  },

  removeCourses: async ({ url, request }) => {
    // extract data from request
    const data = await request.formData();
    const key = data.get("key") as string;
    const strRemoveCourses = data.get("removeCourses") as string;
    const removeCourses: any[] = strRemoveCourses
      ? JSON.parse(strRemoveCourses)
      : [];

    const endpoint = `${url.origin}/api/lecturers/${key}`;
    const assignedCourses: Record<string, any> =
      (await getAssignedCourses(endpoint)) ?? {};

    removeCourses.forEach((a) => {
      delete assignedCourses[a.key];
    });

    const redirectTo = url.searchParams.get("redirectTo");
    return updateAssignedCourses(endpoint, { ...assignedCourses }, redirectTo);
  },
};
