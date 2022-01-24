<script lang="ts">
  import TabFooter from "$lib/TabFooter.svelte";

  export let tab_footer = false;
</script>

<div class="footer">
  {#if tab_footer}
    <TabFooter />
  {/if}
</div>

<style>
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>