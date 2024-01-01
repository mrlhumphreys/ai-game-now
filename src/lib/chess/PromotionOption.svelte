<script>
  export let pieceType;
  export let touchPromotionPiece;

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
      '70,80'
    ].join(' ');
  }
</script>

<li on:click={() => touchPromotionPiece(pieceType)}>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    {#if pieceType === 'rook'}
      <polygon points={rookPointsString()} stroke="#303030" strokeWidth="3" fill="transparent" />
    {:else if pieceType === 'knight'}
      <polygon points={knightPointsString()} stroke="#303030" strokeWidth="3" fill="transparent" />
    {:else if pieceType === 'bishop'}
      <polygon points={bishopPointsString()} stroke="#303030" strokeWidth="3" fill="transparent" />
    {:else if pieceType === 'queen'}
      <polygon points={queenPointsString()} stroke="#303030" strokeWidth="3" fill="transparent" />
    {:else}
      <rect x="30" y="30" width="40" height="40" stroke={colour} stroke-width="3" fill={background} />
    {/if}
  </svg>
</li>

<style lang="scss">
  @import '$lib/styles/colors.scss';

  li {
    width: 25%;
    &:hover {
      background-color: $spot-colour;
    }
  }
</style>
