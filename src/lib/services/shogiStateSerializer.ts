import type GameState from '$lib/shogi/interfaces/GameState';
import type Piece from '$lib/shogi/interfaces/Piece';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const PIECE_TYPES = [
  {},
  {
    'oushou': 'K',
    'gyokushou': 'K',
    'fuhyou': 'P',
    'kyousha': 'L',
    'keima': 'N',
    'ginshou': 'S',
    'kinshou': 'G',
    'hisha': 'R',
    'kakugyou': 'B',
    'tokin': '+P',
    'narikyou': '+L',
    'narikei': '+N',
    'narigin': '+S',
    'ryuuou': '+R',
    'ryuuma': '+B'
  },
  {
    'oushou': 'k',
    'gyokushou': 'k',
    'fuhyou': 'p',
    'kyousha': 'l',
    'keima': 'n',
    'ginshou': 's',
    'kinshou': 'g',
    'hisha': 'r',
    'kakugyou': 'b',
    'tokin': '+p',
    'narikyou': '+l',
    'narikei': '+n',
    'narigin': '+s',
    'ryuuou': '+r',
    'ryuuma': '+b'
  }
];

// lnsgk2nl/1r4gs1/p1pppp1pp/1p4p2/7P1/2P6/PP1PPPP1P/1SG4R1/LN2KGSNL b Bb
const shogiStateSerializer = function(state: GameState): string {
  let boardState = generateBoardState(state);
  let player = state.currentPlayerNumber === 1 ? 'b' : 'w';
  let hand = generateHand(state);

  if (hand === '') {
    return `${boardState} ${player} -`;
  } else {
    return `${boardState} ${player} ${hand}`;
  }
};

const pieceToChar = function(piece: Piece): string {
  let pieceMapping = PIECE_TYPES[piece.playerNumber]
  if (pieceMapping !== undefined && hasKey(pieceMapping, piece.type)) {
    let mappedPiece = pieceMapping[piece.type];
    if (mappedPiece !== undefined) {
      return mappedPiece;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

const generateBoardState = function(state: GameState): string {
  let rowCounter = 0;
  let columnCounter = 0;
  let boardState = '';

  while (rowCounter < 9) {
    let blankCounter = 0;
    while (columnCounter < 9) {
      let square = state.squares.find(function(s) { return s.x === columnCounter && s.y === rowCounter; });

      if (square !== undefined && square.piece !== null) {
        if (blankCounter !== 0) {
          boardState = boardState + blankCounter;
        }
        let char = pieceToChar(square.piece);
        boardState = boardState + char;
        blankCounter = 0;
      } else {
        blankCounter += 1;
      }

      // if last column
      if (columnCounter === 8) {
        if (blankCounter > 0) {
          boardState = boardState + blankCounter;
        }
        // if not the last row
        if (rowCounter !== 8) {
          boardState = boardState + '/';
        }
      }
      columnCounter += 1;
    }
    columnCounter = 0;
    rowCounter += 1;
  }

  return boardState;
};

const generateHand = function(state: GameState): string {
  return state.hands.map((h) => {
    return h.pieces.map((p) => {
      return pieceToChar(p);
    }).join('');
  }).join('');
};

export default shogiStateSerializer
