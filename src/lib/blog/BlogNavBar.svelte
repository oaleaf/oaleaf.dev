<script lang='ts'>
	export let nav_pages: { [key: string]: string } = {
		'home': '/',
		'blog': '/blog',
	};
</script>

<div class='navbar'>
	{#each Object.entries(nav_pages) as [key, value]}
		<a class='nav-link' href='{value}'>
			{key}
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
        border-bottom: 1px solid var(--secondary-color);

				min-height: 30px;
    }

    .nav-link {
        color: var(--link-color);
        font-weight: bold;
    }
</style>