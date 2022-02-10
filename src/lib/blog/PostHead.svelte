<script lang='ts'>
	import { fmt_date } from '$lib/dateutils.ts';

	export let ref: string;
	export let title: string;
	export let author: string;
	export let date: string;
	export let editedOn: string | undefined = undefined;
	export let tags: string[] | undefined = undefined;
	export let category: string | undefined = undefined;
	export let preview: string | undefined = undefined;
</script>

<div class='article-head'>
	{#if preview}
		<div class='preview' style={`background-image: url("${preview}");`}></div>
	{/if}
	<h1><a href='/blog/posts/{ref}'>{title}</a></h1>

	<p class='author'>By <a href='/blog/authors/{author}'>{author}</a></p>

	<div class='date-data'>
		<span class='written-on'>
			Written on {fmt_date(date)}
		</span>
		{#if editedOn}
		<span class='edited-on'>
			(edited on {fmt_date(editedOn)})
		</span>
		{/if}
	</div>

	{#if tags || category}
		<div class='taxonomies'>
			{#if tags}
				{#each tags as tag}
					<span class='tag'>
						<a href='/blog/tags/{tag}'>{tag}</a>
					</span>
				{/each}
			{/if}

			{#if category}
				<span class='category'>
					<a href='/blog/categories/{category}'>{category}</a>
				</span>
			{/if}
		</div>
	{/if}
</div>

<style>
    .article-head {
        margin: 10px;
        width: calc(100% - 40px - 20px);

        padding: 20px;

        border: var(--secondary-color) solid 1px;
    }

    .author {
        text-align: right;
    }

    .taxonomies {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .tag, .category {
        margin: 0 30px;
    }

    .tag:before {
        content: 'tag://'
    }

    .category:before {
        content: 'category://'
    }

		.preview {
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: cover;

				height: 150px;
		}
</style>