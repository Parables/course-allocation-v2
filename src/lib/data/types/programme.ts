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
		outline: myzod.record(myzod.record(myzod.array(ID).or(myzod.string()).map((c)=>{
			if(!Array.isArray(c)){
				return c.split(',')
			}
		})))
	})
);
export type CreateProgrammeInput = Infer<typeof CreateProgrammeSchema>;

export const UpdateProgrammeSchema = baseSchema.and(
	myzod.partial(CreateProgrammeSchema, { deep: true })
);

export type UpdateProgrammeInput = Infer<typeof UpdateProgrammeSchema>;
