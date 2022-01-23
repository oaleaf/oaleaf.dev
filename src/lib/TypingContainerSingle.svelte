<script context="module" lang="ts">
  import { TextWithEvents } from "./TypingContainer.svelte";
</script>

<script lang="ts">
  import TypingContainer from "$lib/TypingContainer.svelte";

  export let text: string | TextWithEvents;
</script>

<TypingContainer available_texts={[text]} single_mode={true} />