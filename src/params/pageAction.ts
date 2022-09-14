export function match(param: string): boolean {
	return (
		param === 'verify-email' ||
		param === 'verify-otp' ||
		param === 'success' ||
		param === 'forgot-password'
	);
}
