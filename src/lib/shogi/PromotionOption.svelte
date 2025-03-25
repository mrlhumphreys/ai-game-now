<script>
  export let touchPromotionOption;
  export let value;
</script>

<li on:click={() => touchPromotionOption(value)}>
  {#if value}
    Yes
  {:else}
    No
  {/if}
</li>

<style lang="scss">
  @import '$lib/styles/colors.scss';

  li {
    width: 80px;
    text-align: center;
    font-size: 2em;
    padding: 0.5em 10px;
    color: $gray-20;
    background-color: $spot-colour;
    &:hover {
      color: $spot-colour;
      background-color: $gray-20;
    }
  }
</style>
