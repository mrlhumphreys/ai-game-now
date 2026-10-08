<script>
  import PromotionOption from '#lib/shogi/PromotionOption.svelte';

  export let display;
  export let touchPromotionOption;

  $: displayClass = display ? 'promotion_select show' : 'promotion_select hide';;
</script>

<div class={displayClass}>
  <div class="prompt">
    <span class="title">Promote Piece?</span>
    <ul class="promotion_values">
      <PromotionOption touchPromotionOption={touchPromotionOption} value={true} />
      <PromotionOption touchPromotionOption={touchPromotionOption} value={false} />
    </ul>
  </div>
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;

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
      background-color: colors.$gray-80;
      display: flex;
      flex-direction: column;

      .title {
        display: block;
        text-align: center;
        font-size: 2em;
        color: colors.$gray-20;
        padding: 0.5em;
      }

      .promotion_values {
        width: 100%;
        height: 66%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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
