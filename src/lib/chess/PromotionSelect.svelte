<script>
  import PromotionOption from '$lib/chess/PromotionOption.svelte';

  export let display;
  export let touchPromotionPiece;

  $: displayClass = display ? 'promotion_select show' : 'promotion_select hide';;
</script>

<div class={displayClass}>
  <div class="prompt">
    <span class="title">Promote pawn to:</span>
    <ul class="piece_types">
      <PromotionOption touchPromotionPiece={touchPromotionPiece} pieceType="queen"/>
      <PromotionOption touchPromotionPiece={touchPromotionPiece} pieceType="knight"/>
      <PromotionOption touchPromotionPiece={touchPromotionPiece} pieceType="rook"/>
      <PromotionOption touchPromotionPiece={touchPromotionPiece} pieceType="bishop"/>
    </ul>
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';

  .promotion_select {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .prompt {
      width: 66%;
      height: 33%;
      background-color: $gray-80;
      display: flex;
      flex-direction: column;

      .title {
        display: block;
        text-align: center;
        font-size: 2em;
        color: $gray-20;
        padding: 0.5em;
      }

      .piece_types {
        width: 100%;
        height: 66%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }

    &.hide {
      z-index: 0;
      display: none;
    }

    &.show {
      z-index: 3;
    }
  }
</style>
