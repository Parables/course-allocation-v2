import myzod from 'myzod';
import type { Infer, Type } from 'myzod';
import { baseSchema, ID } from './base';
import { LecturerSchema, type LecturerType } from './lecturer';

export const CourseBaseSchema = myzod.object({
	title: myzod.string(),
	code: myzod.string(),
	content: myzod.string().optional(),
	objectives: myzod.string().optional(),
	description: myzod.string().optional(),
	creditHours: myzod.number().coerce(),
	contactHours: myzod.number().coerce(),
	profile: myzod.string().valid(['department', 'servicing']),
	session: myzod.literals('regular', 'regular & evening', 'weekend'),
	studentCount: myzod.number().coerce().default(0)
});

interface ICourse extends Infer<typeof CourseBaseSchema> {
	key: string;
	content?: string;
	objectives?: string;
	description?: string;
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
		lecturer: ID.default('null')
	})
);

export type CreateCourseInput = Infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = baseSchema.and(myzod.partial(CreateCourseSchema, { deep: true }));

export type UpdateCourseInput = Infer<typeof UpdateCourseSchema>;

export const UpdateCourseLecturerSchema = myzod.object({
	lecturer: myzod.string().default('null'),
	courses: myzod
		.array(ID)
		.or(myzod.string())
		.map((c) => (!Array.isArray(c) ? c.split(',') : c))
		.default([])
});

export type UpdateCourseLecturerInput = Infer<typeof UpdateCourseLecturerSchema>;

export type FilterableCourse = {
	key: string;
	title: string;
	code: string;
	content: string;
	objectives: string;
	description: string;
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
