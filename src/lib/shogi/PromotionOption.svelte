<script>
  export let touchPromotionOption;
  export let value;
</script>

<li onclick={() => touchPromotionOption(value)}>
  {#if value}
    Yes
  {:else}
    No
  {/if}
</li>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;

  li {
    width: 80px;
    text-align: center;
    font-size: 2em;
    padding: 0.5em 10px;
    color: colors.$gray-20;
    background-color: colors.$spot-colour;
    &:hover {
      color: colors.$spot-colour;
      background-color: colors.$gray-20;
    }
  }
</style>
