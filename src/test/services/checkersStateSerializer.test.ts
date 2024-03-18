import { describe, it, expect, vi } from 'vitest';
import checkersStateSerializer from '$lib/services/checkersStateSerializer';
import buildMatchAttributes from '$lib/checkers/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = checkersStateSerializer(gameState);
    let expected = 'B:W21,22,23,24,25,26,27,28,29,30,31,32:B1,2,3,4,5,6,7,8,9,10,11,12';
    expect(result).toEqual(expected);
  });
});
