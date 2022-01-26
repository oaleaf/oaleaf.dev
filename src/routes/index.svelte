<script context='module' lang='ts'>
	export const prerender = false;

	import { TextWithEvents } from '$lib/TypingContainer.svelte';
</script>

<script lang='ts'>
	import TypingContainer from '$lib/TypingContainer.svelte';
	import TypingContainerSingle from '$lib/TypingContainerSingle.svelte';
	import Footer from '$lib/Footer.svelte';
	import NavBar from '$lib/NavBar.svelte';

	const aka = (account: string, platform: string, link: string | { [key: string]: string } | undefined = undefined): TextWithEvents | string => {
		if (link) {
			if (typeof link === 'string') {
				let result: TextWithEvents = [{ text: 'aka ' }];

				result.push({ tag: 'a', tag_attrs: { href: link } });

				result.push({ text: `${account} on ${platform}` });

				result.push({ closeTag: 'a' });

				return result;
			} else {
				let result: TextWithEvents = [{ text: `aka ${account} on ${platform} (` }];

				Object.entries(link).forEach(([key, value], index) => {
					if (index > 0) result.push({ text: ', ' });

					result.push({ tag: 'a', tag_attrs: { href: value } });

					result.push({ text: key });

					result.push({ closeTag: 'a' });
				});

				result.push({ text: ')' });

				return result;
			}
		} else {
			return `aka ${account} on ${platform}`;
		}
	};

	const discord_aka = (username: string, tag: string | number, id: string): TextWithEvents | string => {
		return aka(`${username}#${tag}`, 'Discord', {
			stable: `https://discord.com/users/${id}`,
			canary: `https://canary.discord.com/users/${id}`
		});
	};

	let show_tab_hint = true;

	const available_texts: (string | TextWithEvents)[] = [
		discord_aka('OneAutumnLeaf', '7210', '443410223382921216'),
		aka('oaleaf', 'GitHub', 'https://github.com/oaleaf'),

		'<a href="mailto:no-reply@oaleaf.dev">Drop me an email</a>',

		'The code for this site is available on <a href="https://github.com/oaleaf/oaleaf.dev">GitHub</a>.',

		'<a href="/about">Less about me</a>.'
	];
</script>

<svelte:head>
	<title>Home</title>
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

	<NavBar page_name='home' />

	<Footer tab_footer={show_tab_hint} />
</div>

<style>
</style>
