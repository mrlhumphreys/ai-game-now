import type Square from '$lib/chess/interfaces/Square';
import type GameState from '$lib/chess/interfaces/GameState';

import uniqArr from '$lib/utils/uniq';

import {
  add
} from '$lib/chess/logic/point';
import {
  direction as vectorDirection,
  distance as vectorDistance,
  directionY as vectorDirectionY,
  orthogonal as vectorOrthogonal,
  diagonal as vectorDiagonal,
  orthogonalOrDiagonal as vectorOrthogonalOrDiagonal
} from '$lib/chess/logic/vector';
import {
  hasNotMoved,
  captureSquares
} from '$lib/chess/logic/piece';
import {
  point,
  unoccupied as squareUnoccupied,
  occupiedByPlayer as squareOccupiedByPlayer,
  occupiedByOpponentOf as squareOccupiedByOpponentOf, 
  unoccupiedOrOccupiedByOpponentOf as squareUnoccupiedOrOccupiedByOpponentOf,
  occupiedByPieceType as squareOccupiedByPieceType,
  notOccupiedByPieceType as squareNotOccupiedByPieceType
} from '$lib/chess/logic/square';

// set operations
export const difference = function(squaresA: Array<Square>, squaresB: Array<Square>): Array<Square> {
  return squaresA.filter((a) => {
    return !squaresB.some((b) => {
      return a.id === b.id;
    });
  });
};

export const intersection = function(squaresA: Array<Square>, squaresB: Array<Square>): Array<Square> {
  return squaresA.filter((a) => {
    return squaresB.some((b) => {
      return a.id === b.id;
    });
  });
};

export const uniq = function(squares: Array<Square>): Array<Square> {
  let ids = uniqArr(squares.map((s) => {
    return s.id;
  }));

  return ids.map((id) => {
    return squares.find((s) => {
      return s.id === id;
    });
  }).filter((s): s is Square => {
    return !!s;
  });
};

export const includes = function(squares: Array<Square>, square: Square): boolean {
  let foundSquare = squares.find((s) => {
    return s.id === square.id;
  });
  return foundSquare !== undefined;
};

// finders
export const findById = function(squares: Array<Square>, id: string): Square | undefined {
  return squares.find((s) => {
    return s.id === id;
  });
};

export const findByCoordinate = function(squares: Array<Square>, x: number, y: number): Square | undefined {
  return squares.find((s) => {
    return s.x === x && s.y === y;
  });
};

export const findByPieceId = function(squares: Array<Square>, id: number): Square | undefined {
  return squares.find((s) => {
    return s.piece !== null && s.piece.id === id;
  });
};

export const findSelected = function(squares: Array<Square>): Square | undefined {
  return squares.find((s) => {
    return s.piece !== null && s.piece.selected;
  });
};

// filters on piece properties 

export const unoccupied = function(squares: Array<Square>): Array<Square> {
  return squares.filter((s) => {
    return squareUnoccupied(s);
  });
};

export const occupiedByPlayer = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter((s) => {
    return squareOccupiedByPlayer(s, playerNumber);
  });
};

export const occupiedByOpponentOf = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter((s) => {
    return squareOccupiedByOpponentOf(s, playerNumber);
  });
};

export const unoccupiedOrOccupiedByOpponentOf = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter((s) => {
    return squareUnoccupiedOrOccupiedByOpponentOf(s, playerNumber);
  });
};

export const occupiedByPieceType = function(squares: Array<Square>, pieceType: string): Array<Square> {
  return squares.filter((s) => {
    return squareOccupiedByPieceType(s, pieceType);
  });
};

export const notOccupiedByPieceType = function(squares: Array<Square>, pieceType: string): Array<Square> {
  return squares.filter((s) => {
    return squareNotOccupiedByPieceType(s, pieceType);
  });
};

export const unblocked = function(squares: Array<Square>, origin: Square, board: Array<Square>): Array<Square> {
  return squares.filter((d) => {
    return between(board, origin, d).every((s) => {
      return squareUnoccupied(s);
    });
  });
};

export const between = function(squares: Array<Square>, from: Square, to: Square): Array<Square> {
  let accSquares = [];

  if (vectorOrthogonalOrDiagonal(point(from), point(to))) {
    let directionUnit = vectorDirection(from, to);
    let pointCounter = add(point(from), directionUnit); // start counter to exclude origin
    let counter = 0; // variable to prevent infinite loops
    while (pointCounter.x !== point(to).x || pointCounter.y !== point(to).y && counter < 8) {
      let square = squares.find(function(s) {
        return s.x === pointCounter.x && s.y === pointCounter.y;
      });
      if (square !== undefined && point(square) !== point(to)) {
        accSquares.push(square);
      }
      counter += 1;
      pointCounter = add(pointCounter, directionUnit);
    }
  } 

  return accSquares;
};

// filters on square properties

export const inRange = function(squares: Array<Square>, from: Square, distance: number): Array<Square> {
  return squares.filter((to) => {
    return vectorDistance(point(from), point(to)) <= distance; 
  });
};

export const atRange = function(squares: Array<Square>, from: Square, distance: number): Array<Square> {
  return squares.filter((to) => {
    return vectorDistance(point(from), point(to)) == distance; 
  });
};

export const inDirection = function(squares: Array<Square>, from: Square, playerNumber: number): Array<Square> {
  let direction = (playerNumber === 1 ? -1 : 1);
  return squares.filter((to) => {
    return vectorDirectionY(point(from), point(to)) === direction;
  });
};

export const orthogonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter((to) => {
    return vectorOrthogonal(from, to);
  });
};

export const diagonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter((to) => {
    return vectorDiagonal(from, to);
  });
};

export const sideways = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter((to) => {
    return from.y === to.y;
  });
};

export const orthogonalOrDiagonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter((to) => {
    return vectorOrthogonalOrDiagonal(from, to);
  });
};

export const notOrthogonalOrDiagonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter((to) => {
    return !vectorOrthogonalOrDiagonal(from, to);
  });
};

// chess specific

export const findKingForPlayer = function(squares: Array<Square>, playerNumber: number): Square | undefined {
  return occupiedByPlayer(occupiedByPieceType(squares, 'king'), playerNumber)[0];
};

export const unmoved = function(squares: Array<Square>): Array<Square> {
  return squares.filter((s) => {
    return s.piece !== null && hasNotMoved(s.piece);
  });
};

export const threatenedBy = function(squares: Array<Square>, playerNumber: number, gameState: GameState): Array<Square> {
  let destinations = occupiedByPlayer(squares, playerNumber).map((s) => {
    if (s.piece !== null) {
      return captureSquares(s.piece, s, gameState);
    } else {
      return [];
    }
  }).flat();

  // exclude castling
  return uniq(destinations);
};
