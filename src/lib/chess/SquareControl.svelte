<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  $: positionClass = calculatePositionClass(square, pov);
</script>

<div class={'square ' + positionClass} role="button" on:click={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/chess_position.scss';

  .square {
    position: absolute;
    width: 12.5%;
    height: 12.5%;
    z-index: 2;
  }
</style>

