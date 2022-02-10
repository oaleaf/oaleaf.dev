<script lang='ts'>
	import { BlogPost, BlogPosts } from '$lib/blog/BlogPosts.ts';
	import PostRef from '$lib/blog/PostRef.svelte';

	export let filter: (post: BlogPost) => boolean;
</script>

{#each BlogPosts as post}
	{#if filter(post)}
		<PostRef {...post} />
	{/if}
{/each}
