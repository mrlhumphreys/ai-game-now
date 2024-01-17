import { describe, it, expect } from 'vitest';
import calculateStrokeColour from '$lib/utils/calculateStrokeColour';

describe('player 1', () => {
  it('must return player 1 colour', () => {
    expect(calculateStrokeColour(1)).toEqual('#3cc5de');
  });
});

describe('player 2', () => {
  it('must return player 2 colour', () => {
    expect(calculateStrokeColour(2)).toEqual('#303030');
  });
});
