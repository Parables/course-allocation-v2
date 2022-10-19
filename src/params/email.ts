import { isValidEmail } from '$lib/utils';

export function match(param: string): boolean {
	return isValidEmail(param);
}
