import { describe, it, expect, vi } from 'vitest';
import backgammonStateSerializer from '$lib/services/backgammonStateSerializer';
import buildMatchAttributes from '$lib/backgammon/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.game_state;
    let result = backgammonStateSerializer(gameState);
    let expected = '0020000000000500030000005005000000300050000000000200--1';
    expect(result).toEqual(expected);
  });
});
