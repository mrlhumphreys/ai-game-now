<script >
  import calculatePositionClass from '#lib/utils/calculatePositionClass';
  export let point;
  export let pov;
  export let touchPoint;

  $: positionClass = calculatePositionClass(point, pov, 19, 19);
</script>

<div class={'point ' + positionClass } role="button" onclick={() => touchPoint(point.id)}>

</div>

<style lang="scss">
  @use '#lib/styles/go_position.scss' as go-position;

  .point {
    position: absolute;
    width: 5%;
    height: 5%;
    z-index: 2;
  }
</style>
