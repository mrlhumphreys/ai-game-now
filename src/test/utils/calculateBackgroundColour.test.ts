import { describe, it, expect } from 'vitest';
import calculateBackgroundColour from '$lib/utils/calculateBackgroundColour';

describe('selected', () => {
	it('returns white', () => {
		expect(calculateBackgroundColour(1, true)).toEqual('#ffffff');
	});
});

describe('unselected player 1', () => {
  it('returns player 1 colour', () => {
		expect(calculateBackgroundColour(1, false)).toEqual('#303030');
  });
});

describe('unselected player 2', () => {
  it('returns player 2 colour', () => {
		expect(calculateBackgroundColour(2, false)).toEqual('#3cc5de');
  });
});
