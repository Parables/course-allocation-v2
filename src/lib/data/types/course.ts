import myzod from "myzod";
import type { Infer, Type } from "myzod";
import { baseSchema, ID } from "./base";
import { LecturerSchema, type LecturerType } from "./lecturer";

export const CourseBaseSchema = myzod.object({
  title: myzod.string(),
  code: myzod.string(),
  creditHours: myzod.number(),
  contactHours: myzod.number(),
  profile: myzod.literals("department", "servicing"),
  session: myzod.literals("regular", "evening", "weekend"),
  studentCount: myzod.number().default(0),
});

interface ICourse extends Infer<typeof CourseBaseSchema> {
  lecturer?: LecturerType;
}

export const CourseSchema: Type<ICourse> = baseSchema.and(CourseBaseSchema).and(
  myzod.object({
    lecturer: myzod.lazy(() => LecturerSchema).or(myzod.undefined()),
  })
);

export type CourseType = Infer<typeof CourseSchema>;

export const CreateCourseSchema = CourseBaseSchema.and(
  myzod.object({
    lecturer: ID.optional(),
  })
);
export type CreateCourseInput = Infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = baseSchema.and(
  myzod.partial(CreateCourseSchema, { deep: true })
);

export type UpdateCourseInput = Infer<typeof UpdateCourseSchema>;
