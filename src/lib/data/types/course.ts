import myzod from 'myzod';
import type { Infer, Type } from 'myzod';
import { baseSchema, ID } from './base';
import { LecturerSchema, type LecturerType } from './lecturer';

export const CourseBaseSchema = myzod.object({
	title: myzod.string(),
	code: myzod.string(),
	creditHours: myzod.number().coerce(),
	contactHours: myzod.number().coerce(),
	profile: myzod.literals('department', 'servicing'),
	session: myzod.literals('regular', 'evening', 'weekend'),
	studentCount: myzod.number().coerce().default(0)
});

interface ICourse extends Infer<typeof CourseBaseSchema> {
	key: string;
	lecturer?: LecturerType;
}

export const CourseSchema: Type<ICourse> = baseSchema
	.and(CourseBaseSchema)
	.and(
		myzod.object({
			lecturer: myzod.lazy(() => LecturerSchema).or(myzod.undefined())
		})
	)
	.collectErrors();

export type CourseType = Infer<typeof CourseSchema>;

export const CreateCourseSchema = CourseBaseSchema.and(
	myzod.object({
		lecturer: ID.optional()
	})
).collectErrors();
export type CreateCourseInput = Infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = baseSchema
	.and(myzod.partial(CreateCourseSchema, { deep: true }))
	.collectErrors();

export type UpdateCourseInput = Infer<typeof UpdateCourseSchema>;
