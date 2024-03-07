import { describe, it, expect } from 'vitest';
import { 
  distance, 
  dx,
  dy,
  directionD,
  directionY,
  directionX,
  orthogonalOrDiagonal,
  orthogonal,
  diagonal,
  direction
} from '$lib/chess/logic/vector';

describe('distance', () => {
  it('should return the distance between the two points', () => {
    let a = { x: 3, y: 3 };
    let b = { x: 1, y: 1 };
    expect(distance(a, b)).toEqual(2);
  });
});

describe('dx', () => {
  it('must return the difference on the x axis', () => {
    let a = { x: 1, y: 0 };
    let b = { x: 3, y: 0 };
    expect(dx(a, b)).toEqual(2);
  });
});

describe('dy', () => {
  it('must return the difference on the y axis', () => {
    let a = { x: 0, y: 1 };
    let b = { x: 0, y: 3 };
    expect(dy(a, b)).toEqual(2);
  });
});

describe('directionD', () => {
  it('must return 1 if positive', () => {
    expect(directionD(2)).toEqual(1);
  });

  it('must return 0 if 0', () => {
    expect(directionD(0)).toEqual(0);
  });

  it('must return -1 if negative', () => {
    expect(directionD(-2)).toEqual(-1);
  });
});

describe('directionY', () => {
  it('must return the direction unit in the y axis', () => {
    let a = { x: 0, y: 1 };
    let b = { x: 0, y: 3 };
    expect(directionY(a, b)).toEqual(1);
  });
});

describe('directionX', () => {
  it('must return the direction unit in the x axis', () => {
    let a = { x: 1, y: 0 };
    let b = { x: 3, y: 0 };
    expect(directionX(a, b)).toEqual(1);
  });
});

describe('orthogonalOrDiagonal', () => {
  it('must return true if orthogonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 0 };
    expect(orthogonalOrDiagonal(a, b)).toBe(true);
  });

  it('must return true if diagonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 1 };
    expect(orthogonalOrDiagonal(a, b)).toBe(true);
  });

  it('must return false if not orthogonal or diagonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 2, y: 1 };
    expect(orthogonalOrDiagonal(a, b)).toBe(false);
  });
});

describe('orthogonal', () => {
  it('must return true if orthogonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 0 };
    expect(orthogonal(a, b)).toBe(true);
  });

  it('must return false if not orthogonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 1 };
    expect(orthogonal(a, b)).toBe(false);
  });
});

describe('diagonal', () => {
  it('must return true if diagonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 1 };
    expect(diagonal(a, b)).toBe(true);
  });

  it('must return false if not diagonal', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 1, y: 0 };
    expect(diagonal(a, b)).toBe(false);
  });
});

describe('direction', () => {
  it('returns the direction unit between two points', () => {
    let a = { x: 0, y: 0 };
    let b = { x: 3, y: 3 };
    let expected = { x: 1, y: 1 };
    expect(direction(a, b)).toEqual(expected);
  });
});
