import { describe, it, expect, vi } from 'vitest';
import moveParser from '$lib/services/moveParser';
import backgammonMoveParser from '$lib/services/backgammonMoveParser';
import checkersMoveParser from '$lib/services/checkersMoveParser';
import chessMoveParser from '$lib/services/chessMoveParser';

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
