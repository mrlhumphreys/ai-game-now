<script>
  import calculatePositionClass from '#lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  $: positionClass = calculatePositionClass(square, pov, 9, 9);
</script>

<div class={'square ' + positionClass} role="button" onclick={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @use '#lib/styles/shogi_position.scss' as shogi-position;

  .square {
    position: absolute;
    width: 10%;
    height: 8.3%;
    z-index: 2;
  }
</style>

