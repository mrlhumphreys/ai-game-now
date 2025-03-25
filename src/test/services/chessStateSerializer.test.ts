import { describe, it, expect } from 'vitest';
import chessStateSerializer from '$lib/services/chessStateSerializer';
import buildMatchAttributes from '$lib/chess/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = chessStateSerializer(gameState);
    let expected = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    expect(result).toEqual(expected);
  });
});
