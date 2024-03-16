import type GameState from '$lib/chess/interfaces/GameState';
import type Point from '$lib/chess/interfaces/Point';
import type Piece from '$lib/chess/interfaces/Piece';
import type CastleMove from '$lib/chess/interfaces/CastleMove';

const parsePiece = function(char: string, id: number): Piece | null {
  switch(char) {
    case 'p':
      return { id: id, playerNumber: 2, type: 'pawn', selected: false };
    case 'P':
      return { id: id, playerNumber: 1, type: 'pawn', selected: false };
    case 'r':
      return { id: id, playerNumber: 2, type: 'rook', selected: false };
    case 'R':
      return { id: id, playerNumber: 1, type: 'rook', selected: false };
    case 'n':
      return { id: id, playerNumber: 2, type: 'knight', selected: false };
    case 'N':
      return { id: id, playerNumber: 1, type: 'knight', selected: false };
    case 'b':
      return { id: id, playerNumber: 2, type: 'bishop', selected: false };
    case 'B':
      return { id: id, playerNumber: 1, type: 'bishop', selected: false };
    case 'q':
      return { id: id, playerNumber: 2, type: 'queen', selected: false };
    case 'Q':
      return { id: id, playerNumber: 1, type: 'queen', selected: false };
    case 'k':
      return { id: id, playerNumber: 2, type: 'king', selected: false };
    case 'K':
      return { id: id, playerNumber: 1, type: 'king', selected: false };
    default:
      return null;
  }
};

const parseCastleMove = function(char: string): CastleMove | null {
  switch(char) {
    case 'K':
      return { playerNumber: 1, side: 'king' };
    case 'Q':
      return { playerNumber: 1, side: 'queen' };
    case 'k':
      return { playerNumber: 2, side: 'king' };
    case 'q':
      return { playerNumber: 2, side: 'queen' };
    default:
      return null;
  }
};

const X_TO_FILE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const Y_TO_RANK = ['8', '7', '6', '5', '4', '3', '2', '1'];

const calculateSquareId = function(x: number, y: number): string {
  return `${X_TO_FILE[x]}${Y_TO_RANK[y]}`;
};

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const fenToGameState = function(fen: string): GameState | null {
  let readBoard = true;
  let readPlayerNumber = false;
  let readCastleMoves = false;
  let readEnPassant = false;
  let readHalfmove = false;
  let readFullmove = false;
  let parseError = false;

  let y = 0;
  let x = 0;
  let squares = [];
  let currentPlayerNumber = 1;
  let castleMoves = [];
  let enPassantTarget: string | null = null;
  let halfmove = '';
  let fullmove = '';

  for (let i = 0; i < fen.length; i++) {
    let c = fen.charAt(i);
    if (['p', 'P', 'r', 'R', 'n', 'N', 'B'].includes(c)) {
      if (readBoard) {
        let piece = parsePiece(c, i);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1; // increment column
      }
    } else if (['q', 'Q', 'k', 'K'].includes(c)) {
      if (readBoard) {
        let piece = parsePiece(c, i);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1; // increment column
      } else if (readCastleMoves) {
        let castleMove = parseCastleMove(c);
        if (castleMove !== null) {
          castleMoves.push(castleMove);
        }
      }
    } else if (['1','2','3','4','5','6','7','8'].includes(c)) {
       if (readBoard) {
          let numberOfSpaces = parseInt(c);
          let emptyCounter = 0;
          while (emptyCounter < numberOfSpaces) {
            let square = { id: calculateSquareId(x, y), x: x, y: y, piece: null };
            squares.push(square);
            x += 1; // increment column
            emptyCounter += 1;
          }
       } else if (readEnPassant) {
         enPassantTarget += c;
       } else if (readHalfmove) {
         halfmove += c;
       } else if (readFullmove) {
         fullmove += c;
       }
    } else if (c === '/') {
      if (readBoard) {
        y += 1; // new row
        x = 0; // reset column;
      }
    } else if (c === ' ') {
      if (readBoard) {
        // board reading finished
        readBoard = false;
        readPlayerNumber = true;
      } else if (readPlayerNumber) {
        // player reading finished
        readPlayerNumber = false;
        readCastleMoves = true;
      } else if (readCastleMoves) {
        // castle moves reading finished
        readCastleMoves = false;
        readEnPassant = true;
      } else if (readEnPassant) {
        readEnPassant = false;
        readHalfmove = true;
      } else if (readHalfmove) {
        readHalfmove = false;
        readFullmove = true;
      }
    } else if (c === 'w') {
      if (readPlayerNumber) {
        currentPlayerNumber = 1;
      }
    } else if (c === 'b') {
      if (readBoard) {
        let piece = parsePiece(c, i);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1;
      } else if (readPlayerNumber) {
        currentPlayerNumber = 2;
      } else if (readEnPassant) {
        enPassantTarget = c;
      }
    } else if (['a','c','d','e','f','g','h'].includes(c)) {
      if (readEnPassant) {
        enPassantTarget = c;
      }
    } else if (c === '-') {
      if (readCastleMoves) {
        null; // do nothing
      } else if (readEnPassant) {
        enPassantTarget = null;
      }
    } else if (['9','0'].includes(c)) {
      if (readHalfmove) {
        halfmove += c;
      } else if (readFullmove) {
        fullmove += c;
      }
    } else {
      parseError = true;
    }
  }

  if (parseError) {
    return null;
  } else {
    return {
      currentPlayerNumber: currentPlayerNumber,
      squares: squares,
      castleMoves: castleMoves,
      enPassantTarget: enPassantTarget,
      halfmove: parseInt(halfmove),
      fullmove: parseInt(fullmove)
    };
  }
};


export default fenToGameState
