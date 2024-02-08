import type Square from '$lib/checkers/interfaces/Square';
import type Piece from '$lib/checkers/interfaces/Piece';

import { 
  occupiedByPlayer as squareOccupiedByPlayer, 
  point,
  occupied as squareOccupied,
  unoccupied as squareUnoccupied,
  occupiedByOpponentOf as squareOccupiedByOpponentOf,
  possibleJumps,
  possibleMoves,
  deselect,
  unmark
} from '$lib/checkers/logic/square';
import { 
  direction as pieceDirection
} from '$lib/checkers/logic/piece';
import { 
  distance,
  directionY,
  direction as vectorDirection,
  orthogonalOrDiagonal as vectorOrthogonalOrDiagonal,
  orthogonal as vectorOrthogonal,
  diagonal as vectorDiagonal
} from '$lib/checkers/logic/vector';
import { add } from '$lib/checkers/logic/point';

export const findById = function(squares: Array<Square>, id: number): Square | undefined {
  return squares.find(function(s) {
    return s.id === id;
  });
};

export const filterByIds = function(squares: Array<Square>, ids: Array<number>): Array<Square> {
  return ids.flatMap((id: number) => {
    let square = findById(squares, id);
    return (square !== undefined ? [square] : []);
  });
};

export const findByCoordinate = function(squares: Array<Square>, x: number, y: number): Square | undefined {
  return squares.find(function(s) {
    return (s.x === x && s.y === y);
  });
};

export const selected = function(squares: Array<Square>): Square | undefined {
  return squares.find(function(s) {
    if (s.piece !== null) {
      return s.piece.selected;
    } else {
      return false;
    }
  });
};

export const difference = function(squares: Array<Square>, other: Array<Square>): Array<Square> {
  return squares.filter(function(squareA) {
    return !other.some(function(squareB) {
      return squareA.id === squareB.id;
    })
  });
};

export const occupiedByPlayer = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter(function(s) {
    return squareOccupiedByPlayer(s, playerNumber); 
  });
};

export const squaresAwayFrom = function(squares: Array<Square>, number: number, from: Square): Array<Square> {
  return squares.filter(function(to) {
    return distance(point(from), point(to)) === number;
  });
};

export const inDirectionOf = function(squares: Array<Square>, piece: Piece, from: Square): Array<Square> {
  return squares.filter(function(to) {
    if (piece.king) {
      return true;
    } else {
      return directionY(from, to) === pieceDirection(piece);
    }
  });
};

export const occupied = function(squares: Array<Square>): Array<Square> {
  return squares.filter(function(s) {
    return squareOccupied(s);
  });
};

export const unoccupied = function(squares: Array<Square>): Array<Square> {
  return squares.filter(function(s) {
    return squareUnoccupied(s);
  });
};

export const occupiedByOpponentOf = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter(function(s) {
    return squareOccupiedByOpponentOf(s, playerNumber);
  });
};

export const between = function(squares: Array<Square>, from: Square, to: Square): Array<Square> {
  let accSquares = [];

  if (vectorOrthogonalOrDiagonal(point(from), point(to))) {
    let directionUnit = vectorDirection(from, to);
    let pointCounter = add(point(from), directionUnit); // start counter to exclude origin
    let counter = 0; // variable to prevent infinite loops
    while (pointCounter.x !== point(to).x && pointCounter.y !== point(to).y && counter < 8) {
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

export const diagonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter(function(to) {
    if (from.x === to.x && from.y === to.y) {
      return false;
    } else {
      return vectorDiagonal(point(from), point(to));
    }
  });
};

export const orthogonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter(function(to) {
    if (from.x === to.x && from.y === to.y) {
      return false;
    } else {
      return vectorOrthogonal(point(from), point(to));
    }
  });
};

export const orthogonalOrDiagonal = function(squares: Array<Square>, from: Square): Array<Square> {
  return squares.filter(function(to) {
    if (from.x === to.x && from.y === to.y) {
      return false;
    } else {
      return vectorOrthogonalOrDiagonal(point(from), point(to));
    }
  });
};

export const allMovesForPlayer = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  let playerSquares = occupiedByPlayer(squares, playerNumber);
  let jumps = allPossibleJumps(playerSquares, squares);
  let moves = allPossibleMoves(playerSquares, squares);
  return (jumps.length > 0 ? jumps : moves);
};

export const allPossibleJumps = function(squares: Array<Square>, boardSquares: Array<Square>): Array<Square> {
  return squares.filter(function(s) {
    if (s.piece !== null) {
      return possibleJumps(s, s.piece, boardSquares).length > 0;
    } else {
      return false;
    }
  });
};

export const allPossibleMoves = function(squares: Array<Square>, boardSquares: Array<Square>): Array<Square> {
  return squares.filter(function(s) {
    if (s.piece !== null) {
      return possibleMoves(s, s.piece, boardSquares).length > 0;
    } else {
      return false;
    }
  });
};

export const deselectSquares = function(squares: Array<Square>): boolean {
  let square = squares.find(function(s) { return s.piece !== null && s.piece.selected; });
  if (square !== undefined) {
    return deselect(square);
  } else {
    return false
  }
};

export const unmarkSquares = function(squares: Array<Square>) {
  let square = squares.find(function(s) { return s.marked; });
  if (square !== undefined) {
    return unmark(square);
  } else {
    return true;
  }
};
