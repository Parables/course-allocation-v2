import { sveltekit } from '@sveltejs/kit/vite';
import svgr from 'vite-plugin-svelte-svgr';
import type { UserConfig } from 'vite';


const svgoOptions = {
	multipass: true,
	plugins: [
		// Ensuring viewbox isn't removed.
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		},
		{
			// setting fill attribute to "currentColor"
			name: 'addAttributesToSVGElement',
			params: {
				attributes: [{ fill: 'currentColor' }]
			}
		}
	]
};

const config: UserConfig = {
	plugins: [sveltekit()
,svgr({
	svgo: svgoOptions
})]
};

export default config;
