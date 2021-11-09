/** @type {import('@sveltejs/kit').Config} */

import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		}),
		vite: {
			esbuild: {
				plugins: [
					{
						name: 'export-janus-gateway-js',
						setup(build) {
							build.onLoad({ filter: /janus-gateway/ }, async (args) => {
								let contents = await require('fs').promises.readFile(args.path, 'utf8');
								contents += 'export {Janus}';
								return { contents };
							});
						}
					}
				]
			}
		}
	}
};

export default config;
