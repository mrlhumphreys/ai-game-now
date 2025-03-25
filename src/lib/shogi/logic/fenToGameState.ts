import type GameState from '$lib/shogi/interfaces/GameState';
import type Piece from '$lib/shogi/interfaces/Piece';

const parsePiece = function(char: string, id: number, promotedPiece: boolean): Piece | null {
  if (promotedPiece) {
    switch(char) {
      case 'p':
        return { id: id, playerNumber: 2, type: 'tokin', selected: false };
      case 'P':
        return { id: id, playerNumber: 1, type: 'tokin', selected: false };
      case 'l':
        return { id: id, playerNumber: 2, type: 'narikyou', selected: false };
      case 'L':
        return { id: id, playerNumber: 1, type: 'narikyou', selected: false };
      case 'n':
        return { id: id, playerNumber: 2, type: 'narikei', selected: false };
      case 'N':
        return { id: id, playerNumber: 1, type: 'narikei', selected: false };
      case 's':
        return { id: id, playerNumber: 2, type: 'narigin', selected: false };
      case 'S':
        return { id: id, playerNumber: 1, type: 'narigin', selected: false };
      case 'r':
        return { id: id, playerNumber: 2, type: 'ryuuou', selected: false };
      case 'R':
        return { id: id, playerNumber: 1, type: 'ryuuou', selected: false };
      case 'b':
        return { id: id, playerNumber: 2, type: 'ryuuma', selected: false };
      case 'B':
        return { id: id, playerNumber: 1, type: 'ryuuma', selected: false };
      default:
        return null;
    }
  } else {
    switch(char) {
      case 'k':
        return { id: id, playerNumber: 2, type: 'gyokushou', selected: false };
      case 'K':
        return { id: id, playerNumber: 1, type: 'oushou', selected: false };
      case 'p':
        return { id: id, playerNumber: 2, type: 'fuhyou', selected: false };
      case 'P':
        return { id: id, playerNumber: 1, type: 'fuhyou', selected: false };
      case 'l':
        return { id: id, playerNumber: 2, type: 'kyousha', selected: false };
      case 'L':
        return { id: id, playerNumber: 1, type: 'kyousha', selected: false };
      case 'n':
        return { id: id, playerNumber: 2, type: 'keima', selected: false };
      case 'N':
        return { id: id, playerNumber: 1, type: 'keima', selected: false };
      case 's':
        return { id: id, playerNumber: 2, type: 'ginshou', selected: false };
      case 'S':
        return { id: id, playerNumber: 1, type: 'ginshou', selected: false };
      case 'g':
        return { id: id, playerNumber: 2, type: 'kinshou', selected: false };
      case 'G':
        return { id: id, playerNumber: 1, type: 'kinshou', selected: false };
      case 'r':
        return { id: id, playerNumber: 2, type: 'hisha', selected: false };
      case 'R':
        return { id: id, playerNumber: 1, type: 'hisha', selected: false };
      case 'b':
        return { id: id, playerNumber: 2, type: 'kakugyou', selected: false };
      case 'B':
        return { id: id, playerNumber: 1, type: 'kakugyou', selected: false };
      default:
        return null;
    }
  }
};

const X_TO_FILE = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
const Y_TO_RANK = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const calculateSquareId = function(x: number, y: number): string {
  return `${X_TO_FILE[x]}${Y_TO_RANK[y]}`;
};

// lnsgk2nl/1r4gs1/p1pppp1pp/1p4p2/7P1/2P6/PP1PPPP1P/1SG4R1/LN2KGSNL b Bb
const fenToGameState = function(fen: string): GameState | null {
  let readBoard = true;
  let readPlayerNumber = false;
  let readHand = false;
  let readMoveCount = false;
  let promotedPiece = false;
  let parseError = false;

  let y = 0;
  let x = 0;
  let squares = [];
  let currentPlayerNumber = 1;
  let handPieces = [ ];

  for (let i = 0; i < fen.length; i++) {
    let c = fen.charAt(i);
    if (['p', 'P', 'l', 'L', 'n', 'N', 's', 'S', 'g', 'G', 'B', 'r', 'R', 'k', 'K'].includes(c)) {
      if (readBoard) {
        let piece = parsePiece(c, i, promotedPiece);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1;
        promotedPiece = false;
      } else if (readHand) {
        let piece = parsePiece(c, i, false);
        if (piece !== null) {
          handPieces.push(piece);
        } else {
          parseError = true;
        }
      } else {
        parseError = true;
      }
    } else if (c === '+') {
      if (readBoard) {
        promotedPiece = true;
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
      } else if (readMoveCount) {
        // do nothing
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
        readHand = true;
      } else if (readHand) {
        readHand = false;
        readMoveCount = true;
      } else if (readMoveCount) {
        readMoveCount = false;
      }
    } else if (c === 'w') {
      if (readPlayerNumber) {
        currentPlayerNumber = 2;
      }
    } else if (c === 'b') {
      if (readBoard) {
        let piece = parsePiece(c, i, promotedPiece);
        if (piece !== null) {
          let square = { id: calculateSquareId(x, y), x: x, y: y, piece: piece };
          squares.push(square);
        } else {
          parseError = true;
        }
        x += 1;
      } else if (readHand) {
        let piece = parsePiece(c, i, false);
        if (piece !== null) {
          handPieces.push(piece);
        } else {
          parseError = true;
        }
      } else if (readPlayerNumber) {
        currentPlayerNumber = 1;
      }
    } else if (c === '-') {
      if (readHand) {
        // do nothing
      } else {
        parseError = true;
      }
    } else if (c === '0') {
      // ignore for now
    } else {
      parseError = true;
    }
  } // for loop

  if (parseError) {
    return null;
  } else {
    let playerOneHandPieces = handPieces.filter((hp) => {
      return hp.playerNumber === 1;
    });

    let playerTwoHandPieces = handPieces.filter((hp) => {
      return hp.playerNumber === 2;
    });

    let hands = [
      { playerNumber: 1, pieces: playerOneHandPieces },
      { playerNumber: 2, pieces: playerTwoHandPieces }
    ];

    return {
      currentPlayerNumber: currentPlayerNumber,
      squares: squares,
      hands: hands
    };
  }
};

export default fenToGameState
