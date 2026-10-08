import type Piece from '#lib/xiangqi/interfaces/Piece';
import type Square from '#lib/xiangqi/interfaces/Square';
import type GameState from '#lib/xiangqi/interfaces/GameState';

import {
  includes,
  union,
  where,
  inRange,
  atRange,
  inDirection,
  ranksAbove,
  ranksBelow,
  sameRank,
  diagonal,
  orthogonal,
  notOrthogonalOrDiagonal,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByOpponentOf,
  unoccupied,
  unblocked,
  betweenContainsExactlyOnePiece,
  betweenContainsAtLeastOnePiece,
  findKingForPlayer
} from '#lib/xiangqi/logic/squareSet';

const PALACE_X_COORDINATES = [3, 4, 5];
const PALACE_Y_COORDINATES = [0, 1, 2, 7, 8, 9];

export const canMove = function(piece: Piece, from: Square, to: Square, gameState: GameState): boolean {
  return includes(destinations(piece, from, gameState), to);
};

export const canMoveFrom = function(piece: Piece, square: Square, gameState: GameState): boolean {
  return destinations(piece, square, gameState).length > 0;
};

export const destinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  switch(piece.type) {
    case 'soldier':
      return soldierDestinations(piece, square, gameState);
    case 'chariot':
      return chariotDestinations(piece, square, gameState, ignoreBlocks);
    case 'horse':
      return horseDestinations(piece, square, gameState, ignoreBlocks);
    case 'elephant':
      return elephantDestinations(piece, square, gameState, ignoreBlocks);
    case 'advisor':
      return advisorDestinations(piece, square, gameState);
    case 'king':
      return kingDestinations(piece, square, gameState);
    case 'cannon':
      return cannonDestinations(piece, square, gameState, ignoreBlocks);
    default:
      return [];
  }
}

export const captureSquares = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  return destinations(piece, square, gameState);
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

const soldierDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let inRangeSquares = inRange(gameState.squares, square, 1);
  let inDirectionSquares = inDirection(inRangeSquares, square, piece.playerNumber);
  let forwardOneSquare = orthogonal(inDirectionSquares, square);
  if ((piece.playerNumber === 1 && square.y <= 4) || (piece.playerNumber === 2 && square.y >= 5)) {
    let sameRankSquares = sameRank(inRangeSquares, square);
    let unionSquares = union(forwardOneSquare, sameRankSquares);
    return unoccupiedOrOccupiedByOpponentOf(unionSquares, piece.playerNumber);
  } else {
    return unoccupiedOrOccupiedByOpponentOf(forwardOneSquare, piece.playerNumber);
  }
};

const horseDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks : boolean = false): Array<Square> {
  let notOrthogonalOrDiagonalSquares = notOrthogonalOrDiagonal(gameState.squares, square);
  let atRangeSquares = atRange(notOrthogonalOrDiagonalSquares, square, 2);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber), square, gameState.squares);
  }
};

const advisorDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let diagonalSquares = diagonal(gameState.squares, square);
  let atRangeSquares = atRange(diagonalSquares, square, 1);
  let palaceSquares = where(atRangeSquares, {x: PALACE_X_COORDINATES, y: PALACE_Y_COORDINATES});
  return unoccupiedOrOccupiedByOpponentOf(palaceSquares, piece.playerNumber);
};

const kingDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let atRangeSquares = atRange(orthogonalSquares, square, 1);
  let palaceSquares = where(atRangeSquares, {x: PALACE_X_COORDINATES, y: PALACE_Y_COORDINATES});
  let opposingPlayerNumber = piece.playerNumber === 1 ? 2 : 1; 
  let opposingKingSquare = findKingForPlayer(gameState.squares, opposingPlayerNumber ); 
  if (opposingKingSquare !== undefined && opposingKingSquare.x === square.x && unblocked([opposingKingSquare], square, gameState.squares).length === 1) {
    // include flying king
    return union(unoccupiedOrOccupiedByOpponentOf(palaceSquares, piece.playerNumber), [opposingKingSquare]);
  } else {
    return unoccupiedOrOccupiedByOpponentOf(palaceSquares, piece.playerNumber);
  }
};

const chariotDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(orthogonalSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const elephantDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let diagonalSquares = diagonal(gameState.squares, square);
  let atRangeSquares = atRange(diagonalSquares, square, 2);
  let onSideSquares = [];

  if (piece.playerNumber === 1) {
    onSideSquares = ranksAbove(atRangeSquares, 4);
  } else {
    onSideSquares = ranksBelow(atRangeSquares, 5);
  }

  let unoccupiedOrOccupiedByOpponentOfSquares = unoccupiedOrOccupiedByOpponentOf(onSideSquares, piece.playerNumber);
  if (ignoreBlocks) {
    return unoccupiedOrOccupiedByOpponentOfSquares;
  } else {
    return unblocked(unoccupiedOrOccupiedByOpponentOfSquares, square, gameState.squares);
  }
};

const cannonDestinations = function(piece: Piece, square: Square, gameState: GameState, ignoreBlocks: boolean = false): Array<Square> {
  let orthogonalSquares = orthogonal(gameState.squares, square);
  let occupiedByOpponentOfSquares = occupiedByOpponentOf(orthogonalSquares, piece.playerNumber);

  let moveableSquares = unoccupied(orthogonalSquares, piece.playerNumber);
  if (ignoreBlocks) {
    let jumpableSquares = betweenContainsAtLeastOnePiece(occupiedByOpponentOfSquares, square, gameState.squares);
    return union(jumpableSquares, moveableSquares);
  } else {
    let jumpableSquares = betweenContainsExactlyOnePiece(occupiedByOpponentOfSquares, square, gameState.squares);
    return union(jumpableSquares, unblocked(moveableSquares, square, gameState.squares));
  }
};
