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
  occupiedByOpponentOf,
  unoccupiedOrOccupiedByOpponentOf,
  findById,
  findByPieceId,
  findByCoordinate
} from '$lib/chess/logic/squareSet';
import {
  inCheck
} from '$lib/chess/logic/gameState';

export const canMoveFrom = function(piece: Piece, square: Square, gameState: GameState): boolean {
  // king exclude castle move if in check
  if (piece.type === 'king' && inCheck(gameState, piece.playerNumber)) {
    return kingBaseDestinations(piece, square, gameState).length > 0;
  } else {
    return destinations(piece, square, gameState).length > 0;
  }
};

export const canMove = function(piece: Piece, from: Square, to: Square, gameState: GameState): boolean {
  // king exclude castle move if in check
  if (piece.type === 'king' && inCheck(gameState, piece.playerNumber)) {
    return includes(kingBaseDestinations(piece, from, gameState), to);
  } else {
    return includes(destinations(piece, from, gameState), to);
  }
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
      if (gameState.enPassantTarget !== null) {
         let enPassantTargetSquare = findById(gameState.squares, gameState.enPassantTarget);
         if (enPassantTargetSquare !== undefined) {
           let opposingY = piece.playerNumber === 1 ? enPassantTargetSquare.y + 1 : enPassantTargetSquare.y - 1;
             if (square.y === opposingY && (square.x == enPassantTargetSquare.x + 1 || square.x === enPassantTargetSquare.x - 1)) {
               return enPassantTargetSquare;
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
  return unoccupiedOrOccupiedByOpponentOf(atRangeSquares, piece.playerNumber);
};

export const kingCastle = function(piece: Piece, square: Square, gameState: GameState): Array<Square> {
  let castleMovesAvailable = gameState.castleMoves.filter((cm) => {
    return cm.playerNumber === piece.playerNumber;
  });

  let rooks = castleMovesAvailable.map((cm) => {
    if (cm.side == 'king') {
      return gameState.squares.find((s) => {
        return s.piece !== null && s.piece.playerNumber === piece.playerNumber && s.piece.type === 'rook' && s.x === 7;
      });
    } else {
      return gameState.squares.find((s) => {
        return s.piece !== null && s.piece.playerNumber === piece.playerNumber && s.piece.type === 'rook' && s.x === 0;
      });
    }
  }).filter((s): s is Square => !!s);

  let unblockedRooks = unblocked(rooks, square, gameState.squares);

  if (castleMovesAvailable.length > 0) {
    let potentialSquares = compact(unblockedRooks.map((rs) => {
      let directionX = vectorDirectionX(point(square), point(rs));
      let x = square.x + 2 * directionX;
      let y = square.y;
      return findByCoordinate(gameState.squares, x, y);
    }));
    return unblocked(unoccupied(potentialSquares), square, gameState.squares);
  } else {
    return [];
  }
};
