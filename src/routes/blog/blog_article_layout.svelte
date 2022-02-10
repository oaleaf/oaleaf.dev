<script>
	import './blog.scss';

	import 'prism-themes/themes/prism-night-owl.min.css';
	import PostHead from '$lib/blog/PostHead.svelte';
	import BlogNavBar from '$lib/blog/BlogNavBar.svelte';

	export let ref;
	export let title;
	export let author;
	export let date;
	export let editedOn = undefined;
	export let tags = undefined;
	export let category = undefined;
	export let similar = undefined;
	export let preview = undefined;
</script>

<div class='blog-content'>
	<BlogNavBar page_name='article:{title}' />

	<PostHead ref={ref} title={title} author={author} date={date} editedOn={editedOn} tags={tags}
						category={category} />
	<slot />
</div>