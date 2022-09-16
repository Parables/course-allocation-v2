import myzod from 'myzod';
import type { Type, Infer } from 'myzod';
import { baseSchema, ID } from './base';
import { CourseSchema, type CourseType } from './course';

export const ProgrammeBaseSchema = myzod.object({
	name: myzod.string(),
	programmeCode: myzod.string().optional()
});

interface IProgramme extends Infer<typeof ProgrammeBaseSchema> {
	years: {
		[x: string]: ISemesters;
	};
}

interface ISemesters {
	semesters: {
		[x: string]: {
			courses: CourseType[];
		};
	};
}

const SemestersSchema: Type<ISemesters> = myzod.object({
	semesters: myzod.record(
		myzod.object({
			courses: myzod.array(myzod.lazy(() => CourseSchema))
		})
	)
});

export const ProgrammeSchema: Type<IProgramme> = baseSchema.and(ProgrammeBaseSchema).and(
	myzod.object({
		years: myzod.record(myzod.lazy(() => SemestersSchema))
	})
);

export type ProgrammeType = Infer<typeof ProgrammeSchema>;

export const CreateProgrammeSchema = ProgrammeBaseSchema.and(
	myzod.object({
		years: myzod.record(myzod.object({
            semesters: myzod.record(myzod.object({
                courses: myzod.array(ID)
            }))
        }))
	})
);
export type CreateProgrammeInput = Infer<typeof CreateProgrammeSchema>;

export const UpdateProgrammeSchema = baseSchema.and(
	myzod.partial(CreateProgrammeSchema, { deep: true })
);

export type UpdateProgrammeInput = Infer<typeof UpdateProgrammeSchema>;
