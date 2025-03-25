<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  $: positionClass = calculatePositionClass(square, pov, 9);
</script>

<div class={'square ' + positionClass} role="button" on:click={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/shogi_position.scss';

  .square {
    position: absolute;
    width: 10%;
    height: 8.3%;
    z-index: 2;
  }
</style>

