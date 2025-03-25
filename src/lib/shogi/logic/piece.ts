import type Piece from '$lib/shogi/interfaces/Piece';
import type Square from '$lib/shogi/interfaces/Square';
import type GameState from '$lib/shogi/interfaces/GameState';

import {
  includes,
  union,
  inRange,
  atRange,
  inDirection,
  ranksAway,
  filesAway,
  diagonal,
  orthogonal,
  unoccupiedOrOccupiedByOpponentOf,
  unblocked
} from '$lib/shogi/logic/squareSet';

export const canMove = function(piece: Piece, from: Square, to: Square, gameState: GameState): boolean {
  return includes(destinations(piece, from, gameState), to);
};

export const canMoveFrom = function(piece: Piece, square: Square, gameState: GameState): boolean {
  return destinations(piece, square, gameState).length > 0;
};

export const hasLegalMovesFromY = function(piece: Piece, y: number): boolean {
  switch(piece.type) {
    case 'fuhyou':
      if (piece.playerNumber === 1) {
        return y !== 0;
      } else {
        return y !== 8;
      }
    case 'kyousha':
      if (piece.playerNumber === 1) {
        return y !== 0;
      } else {
        return y !== 8;
      }
    case 'keima':
      if (piece.playerNumber === 1) {
        return y !== 0 && y !== 1;
      } else {
        return y !== 8 && y !== 7;
      }
    default:
      return true;
  }
};

export const destinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  switch(piece.type) {
    case 'fuhyou':
      return fuhyouDestinations(piece, square, gameState);
    case 'kyousha':
      return kyoushaDestinations(piece, square, gameState, ignoreBlocks);
    case 'keima':
      return keimaDestinations(piece, square, gameState);
    case 'ginshou':
      return ginshouDestinations(piece, square, gameState);
    case 'kinshou':
      return kinshouDestinations(piece, square, gameState);
    case 'oushou':
      return ouDestinations(piece, square, gameState);
    case 'gyokushou':
      return ouDestinations(piece, square, gameState);
    case 'hisha':
      return hishaDestinations(piece, square, gameState, ignoreBlocks);
    case 'kakugyou':
      return kakugyouDestinations(piece, square, gameState, ignoreBlocks);
    case 'tokin':
      return kinshouDestinations(piece, square, gameState);
    case 'narikyou':
      return kinshouDestinations(piece, square, gameState);
    case 'narikei':
      return kinshouDestinations(piece, square, gameState);
    case 'narigin':
      return kinshouDestinations(piece, square, gameState);
    case 'ryuuou':
      return ryuuouDestinations(piece, square, gameState, ignoreBlocks);
    case 'ryuuma':
      return ryuumaDestinations(piece, square, gameState, ignoreBlocks);
    default:
      return [];
  }
}

export const captureSquares = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  return destinations(piece, square, gameState);
};

export const promotable = function(piece: Piece): boolean {
  switch (piece.type) {
    case 'fuhyou':
      return true;
    case 'kyousha':
      return true;
    case 'keima':
      return true;
    case 'ginshou':
      return true;
    case 'hisha':
      return true;
    case 'kakugyou':
      return true;
    default:
      return false;
  }
};

export const promote = function(piece: Piece): boolean {
  switch (piece.type) {
    case 'fuhyou':
      piece.type = 'tokin';
      return true;
    case 'kyousha':
      piece.type = 'narikyou';
      return true;
    case 'keima':
      piece.type = 'narikei';
      return true;
    case 'ginshou':
      piece.type = 'narigin';
      return true;
    case 'hisha':
      piece.type = 'ryuuou';
      return true;
    case 'kakugyou':
      piece.type = 'ryuuma';
      return true;
    default:
      return false;
  }
};

export const demote = function(piece: Piece): boolean {
  switch (piece.type) {
    case 'tokin':
      piece.type = 'fuhyou';
      break;
    case 'narikyou':
      piece.type = 'kyousha';
      break;
    case 'narikei':
      piece.type = 'keima';
      break;
    case 'narigin':
      piece.type = 'ginshou';
      break;
    case 'ryuuou':
      piece.type = 'hisha';
      break;
    case 'ryuuma':
      piece.type = 'kakugyou';
      break;
    default:
      break;
  };
  return true;
};

export const switchPlayer = function(piece: Piece): boolean {
  if (piece.playerNumber === 1) {
    piece.playerNumber = 2;
  } else {
    piece.playerNumber = 1;
  }
  return true;
};

export const select = function(piece: Piece): boolean {
  piece.selected = true;
  return true;
};

export const deselect = function(piece: Piece): boolean {
  piece.selected = false;
  return true;
};

const fuhyouDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let inRangeSquares = inRange(gameState.squares, square, 1);
  let inDirectionSquares = inDirection(inRangeSquares, square, piece.playerNumber);
  let orthogonalSquares = orthogonal(inDirectionSquares, square);
  return unoccupiedOrOccupiedByOpponentOf(orthogonalSquares, piece.playerNumber);
};

const kyoushaDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let inDirectionSquares = inDirection(orthogonalSquares, square, piece.playerNumber);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(inDirectionSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const keimaDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let inDirectionSquares = inDirection(gameState.squares, square, piece.playerNumber);
  let ranksAwaySquares = ranksAway(inDirectionSquares, square, 2);
  let filesAwaySquares = filesAway(ranksAwaySquares, square, 1);
  return unoccupiedOrOccupiedByOpponentOf(filesAwaySquares, piece.playerNumber);
};

const ginshouDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let diagonalSquares = diagonal(gameState.squares, square);
  let inDirectionSquares = inDirection(gameState.squares, square, piece.playerNumber);
  let unionSquares = union(diagonalSquares, inDirectionSquares);
  let atRangeSquares = atRange(unionSquares, square, 1);
  return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
};

const kinshouDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let inDirectionSquares = inDirection(gameState.squares, square, piece.playerNumber);
  let unionSquares = union(orthogonalSquares, inDirectionSquares);
  let atRangeSquares = atRange(unionSquares, square, 1);
  return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
};

const ouDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let atRangeSquares = atRange(gameState.squares, square, 1);
  return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
};

const hishaDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(orthogonalSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const kakugyouDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let diagonalSquares = diagonal(gameState.squares, square);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(diagonalSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const ryuuouDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let atRangeSquares = atRange(gameState.squares, square, 1);
  let unionSquares = union(orthogonalSquares, atRangeSquares);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(unionSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const ryuumaDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let diagonalSquares = diagonal(gameState.squares, square);
  let atRangeSquares = atRange(gameState.squares, square, 1);
  let unionSquares = union(diagonalSquares, atRangeSquares);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(unionSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

