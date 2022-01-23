<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
  import TypingContainerSingle from "$lib/TypingContainerSingle.svelte";
  import TypingContainer, { TextWithEvents } from "$lib/TypingContainer.svelte";

  const available_texts: (string | TextWithEvents)[] = [
    [
      { text: "You can find my blog " },
      { tag: "a", tag_attrs: { href: "https://blog.oaleaf.dev/" } },
      { text: "here" },
      { closeTag: "a" },
      { text: "." }
    ],
    [
      { text: "Or you can go back to " },
      { tag: "a", tag_attrs: { href: "/" } },
      { text: "the homepage" },
      { closeTag: "a" },
      { text: "." }
    ]
  ];
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="content">
  <p class="name">oaleaf</p>

  <TypingContainerSingle text="I wrote some code once. And now I can't stop." />

  <TypingContainer available_texts={available_texts} />
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
