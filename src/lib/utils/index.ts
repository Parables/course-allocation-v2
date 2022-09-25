import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { error, json, redirect } from '@sveltejs/kit';
import type { ValidationError } from 'myzod';

export const isValidTicket = (ticket: any) =>
	ticket &&
	typeof ticket === 'string' &&
	ticket.match(/^mfaTotp:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

export const suffixWith = (value?: number, singular = '', plural = '') => {
	if (value) {
		return `${value} ${value > 1 ? plural : singular}`;
	}
	return `${value} ${singular}`;
};

export const validateAcceptHeader = (request: Request) => {
	const accepts = request.headers.get('Accept');

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

export const formDataToJson = (formData: FormData) => {
	const object: Record<string, any> = {};
	formData.forEach((value, key) => {
		if (!Reflect.has(object, key)) {
			object[key] = value;
			return;
		}
		if (!Array.isArray(object[key])) {
			object[key] = [object[key]];
		}
		object[key].push(value);
	});
	return JSON.parse(JSON.stringify(object));
};

export const redirectTo = async (location: string) => {
	console.log('redirectTo:-->', location);
	if (browser) return goto(location);
	else throw redirect(307, location);
};
