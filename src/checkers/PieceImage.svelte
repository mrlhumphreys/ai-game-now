<script>
  import calculatePositionClass from '../utils/calculatePositionClass';
  import calculateStrokeColour from '../utils/calculateStrokeColour';
  import calculateBackgroundColour from '../utils/calculateBackgroundColour';
  export let square;
  export let pov;

  let colour = calculateStrokeColour(square.piece);

  $: positionClass = calculatePositionClass(square, pov);
  $: background = calculateBackgroundColour(square.piece);
</script>

<div class={ 'piece ' + positionClass }>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="37.5" stroke={colour} stroke-width="3" fill={background} />
    {#if square.piece.king} 
      <polyline points="50,67 70,67 75,37 60,52 50,37 40,52 25,37 30,67 50,67" fill="none" stroke={colour} stroke-width="2"/>
    {/if} 
  </svg>
</div>

<style type="text/scss">
  @import '../styles/checkers_position.scss';

  .piece {
    position: absolute;
    width: 12.5%;
    height: 12.5%;
    transition: top 0.5s, left 0.5s;
    transition-timing-function: ease-out;
    z-index: 1;
  }
</style>
