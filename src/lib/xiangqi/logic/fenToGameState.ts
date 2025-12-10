import type GameState from '$lib/xiangqi/interfaces/GameState';
import type Piece from '$lib/xiangqi/interfaces/Piece';

const parsePiece = function(char: string, id: number): Piece | null {
  switch(char) {
    case 'p':
      return { id: id, playerNumber: 2, type: 'soldier' as const, selected: false };
    case 'P':
      return { id: id, playerNumber: 1, type: 'soldier' as const, selected: false };
    case 'r':
      return { id: id, playerNumber: 2, type: 'chariot' as const, selected: false };
    case 'R':
      return { id: id, playerNumber: 1, type: 'chariot' as const, selected: false };
    case 'h':
      return { id: id, playerNumber: 2, type: 'horse' as const, selected: false };
    case 'H':
      return { id: id, playerNumber: 1, type: 'horse' as const, selected: false };
    case 'e':
      return { id: id, playerNumber: 2, type: 'elephant' as const, selected: false };
    case 'E':
      return { id: id, playerNumber: 1, type: 'elephant' as const, selected: false };
    case 'a':
      return { id: id, playerNumber: 2, type: 'advisor' as const, selected: false };
    case 'A':
      return { id: id, playerNumber: 1, type: 'advisor' as const, selected: false };
    case 'k':
      return { id: id, playerNumber: 2, type: 'king' as const, selected: false };
    case 'K':
      return { id: id, playerNumber: 1, type: 'king' as const, selected: false };
    case 'c':
      return { id: id, playerNumber: 2, type: 'cannon' as const, selected: false };
    case 'C':
      return { id: id, playerNumber: 1, type: 'cannon' as const, selected: false };
    default:
      return null;
  }
};

const X_TO_FILE = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
const Y_TO_RANK = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const calculateSquareId = function(x: number, y: number): string {
  return `${X_TO_FILE[x]}${Y_TO_RANK[y]}`;
};

// rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 0
const fenToGameState = function(fen: string): GameState | null {
  let readBoard = true;
  let readPlayerNumber = false;
  let readCastle = false;
  let readEnPassant = false;
  let readHalfmove = false;
  let readFullmove = false;
  let parseError = false;

  let y = 0;
  let x = 0;
  let squares = [];
  let currentPlayerNumber = 1;
  let halfmove = '';
  let fullmove = '';

  for (let i = 0; i < fen.length; i++) {
    let c = fen.charAt(i);
    if (['p', 'P', 'r', 'R', 'h', 'H', 'e', 'E', 'a', 'A', 'k', 'K', 'c', 'C'].includes(c)) {
      if (readBoard) {
        let piece = parsePiece(c, i);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1;
      } else {
        parseError = true;
      }
    } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
      if (readBoard) {
        let numberOfSpaces = parseInt(c);
        let emptyCounter = 0;
        while (emptyCounter < numberOfSpaces) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: null };
          squares.push(square);
          x += 1; // increment column
          emptyCounter += 1;
        }
      } else if (readHalfmove) {
         halfmove += c;
       } else if (readFullmove) {
         fullmove += c;
      } else {
        parseError = true;
      }
    } else if (c === '/') {
      if (readBoard) {
        y += 1; // new row
        x = 0; // reset column
      }
    } else if (c === ' ') {
      if (readBoard) {
        // board reading finished
        readBoard = false;
        readPlayerNumber = true;
      } else if (readPlayerNumber) {
        // player reading finished
        readPlayerNumber = false;
        readEnPassant = true;
      } else if (readEnPassant) {
        readEnPassant = false;
        readCastle = true;
      } else if (readCastle) {
        readCastle = false;
        readHalfmove = true;
      } else if (readHalfmove) {
        readHalfmove = false;
        readFullmove = true;
      } else if (readFullmove) {
        readFullmove = false;
      }
    } else if (c === 'w') {
      if (readPlayerNumber) {
        currentPlayerNumber = 1;
      }
    } else if (c === 'b') {
      if (readPlayerNumber) {
        currentPlayerNumber = 2;
      }
    } else if (c === '-') {
      if (readCastle) {
        // do nothing
      } else if (readEnPassant) {
        // do nothing
      } else {
        parseError = true;
      }
    } else if (c === '0') {
      if (readHalfmove) {
        halfmove += c;
      } else if (readFullmove) {
        fullmove += c;
      }
    } else {
      parseError = true;
    }
  } // for loop

  if (parseError) {
    return null;
  } else {
    return {
      currentPlayerNumber: currentPlayerNumber,
      squares: squares,
      halfmove: parseInt(halfmove),
      fullmove: parseInt(fullmove)
    };
  }
};

export default fenToGameState
