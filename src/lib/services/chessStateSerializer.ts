import type GameState from '$lib/chess/interfaces/GameState';
import type Piece from '$lib/chess/interfaces/Piece';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const PIECE_TYPES = [
  {},
  {
    'pawn': 'P',
    'rook': 'R',
    'knight': 'N',
    'bishop': 'B',
    'queen': 'Q',
    'king': 'K'
  },
  {
    'pawn': 'p',
    'rook': 'r',
    'knight': 'n',
    'bishop': 'b',
    'queen': 'q',
    'king': 'k'
  }
];

// Example: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const chessStateSerializer = function(state: GameState): string {
  let boardState = generateBoardState(state);
  let player = state.currentPlayerNumber === 1 ? 'w' : 'b';
  let castleMoves = generateCastleMoves(state);
  let enPassantTarget = generateEnPassantTarget(state);
  let halfmove = state.halfmove;
  let fullmove = state.fullmove;

  return `${boardState} ${player} ${castleMoves} ${enPassantTarget} ${halfmove} ${fullmove}`;
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

  while (rowCounter < 8) {
    let blankCounter = 0;
    while (columnCounter < 8) {
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
      if (columnCounter === 7) {
        if (blankCounter > 0) {
          boardState = boardState + blankCounter;
        } 
        // if not the last row
        if (rowCounter !== 7) {
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

const generateCastleMoves = function(state: GameState): string {
  if (state.castleMoves.length === 0) {
    return '-';
  } else {
    return state.castleMoves.map((cm) => {
      if (cm.playerNumber === 1 && cm.side === 'king') {
        return 'K';
      } else if (cm.playerNumber === 1 && cm.side === 'queen') {
        return 'Q';
      } else if (cm.playerNumber === 2 && cm.side === 'king') {
        return 'k';
      } else if (cm.playerNumber === 2 && cm.side === 'queen') {
        return 'q';
      } else {
        return '';
      }
    }).sort().join('');
  }
};

const generateEnPassantTarget = function(state: GameState): string {
  if (state.enPassantTarget === null) {
    return '-';
  } else {
    return state.enPassantTarget;
  }
};

export default chessStateSerializer

