import { describe, it, expect  } from 'vitest';
import shogiMoveParser from '$lib/services/shogiMoveParser';
import fenToGameState from '$lib/shogi/logic/fenToGameState';

describe('move', () => {
  it('parses the correct details', () => {
    let move = 'G69-58';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'move', fromId: '69', pieceId: null, toId: '58', promotionPossible: false, promotionAccepted: false };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('capture', () => {
  it('parses the correct details', () => {
    let move = 'Px25';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppp1p/7p1/7P1/9/PPPPPPP1P/1B5R1/LNSGKGSNL w -');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'move', fromId: '24', pieceId: null, toId: '25', promotionPossible: false, promotionAccepted: false };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('with no from', () => {
  it('parses the correct details', () => {
    let move = 'P-26';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'move', fromId: '27', pieceId: null, toId: '26', promotionPossible: false, promotionAccepted: false };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('drop', () => {
  it('parses the correct details', () => {
    let move = 'P*24';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppp1p/9/9/9/PPPPPPP1P/1B5R1/LNSGKGSNL b Pp');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'drop', fromId: null, pieceId: 60, toId: '24', promotionPossible: false, promotionAccepted: false };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('promotion declined', () => {
  it('parses the correct details', () => {
    let move = 'P-23=';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppp1p/7P1/9/9/PPPPPPP1P/1B5R1/LNSGKGSNL b P');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'move', fromId: '24', pieceId: null, toId: '23', promotionPossible: true, promotionAccepted: false };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('promotion accepted', () => {
  it('parses the correct details', () => {
    let move = 'P-23+';
    let gameState = fenToGameState('lnsgkgsnl/1r5b1/ppppppp1p/7P1/9/9/PPPPPPP1P/1B5R1/LNSGKGSNL b P');
    if (gameState !== null) {
      let result = shogiMoveParser(move, gameState);
      let expected = { kind: 'move', fromId: '24', pieceId: null, toId: '23', promotionPossible: true, promotionAccepted: true };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

