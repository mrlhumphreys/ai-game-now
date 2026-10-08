<script>
  let { children } = $props(); 
</script>

<div class="match_bar">
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;
  .match_bar {
    border-top: solid 1px colors.$gray-20;
    width: 100%;
    margin: 0em auto;
    background-color: colors.$gray-60;
    display: flex;
    flex-direction: row;
  }
</style>
