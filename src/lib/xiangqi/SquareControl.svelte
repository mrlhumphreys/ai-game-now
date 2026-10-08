<script>
  import calculatePositionClass from '#lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  $: positionClass = calculatePositionClass(square, pov, 9, 10);
</script>

<div class={'square ' + positionClass} role="button" onclick={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @use '#lib/styles/xiangqi_position.scss' as xiangqi-position;

  .square {
    position: absolute;
    width: 10%;
    height: 9.1%;
    z-index: 2;
  }
</style>

