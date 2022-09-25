import myzod from 'myzod';
import type { Infer, Type } from 'myzod';
import { baseSchema, ID } from './base';
import { LecturerSchema, type LecturerType } from './lecturer';

export const CourseBaseSchema = myzod.object({
	title: myzod.string(),
	code: myzod.string(),
	creditHours: myzod.number().coerce(),
	contactHours: myzod.number().coerce(),
	profile: myzod.string().valid(['department', 'servicing']),
	session: myzod.literals('regular', 'evening', 'weekend'),
	studentCount: myzod.number().coerce().default(0)
});

interface ICourse extends Infer<typeof CourseBaseSchema> {
	key: string;
	lecturer?: LecturerType;
}

export const CourseSchema: Type<ICourse> = baseSchema.and(CourseBaseSchema).and(
	myzod.object({
		lecturer: myzod.lazy(() => LecturerSchema).or(myzod.undefined())
	})
);

export type CourseType = Infer<typeof CourseSchema>;

export const CreateCourseSchema = CourseBaseSchema.and(
	myzod.object({
		lecturer: ID.optional()
	})
);

export type CreateCourseInput = Infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = baseSchema.and(myzod.partial(CreateCourseSchema, { deep: true }));

export type UpdateCourseInput = Infer<typeof UpdateCourseSchema>;

export type FilterableCourse = {
	key: string;
	title: string;
	code: string;
	header: {
		key: string;
		title: string;
		code: string;
	};
	creditHours: number;
	contactHours: number;
	profile: string;
	session: string;
	studentCount: number;
	lecturer_header?: {
		key: string;
		fullName: string;
		phoneNumber?: string;
		email?: string;
	};
	lecturer_fullName?: string;
	lecturer_phoneNumber?: string;
	lecturer_email?: string;
	lecturer_gender?: 'male' | 'female';
	lecturer_degree?: string;
	lecturer_masters?: string;
	lecturer_PhD?: string;
};
