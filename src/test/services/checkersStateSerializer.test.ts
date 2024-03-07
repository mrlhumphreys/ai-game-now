import { describe, it, expect, vi } from 'vitest';
import checkersStateSerializer from '$lib/services/checkersStateSerializer';
import buildMatchAttributes from '$lib/checkers/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = checkersStateSerializer(gameState);
    let expected = 'bbbbbbbbbbbb--------wwwwwwwwwwwwb';
    expect(result).toEqual(expected);
  });
});
