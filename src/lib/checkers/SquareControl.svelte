<script>
  import calculatePositionClass from '#lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  $: positionClass = calculatePositionClass(square, pov);
  $: marked = square.marked;
</script>

<div class={'square ' + positionClass + ' marked_' + marked} role="button" onclick={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;
  @use '#lib/styles/checkers_position.scss' as checkers-position;

  .square {
    position: absolute;
    width: 12.5%;
    height: 12.5%;
    z-index: 2;

    &.marked_true {
      background-color: colors.$spot-colour;
    }
  }
</style>

