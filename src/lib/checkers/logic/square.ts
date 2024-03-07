import type Square from '$lib/checkers/interfaces/Square';
import type Point from '$lib/checkers/interfaces/Point';
import type Piece from '$lib/checkers/interfaces/Piece';
import { 
  occupiedByPlayer as squareSetOccupiedByPlayer, 
  squaresAwayFrom,
  inDirectionOf,
  unoccupied as squareSetUnoccupied,
  occupiedByOpponentOf as squareSetOccupiedByOpponentOf,
  between,
  diagonal,
  allPossibleJumps
} from '$lib/checkers/logic/squareSet';
import {
  select as pieceSelect,
  deselect as pieceDeselect,
  promote as piecePromote
} from '$lib/checkers/logic/piece';

export const occupied = function(square: Square): boolean {
  return square.piece !== null;
};

export const unoccupied = function(square: Square): boolean {
  return square.piece === null;
};

export const occupiedByPlayer = function(square: Square, playerNumber: number): boolean {
  if (square.piece === null) {
    return false;
  } else {
    return square.piece.playerNumber === playerNumber;
  }
};

export const occupiedByOpponentOf = function(square: Square, playerNumber: number): boolean {
  if (square.piece === null) {
    return false;
  } else {
    return square.piece.playerNumber !== playerNumber;
  }
};

export const point = function(square: Square): Point {
  return { x: square.x, y: square.y };
};

export const player = function(square: Square): number | null {
  if (square.piece === null) {
    return null;
  } else {
    return square.piece.playerNumber;
  }
};

export const selectable = function(square: Square, squares: Array<Square>): boolean {
  if (square.piece !== null) {
    // should be all possible jumps
    let playerSquares = squareSetOccupiedByPlayer(squares, square.piece.playerNumber);
    let allPossibleJumpSquares = allPossibleJumps(playerSquares, squares);
    if (allPossibleJumpSquares.length > 0) {
      let possibleJumpSquares = possibleJumps(square, square.piece, squares);
      return possibleJumpSquares.length > 0;
    } else {
      return possibleMoves(square, square.piece, squares).length > 0;
    }
  } else {
    return false;
  }
};

export const actionable = function(square: Square, piece: Piece, to: Square, squares: Array<Square>): boolean {
  let noPossibleJumps = possibleJumps(square, piece, squares).length === 0;
  let canMoveToTo = possibleMoves(square, piece, squares).includes(to);
  let canJumpToTo = possibleJumps(square, piece, squares).includes(to);
  return (noPossibleJumps && canMoveToTo) || canJumpToTo;
};

export const possibleJumps = function(square: Square, piece: Piece, squares: Array<Square>): Array<Square> {
  let twoSquaresAway = squaresAwayFrom(squares, 2, square);
  let diagonalSquares = diagonal(twoSquaresAway, square);
  let inDirection = inDirectionOf(diagonalSquares, piece, square);
  return squareSetUnoccupied(inDirection).filter(function(to) {
    return squareSetOccupiedByOpponentOf(between(squares, square, to), piece.playerNumber).length > 0;
  });
};

export const possibleMoves = function(square: Square, piece: Piece, squares: Array<Square>): Array<Square> {
  let oneSquaresAway = squaresAwayFrom(squares, 1, square);
  let diagonalSquares = diagonal(oneSquaresAway, square);
  let inDirection = inDirectionOf(diagonalSquares, piece, square);
  return squareSetUnoccupied(inDirection);
};

export const lastRankForPlayer = function(square: Square, playerNumber: number): boolean {
  return (playerNumber === 1 && square.y === 0) || (playerNumber === 2 && square.y === 7);
}

export const select = function(square: Square): boolean {
  if (square.piece !== null) {
    return pieceSelect(square.piece);
  } else {
    return false;
  }
};

export const deselect = function(square: Square): boolean {
  if (square.piece !== null) {
    return pieceDeselect(square.piece);
  } else {
    return false;
  }
};

export const mark = function(square: Square): boolean {
  square.marked = true;
  return true;
};

export const unmark = function(square: Square): boolean {
  square.marked = false;
  return true;
};

export const promote = function(square: Square): boolean {
  if (square.piece !== null) {
    return piecePromote(square.piece);
  } else {
    return false;
  }
};
