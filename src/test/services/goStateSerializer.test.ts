import { describe, it, expect } from 'vitest';
import goStateSerializer from '$lib/services/goStateSerializer';
import buildMatchAttributes from '$lib/go/logic/buildMatchAttributes';
import koRuleMatchTwo from '../go/fixtures/koRuleMatchTwo';

describe('goStateSerializer', () => {
  it('serializes the state', () => {
    let match = buildMatchAttributes(1);
    let gameState = match.gameState;
    let result = goStateSerializer(gameState);
    let expected = 'PL[B]ABAWXB[0]XW[0]XS';
    expect(result).toEqual(expected);
  });

  it('serializes state with pervious captures', () => {
    let match = koRuleMatchTwo();
    let gameState = match.gameState;
    let result = goStateSerializer(gameState);
    let expected = 'PL[W]AB[pd][cb][eb][dc][fa][da][ib][kb][jc][ja]AW[aa][ba][ca][ga][ha][ia][ka][la]XB[3]XW[2]XS[jb]';
    expect(result).toEqual(expected);
  });
});
