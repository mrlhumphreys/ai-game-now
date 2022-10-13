<script>
  import calculatePositionClass from '../utils/calculatePositionClass';
  export let square;
  export let pov;
  export let touchSquare;

  let positionClass = calculatePositionClass(square, pov);

  $: marked = square.marked;
</script>

<div class={'square ' + positionClass + ' marked_' + marked} on:click={() => touchSquare(square.id)}>
</div>

<style lang="scss">
  @import '../styles/colors.scss';
  @import '../styles/checkers_position.scss';

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
