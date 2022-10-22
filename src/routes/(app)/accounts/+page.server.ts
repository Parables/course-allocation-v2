import sgMail from '@sendgrid/mail';
import { RegisterSchema } from '$lib/data/types/auth';
import { auth } from '$lib/server/lucia';
import { formDataToJson } from '$lib/utils';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { ValidationError } from 'myzod';
import {
	SENDGRID_API_KEY,
	MAILCHIMP_API_KEY,
	MAILJET_API_KEY,
	MAILJET_API_SECRET
} from '$env/static/private';
import mailchimpTx, { type MessagesMessage } from '@mailchimp/mailchimp_transactional';
import mailjet from 'node-mailjet';
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// extract data from request
		const data = formDataToJson(await request.formData());

		try {
			const client = mailjet.apiConnect(MAILJET_API_KEY, MAILJET_API_SECRET);
			const request = client.post('send', { version: 'v3.1' }).request({
				Messages: [
					{
						From: {
							Email: 'btseg20001@ttu.edu.gh',
							Name: 'TTU Course Allocation'
						},
						To: [
							{
								Email: 'parables95@gmail.com',
								Name: 'Parables'
							}
						],
						Subject: 'Greetings from Mailjet.',
						TextPart: 'My first Mailjet email',
						HTMLPart:
							"<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
						CustomID: 'AppGettingStartedTest'
					}
				]
			});
			request
				.then((result) => {
					console.log('🚀 ~ file: +page.server.ts ~ line 43 ~ .then ~ result.body', result.body);
					// console.log(result.body);
				})
				.catch((err) => {
					console.log('🚀 ~ file: +page.server.ts ~ line 47 ~ default: ~ err', err);
					// console.log(err.statusCode);
				});
		} catch (e) {
			console.log('🚀 ~ file: accounts+page.server.ts ~ line 37 ~ default: ~ e', e);
		}
		throw redirect(302, '/accounts');
	}
};
