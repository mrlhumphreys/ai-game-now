import { describe, it, expect } from 'vitest';
import xiangqiStateSerializer from '#lib/services/xiangqiStateSerializer';
import buildMatchAttributes from '#lib/xiangqi/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = xiangqiStateSerializer(gameState);
    let expected = 'rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 0';
    expect(result).toEqual(expected);
  });
});
