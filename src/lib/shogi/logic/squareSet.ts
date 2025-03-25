import type Square from '$lib/shogi/interfaces/Square';
import type GameState from '$lib/shogi/interfaces/GameState';

import uniqArr from '$lib/utils/uniq';

import {
  add
} from '$lib/shogi/logic/point';
import {
  distance as vectorDistance,
  direction as vectorDirection,
  directionY,
  absDx,
  absDy,
  diagonal as vectorDiagonal,
  orthogonal as vectorOrthogonal,
  orthogonalOrDiagonal as vectorOrthogonalOrDiagonal
} from '$lib/shogi/logic/vector';
import {
  destinations,
  captureSquares
} from '$lib/shogi/logic/piece';
import {
  occupiedByPieceType as squareOccupiedByPieceType,
  notOccupiedByPieceType as squareNotOccupiedByPieceType,
  occupiedByPlayer as squareOccupiedByPlayer,
  unoccupied as squareUnoccupied,
  unoccupiedOrOccupiedByOpponentOf as squareUnoccupiedOrOccupiedByOpponentOf,
  point
} from '$lib/shogi/logic/square';

// operators

export const includes = function(squares: Array<Square>, square: Square): boolean {
  return squares.some((s) => {
    return s.id === square.id;
  });
};

export const uniq = function(squares: Array<Square>): Array<Square> {
  let ids = uniqArr(squares.map((s) => {
    return s.id;
  }));

  let acc: Array<Square> = [];

  ids.map((id) => {
    let square = squares.find((s) => { return s.id === id; });
    if (square !== undefined) {
      acc.push(square);
    }
  });

  return acc;
};

export const union = function(a: Array<Square>, b: Array<Square>): Array<Square> {
  return uniq(a.concat(b));
};

// finders
export const findSelected = function(squares: Array<Square>): Square | undefined {
  return squares.find((s) => {
    return s.piece !== null && s.piece.selected;
  });
};

export const findById = function(squares: Array<Square>, id: string): Square | undefined {
  return squares.find((s) => {
    return s.id === id;
  });
};

// filters

export const occupiedByPieceType = function(squares: Array<Square>, pieceType: Array<string>): Array<Square> {
  return squares.filter((s) => {
    return squareOccupiedByPieceType(s, pieceType);
  });
};

export const occupiedByPlayer = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter((s) => {
    return squareOccupiedByPlayer(s, playerNumber);
  });
};

export const unoccupiedOrOccupiedByOpponentOf = function(squares: Array<Square>, playerNumber: number): Array<Square> {
  return squares.filter((s) => {
    return squareUnoccupiedOrOccupiedByOpponentOf(s, playerNumber);
  });
};

export const excludingPieceType = function(squares: Array<Square>, pieceType: Array<string>): Array<Square> {
  return squares.filter((s) => {
    return squareNotOccupiedByPieceType(s, pieceType);
  });
};

export const atRange = function(squares: Array<Square>, square: Square, distance: number): Array<Square> {
  return squares.filter((s) => {
    return vectorDistance(point(square), point(s)) === distance;
  });
};

export const inRange = function(squares: Array<Square>, square: Square, distance: number): Array<Square> {
  return squares.filter((s) => {
    return vectorDistance(point(square), point(s)) <= distance;
  });
};

export const inDirection = function(squares: Array<Square>, square: Square, playerNumber: number): Array<Square> {
  let direction = (playerNumber === 1 ? -1 : 1);
  return squares.filter((s) => {
    return directionY(point(square), point(s)) === direction;
  });
};

export const ranksAway = function(squares: Array<Square>, square: Square, distance: number): Array<Square> {
  return squares.filter((s) => {
    return absDy(point(square), point(s)) === distance;
  });
};

export const filesAway = function(squares: Array<Square>, square: Square, distance: number): Array<Square> {
  return squares.filter((s) => {
    return absDx(point(square), point(s)) === distance;
  });
};

export const diagonal = function(squares: Array<Square>, square: Square): Array<Square> {
  return squares.filter((s) => {
    return vectorDiagonal(point(square), point(s));
  });
};

export const orthogonal = function(squares: Array<Square>, square: Square): Array<Square> {
  return squares.filter((s) => {
    return vectorOrthogonal(point(square), point(s));
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

export const whereX = function(squares: Array<Square>, x: number) {
  return squares.filter((s) => {
    return s.x === x;
  });
};

// shogi specific

export const findOuForPlayer = function(squares: Array<Square>, playerNumber: number): Square | undefined {
  let ouSquares = occupiedByPieceType(squares, ['gyokushou', 'oushou']);
  let playerSquares = occupiedByPlayer(ouSquares, playerNumber);
  return playerSquares[0];
};

export const threatsToSquare = function(squares: Array<Square>, square: Square, playerNumber: number, gameState: GameState): Array<Square> {
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let opposingSquares = excludingPieceType(occupiedByPlayer(squares, opposingPlayer), ['gyokushou', 'oushou']);
  return opposingSquares.filter((s) => {
    if (s.piece !== null) {
      let threatenedSquares = captureSquares(s.piece, s, gameState);
      return threatenedSquares.some((t) => { return t.id === square.id; });
    } else {
      return false;
    }
  });
};

export const pinThreatsToSquare = function(squares: Array<Square>, square: Square, playerNumber: number, gameState: GameState): Array<Square> {
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let opposingSquares = occupiedByPieceType(occupiedByPlayer(squares, opposingPlayer), ['hisha', 'ryuuou', 'kakugyou', 'ryouma', 'kyousha']);
  // opposing squares have between squares occupied by player. i.e. pin
  return opposingSquares.filter((opposingSquare) => {
    if (opposingSquare.piece !== null) {
      let threatenedSquares = destinations(opposingSquare.piece, opposingSquare, gameState, true);
      if (threatenedSquares.some((t) => { return t.id === square.id; })) {
        let betweenSquares = between(gameState.squares, opposingSquare, square);
        // between squares occupied by player
        return betweenSquares.some((b) => {
          return b.piece !== null && b.piece.playerNumber === playerNumber;
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
};

export const pinnedToSquare = function(squares: Array<Square>, square: Square, playerNumber: number, gameState: GameState): Array<Square> {
    let pinThreatsToOu = pinThreatsToSquare(squares, square, playerNumber, gameState);
    return pinThreatsToOu.map((pt) => {
      return between(gameState.squares, pt, square).filter((b) => {
        return b.piece !== null && b.piece.playerNumber === playerNumber;
      });
    }).flat();
};

export const threatenedBy = function(squares: Array<Square>, playerNumber: number, gameState: GameState): Array<Square> {
  return uniq(excludingPieceType(occupiedByPlayer(squares, playerNumber), ['gyokushou', 'oushou']).map((s) => {
    if (s.piece !== null) {
      return captureSquares(s.piece, s, gameState);
    } else {
      return [];
    }
  }).flat());
};
