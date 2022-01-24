<script lang='ts'>
	import TypingContainerSingle from '$lib/TypingContainerSingle.svelte';

	export let page_name: string | undefined = undefined;
	export let nav_pages: { [key: string]: string } = {
		'home': '/',
		'about': '/about',
	};
</script>

<div class='navbar'>
	{#each Object.entries(nav_pages) as [key, value]}
		<a class='nav-link' href='{value}' class:nav-link-current={key === page_name}>
			<TypingContainerSingle text={key} />
		</a>
	{/each}
</div>

<style>
    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        /*padding: 0.5rem;*/
        width: 100%;

        margin: 0;
        border: 0;
    }

    .nav-link {
        color: var(--link-color);
    }

    .nav-link-current {
        font-weight: bold;
    }
</style>