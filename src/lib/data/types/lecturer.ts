import myzod from 'myzod';
import type { Infer } from 'myzod';
import { baseSchema } from './base';

export const QualificationSchema = myzod
	.object({
		university: myzod.string().min(3),
		programme: myzod.string().min(3),
		certificate: myzod.string().min(3),
		startDate: myzod.date().map((v) => `${v.getMonth()}/${v.getDate()}/${v.getFullYear()}`),
		endDate: myzod.date().map((v) => `${v.getMonth()}/${v.getDate()}/${v.getFullYear()}`)
	})
	.withPredicate(
		(q) => new Date(q?.endDate) >= new Date(q?.startDate),
		'End Date must be after Start Date'
	);

export type QualificationType = Infer<typeof QualificationSchema>;

export const LecturerBaseSchema = myzod.object({
	staffID: myzod.string(),
	fullName: myzod.string(),
	gender: myzod.literals('male', 'female'),
	email: myzod.string(),
	phoneNumber: myzod.string(),
	qualifications: myzod
		.record(QualificationSchema)
		.withPredicate(
			(v) => Object.keys(v).length > 0,
			'A lecturer must have at least one qualification'
		)
});

export const LecturerSchema = baseSchema.and(LecturerBaseSchema);

export type LecturerType = Infer<typeof LecturerSchema>;

export const CreateLecturerSchema = LecturerBaseSchema;

export type CreateLecturerInput = Infer<typeof CreateLecturerSchema>;

export const UpdateLecturerSchema = baseSchema.and(
	myzod.partial(CreateLecturerSchema, { deep: true })
);

export type UpdateLecturerInput = Infer<typeof UpdateLecturerSchema>;
