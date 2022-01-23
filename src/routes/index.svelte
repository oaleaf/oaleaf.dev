<script context="module" lang="ts">
  export const prerender = true;

  import { TextWithEvents } from "$lib/TypingContainer.svelte";
</script>

<script lang="ts">
  import TypingContainer from "$lib/TypingContainer.svelte";
  import TypingContainerSingle from "$lib/TypingContainerSingle.svelte";

  const aka = (account: string, platform: string, link: string | undefined = undefined): TextWithEvents => {
    let result: TextWithEvents = [{ text: "aka " }];

    if (link) result.push({ tag: "a", tag_attrs: { href: link } });

    result.push({ text: `${account} on ${platform}` });

    if (link) result.push({ closeTag: "a" });

    return result;
  };

  const available_texts: (string | TextWithEvents)[] = [
    aka("OneAutumnLeaf#7210", "Discord"),
    aka("oaleaf", "GitHub", "https://github.com/oaleaf"),

    [
      { tag: "a", tag_attrs: { href: "mailto:no-reply@oaleaf.dev" } },
      { text: "Drop me an email" },
      { closeTag: "a" }
    ],

    [
      { text: "Fun fact: I still don't know anything." },
      { tag: "u" },
      { tag: "sup" },
      { text: "*" },
      { closeTag: "sup" },
      { closeTag: "u" }
    ],

    [
      { text: "Code for this available on " },
      { tag: "a", tag_attrs: { href: "https://github.com/oaleaf/oaleaf.dev" } },
      { text: "github" },
      { closeTag: "a" }
    ],

    [
      { tag: "a", tag_attrs: { href: "/about" } },
      { text: "Less about me" },
      { closeTag: "a" }
    ]
  ];
</script>

<svelte:head>
  <title>Home</title>
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
