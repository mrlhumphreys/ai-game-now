import { describe, it, expect, vi } from 'vitest';
import stateSerializer from '#lib/services/stateSerializer';
import backgammonStateSerializer from '#lib/services/backgammonStateSerializer';
import checkersStateSerializer from '#lib/services/checkersStateSerializer';
import chessStateSerializer from '#lib/services/chessStateSerializer';
import goStateSerializer from '#lib/services/goStateSerializer';
import shogiStateSerializer from '#lib/services/shogiStateSerializer';
import xiangqiStateSerializer from '#lib/services/xiangqiStateSerializer';

describe('specifying backgammon', () => {
  it('returns the backgammon move parser', () => {
    let parser = stateSerializer('backgammon');
    expect(parser).toEqual(backgammonStateSerializer);
  });
});

describe('specifying checkers', () => {
  it('returns the checkers state serializer', () => {
    let parser = stateSerializer('checkers');
    expect(parser).toEqual(checkersStateSerializer);
  });
});

describe('specifying chess', () => {
  it('returns the chess state serializer', () => {
    let parser = stateSerializer('chess');
    expect(parser).toEqual(chessStateSerializer);
  });
});

describe('specifying go', () => {
  it('returns the go state serializer', () => {
    let parser = stateSerializer('go');
    expect(parser).toEqual(goStateSerializer);
  });
});

describe('specifying shogi', () => {
  it('returns the shogi state serializer', () => {
    let parser = stateSerializer('shogi');
    expect(parser).toEqual(shogiStateSerializer);
  });
});

describe('specifying xiangqi', () => {
  it('returns the xiangqi state serializer', () => {
    let parser = stateSerializer('xiangqi');
    expect(parser).toEqual(xiangqiStateSerializer);
  });
});
