<script>
  export let position;
  export let touchPoint;
</script>

<div class={'bar_' + position} role="button" on:click={() => touchPoint('bar')}> 
</div>

<style lang="scss">
  @import '$lib/styles/backgammon_units.scss';

  .bar_top, .bar_bottom {
    @media only screen and (max-device-width: 480px) {
      height: 6*$backgammon-vertical-unit; 
      padding-top: 0.5$backgammon-vertical-unit; 
    }

    @media only screen and (min-device-width: 481px) {
      height: 6*$backgammon-pixel-unit; 
      padding-top: 0.5*$backgammon-pixel-unit; 
    }
  }
</style>

