<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  import calculateStrokeColour from '$lib/utils/calculateStrokeColour';
  import calculateBackgroundColour from '$lib/utils/calculateBackgroundColour';

  export let point;
  export let pov;

  let colour = calculateStrokeColour(point.stone.playerNumber);
  let positionClass = calculatePositionClass(point, pov, 19);
  let background = calculateBackgroundColour(point.stone.playerNumber, false);
</script>

<div class={ 'stone ' + positionClass }>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="37.5" stroke={colour} stroke-width="6" fill={background} />
  </svg>
</div>

<style lang="scss">
  @import '$lib/styles/go_position.scss';

  .stone {
    position: absolute;
    width: 5%;
    height: 5%;
    z-index: 1;
  }
</style>

