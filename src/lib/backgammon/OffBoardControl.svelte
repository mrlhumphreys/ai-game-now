<script>
  export let position;
  export let touchPoint;
</script>

<div class={'off_board_' + position } role="button" onclick={() => touchPoint('offBoard')}>
</div>

<style lang="scss">
  @use '#lib/styles/backgammon_units.scss' as backgammon-units;

  .off_board_top, .off_board_bottom {
    @media only screen and (max-device-width: 480px) {
      height: 6*backgammon-units.$backgammon-vertical-unit;
      padding-top: 0.5*backgammon-units.$backgammon-vertical-unit;
    }

    @media only screen and (min-device-width: 481px) {
      height: 6*backgammon-units.$backgammon-pixel-unit;
      padding-top: 0.5*backgammon-units.$backgammon-pixel-unit;
    }
  }
</style>

