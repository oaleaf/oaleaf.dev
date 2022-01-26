<script context='module' lang='ts'>
	export const prerender = false;
</script>

<script lang='ts'>
	import TypingContainer from '$lib/TypingContainer.svelte';
	import TypingContainerSingle from '$lib/TypingContainerSingle.svelte';
	import NavBar from '$lib/NavBar.svelte';
	import Footer from '$lib/Footer.svelte';

	let show_remaining = false;

	const typing_text = Array(10).fill('...').concat(['[actual issue]']);
</script>

<svelte:head>
	<title>No hello</title>
</svelte:head>

<div class='content'>
	<div class='header'>
		<span class='name'>oaleaf</span>
	</div>
	<TypingContainerSingle text='Hello' />

	<div class='typing-container-height-limit'>
		<TypingContainer available_texts={typing_text} repeat={false} on_reached_end={() => {
			show_remaining = true;
		}} />
	</div>

	{#if show_remaining}
		<div class='remaining-text'>
			<TypingContainerSingle text='Nobody wants to wait while you are typing. Really. See also <a href="https://dontasktoask.com">dontasktoask.com</a>, <a href="https://nohello.net">nohello.net</a> etc.' />
		</div>
	{/if}

	<NavBar page_name='no_hello' />

	<Footer tab_footer={false} />
</div>

<style>
</style>
