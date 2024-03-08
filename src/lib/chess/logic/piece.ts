import type Piece from '$lib/chess/interfaces/Piece';
import type Square from '$lib/chess/interfaces/Square';
import type GameState from '$lib/chess/interfaces/GameState';

import compact from '$lib/utils/compact';
import {
  distance as vectorDistance,
  directionX as vectorDirectionX
} from '$lib/chess/logic/vector';
import {
  rankNumber,
  point,
  startingFor
} from '$lib/chess/logic/square';
import {
  includes,
  inRange,
  atRange,
  inDirection,
  orthogonal,
  diagonal,
  orthogonalOrDiagonal,
  notOrthogonalOrDiagonal,
  unoccupied,
  unblocked,
  occupiedByPlayer,
  occupiedByOpponentOf,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByPieceType,
  unmoved,
  findByPieceId,
  findByCoordinate
} from '$lib/chess/logic/squareSet';

export const canMoveFrom = function(piece: Piece, square: Square, gameState: GameState): boolean {
  return destinations(piece, square, gameState).length > 0;
};

export const canMove = function(piece: Piece, from: Square, to: Square, gameState: GameState): boolean {
  return includes(destinations(piece, from, gameState), to);
};

export const destinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  switch(piece.type) {
    case 'pawn':
      let moves = moveSquares(piece, square, gameState);
      let captures = captureSquares(piece, square, gameState);
      let enPassant = enPassantSquare(piece, square, gameState);
      if (enPassant !== undefined) {
        return moves.concat(captures).concat([enPassant]);
      } else {
        return moves.concat(captures);
      }
    case 'rook':
      let orthogonalSquares = orthogonal(gameState.squares, square);
      let rookUnoccupiedOrOpponentSquares = unoccupiedOrOccupiedByOpponentOf(orthogonalSquares, piece.playerNumber);
      return unblocked(rookUnoccupiedOrOpponentSquares, square, gameState.squares);
    case 'knight':
      let notOrthogonalOrDiagonalSquares = notOrthogonalOrDiagonal(gameState.squares, square);
      let atRangeSquares = atRange(notOrthogonalOrDiagonalSquares, square, 2);
      return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
    case 'bishop':
      let diagonalSquares = diagonal(gameState.squares, square);
      let bishopUnoccupiedOrOpponentSquares = unoccupiedOrOccupiedByOpponentOf(diagonalSquares, piece.playerNumber);
      return unblocked(bishopUnoccupiedOrOpponentSquares, square, gameState.squares);
    case 'queen':
      let orthogonalOrDiagonalSquares = orthogonalOrDiagonal(gameState.squares, square);
      let queenUnoccupiedOrOpponentSquares = unoccupiedOrOccupiedByOpponentOf(orthogonalOrDiagonalSquares, piece.playerNumber);
      return unblocked(queenUnoccupiedOrOpponentSquares, square, gameState.squares);
    case 'king':
      let base = kingBaseDestinations(piece, square, gameState);
      let castle = kingCastle(piece, square, gameState);
      return base.concat(castle);
    default:
      return [];
  }
};

export const moveSquares = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  switch(piece.type) {
    case 'pawn':
      let inRangeSquares = inRange(gameState.squares, square, pawnMoveableDistance(piece, square));
      let inDirectionSquares = inDirection(inRangeSquares, square, piece.playerNumber);
      let orthogonalSquares = orthogonal(inDirectionSquares, square);
      let unoccupiedSquares = unoccupied(orthogonalSquares);
      return unblocked(unoccupiedSquares, square, gameState.squares);
    default:
      return destinations(piece, square, gameState);
  }
};

export const captureSquares = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  switch(piece.type) {
    case 'pawn':
      let inRangeSquares = inRange(gameState.squares, square, 1);
      let inDirectionSquares = inDirection(inRangeSquares, square, piece.playerNumber);
      let diagonalSquares = diagonal(inDirectionSquares, square);
      return occupiedByOpponentOf(diagonalSquares, piece.playerNumber);
    case 'king':
      return kingBaseDestinations(piece, square, gameState);
    default:
      return destinations(piece, square, gameState);
  }
};

export const enPassantSquare = function(piece: Piece, square: Square, gameState: GameState): Square | undefined {
  switch(piece.type) {
    case 'pawn':
      if (gameState.lastDoubleStepPawnId !== null) {
        let doubleStep = findByPieceId(gameState.squares, gameState.lastDoubleStepPawnId);
        if (rankNumber(square, piece.playerNumber) === 5 && doubleStep !== undefined) {
          let distance = vectorDistance(point(square), point(doubleStep));
          if (distance === 1) {
            let x = doubleStep.x;
            let y = square.y + pawnDirection(piece);
            return findByCoordinate(gameState.squares, x, y);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    default:
      return undefined;
  }
}

export const hasNotMoved = function(piece: Piece): boolean {
  return !piece.hasMoved;
};

export const opponent = function(piece: Piece): number {
  return (piece.playerNumber === 1 ? 2 : 1);
};

export const select = function(piece: Piece): boolean {
  piece.selected = true;
  return true;
};

export const deselect = function(piece: Piece): boolean {
  piece.selected = false;
  return true;
};

export const pawnMoveableDistance = function(piece: Piece, square: Square): number {
  return startingFor(square, piece.playerNumber) ? 2 : 1;
};

export const pawnDirection = function(piece: Piece): number {
  return piece.playerNumber === 1 ? -1 : 1;
};

export const kingBaseDestinations = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let atRangeSquares = atRange(gameState.squares, square, 1);
  return atRangeSquares;
};

export const kingCastle = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let rooks = unmoved(occupiedByPlayer(occupiedByPieceType(gameState.squares, 'rook'), piece.playerNumber));
  if (hasNotMoved(piece) && rooks.length > 0) {
    let potentialSquares = compact(rooks.map((s) => {
      let directionX = vectorDirectionX(point(square), point(s));
      let x = square.x + 2 * directionX;
      let y = square.y;
      return findByCoordinate(gameState.squares, x, y);
    }));
    return unblocked(unoccupied(potentialSquares), square, gameState.squares);
  } else {
    return [];
  }
};
