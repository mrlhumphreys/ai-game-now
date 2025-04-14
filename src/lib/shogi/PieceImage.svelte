<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  import calculatePieceInHandPositionClass from '$lib/shogi/logic/calculatePieceInHandPositionClass';
  import calculatePointsString from '$lib/shogi/logic/calculatePointsString';

  const PIECE_CHARACTERS = {
    "oushou": "王",
    "gyokushou": "玉",
    "hisha": "飛",
    "kakugyou": "角",
    "ryuuou": "龍",
    "ryuuma": "馬",
    "ginshou": "銀",
    "kinshou": "金",
    "narigin": "全",
    "keima": "桂",
    "narikei": "圭",
    "kyousha": "香",
    "narikyou": "杏",
    "fuhyou": "歩",
    "tokin": "と"
  }

  const PIECE_COLOURS = {
    "oushou": "#303030",
    "gyokushou": "#303030",
    "hisha": "#303030",
    "kakugyou": "#303030",
    "ryuuou": "#CF0000",
    "ryuuma": "#CF0000",
    "ginshou": "#303030",
    "kinshou": "#303030",
    "narigin": "#CF0000",
    "keima": "#303030",
    "narikei": "#CF0000",
    "kyousha": "#303030",
    "narikyou": "#CF0000",
    "fuhyou": "#303030",
    "tokin": "#CF0000"
  }

  export let piece;
  export let pov;
  export let context
  export let square;

  let strokeColour = '#303030';

  $: positionClass = context === 'square' ? calculatePositionClass(square, pov, 9) : calculatePieceInHandPositionClass(piece, pov);
  $: backgroundColour = piece.selected ? '#ffffff' : '#3cc5de';
  $: pointsString = calculatePointsString(piece.type, piece.playerNumber, pov);
  $: character = PIECE_CHARACTERS[piece.type];
  $: characterColour = PIECE_COLOURS[piece.type];
</script>

<div class={'piece ' + positionClass } data-id={piece.id}>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 99 108">
     <polygon points={pointsString} stroke={strokeColour} stroke-width="3" fill={backgroundColour} />
     { #if piece.playerNumber === pov }
       <text x="25" y="75" fill={characterColour} font-weight="bold" font-size="3em">{character}</text>;
     { :else }
       <text x="25" y="75" fill={characterColour} font-weight="bold" font-size="3em" transform="translate(98,104) rotate(180)">{character}</text>;
     { /if }
  </svg>
</div>

<style lang="scss">
  @import '$lib/styles/shogi_position.scss';

  .piece {
    position: absolute;
    width: 10%;
    height: 8.3%;
    transition: top 0.5s, left 0.5s;
    transition-timing-function: ease-out;
    z-index: 1;
  }
</style>
