import { describe, it, expect } from 'vitest';
import shogiStateSerializer from '$lib/services/shogiStateSerializer';
import buildMatchAttributes from '$lib/shogi/logic/buildMatchAttributes';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = shogiStateSerializer(gameState);
    let expected = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -';
    expect(result).toEqual(expected);
  });
});
