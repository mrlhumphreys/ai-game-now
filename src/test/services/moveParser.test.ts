import { describe, it, expect, vi } from 'vitest';
import moveParser from '$lib/services/moveParser';
import backgammonMoveParser from '$lib/services/backgammonMoveParser';
import checkersMoveParser from '$lib/services/checkersMoveParser';
import chessMoveParser from '$lib/services/chessMoveParser';
import goMoveParser from '$lib/services/goMoveParser';
import shogiMoveParser from '$lib/services/shogiMoveParser';

describe('specifying backgammon', () => {
  it('returns the backgammon move parser', () => {
    let parser = moveParser('backgammon');
    expect(parser).toEqual(backgammonMoveParser);
  });
});

describe('specifying checkers', () => {
  it('returns the checkers move parser', () => {
    let parser = moveParser('checkers');
    expect(parser).toEqual(checkersMoveParser);
  });
});

describe('specifying chess', () => {
  it('returns the chess move parser', () => {
    let parser = moveParser('chess');
    expect(parser).toEqual(chessMoveParser);
  });
});

describe('specifying go', () => {
  it('returns the go move parser', () => {
    let parser = moveParser('go');
    expect(parser).toEqual(goMoveParser);
  });
});

describe('specifying shogi', () => {
  it('returns the shogi move parser', () => {
    let parser = moveParser('shogi');
    expect(parser).toEqual(shogiMoveParser);
  });
});
