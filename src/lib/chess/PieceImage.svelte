<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  import calculateStrokeColour from '$lib/utils/calculateStrokeColour';
  import calculateBackgroundColour from '$lib/utils/calculateBackgroundColour';
  export let square;
  export let pov;

  let colour = calculateStrokeColour(square.piece.playerNumber);

  $: positionClass = calculatePositionClass(square, pov);
  $: background = calculateBackgroundColour(square.piece.playerNumber, square.piece.selected);

  function kingPointsString() {
    return [
      '25,80',
      '30,60',
      '25,40',
      '45,35',
      '45,30',
      '40,30',
      '40,20',
      '45,20',
      '45,15',
      '55,15',
      '55,20',
      '60,20',
      '60,30',
      '55,30',
      '55,35',
      '75,40',
      '70,60',
      '75,80',
    ].join(' ');
  }

  function queenPointsString() {
    return [
      '30,80',
      '20,30',
      '30,40',
      '35,35',
      '45,30',
      '40,25',
      '40,20',
      '45,15',
      '55,15',
      '60,20',
      '60,25',
      '55,30',
      '65,35',
      '70,40',
      '80,30',
      '70,80'
    ].join(' ');
  }

  function bishopPointsString() {
    return [
      '30,80',
      '25,70',
      '25,60',
      '30,50',
      '45,30',
      '40,25',
      '40,20',
      '45,15',
      '55,15',
      '60,20',
      '60,25',
      '55,30',
      '70,50',
      '55,60',
      '60,65',
      '74,57',
      '75,60',
      '75,70',
      '70,80'
    ].join(' ');
  }

  function knightPointsString() {
    return [
      '25,80',
      '30,60',
      '25,40',
      '25,30',
      '35,20',
      '50,20',
      '75,40',
      '75,45',
      '70,50',
      '60,50',
      '45,45',
      '70,70',
      '75,80'
    ].join(' ');
  }

  function rookPointsString() {
    return [
      '30,80',
      '30,40',
      '25,40',
      '25,20',
      '35,20',
      '35,30',
      '45,30',
      '45,20',
      '55,20',
      '55,30',
      '65,30',
      '65,20',
      '75,20',
      '75,40',
      '70,40',
      '70,80',
    ].join(' ');
  }

  function pawnPointsString() {
    return [
      '30,70',
      '35,60',
      '45,50',
      '45,40',
      '40,35',
      '40,30',
      '45,25',
      '55,25',
      '60,30',
      '60,35',
      '55,40',
      '55,50',
      '65,60',
      '70,70'
    ].join(' ');
  }
</script>

<div class={'piece ' + positionClass }>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
     {#if square.piece.type === 'pawn'}
        <polygon points={pawnPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else if square.piece.type === 'rook'}
        <polygon points={rookPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else if square.piece.type === 'knight'}
        <polygon points={knightPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else if square.piece.type === 'bishop'}
        <polygon points={bishopPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else if square.piece.type === 'queen'}
        <polygon points={queenPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else if square.piece.type === 'king'}
        <polygon points={kingPointsString()} stroke={colour} stroke-width="3" fill={background} />
     {:else}
        <rect x="30" y="30" width="40" height="40" stroke={colour} stroke-width="3" fill={background} />
     {/if}
  </svg>
</div>

<style lang="scss">
  @import '$lib/styles/chess_position.scss';

  .piece {
    position: absolute;
    width: 12.5%;
    height: 12.5%;
    transition: top 0.5s, left 0.5s;
    transition-timing-function: ease-out;
    z-index: 1;
  }
</style>
