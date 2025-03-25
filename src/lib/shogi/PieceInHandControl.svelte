<script>
  import calculatePieceInHandPositionClass from '$lib/shogi/logic/calculatePieceInHandPositionClass';
  export let piece;
  export let pov;
  export let touchPieceInHand;

  $: positionClass = calculatePieceInHandPositionClass(piece, pov);
</script>

<div class={'piece_in_hand ' + positionClass} role="button" on:click={() => touchPieceInHand(piece.id)}>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/shogi_position.scss';

  .piece_in_hand {
    position: absolute;
    width: 10%;
    height: 8.3%;
    z-index: 2;
  }
</style>

