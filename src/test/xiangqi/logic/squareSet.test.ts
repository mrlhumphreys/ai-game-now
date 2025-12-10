import { describe, it, expect } from 'vitest';

import inCheckGameState from '../fixtures/inCheckGameState';
import inCheckmatePinnedGameState from '../fixtures/inCheckmatePinnedGameState';
import inCheckmatePinnedByCannonGameState from '../fixtures/inCheckmatePinnedByCannonGameState';
import defaultGameState from '../fixtures/defaultGameState';

import {
  includes,
  uniq,
  union,
  where,
  findSelected,
  findById,
  occupiedByPieceType,
  occupiedByPlayer,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByOpponentOf,
  excludingPieceType,
  atRange,
  inRange,
  inDirection,
  ranksAway,
  filesAway,
  ranksAbove,
  ranksBelow,
  sameRank,
  diagonal,
  orthogonal,
  notOrthogonalOrDiagonal,
  unblocked,
  betweenContainsExactlyOnePiece,
  betweenContainsAtLeastOnePiece,
  between,
  whereX,
  findKingForPlayer,
  threatsToSquare,
  pinThreatsToSquare,
  pinnedToSquare,
  threatenedBy
} from '$lib/xiangqi/logic/squareSet';

describe('includes', () => {
  it('returns true if the square is in the set', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let square = { id: '74', x: 2, y: 3, piece: null };
    let result = includes(squares, square);
    expect(result).toBe(true);
  });

  it('returns false if the square is not in the set', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let square = { id: '64', x: 3, y: 3, piece: null };
    let result = includes(squares, square);
    expect(result).toBe(false);
  });
});

describe('uniq', () => {
  it('returns an array with only uniq squares', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let result = uniq(squares);
    expect(result).toEqual(expected);
  });
});

describe('union', () => {
  it('returns a uniq set of combined squares', () => {
    let a = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null }
    ];
    let b = [
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let result = union(a, b);
    expect(result).toEqual(expected);
  });
});

describe('where', () => {
  it('returns squares matching the conditions', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let conditions = {
      x: [1, 2],
      y: [3]
    };
    let expected = [
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let result = where(squares, conditions);
    expect(result).toEqual(expected);
  });
});

describe('findSelected', () => {
  it('returns the square with the piece selected', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier' as const, selected: true } }
    ];
    let expected = { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier', selected: true } };
    let result = findSelected(squares);
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no square with piece selected', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier' as const, selected: false } }
    ];
    let result = findSelected(squares);
    expect(result).toBe(undefined);
  });
});

describe('findById', () => {
  it('returns the square matching the id', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null }
    ];
    let expected = { id: '84', x: 1, y: 3, piece: null };
    let result = findById(squares, '84');
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no matching square', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null }
    ];
    let result = findById(squares, 'xx');
    expect(result).toBe(undefined);
  });
});

describe('occupiedByPieceType', () => {
  it('returns squares occupied by pieces matching type', () => {
    let squares = [
      { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor' as const, selected: false } },
      { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } },
      { id: '41', x: 5, y: 0, piece: { id: 6, playerNumber: 2, type: 'advisor' as const, selected: false } }
    ];
    let expected = [
      { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king', selected: false } }
    ];
    let result = occupiedByPieceType(squares, ['king', 'king']);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByPlayer', () => {
  it('returns squares occupied by player', () => {
    let squares = [
      { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '16', x: 8, y: 5, piece: null },
      { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } }
    ];
    let expected = [
      { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier', selected: false } }
    ];
    let result = occupiedByPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('unoccupiedOrOccupiedByOpponentOf', () => {
  it('returns squares unoccupied or occupied by opponent of player', () => {
    let squares = [
      { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '16', x: 8, y: 5, piece: null },
      { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } }
    ];
    let expected = [
      { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier', selected: false } },
      { id: '16', x: 8, y: 5, piece: null }
    ];
    let result = unoccupiedOrOccupiedByOpponentOf(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByOpponentOf', () => {
  it('returns squares unoccupied or occupied by opponent of player', () => {
    let squares = [
      { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '16', x: 8, y: 5, piece: null },
      { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } }
    ];
    let expected = [
      { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier', selected: false } }
    ];
    let result = occupiedByOpponentOf(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('excludingPieceType', () => {
  it('returns squares not occupied by pieces matching type', () => {
    let squares = [
      { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor' as const, selected: false } },
      { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } },
      { id: '41', x: 5, y: 0, piece: { id: 6, playerNumber: 2, type: 'advisor' as const, selected: false } }
    ];
    let expected = [
      { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor', selected: false } },
      { id: '41', x: 5, y: 0, piece: { id: 6, playerNumber: 2, type: 'advisor', selected: false } }
    ];
    let result = excludingPieceType(squares, ['king', 'king']);
    expect(result).toEqual(expected);
  });
});

describe('atRange', () => {
  it('returns all squares that at the distance', () => {
    let squares = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: null },
      { id: '52', x: 4, y: 1, piece: null }
    ];
    let origin = { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let expected = [
      { id: '62', x: 3, y: 1, piece: null }
    ];
    let result = atRange(squares, origin, 2);
    expect(result).toEqual(expected);
  });
});

describe('inRange', () => {
  it('returns all squares that at the distance or less', () => {
    let squares = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: null },
      { id: '52', x: 4, y: 1, piece: null }
    ];
    let origin = { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let expected = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot', selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: null }
    ];
    let result = inRange(squares, origin, 2);
    expect(result).toEqual(expected);
  });
});

describe('inDirection', () => {
  it('returns squares where y is less than origin for player 1', () => {
    let squares = [
      { id: '96', x: 0, y: 5, piece: null },
      { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '98', x: 0, y: 7, piece: null },
    ];
    let origin = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } };
    let expected = [
      { id: '96', x: 0, y: 5, piece: null }
    ];
    let result = inDirection(squares, origin, 1);
    expect(result).toEqual(expected);
  });
});

describe('ranksAway', () => {
  it('returns squares in the rank that is distance away', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '95', x: 0, y: 4, piece: null },
      { id: '85', x: 1, y: 4, piece: null },
    ];
    let origin = { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } };
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null }
    ];

    let result = ranksAway(squares, origin, 1);
    expect(result).toEqual(expected);
  });
});

describe('filesAway', () => {
  it('returns squares in the rank that is distance away', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let origin = { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } };
    let expected = [
      { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'soldier', selected: false } },
      { id: '84', x: 1, y: 3, piece: null }
    ];

    let result = filesAway(squares, origin, 1);
    expect(result).toEqual(expected);
  });
});

describe('ranksAbove', () => {
  it('returns squares with y coordinate greater than number', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: null },
      { id: '83', x: 1, y: 2, piece: null },
      { id: '73', x: 2, y: 2, piece: null },
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let result = ranksAbove(squares, 2); 
    expect(result).toEqual(expected);
  });
});

describe('ranksBelow', () => {
  it('returns squares with y coordinate less than number', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: null },
      { id: '83', x: 1, y: 2, piece: null },
      { id: '73', x: 2, y: 2, piece: null },
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let expected = [
      { id: '93', x: 0, y: 2, piece: null },
      { id: '83', x: 1, y: 2, piece: null },
      { id: '73', x: 2, y: 2, piece: null }
    ];
    let result = ranksBelow(squares, 3); 
    expect(result).toEqual(expected);
  });
});

describe('sameRank', () => {
  it('returns squares with the same y coordinate', () => {
    let squares = [
      { id: '93', x: 0, y: 2, piece: null },
      { id: '83', x: 1, y: 2, piece: null },
      { id: '73', x: 2, y: 2, piece: null },
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let origin = { id: '94', x: 0, y: 3, piece: null };
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '74', x: 2, y: 3, piece: null }
    ];
    let result = sameRank(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('diagonal', () => {
  it('returns all squares in diagonal from the origin', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '95', x: 0, y: 4, piece: null },
      { id: '85', x: 1, y: 4, piece: null }
    ];
    let origin = { id: '94', x: 0, y: 3, piece: null };
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '85', x: 1, y: 4, piece: null }
    ];
    let result = diagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('orthogonal', () => {
  it('returns all squares in orthogonal from the origin', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '95', x: 0, y: 4, piece: null },
      { id: '85', x: 1, y: 4, piece: null }
    ];
    let origin = { id: '94', x: 0, y: 3, piece: null };
    let expected = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '95', x: 0, y: 4, piece: null }
    ];
    let result = orthogonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('notOrthogonalOrDiagonal', () => {
  it('returns all squares not orthogonal or diagonal from the origin', () => {
    let squares = [
      { id: '94', x: 0, y: 3, piece: null },
      { id: '84', x: 1, y: 3, piece: null },
      { id: '95', x: 0, y: 4, piece: null },
      { id: '85', x: 1, y: 4, piece: null },
      { id: '75', x: 2, y: 4, piece: null }
    ];
    let origin = { id: '94', x: 0, y: 3, piece: null };
    let expected = [
      { id: '75', x: 2, y: 4, piece: null }
    ];
    let result = notOrthogonalOrDiagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('unblocked', () => {
  it('returns squares that are unblocked', () => {
    let squares = [
      { id: '92', x: 0, y: 1, piece: null },
      { id: '82', x: 1, y: 1, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '52', x: 4, y: 1, piece: null },
      { id: '42', x: 5, y: 1, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '32', x: 6, y: 1, piece: null }
    ];
    let board = [
      { id: '92', x: 0, y: 1, piece: null },
      { id: '82', x: 1, y: 1, piece: { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '52', x: 4, y: 1, piece: null },
      { id: '42', x: 5, y: 1, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '32', x: 6, y: 1, piece: null }
    ];
    let origin = { id: '62', x: 3, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let expected = [
      { id: '82', x: 1, y: 1, piece: { id: 12, playerNumber: 2, type: 'soldier', selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot', selected: false } },
      { id: '52', x: 4, y: 1, piece: null },
      { id: '42', x: 5, y: 1, piece: { id: 21, playerNumber: 1, type: 'soldier', selected: false } }
    ];
    let result = unblocked(squares, origin, board);
    expect(result).toEqual(expected);
  });
});

describe('betweenContainsExactlyOnePiece', () => {
  it('returns squares from origin where there is only one piece in between', () => {
    let squares = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: null },
      { id: '52', x: 4, y: 1, piece: { id: 22, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '42', x: 5, y: 1, piece: null }
    ];
    let origin = { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let expected = [
      { id: '42', x: 5, y: 1, piece: null }
    ];
    let result = betweenContainsExactlyOnePiece(squares, origin, squares);
    expect(result).toEqual(expected);
  });
});

describe('betweenContainsExactlyOnePiece', () => {
  it('returns squares from origin where there is at least one piece in between', () => {
    let squares = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '52', x: 4, y: 1, piece: { id: 22, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '42', x: 5, y: 1, piece: null }
    ];

    let origin = { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let expected = [
      { id: '52', x: 4, y: 1, piece: { id: 22, playerNumber: 1, type: 'soldier' as const, selected: false } },
      { id: '42', x: 5, y: 1, piece: null }
    ];

    let result = betweenContainsAtLeastOnePiece(squares, origin, squares);
    expect(result).toEqual(expected);
  });
});

describe('between', () => {
  it('returns squares between origin and destination', () => {
    let squares = [
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } },
      { id: '72', x: 2, y: 1, piece: null },
      { id: '62', x: 3, y: 1, piece: null },
      { id: '52', x: 4, y: 1, piece: null },
    ];
    let origin = { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } };
    let destination = { id: '62', x: 3, y: 1, piece: null };
    let expected = [
      { id: '72', x: 2, y: 1, piece: null }
    ];
    let result = between(squares, origin, destination);
    expect(result).toEqual(expected);
  });
  
  it('returns the square in between origin and destination for horse', () => {
    let squares = [
      { id: '56', 'x': 4, 'y': 5, 'piece': null },
      { id: '46', 'x': 5, 'y': 5, 'piece': null },
      { id: '36', 'x': 6, 'y': 5, 'piece': null },

      { 'id': '57', 'x': 4, 'y': 6, 'piece': { 'id': 31, 'playerNumber': 1, 'type': 'horse' as const, 'selected': false } },
      { 'id': '47', 'x': 5, 'y': 6, 'piece': { 'id': 15, 'playerNumber': 2, 'type': 'soldier' as const, 'selected': false } },
      { 'id': '37', 'x': 6, 'y': 6, 'piece': null },

      { 'id': '58', 'x': 4, 'y': 7, 'piece': null },
      { 'id': '48', 'x': 5, 'y': 7, 'piece': null },
      { 'id': '38', 'x': 6, 'y': 7, 'piece': null }
    ];

    let origin = { 'id': '57', 'x': 4, 'y': 6, 'piece': { 'id': 31, 'playerNumber': 1, 'type': 'horse' as const, 'selected': false } };
    let destination = { 'id': '36', 'x': 6, 'y': 5, 'piece': null };

    let expected = [
      { 'id': '47', 'x': 5, 'y': 6, 'piece': { 'id': 15, 'playerNumber': 2, 'type': 'soldier' as const, 'selected': false } }
    ];

    let result = between(squares, origin, destination);
    expect(result).toEqual(expected);
  });
});

describe('whereX', () => {
  it('returns squares matching x', () => {
    let squares = [
      { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'cannon' as const, selected: false } },
      { id: '81', x: 1, y: 0, piece: { id: 2, playerNumber: 2, type: 'horse' as const, selected: false } },
      { id: '92', x: 0, y: 1, piece: null },
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot' as const, selected: false } }
    ];
    let expected = [
      { id: '81', x: 1, y: 0, piece: { id: 2, playerNumber: 2, type: 'horse', selected: false } },
      { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'chariot', selected: false } }
    ];
    let result = whereX(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('findKingForPlayer', () => {
  it('returns squares occupied by king or king', () => {
    let squares = [
      { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } },
      { id: '59', x: 4, y: 8, piece: { id: 36, playerNumber: 1, type: 'king' as const, selected: false } }
    ];
    let expected = { id: '59', x: 4, y: 8, piece: { id: 36, playerNumber: 1, type: 'king', selected: false } };
    let result = findKingForPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('threatsToSquare', () => {
  it('returns squares that have pieces that could capture a piece on target square', () => {
    let gameState = inCheckGameState();
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } };
    let playerNumber = 2;
    let expected = [
      { id: '91', x: 0, y: 0, piece: { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false } }
    ];
    let result = threatsToSquare(gameState.squares, square, playerNumber, gameState);
    expect(result).toEqual(expected);
  });
});

describe('pinThreatsToSquare', () => {
  it('returns squares that have pinned a piece to target square', () => {
    let gameState = inCheckmatePinnedGameState();
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } };
    let playerNumber = 2;
    let expected = [
      { id: '91', x: 0, y: 0, piece: { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false } }
    ];
    let result = pinThreatsToSquare(gameState.squares, square, playerNumber, gameState);
    expect(result).toEqual(expected);
  });

  it('returns cannon squares that have pinned a piece to target square', () => {
    let gameState = inCheckmatePinnedByCannonGameState();
    let square = { 'id': '510', 'x': 4, 'y': 9, 'piece': { 'id': 28, 'playerNumber': 1, 'type': 'king' as const, 'selected': false } };
    let playerNumber = 1;
    let expected = [
      { 'id': '53', 'x': 4, 'y': 2, 'piece': { 'id': 10, 'playerNumber': 2, 'type': 'cannon' as const, 'selected': false } }
    ];
    let result = pinThreatsToSquare(gameState.squares, square, playerNumber, gameState);
    expect(result).toEqual(expected);
  });
});

describe('pinnedToSquare', () => {
  it('returns squares that have been pinned to a target square', () => {
    let gameState = inCheckmatePinnedGameState();
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } };
    let playerNumber = 2;
    let expected = [
      { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor' as const, selected: false } }
    ];
    let result = pinnedToSquare(gameState.squares, square, playerNumber, gameState);
    expect(result).toEqual(expected);
  });
});

describe('threatenedBy', () => {
  it('returns squares that the player can move a piece to', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let expected = [
      { "id": "96", "piece": null, "x": 0, "y": 5 },
      { "id": "76", "piece": null, "x": 2, "y": 5 },
      { "id": "56", "piece": null, "x": 4, "y": 5 },
      { "id": "36", "piece": null, "x": 6, "y": 5 },
      { "id": "16", "piece": null, "x": 8, "y": 5 },
      { id: '81', x: 1, y: 0, piece: { id: 2, playerNumber: 2, type: 'horse' as const, selected: false } },
      { "id": "84", "piece": null, "x": 1, "y": 3 },
      { "id": "85", "piece": null, "x": 1, "y": 4 },
      { "id": "86", "piece": null, "x": 1, "y": 5 },
      { "id": "87", "piece": null, "x": 1, "y": 6 },
      { "id": "98", "piece": null, "x": 0, "y": 7 },
      { "id": "78", "piece": null, "x": 2, "y": 7 },
      { "id": "68", "piece": null, "x": 3, "y": 7 },
      { "id": "58", "piece": null, "x": 4, "y": 7 },
      { "id": "48", "piece": null, "x": 5, "y": 7 },
      { "id": "38", "piece": null, "x": 6, "y": 7 },
      { "id": "89", "piece": null, "x": 1, "y": 8 },
      { id: '21', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'horse' as const, selected: false } },
      { "id": "24", "piece": null, "x": 7, "y": 3 },
      { "id": "25", "piece": null, "x": 7, "y": 4 },
      { "id": "26", "piece": null, "x": 7, "y": 5 },
      { "id": "27", "piece": null, "x": 7, "y": 6 },
      { "id": "18", "piece": null, "x": 8, "y": 7 },
      { "id": "29", "piece": null, "x": 7, "y": 8 },
      { "id": "99", "piece": null, "x": 0, "y": 8 },
      { "id": "59", "piece": null, "x": 4, "y": 8 },
      { "id": "19", "piece": null, "x": 8, "y": 8 }
    ];
    let result = threatenedBy(gameState.squares, playerNumber, gameState);
    expect(result).toEqual(expected);
  });
});
