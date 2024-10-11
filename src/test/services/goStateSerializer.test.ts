import { describe, it, expect } from 'vitest';
import goStateSerializer from '$lib/services/goStateSerializer';
import buildMatchAttributes from '$lib/go/logic/buildMatchAttributes';

describe('goStateSerializer', () => {
  it('serializes the state', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = goStateSerializer(gameState);
    let expected = 'PL[B]ABAWXB[0]XW[0]XS';
    expect(result).toEqual(expected);
  });
});
