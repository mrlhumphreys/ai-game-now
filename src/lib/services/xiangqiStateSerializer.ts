import type GameState from '$lib/xiangqi/interfaces/GameState';
import type PieceType from '$lib/xiangqi/types/PieceType';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const PIECE_TYPES = [
  {},
  {
    'soldier': 'P',
    'chariot': 'R',
    'horse': 'H',
    'elephant': 'E',
    'advisor': 'A',
    'king': 'K',
    'cannon': 'C'
  },
  {
    'soldier': 'p',
    'chariot': 'r',
    'horse': 'h',
    'elephant': 'e',
    'advisor': 'a',
    'king': 'k',
    'cannon': 'c'
  }
];

// rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 0
const xiangqiStateSerializer = function(state: GameState): string {
  let boardState = generateBoardState(state);
  let player = state.currentPlayerNumber === 1 ? 'w' : 'b';
  let halfmove = state.halfmove;
  let fullmove = state.fullmove;

  return `${boardState} ${player} - - ${halfmove} ${fullmove}`;
};

const pieceToChar = function(pieceType: PieceType, playerNumber: number): string {
  let pieceMapping = PIECE_TYPES[playerNumber]
  if (pieceMapping !== undefined && hasKey(pieceMapping, pieceType)) {
    let mappedPiece = pieceMapping[pieceType];
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

  while (rowCounter < 10) {
    let blankCounter = 0;
    while (columnCounter < 9) {
      let square = state.squares.find(function(s) { return s.x === columnCounter && s.y === rowCounter; });

      if (square !== undefined && square.piece !== null) {
        if (blankCounter !== 0) {
          boardState = boardState + blankCounter;
        }
        let char = pieceToChar(square.piece.type, square.piece.playerNumber);
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
        if (rowCounter !== 9) {
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

export default xiangqiStateSerializer
