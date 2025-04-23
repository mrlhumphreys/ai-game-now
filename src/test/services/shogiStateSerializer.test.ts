import { describe, it, expect } from 'vitest';
import shogiStateSerializer from '$lib/services/shogiStateSerializer';
import buildMatchAttributes from '$lib/shogi/logic/buildMatchAttributes';
import populatedHandMatch from '../shogi/fixtures/populatedHandMatch';

describe('state', () => {
  it('must be serialized', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = shogiStateSerializer(gameState);
    let expected = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -';
    expect(result).toEqual(expected);
  });

  it('serializes hands', () => {
    let match = populatedHandMatch();
    let gameState = match.gameState;
    let result = shogiStateSerializer(gameState);
    let expected = 'ln1gkg1nl/1r7/pppppp3/9/9/9/PPPPP4/9/LNS1KGSNL b RG4P2b2s3p';
    expect(result).toEqual(expected);
  });
});
