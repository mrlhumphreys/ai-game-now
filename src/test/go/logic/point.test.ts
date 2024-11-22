import { describe, it, expect } from 'vitest';

import {
  occupied,
  unoccupied,
  occupiedBy,
  occupiedByOpponent,
  unmarked,
  place,
  captureStone,
  addToTerritory,
  clearTerritory
} from '$lib/go/logic/point';

describe('occupied', () => {
  it('returns true if point has stone', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let result = occupied(point);
    expect(result).toBe(true);
  });

  it('returns false if point has no stone', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let result = occupied(point);
    expect(result).toBe(false);
  });
});

describe('unoccupied', () => {
  it('returns true if point has no stone', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let result = unoccupied(point);
    expect(result).toBe(true);
  });

  it('returns false if point has stone', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let result = unoccupied(point);
    expect(result).toBe(false);
  });
});

describe('occupiedBy', () => {
  it('returns true if occupied by the player', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let result = occupiedBy(point, 1);
    expect(result).toBe(true);
  });

  it('returns false if occupied by the opponent', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: null };
    let result = occupiedBy(point, 2);
    expect(result).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let result = occupiedBy(point, 1);
    expect(result).toBe(false);
  });
});

describe('occupiedByOpponent', () => {
  it('returns true if occupied by the opponent', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let result = occupiedByOpponent(point, 1);
    expect(result).toBe(true);
  });

  it('returns false if occupied by the player', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 2, chainId: 1 }, territoryId: null };
    let result = occupiedByOpponent(point, 2);
    expect(result).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let result = occupiedByOpponent(point, 1);
    expect(result).toBe(false);
  });
});

describe('unmarked', () => {
  it('returns true if territoryId is null', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    let result = unmarked(point);
    expect(result).toBe(true);
  });

  it('returns true if territoryId is not null', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: 5 };
    let result = unmarked(point);
    expect(result).toBe(false);
  });
});

describe('place', () => {
  it('adds a stone to the point', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: 5 };
    let stone = { id: 1, playerNumber: 1, chainId: 1 };
    place(point, stone);
    expect(point.stone).toEqual(stone);
  });
});

describe('captureStone', () => {
  it('removes the stone from the point', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: { id: 1, playerNumber: 1, chainId: 1 }, territoryId: 5 };
    captureStone(point);
    expect(point.stone).toBe(null);
  });
});

describe('addToTerritory', () => {
  it('adds the territoryId to the point', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: null };
    addToTerritory(point, 1);
    expect(point.territoryId).toEqual(1);
  });
});

describe('clearTerritory', () => {
  it('returns', () => {
    let point = { id: 'aa', x: 1, y: 1, stone: null, territoryId: 4 };
    clearTerritory(point);
    expect(point.territoryId).toBe(null);
  });
});

