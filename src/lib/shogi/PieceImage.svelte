<script>
  import calculatePositionClass from '$lib/utils/calculatePositionClass';
  import calculatePieceInHandPositionClass from '$lib/shogi/logic/calculatePieceInHandPositionClass';

  const F_POINTS_UP = [
    '49.5,6',
    '78.86,15.54',
    '92.55,102',
    '6.45,102',
    '20.14,15.44'
  ].join(' ');

  const F_POINTS_DOWN = [
    '49.5,102',
    '78.86,92.46',
    '92.55,6',
    '6.45,6',
    '20.14,92.46'
  ].join(' ');

  const E_POINTS_UP = [
    '49.5,7.5',
    '77.76,16.7',
    '91.05,100.5',
    '7.95,100.5',
    '21.24,16.7'
  ].join(' ');

  const E_POINTS_DOWN = [
    '49.5,100.5',
    '77.76,91.3',
    '91.05,7.5',
    '7.95,7.5',
    '21.24,91.3'
  ].join(' ');

  const D_POINTS_UP = [
    '49.5,9',
    '76.70,17.84',
    '89.55,99',
    '9.45,99',
    '22.30,17.84'
  ].join(' ');

  const D_POINTS_DOWN = [
    '49.5,99',
    '76.70,90.16',
    '89.55,9',
    '9.45,9',
    '22.30,90.16'
  ].join(' ');

  const C_POINTS_UP = [
    '49.5,10.5',
    '75.30,19.34',
    '87.75,97.5',
    '11.25,97.5',
    '23.70,19.34'
  ].join(' ');

  const C_POINTS_DOWN = [
    '49.5,97.5',
    '75.30,88.66',
    '87.75,10.5',
    '11.25,10.5',
    '23.70,88.66'
  ].join(' ');

  const B_POINTS_UP = [
    '49.5,12',
    '72.56,19.52',
    '84.75,96',
    '14.25,96',
    '26.44,19.52'
  ].join(' ');

  const B_POINTS_DOWN = [
    '49.5,96',
    '72.56,88.48',
    '84.75,12',
    '14.25,12',
    '26.44,88.48'
  ].join(' ');

  const A_POINTS_UP = [
    '49.5,13.5',
    '71.56,20.66',
    '83.25,94.5',
    '15.75,94.5',
    '27.44,20.66'
  ].join(' ');

  const A_POINTS_DOWN = [
    '49.5,94.5',
    '71.56,87.34',
    '83.25,13.5',
    '15.75,13.5',
    '27.44,87.34'
  ].join(' ');

  const PIECE_POINTS_UP = {
    "oushou": F_POINTS_UP,
    "gyokushou": F_POINTS_UP,
    "hisha": E_POINTS_UP,
    "kakugyou": E_POINTS_UP,
    "ryuuou": E_POINTS_UP,
    "ryuuma": E_POINTS_UP,
    "ginshou": D_POINTS_UP,
    "kinshou": D_POINTS_UP,
    "narigin": D_POINTS_UP,
    "keima": C_POINTS_UP,
    "narikei": C_POINTS_UP,
    "kyousha": B_POINTS_UP,
    "narikyou": B_POINTS_UP,
    "fuhyou": A_POINTS_UP,
    "tokin": A_POINTS_UP
  };

  const PIECE_POINTS_DOWN = {
    "oushou": F_POINTS_DOWN,
    "gyokushou": F_POINTS_DOWN,
    "hisha": E_POINTS_DOWN,
    "kakugyou": E_POINTS_DOWN,
    "ryuuou": E_POINTS_DOWN,
    "ryuuma": E_POINTS_DOWN,
    "ginshou": D_POINTS_DOWN,
    "kinshou": D_POINTS_DOWN,
    "narigin": D_POINTS_DOWN,
    "keima": C_POINTS_DOWN,
    "narikei": C_POINTS_DOWN,
    "kyousha": B_POINTS_DOWN,
    "narikyou": B_POINTS_DOWN,
    "fuhyou": A_POINTS_DOWN,
    "tokin": A_POINTS_DOWN
  };

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

  let colour = '#303030';

  $: positionClass = context === 'square' ? calculatePositionClass(square, pov, 9) : calculatePieceInHandPositionClass(piece, pov);
  $: background = piece.selected ? '#ffffff' : '#3cc5de';
  $: pointsString = calculatePointsString(piece.type, piece.playerNumber, pov);
  $: character = PIECE_CHARACTERS[piece.type];
  $: characterColour = PIECE_COLOURS[piece.type];

  function calculatePointsString(pieceType, playerNumber, pov) {
    if (playerNumber === pov) {
      return PIECE_POINTS_UP[pieceType];
    } else {
      return PIECE_POINTS_DOWN[pieceType];
    }
  };
</script>

<div class={'piece ' + positionClass } data-id={piece.id}>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 99 108">
     <polygon points={pointsString} stroke={colour} stroke-width="3" fill={background} />
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
