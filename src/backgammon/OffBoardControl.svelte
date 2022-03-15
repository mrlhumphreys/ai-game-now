<script>
  export let position;
  export let touchPoint;
</script>

<div class={'off_board_' + position } on:click={() => touchPoint('off_board')}>
</div>

<style type="text/scss">
  @import '../styles/backgammon_units.scss';

  .off_board_top, .off_board_bottom {
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
