import { RegisterSchema } from '$lib/data/types/auth';
import { auth } from '$lib/server/lucia';
import { formDataToJson } from '$lib/utils';
import { invalid, json, redirect, type Actions } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import { ARKESEL_SMS_API } from '$env/static/private';
import type { LecturerType } from '$lib/data/types/lecturer';
import axios from 'axios';

export const actions: Actions = {
	createAccount: async ({ request, fetch }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		const validated = RegisterSchema.try(data);

		if (validated instanceof ValidationError) {
			return invalid(400, { ...data, error: { message: validated.message } });
		}

		const { username, email, password, role, lecturerKey } = validated;

		try {
			// STEP 1: Create the user account
			const user = await auth.createUser('email', email, {
				password,
				attributes: {
					lecturerKey,
					username,
					role // default role is guest
				}
			});

			// STEP 2: if the `lecturerKey` is passed, update the lecturer profile and set the userId
			if (lecturerKey) {
				const response = await fetch(`/api/lecturers/${lecturerKey}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({ userId: user.userId })
				});

				const result = await response.json();

				//  STEP 3: if lecturer profile was updated successfully, get the updated profile
				if (result === null) {
					const response = await fetch(`/api/lecturers/${lecturerKey}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json'
						}
					});

					const lecturer: LecturerType = await response.json();

					// STEP 4: compose the SMS message to be sent
					const sms = {
						sender: 'CourseApp',
						message: `Dear Lecturer: ${lecturer.fullName}, you have been granted access to the Course Allocation app available on https://course-allocation.vercel.app.\n\n Your default password is\n\n${password}`,
						recipients: [`233${lecturer.phoneNumber.slice(1)}`]
					};

					const config = {
						method: 'post',
						url: 'https://sms.arkesel.com/api/v2/sms/send',
						headers: {
							'api-key': ARKESEL_SMS_API
						},
						data: sms
					};

					axios(config)
						.then(function (response) {
							console.log(
								'🚀 ~ file: +page.server.ts ~ line 77 ~ JSON.stringify(response.data)',
								JSON.stringify(response.data)
							);
						})
						.catch(function (error) {
							console.log('🚀 ~ file: +page.server.ts ~ line 83 ~ createAccount: ~ error', error);
						});
				}
			}
		} catch (e) {
			console.log('🚀 ~ file: +page.server.ts ~ line 92 ~ default: ~ e', e);
			const error = e as Error;
			if (
				error.message === 'AUTH_DUPLICATE_PROVIDER_ID' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return invalid(400, {
					error: {
						message: 'User already exists'
					}
				});
			}
			return invalid(500, {
				error: {
					message: 'Unknown error occurred... please contact administrators'
				}
			});
		}

		throw redirect(302, '/accounts');
	},
	deleteAccount: async ({ request, fetch }) => {
		// extract data from request
		const { lecturerKey, userId } = formDataToJson(await request.formData());

		await auth.deleteUser(userId);

		const response = await fetch(`/api/lecturers/${lecturerKey}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ userID: 'null' })
		});

		await response.json();

		throw redirect(302, '/accounts');
	}
};
