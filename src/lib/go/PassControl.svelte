<script>
  export let canPass;
  export let touchPass;
</script>

{#if canPass}
  <div class="match_bar_button go_pass" role="button" on:click={() => touchPass()}>
    <p>Pass</p>
  </div>
{/if}

<style lang="scss">
  @import '$lib/styles/match_bar_button.scss';
</style>
