import { describe, it, expect, vi } from 'vitest';
import stateSerializer from '$lib/services/stateSerializer';
import backgammonStateSerializer from '$lib/services/backgammonStateSerializer';
import checkersStateSerializer from '$lib/services/checkersStateSerializer';
import chessStateSerializer from '$lib/services/chessStateSerializer';

describe('specifying backgammon', () => {
  it('returns the backgammon move parser', () => {
    let parser = stateSerializer('backgammon');
    expect(parser).toEqual(backgammonStateSerializer);
  });
});

describe('specifying checkers', () => {
  it('returns the checkers move parser', () => {
    let parser = stateSerializer('checkers');
    expect(parser).toEqual(checkersStateSerializer);
  });
});

describe('specifying chess', () => {
  it('returns the chess move parser', () => {
    let parser = stateSerializer('chess');
    expect(parser).toEqual(chessStateSerializer);
  });
});
