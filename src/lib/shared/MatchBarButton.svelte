<script>
  let { label, onclick } = $props(); 
</script>

<div class="match_bar_button" role="button" onclick={() => onclick()}>
  {#if label}
    <p>{label}</p> 
  {:else}
    <p>Submit</p> 
  {/if}
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;
  
  .match_bar_button {
    padding: 1em 10px;
    border-right: solid 1px colors.$gray-20;
    cursor: pointer;
    background-color: colors.$gray-40;
    color: colors.$gray-90;
    width: 140px;
    text-align: center;
  
    &:hover {
      background-color: colors.$spot-colour;
    }

    p {
      text-transform: uppercase;
      letter-spacing: 5px;
    }
  }
</style>
