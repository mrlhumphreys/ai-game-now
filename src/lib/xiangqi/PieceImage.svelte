<script>
  import calculatePositionClass from '#lib/utils/calculatePositionClass';

  const RED_PIECE_CHARACTERS = {
    "king": "帥",
    "soldier": "兵",
    "chariot": "車",
    "horse": "傌",
    "elephant": "相",
    "advisor": "仕",
    "cannon": "炮"
  };

  const BLACK_PIECE_CHARACTERS = {
    "king": "將",
    "soldier": "卒",
    "chariot": "車",
    "horse": "馬",
    "elephant": "象",
    "advisor": "士",
    "cannon": "砲"
  };

  const PLAYER_COLOURS = ['',"#CF0000", "#303030"];

  export let piece;
  export let pov;
  export let square;

  let strokeColour = '#303030';

  $: positionClass = calculatePositionClass(square, pov, 9, 10);
  $: backgroundColour = piece.selected ? '#ffffff' : '#3cc5de';
  $: character = piece.playerNumber === 1 ? RED_PIECE_CHARACTERS[piece.type] : BLACK_PIECE_CHARACTERS[piece.type];
  $: characterColour = PLAYER_COLOURS[piece.playerNumber];
</script>

<div class={'piece ' + positionClass } data-id={piece.id}>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke={strokeColour} stroke-width="3" fill={backgroundColour} />
     { #if piece.playerNumber === pov }
       <text x="26" y="68" fill={characterColour} font-weight="bold" font-size="3em">{character}</text>;
     { :else }
       <text x="26" y="68" fill={characterColour} font-weight="bold" font-size="3em" transform="translate(100,100) rotate(180)">{character}</text>;
     { /if }
  </svg>
</div>

<style lang="scss">
  @use '#lib/styles/xiangqi_position.scss' as xiangqi-position;

  .piece {
    position: absolute;
    width: 10%;
    height: 9.1%;
    transition: top 0.5s, left 0.5s;
    transition-timing-function: ease-out;
    z-index: 1;
  }
</style>
