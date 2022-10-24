/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia.js').Auth;
	type UserAttributes = {
		key?: string;
		lecturerKey: string;
		username: string;
		role: string;
	};
}

/// <reference types="vite-plugin-svelte-svgr" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
/// <reference types="@sveltejs/kit" />
declare namespace App {
	interface Locals {
		getSession: import('lucia-sveltekit/types').GetSession;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
