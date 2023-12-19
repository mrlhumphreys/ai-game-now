<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  let positionClass = calculatePositionClass(square, pov);

  $: marked = square.marked;
</script>

<div class={'square ' + positionClass + ' marked_' + marked} role="button" on:click={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/checkers_position.scss';

  .square {
    position: absolute;
    width: 12.5%;
    height: 12.5%;
    z-index: 2;

    &.marked_true {
      background-color: $spot-colour;
    }
  }
</style>

