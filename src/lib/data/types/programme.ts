import myzod from 'myzod';
import type { Type, Infer } from 'myzod';
import { baseSchema, ID } from './base';
import { CourseSchema, type CourseType } from './course';

export const ProgrammeBaseSchema = myzod.object({
	title: myzod.string(),
	code: myzod.string().optional()
});

interface IProgramme extends Infer<typeof ProgrammeBaseSchema> {
	key: string;
	outline: {
		[x: string]: ISemesters;
	};
}

interface ISemesters {
	[x: string]: CourseType[];
}

const SemestersSchema: Type<ISemesters> = myzod.record(myzod.array(myzod.lazy(() => CourseSchema)));

export const ProgrammeSchema: Type<IProgramme> = baseSchema.and(ProgrammeBaseSchema).and(
	myzod.object({
		outline: myzod.record(myzod.lazy(() => SemestersSchema))
	})
);

export type ProgrammeType = Infer<typeof ProgrammeSchema>;

export const CreateProgrammeSchema = ProgrammeBaseSchema.and(
	myzod.object({
		outline: myzod
			.record(
				myzod.record(
					myzod
						.array(ID)
						.or(myzod.string())
						.map((c) => (!Array.isArray(c) ? c.split(',') : c))
				)
			)
			.default({
				year1: { sem1: [], sem2: [] }
			})
	})
);
export type CreateProgrammeInput = Infer<typeof CreateProgrammeSchema>;

export const UpdateProgrammeSchema = baseSchema.and(
	myzod.partial(CreateProgrammeSchema, { deep: true })
);

export type UpdateProgrammeInput = Infer<typeof UpdateProgrammeSchema>;

export const ProgrammeRawSchema = baseSchema.and(
	ProgrammeBaseSchema.and(
		myzod.object({
			outline: myzod.record(myzod.record(myzod.array(ID)))
		})
	)
);
export type ProgrammeRawType = Infer<typeof ProgrammeRawSchema>;

export type FilterableProgramme = {
	key: string;
	title: string;
	code: string;
	header: {
		key: string;
		title: string;
		code: string;
	};
	duration: number;
	year?: string;
	sem?: string;
	course_key?: string;
	course_title?: string;
	course_code?: string;
	course_content?: string;
	course_objectives?: string;
	course_description?: string;
	course_header: {
		key: string;
		title: string;
		code: string;
	};
	course_count?: number;
	course_creditHours?: number;
	course_contactHours?: number;
	course_profile?: string;
	course_session?: string;
	course_studentCount?: number;
	course_lecturer_fullName?: string;
	course_lecturer_phoneNumber?: string;
	course_lecturer_email?: string;
};
