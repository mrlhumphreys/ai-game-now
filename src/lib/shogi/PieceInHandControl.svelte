<script>
  import calculatePieceInHandPositionClass from '#lib/shogi/logic/calculatePieceInHandPositionClass';
  export let piece;
  export let pov;
  export let touchPieceInHand;

  $: positionClass = calculatePieceInHandPositionClass(piece, pov);
</script>

<div class={'piece_in_hand ' + positionClass} role="button" onclick={() => touchPieceInHand(piece.id)}>
</div>

<style lang="scss">
  @use '#lib/styles/shogi_position.scss' as shogi-position;

  .piece_in_hand {
    position: absolute;
    width: 10%;
    height: 8.3%;
    z-index: 2;
  }
</style>

