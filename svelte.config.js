import adapter from '@sveltejs/adapter-cloudflare';
import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import remarkMath from 'remark-math';
import { default as remarkHeadingId } from 'remark-heading-id';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			layout: {
				blog_root: './src/routes/blog/blog_root_layout.svelte',
				blog_article: './src/routes/blog/blog_article_layout.svelte'
			},
			remarkPlugins: [remarkHeadingId, remarkMath],
			rehypePlugins: [rehypeAutolinkHeadings, rehypeSlug, rehypeKatex]
		})
	],
	extensions: ['.svelte', '.svx'],
	kit: {
		// adapter: adapter(),
		adapter: static_adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		prerender: {
			enabled: true
		}
	}
};

export default config;
