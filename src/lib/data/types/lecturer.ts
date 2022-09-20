import myzod from "myzod";
import type { Infer } from "myzod";
import { baseSchema } from "./base";

export const LecturerBaseSchema = myzod.object({
  fullName: myzod.string(),
  gender: myzod.literals("male", "female"),
  email: myzod.string(),
  phoneNumber: myzod.string(),
  degree: myzod.string().optional(),
  masters: myzod.string().optional(),
  PhD: myzod.string().optional(),
});

export const LecturerSchema = baseSchema.and(LecturerBaseSchema);

export type LecturerType = Infer<typeof LecturerSchema>;

export const CreateLecturerSchema = LecturerBaseSchema;

export type CreateLecturerInput = Infer<typeof CreateLecturerSchema>;

export const UpdateLecturerSchema = baseSchema.and(
  myzod.partial(CreateLecturerSchema, { deep: true })
);

export type UpdateLecturerInput = Infer<typeof UpdateLecturerSchema>;
