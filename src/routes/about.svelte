<script context="module" lang="ts">
  export const prerender = false;
</script>
<script lang="ts">
  import TypingContainerSingle from "$lib/TypingContainerSingle.svelte";
  import TypingContainer from "$lib/TypingContainer.svelte";

  const available_texts: string[] = [
    'You can find my blog <a href="https://blog.oaleaf.dev/">here</a>.',
    'Or you can go back to <a href="/">the homepage</a>.',
  ];
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="content">
  <p class="name">oaleaf</p>

  <TypingContainerSingle text="I wrote some code once. And now I can't stop." />

  <TypingContainer available_texts={available_texts} install_tab_hook={true} />
</div>

<style>
    .name {
        font-size: min(10vw, 96px);
        font-weight: bold;
        text-decoration: underline;
        text-decoration-thickness: 3px;
        margin-bottom: -8px;
    }
</style>
