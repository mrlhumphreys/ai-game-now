import { describe, it, expect } from 'vitest';

import rookMoveGameState from '../fixtures/rookMoveGameState';

import { 
  difference,
  intersection,
  uniq,
  includes,
  findById,
  findByCoordinate,
  findByPieceId,
  findSelected,
  unoccupied,
  occupiedByPlayer,
  occupiedByOpponentOf,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByPieceType,
  notOccupiedByPieceType,
  unblocked,
  between,
  inRange,
  atRange,
  inDirection,
  orthogonal,
  diagonal,
  sideways,
  orthogonalOrDiagonal,
  notOrthogonalOrDiagonal,
  findKingForPlayer,
  unmoved,
  threatenedBy
} from '$lib/chess/logic/squareSet';

// set operations
describe('difference', () => {
  it('returns squares in a that do not exist in b', () => {
    let squaresA = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let squaresB = [
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: null }
    ];
    let result = difference(squaresA, squaresB);
    expect(result).toEqual(expected);
  });
});

describe('intersection', () => {
  it('returns squares that belong in both a and b', () => {
    let squaresA = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let squaresB = [
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let result = intersection(squaresA, squaresB);
    expect(result).toEqual(expected);
  });
});

describe('uniq', () => {
  it('returns an array with only uniq squares', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = uniq(squares);
    expect(result).toEqual(expected);
  });
});

describe('includes', () => {
  it('returns true if the square is in the set', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null },
    ];
    let square = { id: 'a6', x: 0, y: 2, piece: null };
    let result = includes(squares, square);
    expect(result).toBe(true);
  });

  it('returns false if the square is not in the set', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null },
    ];
    let square = { id: 'a5', x: 0, y: 3, piece: null };
    let result = includes(squares, square);
    expect(result).toBe(false);
  });
});

describe('findById', () => {
  it('returns the square matching the id', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let expected = { id: 'a8', x: 0, y: 0, piece: null };
    let result = findById(squares, 'a8');
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no matching square', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let result = findById(squares, 'xx');
    expect(result).toBe(undefined);
  });
});

describe('findByCoordinate', () => {
  it('returns the square matching the coordinates', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let expected = { id: 'a8', x: 0, y: 0, piece: null };
    let result = findByCoordinate(squares, 0, 0);
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no matching square', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let result = findByCoordinate(squares, -1, -1);
    expect(result).toBe(undefined);
  });
});

describe('findByPieceId', () => {
  it('returns the square with the piece matching the id', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let expected = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    let result = findByPieceId(squares, 0);
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no matching square', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = findByPieceId(squares, -1);
    expect(result).toBe(undefined);
  });
});

describe('findSelected', () => {
  it('returns the square with the piece selected', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let expected = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } };
    let result = findSelected(squares);
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no square with piece selected', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = findSelected(squares);
    expect(result).toBe(undefined);
  });
});

describe('unoccupied', () => {
  it('returns unoccupied squares', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = unoccupied(squares);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByPlayer', () => {
  it('returns squares occupied by player', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } }
    ];
    let result = occupiedByPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByOpponentOf', () => {
  it('returns squares occupied by player', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = occupiedByOpponentOf(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('unoccupiedOrOccupiedByOpponentOf', () => {
  it('returns squares occupied by player', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = unoccupiedOrOccupiedByOpponentOf(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByPieceType', () => {
  it('returns squares occupied by pieces matching type', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } }
    ];
    let result = occupiedByPieceType(squares, 'king');
    expect(result).toEqual(expected);
  });
});

describe('notOccupiedByPieceType', () => {
  it('returns squares not occupied by pieces matching type', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = notOccupiedByPieceType(squares, 'king');
    expect(result).toEqual(expected);
  });
});

describe('unblocked', () => {
  it('returns squares that are unblocked', () => {
    let squares = [
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a5', x: 0, y: 3, piece: null }
    ];
    let board = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: false, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a5', x: 0, y: 3, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: false, hasMoved: false } };
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let result = unblocked(squares, origin, board);
    expect(result).toEqual(expected);
  });
});

describe('between', () => {
  it('returns squares between origin and destination', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: false, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: false, hasMoved: false } };
    let destination = { id: 'a6', x: 0, y: 2, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: null }
    ];
    let result = between(squares, origin, destination);
    expect(result).toEqual(expected);
  });
});

describe('inRange', () => {
  it('returns all squares that at the distance or less', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = inRange(squares, origin, 1);
    expect(result).toEqual(expected);
  });
});

describe('atRange', () => {
  it('returns all squares that at the distance', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = atRange(squares, origin, 1);
    expect(result).toEqual(expected);
  });
});

describe('inDirection', () => {
  it('returns squares where y is less than origin for player 1', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'king', selected: true, hasMoved: false } }
    ];
    let result = inDirection(squares, origin, 1);
    expect(result).toEqual(expected);
  });

  it('returns squares where y is less than origin for player 2', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a7', x: 0, y: 1, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    let expected = [
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = inDirection(squares, origin, 2);
    expect(result).toEqual(expected);
  });
});

describe('orthogonal', () => {
  it('returns all squares in the same rank or file as the origin', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = orthogonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('diagonal', () => {
  it('returns all squares in diagonal from the origin', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b7', x: 1, y: 1, piece: null }
    ];
    let result = diagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('sideways', () => {
  it('returns squares in the same rank as origin', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null }
    ];
    let result = sideways(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('orthogonalOrDiagonal', () => {
  it('returns squares that are orthogonal or diagonal to origin', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let result = orthogonalOrDiagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('notOrthogonalOrDiagonal', () => {
  it('returns squares that are not orthogonal or diagonal', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'b8', x: 1, y: 0, piece: null },
      { id: 'c8', x: 2, y: 0, piece: null },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'b7', x: 1, y: 1, piece: null },
      { id: 'c7', x: 2, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null }
    ];
    let origin = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let expected = [
      { id: 'c7', x: 2, y: 1, piece: null }
    ];
    let result = notOrthogonalOrDiagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

// chess specific

describe('findKingForPlayer', () => {
  it('returns the square containing the players king', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: { id: 1, playerNumber: 2, type: 'king', selected: false, hasMoved: false } }
    ];
    let expected = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'king', selected: true, hasMoved: false } };
    let result = findKingForPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('unmoved', () => {
  it('returns squares with unmoved pieces', () => {
    let squares = [
      { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: true } },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let expected = [
      { id: 'a6', x: 0, y: 2, piece: { id: 1, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } }
    ];
    let result = unmoved(squares);
    expect(result).toEqual(expected);
  });
});

describe('threatenedBy', () => {
  it('returns squares that the player can move a piece to', () => {
    let gameState = rookMoveGameState();
    let playerNumber = 1;
    let expected = [
      { id: 'h8', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
      { id: 'h7', x: 7, y: 1, piece: null },
      { id: 'h6', x: 7, y: 2, piece: null },
      { id: 'h5', x: 7, y: 3, piece: null },
      { id: 'h4', x: 7, y: 4, piece: null },
      { id: 'h3', x: 7, y: 5, piece: null },
      { id: 'b2', x: 1, y: 6, piece: { id: 10, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
      { id: 'c2', x: 2, y: 6, piece: null },
      { id: 'd2', x: 3, y: 6, piece: null },
      { id: 'e2', x: 4, y: 6, piece: null },
      { id: 'f2', x: 5, y: 6, piece: null },
      { id: 'g2', x: 6, y: 6, piece: null },
      { id: 'h1', x: 7, y: 7, piece: null },
      { id: 'a8', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
      { id: 'a7', x: 0, y: 1, piece: null },
      { id: 'a6', x: 0, y: 2, piece: null },
      { id: 'a5', x: 0, y: 3, piece: null },
      { id: 'a4', x: 0, y: 4, piece: null },
      { id: 'a3', x: 0, y: 5, piece: null },
      { id: 'a2', x: 0, y: 6, piece: null },
      { id: 'b1', x: 1, y: 7, piece: null },
      { id: 'c1', x: 2, y: 7, piece: null },
      { id: 'd1', x: 3, y: 7, piece: null },
      { id: 'f1', x: 5, y: 7, piece: null },

    ];
    let result = threatenedBy(gameState.squares, playerNumber, gameState);
    expect(result).toEqual(expected);
  });
});

