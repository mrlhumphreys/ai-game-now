<script>
  export let touchReset;
</script>

<div class="match_bar_button reset_control" role="button" on:click={() => touchReset()}>
  <p>Reset</p>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';

  .match_bar_button {
    padding: 1em 10px;
    border-right: solid 1px $gray-20;
    cursor: pointer;
    background-color: $gray-40;
    color: $gray-90;
    width: 140px;
    text-align: center;

    &:hover {
      background-color: $spot-colour;
    }

    p {
      text-transform: uppercase;
      letter-spacing: 5px;
    }
  }
</style>

