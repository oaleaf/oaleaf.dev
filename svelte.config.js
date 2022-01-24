import adapter from '@sveltejs/adapter-cloudflare';
// import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// adapter: static_adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		prerender: {
			enabled: false
		}
	}
};

export default config;
