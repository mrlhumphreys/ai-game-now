<script>
  export let number;
  export let touchPoint;

  $: boardPosition = calculateBoardPosition(number);

  function calculateBoardPosition(number) {
    if (number > 12) {
      return 'top';
    } else {
      return 'bottom';
    }
  }
</script>

<div class={'point ' + boardPosition } role="button" on:click={() => touchPoint(number)}>
</div>

<style lang="scss">
  @import '$lib/styles/backgammon_units.scss';

  .point {
    @media only screen and (max-device-width: 480px) {
      height: 5*$backgammon-vertical-unit;
    }

    @media only screen and (min-device-width: 481px) {
      height: 5*$backgammon-pixel-unit;
    }

    width: 16.66%;
    display: flex;
    flex-direction: column;

    &.bottom {
      justify-content: flex-end;
    }
  }
</style>

