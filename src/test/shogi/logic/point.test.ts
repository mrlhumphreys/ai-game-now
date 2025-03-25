import { describe, it, expect } from 'vitest';
import { add } from '$lib/shogi/logic/point';

describe('add', () => {
  it('must return the sum of two points', () => {
    let a = { x: 1, y: 5 };
    let b = { x: 2, y: 10 };
    let expected = { x: 3, y: 15 };
    expect(add(a, b)).toEqual(expected);
  });
});
