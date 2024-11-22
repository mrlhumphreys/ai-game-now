import { describe, it, expect, assert } from 'vitest';

import {
  includes,
  playerNumber,
  findById,
  occupied,
  unoccupied,
  occupiedBy,
  occupiedByOpponent,
  adjacent,
  chains,
  territories,
  territoriesFor,
  libertiesFor,
  surroundedByEnemies,
  deprivesLiberties,
  deprivesOpponentsLiberties,
  updateJoinedChains,
  captureStones,
  minify,
  place,
  nextStoneId,
  adjacentChainId,
  nextChainId,
  buildStone,
  performMove,
  markTerritories,
} from '$lib/go/logic/pointSet';

describe('includes', () => {
  it('returns true if point is included', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = includes(points, pointA);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if point is not included', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointB];
    let result = includes(points, pointA);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('playerNumber', () => {
  it('returns returns the playerNumber of the stone on the first point', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = playerNumber(points);
    let expected = 1;
    expect(result).toEqual(expected);
  });

  it('returns null if the first point has no stone', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = playerNumber(points);
    expect(result).toBe(null);
  });
});

describe('findById', () => {
  it('returns the point if the id matches', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = findById(points, 'aa');
    let expected = pointA;
    expect(result).toEqual(expected);
  });

  it('returns undefined if no id matches', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = findById(points, 'ca');
    expect(result).toBe(undefined);
  });
});

describe('occupied', () => {
  it('returns points with stones', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = occupied(points);
    let expected = [ { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null } ];
    expect(result).toEqual(expected);
  });
});

describe('unoccupied', () => {
  it('returns points without stones', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = unoccupied(points);
    let expected = [{ id: 'ba', x: 1, y: 1, stone: null, territoryId: null }];
    expect(result).toEqual(expected);
  });
});

describe('occupiedBy', () => {
  it('returns points with stones owned by player', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB];
    let result = occupiedBy(points, 1);
    let expected = [{ id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null }];
    expect(result).toEqual(expected);
  });
});

describe('occupiedByOpponent', () => {
  it('returns', () => {
    let pointA = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 1, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB];
    let result = occupiedByOpponent(points, 1);
    let expected = [{ id: 'ba', x: 1, y: 1, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null }];
    expect(result).toEqual(expected);
  });
});

describe('adjacent', () => {
  it('returns points orthogonally adjacent to point', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 0, y: 1, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = adjacent(points, pointA);
    let expected = [
      { id: 'ba', x: 0, y: 1, stone: null, territoryId: null },
      { id: 'ca', x: 1, y: 0, stone: null, territoryId: null }
    ];
    expect(result).toEqual(expected);
  });

  it('returns points orthogonally adjacent to points', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 0, y: 1, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = adjacent(points, [pointA, pointC]);
    let expected = [
      { id: 'ba', x: 0, y: 1, stone: null, territoryId: null },
      { id: 'da', x: 1, y: 1, stone: null, territoryId: null }
    ];
    expect(result).toEqual(expected);
  });
});

describe('chains', () => {
  it('returns the list of chains for the points', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 0, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = chains(points);
    let expected = [
      [
        { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null },
        { id: 'ca', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null }
      ],
      [
        { id: 'ba', x: 0, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null },
        { id: 'da', x: 1, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null }
      ]
    ];
    expect(result).toEqual(expected);
  });

  it('returns a list of the specified chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 0, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = chains(points, [1]);
    let expected = [
      [
        { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null },
        { id: 'ca', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null }
      ]
    ];
    expect(result).toEqual(expected);
  });
});

describe('territories', () => {
  it('returns a list of all the territories', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: 1 };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 2, y: 0, stone: null, territoryId: null };

    let pointD = { id: 'da', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointE = { id: 'ea', x: 1, y: 1, stone: null, territoryId: null };
    let pointF = { id: 'fa', x: 2, y: 1, stone: { id: 3, playerNumber: 2, chainId: 3 }, territoryId: null };

    let pointG = { id: 'ga', x: 0, y: 2, stone: null, territoryId: null };
    let pointH = { id: 'ha', x: 1, y: 2, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null };
    let pointI = { id: 'ia', x: 2, y: 2, stone: null, territoryId: 2 };

    let points = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH, pointI];
    let result = territories(points);
    let expected = [
      [ { id: 'aa', x: 0, y: 0, stone: null, territoryId: 1 } ],
      [ { id: 'ia', x: 2, y: 2, stone: null, territoryId: 2 } ]
    ];
    expect(result).toEqual(expected);
  });

  it('returns a list of the specified territories', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: 1 };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 2, y: 0, stone: null, territoryId: null };

    let pointD = { id: 'da', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointE = { id: 'ea', x: 1, y: 1, stone: null, territoryId: null };
    let pointF = { id: 'fa', x: 2, y: 1, stone: { id: 3, playerNumber: 2, chainId: 3 }, territoryId: null };

    let pointG = { id: 'ga', x: 0, y: 2, stone: null, territoryId: null };
    let pointH = { id: 'ha', x: 1, y: 2, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null };
    let pointI = { id: 'ia', x: 2, y: 2, stone: null, territoryId: 2 };

    let points = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH, pointI];
    let result = territories(points, [1]);
    let expected = [
      [ { id: 'aa', x: 0, y: 0, stone: null, territoryId: 1 } ]
    ];
    expect(result).toEqual(expected);
  });
});

describe('territoriesFor', () => {
  it('returns territories for that player', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: 11 };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 2, y: 0, stone: null, territoryId: null };

    let pointD = { id: 'da', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointE = { id: 'ea', x: 1, y: 1, stone: null, territoryId: null };
    let pointF = { id: 'fa', x: 2, y: 1, stone: { id: 3, playerNumber: 2, chainId: 3 }, territoryId: null };

    let pointG = { id: 'ga', x: 0, y: 2, stone: null, territoryId: null };
    let pointH = { id: 'ha', x: 1, y: 2, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null };
    let pointI = { id: 'ia', x: 2, y: 2, stone: null, territoryId: 12 };

    let points = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH, pointI];
    let result = territoriesFor(points, 1);
    let expected = [
      [ { id: 'aa', x: 0, y: 0, stone: null, territoryId: 11 } ]
    ];
    expect(result).toEqual(expected);
  });
});

describe('libertiesFor', () => {
  it('returns the number of liberties around a point', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: 11 };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = libertiesFor(points, pointA);
    let expected = 1;
    expect(result).toEqual(expected);
  });

  it('returns the number of liberties around a chain', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: 11 };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 3, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = libertiesFor(points, [pointA, pointC]);
    let expected = 1;
    expect(result).toEqual(expected);
  });
});

describe('surroundedByEnemies', () => {
  it('returns true if completely surrounded by enemy stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 1, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let pointSet = [pointA, pointB, pointC, pointD];
    let playerNumber = 1;
    let result = surroundedByEnemies(pointSet, pointA, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if partially surrounded by enemy stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 1, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let pointSet = [pointA, pointB, pointC, pointD];
    let playerNumber = 1;
    let result = surroundedByEnemies(pointSet, pointA, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if completely surrounded by friendly stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 1, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let pointSet = [pointA, pointB, pointC, pointD];
    let playerNumber = 1;
    let result = surroundedByEnemies(pointSet, pointA, playerNumber);
    expect(result).toBe(false);
  });
});

describe('deprivesLiberties', () => {
  it('returns true if placing stone on point deprives the last liberty of players chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];

    let result = deprivesLiberties(points, pointC, 1);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if placing stone on point does not deprive the last liberty of players chain', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];

    let result = deprivesLiberties(points, pointC, 1);
    let expected = false;
    expect(result).toEqual(expected);
  });

  it('returns false if there are no adjacent chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];

    let result = deprivesLiberties(points, pointC, 1);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('deprivesOpponentsLiberties', () => {
  it('returns true if placing stone on point deprives the last liberty of opponents chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];

    let result = deprivesOpponentsLiberties(points, pointC, 1);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if placing stone on point deprives the last liberty of opponents chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];

    let result = deprivesOpponentsLiberties(points, pointC, 1);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('updateJoinedChains', () => {
  it('updates the adjacent chain ids to the new one', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 3, playerNumber: 1, chainId: 3 }, territoryId: null };
    let pointC = { id: 'ca', x: 2, y: 0, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB, pointC];
    updateJoinedChains(points, pointB.id, 1);
    expect(points.every(function(e) { return e.stone.chainId === 3 })).toBe(true);
  });
});

describe('captureStones', () => {
  it('removes the stones with no liberties not owned by the capturing player', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 3, playerNumber: 1, chainId: 3 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    captureStones(points, 1);
    let capturedPoint = points.find(function(p) { return p.id === 'aa'; });
    if (capturedPoint !== undefined) {
      expect(capturedPoint.stone).toBe(null);
    } else {
      assert.fail("expected point");
    }
  });
});

describe('minify', () => {
  it('returns a shortened form of the state', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let result = minify(points);
    let expected = '21--';
    expect(result).toEqual(expected);
  });
});

describe('place', () => {
  it('puts the stone on the point specified', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC, pointD];
    let stone = { id: 1, playerNumber: 1, chainId: 1 };
    place(points, 'aa', stone);
    let capturedPoint = points.find(function(p) { return p.id === 'aa'; });
    if (capturedPoint !== undefined) {
      expect(capturedPoint.stone).toEqual(stone);
    } else {
      assert.fail("expected point");
    }
  });
});

describe('nextStoneId', () => {
  it('returns 1 if no stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = nextStoneId(points);
    let expected = 1;
    expect(result).toEqual(expected);
  });

  it('returns 1 + the current max stone', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = nextStoneId(points);
    let expected = 2;
    expect(result).toEqual(expected);
  });
});

describe('adjacentChainId', () => {
  it('returns the chainId of adjacent stones if any', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let points = [pointA, pointB];
    let result = adjacentChainId(points, pointA, 1);
    let expected = 1;
    expect(result).toEqual(expected);
  });

  it('returns undefined if no adjacent stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = adjacentChainId(points, pointA, 1);
    expect(result).toBe(undefined);
  });
});

describe('nextChainId', () => {
  it('returns the max chain id + 1 if there are stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC];
    let result = nextChainId(points);
    let expected = 3;
    expect(result).toEqual(expected);
  });

  it('returns 1 if there are no stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB, pointC];
    let result = nextChainId(points);
    let expected = 1;
    expect(result).toEqual(expected);
  });
});

describe('buildStone', () => {
  it('returns a new stone with new id and chain id when alone', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let points = [pointA, pointB];
    let result = buildStone(points, pointA, 1);
    let expected = { id: 1, playerNumber: 1, chainId: 1 };
    expect(result).toEqual(expected);
  });

  it('returns a new stone with new id and adjacent chain id when next to friendly stone', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 2 }, territoryId: null };
    let points = [pointA, pointB];
    let result = buildStone(points, pointA, 1);
    let expected = { id: 2, playerNumber: 1, chainId: 2 };
    expect(result).toEqual(expected);
  });
});

describe('performMove', () => {
  it('places a stone for the player', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: null, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };

    let points = [pointA, pointB, pointC, pointD];
    performMove(points, pointA, 1);
    let placedPoint = points.find(function(p) { return p.id === 'aa' });
    let stone = { id: 1, playerNumber: 1, chainId: 1 };
    if (placedPoint !== undefined) {
      expect(placedPoint.stone).toEqual(stone);
    } else {
      assert.fail("expected point");
    }
  });

  it('updates joined chains', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: null, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };

    let points = [pointA, pointB, pointC, pointD];
    performMove(points, pointA, 1);
    let adjacentPoint = points.find(function(p) { return p.id === 'ca' });
    let stone = { id: 2, playerNumber: 1, chainId: 1 };
    if (adjacentPoint !== undefined) {
      expect(adjacentPoint.stone).toEqual(stone);
    } else {
      assert.fail("expected point");
    }
  });

  it('captures stones', () => {
    let pointA = { id: 'aa', x: 0, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let pointB = { id: 'ba', x: 1, y: 0, stone: { id: 2, playerNumber: 2, chainId: 2 }, territoryId: null };
    let pointC = { id: 'ca', x: 0, y: 1, stone: null, territoryId: null };
    let pointD = { id: 'da', x: 1, y: 1, stone: null, territoryId: null };

    let points = [pointA, pointB, pointC, pointD];
    performMove(points, pointC, 2);
    let capturedPoint = points.find(function(p) { return p.id === 'aa' });
    if (capturedPoint !== undefined) {
      expect(capturedPoint.stone).toBe(null);
    } else {
      assert.fail("expected point");
    }
  });
});

describe('markTerritories', () => {
  it('returns', () => {
    let points = [
      { id: 'aa', x: 0, y: 0, stone: null, territoryId: null },
      { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null },
      { id: 'ca', x: 2, y: 0, stone: null, territoryId: null },

      { id: 'da', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null },
      { id: 'ea', x: 1, y: 1, stone: null, territoryId: null },
      { id: 'fa', x: 2, y: 1, stone: { id: 3, playerNumber: 2, chainId: 3 }, territoryId: null },

      { id: 'ga', x: 0, y: 2, stone: null, territoryId: null },
      { id: 'ha', x: 1, y: 2, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null },
      { id: 'ia', x: 2, y: 2, stone: null, territoryId: null },
    ];
    markTerritories(points);
    let expected = [
      { id: 'aa', x: 0, y: 0, stone: null, territoryId: 1 },
      { id: 'ba', x: 1, y: 0, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null },
      { id: 'ca', x: 2, y: 0, stone: null, territoryId: 2 },

      { id: 'da', x: 0, y: 1, stone: { id: 2, playerNumber: 1, chainId: 2 }, territoryId: null },
      { id: 'ea', x: 1, y: 1, stone: null, territoryId: 3 },
      { id: 'fa', x: 2, y: 1, stone: { id: 3, playerNumber: 2, chainId: 3 }, territoryId: null },

      { id: 'ga', x: 0, y: 2, stone: null, territoryId: 4 },
      { id: 'ha', x: 1, y: 2, stone: { id: 4, playerNumber: 2, chainId: 4 }, territoryId: null },
      { id: 'ia', x: 2, y: 2, stone: null, territoryId: 5 }
    ];
    expect(points).toEqual(expected);
  });
});
