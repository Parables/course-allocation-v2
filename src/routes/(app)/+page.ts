import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const lecturerResponse = await fetch(`/api/lecturers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const lecturers = await lecturerResponse.json();

  const courseResponse = await fetch(`/api/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const courses = await courseResponse.json();

  const programmeResponse = await fetch(`/api/programmes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const programmes = await programmeResponse.json();

  return {
    stats: {
      lecturers: Array.isArray(lecturers) ? lecturers.length : 0,
      courses: Array.isArray(courses) ? courses.length : 0,
      programmes: Array.isArray(programmes) ? programmes.length : 0,
    },
  };
};
