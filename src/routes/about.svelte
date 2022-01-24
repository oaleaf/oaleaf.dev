<script context='module' lang='ts'>
	export const prerender = false;
</script>
<script lang='ts'>
	import TypingContainerSingle from '$lib/TypingContainerSingle.svelte';
	import TypingContainer from '$lib/TypingContainer.svelte';
	import Footer from '$lib/Footer.svelte';
	import NavBar from '$lib/NavBar.svelte';

	const interest = (name: string): string => `Interest: ${name}`;
	const interests = (...names: string[]): string[] => names.map(interest);

	function date_diff(d1: Date, d2: Date): { years: number, months: number } {
		let months = (d2.getFullYear() - d1.getFullYear()) * 12 - d1.getMonth() + d2.getMonth();

		return {
			years: Math.floor(months / 12),
			months: months % 12
		};
	}

	const format_date_diff = ({ years, months }: { years: number, months: number }): string => {
		const pluralize = (n: number): string => n !== 1 ? 's' : '';

		if (years != 0) {
			if (months != 0) {
				return `${years} year${pluralize(years)} and ${months} month${pluralize(months)}`;
			} else {
				return `${years} year${pluralize(years)}`;
			}
		} else {
			return `${months} month${pluralize(months)}`;
		}
	};

	const available_texts: string[] = [
		'You can find my blog <a href="https://blog.oaleaf.dev/">here</a>.',
		'Or you can go back to <a href="/">the homepage</a>.',
		'Fun fact: I still don\'t know what I am doing<sup><u>[1]</u></sup>.<br/><br/><sup><u>[1]</u></sup> according to internet strangers.'
	].concat(interests(
		'programming language implementations',
		'web development'
	)).concat([
		`<b>${format_date_diff(date_diff(new Date(Date.UTC(2016, 3, 14)), new Date()))}</b> of programming, and still counting`,

		'Unless explicitly stated otherwise, all my projects are dual-licensed under' +
		' <a href="https://opensource.org/licenses/Apache-2.0"><b>Apache License, Version 2.0</b></a>' +
		' and <a href="https://opensource.org/licenses/MIT"><b>The MIT License</b></a>.'
	]);

	let show_tab_hint = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class='content'>
	<div class='header'>
		<span class='name'>oaleaf</span>
	</div>

	<TypingContainerSingle text="I wrote some code once. And now I can't stop." />

	<div class='typing-container-height-limit'>
		<TypingContainer available_texts={available_texts} install_tab_hook={true}
										 on_tab_callback={() => {show_tab_hint = false;}} />
	</div>

	<NavBar page_name='about' />

	<Footer tab_footer={show_tab_hint} />
</div>

<style>
</style>
