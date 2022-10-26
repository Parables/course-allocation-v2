// import { isValidEmail } from '$lib/utils';
import { generateRandomString } from 'lucia-sveltekit';
import myzod from 'myzod';

export const RegisterSchema = myzod.object({
	username: myzod.string().default(''),
	email: myzod.string(),
	lecturerKey: myzod.string().default('null'),
	password: myzod.string().min(8).default(generateRandomString(8)),
	role: myzod.literals('admin', 'lecturer', 'guest').default('guest')
});

export const LoginSchema = myzod.object({
	email: myzod.string(),
	password: myzod.string().min(8)
});
