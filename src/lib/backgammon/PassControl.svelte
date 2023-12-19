<script>
  export let touchPass;
  export let passable;
</script>

{#if passable}
  <div class="pass" role="button" on:click={() => touchPass()}><p>Pass</p></div>
{:else}
  <div class="nopass"></div>
{/if}

<style lang="scss">
  @use "sass:math";
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/backgammon_units.scss';

  .pass, .nopass {
    @media only screen and (max-device-width: 480px) {
      height: $backgammon-vertical-unit;
      padding-top: $backgammon-vertical-unit;
      padding-bottom: $backgammon-vertical-unit;
    }

    @media only screen and (min-device-width: 481px) {
      height: $backgammon-pixel-unit;
      padding-top: $backgammon-pixel-unit;
      padding-bottom: $backgammon-pixel-unit;
    }

    width: 66.66%;
    padding-left: 16.66%;
    padding-right: 16.66%;
  }

  .pass {
    p {
      @media only screen and (max-device-width: 480px) {
        font-size: math.div($backgammon-vertical-unit, 2);
      }

      @media only screen and (min-device-width: 481px) {
        font-size: math.div($backgammon-pixel-unit, 2);
      }

      text-align: center;
      padding: 0.25em 0;
      border: solid 1px white;
      background-color: $gray-20;
      color: white;
    }
  }
</style>

