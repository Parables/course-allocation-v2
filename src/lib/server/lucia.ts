import lucia from 'lucia-sveltekit';
// import supabase from '@lucia-sveltekit/adapter-supabase';
import { dev } from '$app/environment';
// import { SUPABASE_URL, SUPABASE_SECRET } from '$env/static/private';
import adapter from './lucia_deta_adapter';

import { DETA_PROJECT_KEY } from '$env/static/private';

export const auth = lucia({
	adapter: adapter(DETA_PROJECT_KEY, 'users', 'sessions'),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.key,
			username: userData.username,
			role: userData.role
		};
	}
});

export type Auth = typeof auth;
