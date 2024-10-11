import { describe, it, expect } from 'vitest';

import {
  magnitude,
  orthogonal,
  dx,
  dy
} from '$lib/go/logic/vector';

describe('magnitude', () => {
  it('returns abs max y if x is the same', () => {
    let origin = { id: 1, x: 4, y: 4, stone: null, territoryId: null };
    let destination = { id: 2, x: 4, y: 8, stone: null, territoryId: null };
    let result = magnitude(origin, destination);
    let expected = 4;
    expect(result).toEqual(expected);
  });

  it('returns abs max x if y is the same', () => {
    let origin = { id: 1, x: 4, y: 4, stone: null, territoryId: null };
    let destination = { id: 2, x: 6, y: 4, stone: null, territoryId: null };
    let result = magnitude(origin, destination);
    let expected = 2;
    expect(result).toEqual(expected);
  });

  it('returns null if xs and ys are different', () => {
    let origin = { id: 1, x: 4, y: 4, stone: null, territoryId: null };
    let destination = { id: 2, x: 6, y: 3, stone: null, territoryId: null };
    let result = magnitude(origin, destination);
    expect(result).toBeNull;
  });
});

describe('orthogonal', () => {
  it('returns true if xs are the same', () => {
    let origin = { id: 1, x: 4, y: 4, stone: null, territoryId: null };
    let destination = { id: 2, x: 4, y: 3, stone: null, territoryId: null };
    let result = orthogonal(origin, destination);
    expect(result).toBe(true);
  });

  it('returns true if ys are the same', () => {
    let origin = { id: 1, x: 4, y: 7, stone: null, territoryId: null };
    let destination = { id: 2, x: 2, y: 7, stone: null, territoryId: null };
    let result = orthogonal(origin, destination);
    expect(result).toBe(true);
  });

  it('returns false if xs and ys are different', () => {
    let origin = { id: 1, x: 4, y: 7, stone: null, territoryId: null };
    let destination = { id: 2, x: 2, y: 5, stone: null, territoryId: null };
    let result = orthogonal(origin, destination);
    expect(result).toBe(false);
  });
});

describe('dx', () => {
  it('returns the difference in x', () => {
    let origin = { id: 1, x: 4, y: 7, stone: null, territoryId: null };
    let destination = { id: 2, x: 2, y: 5, stone: null, territoryId: null };
    let result = dx(origin, destination);
    let expected = -2;
    expect(result).toEqual(expected);
  });
});

describe('dy', () => {
  it('returns', () => {
    let origin = { id: 1, x: 4, y: 7, stone: null, territoryId: null };
    let destination = { id: 2, x: 2, y: 10, stone: null, territoryId: null };
    let result = dy(origin, destination);
    let expected = 3;
    expect(result).toEqual(expected);
  });
});
