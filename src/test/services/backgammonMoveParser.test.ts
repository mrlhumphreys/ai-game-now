import { describe, it, expect, vi } from 'vitest';
import backgammonMoveParser from '$lib/services/backgammonMoveParser';

describe('a standard move', () => {
  it('must parse out the details', () => {
    let move = "4-2: 8/4 6/4";
    let state = {};
    let result = backgammonMoveParser(move, state);
    let expected = [[8,4],[6,4]];
    expect(result).toEqual(expected);
  });
});
