/// <reference types="vite-plugin-svelte-svgr" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		_lucia: import('lucia-sveltekit/types').Session;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
	interface UserData {
		username: string;
		role?: string;
	}
}
