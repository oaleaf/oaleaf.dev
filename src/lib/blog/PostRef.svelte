<script lang='ts'>
	import PostHead from '$lib/blog/PostHead.svelte';

	export let ref: string;
	export let title: string;
	export let author: string;
	export let date: string;
	export let editedOn: string | undefined = undefined;
	export let tags: string[] | undefined = undefined;
	export let category: string | undefined = undefined;
	export let preview: string | undefined = undefined;
	export let shortContent = '';
</script>

<div class='article-ref'>
	<PostHead ref={ref} title={title} author={author} date={date} editedOn={editedOn} tags={tags} category={category} preview={preview}/>

	{#if shortContent !== ''}
		<p>
			{@html shortContent}
		</p>
	{/if}
</div>

<style>
    .article-ref {
        width: 50%;
    }

    @media (max-width: 900px) {
				.article-ref {
						width: 100%;
				}
    }
</style>