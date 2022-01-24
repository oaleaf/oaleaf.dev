<script context="module" lang="ts">
  export const prerender = false;

  import { TextWithEvents } from "$lib/TypingContainer.svelte";
</script>

<script lang="ts">
  import TypingContainer from "$lib/TypingContainer.svelte";
  import TypingContainerSingle from "$lib/TypingContainerSingle.svelte";

  const aka = (account: string, platform: string, link: string | { [key: string]: string } | undefined = undefined): TextWithEvents | string => {
    if (link) {
      if (typeof link === "string") {
        let result: TextWithEvents = [{ text: "aka " }];

        result.push({ tag: "a", tag_attrs: { href: link } });

        result.push({ text: `${account} on ${platform}` });

        result.push({ closeTag: "a" });

        return result;
      } else {
        let result: TextWithEvents = [{ text: `aka ${account} on ${platform} (` }];

        Object.entries(link).forEach(([key, value], index) => {
          if (index > 0) result.push({ text: ", " });

          result.push({ tag: "a", tag_attrs: { href: value } });

          result.push({ text: key });

          result.push({ closeTag: "a" });
        });

        result.push({ text: ")" });

        return result;
      }
    } else {
      return `aka ${account} on ${platform}`;
    }
  };

  const discord_aka = (username: string, tag: string | number, id: string): TextWithEvents | string => {
    return aka(`${username}#${tag}`, "Discord", {
      stable: `https://discord.com/users/${id}`,
      canary: `https://canary.discord.com/users/${id}`
    });
  };

  function date_diff(d1: Date, d2: Date): { years: number, months: number } {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12 - d1.getMonth() + d2.getMonth();

    return {
      years: Math.floor(months / 12),
      months: months % 12
    };
  }

  const format_date_diff = ({ years, months }: { years: number, months: number }): string => {
    const pluralize = (n: number): string => n !== 1 ? "s" : "";

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

  const available_texts: (string | TextWithEvents)[] = [
    discord_aka("OneAutumnLeaf", "7210", "443410223382921216"),
    aka("oaleaf", "GitHub", "https://github.com/oaleaf"),

    '<a href="mailto:no-reply@oaleaf.dev">Drop me an email</a>',

    'Fun fact: I still don\'t know what I am doing<sup><u>[1]</u></sup>.<br/><br/><sup><u>[1]</u></sup> according to internet strangers.',

    'The code for this site is available on <a href="https://github.com/oaleaf/oaleaf.dev">GitHub</a>.',

    '<a href="/about">Less about me</a>.',

    `<b>${format_date_diff(date_diff(new Date(Date.UTC(2016, 3, 14)), new Date()))}</b> of programming`,

    'Unless explicitly stated otherwise, all my projects are dual-licensed under' +
    ' <a href="https://opensource.org/licenses/Apache-2.0"><b>Apache License, Version 2.0</b></a>' +
    ' and <a href="https://opensource.org/licenses/MIT"><b>The MIT License</b></a>.',
  ];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="content">
  <p class="name">oaleaf</p>
  <TypingContainerSingle text="I wrote some code once. And now I can't stop." />

  <div class="typing-container-height-limit">
    <TypingContainer available_texts={available_texts} install_tab_hook={true} />
  </div>
</div>

<style>
    .typing-container-height-limit {
        min-height: 100px;
        max-height: 100px;
        height: 100px;
    }

    .name {
        font-size: min(10vw, 96px);
        font-weight: bold;
        text-decoration: underline;
        text-decoration-thickness: 3px;
        margin-bottom: -8px;
    }
</style>
