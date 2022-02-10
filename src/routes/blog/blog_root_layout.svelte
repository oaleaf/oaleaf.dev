<script lang="ts">
	import './blog.scss';

	import 'prism-themes/themes/prism-night-owl.min.css';
	import BlogNavBar from '$lib/blog/BlogNavBar.svelte';
</script>

<div class='blog-content'>
	<BlogNavBar/>
	<slot />
</div>