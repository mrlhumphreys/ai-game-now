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

describe('moving off board', () => {
  it('must parse out the details', () => {
    let move = "5-1: 6/off 6/5";
    let state = {};
    let result = backgammonMoveParser(move, state);
    let expected = [[6,'off_board'],[6,5]];
    expect(result).toEqual(expected);
  });
});
