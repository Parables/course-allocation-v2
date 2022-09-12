import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { error, json, redirect } from '@sveltejs/kit';

export const isValidEmail = (email: any) =>
	!!email &&
	typeof email === 'string' &&
	!!String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

export const isValidPassword = (password: any) =>
	!!password && typeof password === 'string' && password.length >= 3;

export const isValidPhoneNumber = (phoneNumber: any) =>
	!!phoneNumber && typeof phoneNumber === 'string';

export const isValidTicket = (ticket: any) =>
	ticket &&
	typeof ticket === 'string' &&
	ticket.match(/^mfaTotp:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

export const validateAcceptHeader = (request: Request) => {
	const accepts = request.headers.get('Accept');
	console.log('accepts:-->', accepts);
	if (!accepts?.includes('application/json')) {
		const data = {
			status: 400,
			message: "Request must specify a 'Accept'  Header with any of 'application/json'",
			errors: { 'request-headers': 'invalid_accept-header' }
		};

		// for external api calls
		if (!browser) {
			throw error(400, JSON.stringify(data));
		}

		// for internal calls
		return json(data);
	}
};

export const validateContentTypeHeader = (request: Request) => {
	const contentType = request.headers.get('Content-Type'); // 'multipart/form-data' -with files | 'application/x-www-form-urlencoded' -formData
	console.log('contentType:-->', contentType);

	if (
		!contentType?.includes('application/json') &&
		!contentType?.includes('multipart/form-data') &&
		!contentType?.includes('application/x-www-form-urlencoded')
	) {
		const data = {
			status: 400,
			message:
				"Request must specify a 'Content-Type'  Header with any of 'application/json', 'application/x-www-form-urlencoded' or 'multipart/form-data'",
			error: { 'request-headers': 'invalid_accept-header' }
		};

		// for external api calls
		if (!browser) {
			throw error(400, JSON.stringify(data));
		}

		// for internal calls
		return json(data);
	}
};

export const requestToJson = async (request: Request): Promise<{ [k: string]: any }> => {
	const contentType = request.headers.get('Content-Type');

	if (contentType?.includes('application/json')) {
		return request.json();
	} else {
		return Object.fromEntries((await request.formData()).entries());
	}
};

export const handleEmailAuthResponse = (
	email: string,
	error: any | null = null,
	session: any | null = null
) => {
	if (session === null && error === null) {
		// check inbox for email verification
		return {
			location: `/verify-email?${new URLSearchParams({ email: email })}`
		};
	} else if (error) {
		return {
			status: 400,
			errors: {
				message: error.message
			}
		};
	}
	return {
		location: '/'
	};
};

/* export const redirectIfAuthenticated = async () => {
	const isAuthenticated = await nhost.auth.isAuthenticatedAsync();

	if (isAuthenticated) {
		throw redirect(307, '/');
	}
}; */

export const redirectTo = async (location: string) => {
	console.log('redirectTo:-->', location);
	if (browser) return await goto(location);
	else throw redirect(307, location);
};

export // Declare a flatten function that takes
// object as parameter and returns the
// flatten object
const flattenObj = (ob: any) => {
	// The object which contains the
	// final result
	let result: Record<string, any> = {};

	// loop through the object "ob"
	for (const i in ob) {
		// We check the type of the i using
		// typeof() function and recursively
		// call the function again
		if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
			const temp = flattenObj(ob[i]);
			for (const j in temp) {
				// Store temp in result
				result[i + '.' + j] = temp[j];
			}
		}

		// Else store ob[i] in result directly
		else {
			result[i] = ob[i];
		}
	}
	return result;
};
