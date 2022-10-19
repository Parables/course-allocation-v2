// import { isValidEmail } from '$lib/utils';
import myzod from 'myzod';

export const RegisterSchema = myzod.object({
	username: myzod.string(),
	email: myzod.string(),
	password: myzod.string().min(8)
});

export const LoginSchema = myzod.object({
	email: myzod.string(),
	password: myzod.string().min(8)
});