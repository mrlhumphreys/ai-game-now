<script>
  export let touchReset;
</script>

<div class="match_bar_button reset_control" role="button" on:click={() => touchReset()}>
  <p>Reset</p>
</div>

<style lang="scss">
  @import '$lib/styles/match_bar_button.scss';
</style>

