import { describe, it, expect } from 'vitest';
import calculatePositionClass from '$lib/utils/calculatePositionClass';

describe('pov 1', () => {
  it('returns the position from player 1 perspective', () => {
    let square = { x: 0, y: 0 };
    expect(calculatePositionClass(square, 1)).toEqual('position_0_0');
  });
});

describe('pov 2', () => {
  it('returns the position from player 2 perspective', () => {
    let square = { x: 0, y: 0 };
    expect(calculatePositionClass(square, 2)).toEqual('position_7_7');
  });
});
