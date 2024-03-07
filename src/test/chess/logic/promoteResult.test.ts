import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import promotionMatch from '../fixtures/promotionMatch';

import { 
  getPromoteResult,
  gameOver,
  playersTurn,
  matchInPromotion,
  validPromotionPiece
} from '$lib/chess/logic/promoteResult';

describe('getPromoteResult', () => {
  describe('when game is over', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      let expected = { name: 'GameOver', message: 'Game is over.' };
      let result = getPromoteResult(match, playerNumber, pieceType);
      expect(result).toEqual(expected);
    });
  });

  describe('when it is not the players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let pieceType = 'queen';
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      let result = getPromoteResult(match, playerNumber, pieceType);
      expect(result).toEqual(expected);
    });
  });

  describe('when the match is not in promotion state', () => {
    it('returns a NoPieceToPromote result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      let expected = { name: 'NoPieceToPromote', message: 'There is no piece to promote.' };
      let result = getPromoteResult(match, playerNumber, pieceType);
      expect(result).toEqual(expected);
    });
  });

  describe('when promotion piece is invalid', () => {
    it('returns a InvalidPromotionPiece result', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'king';
      let expected = { name: 'InvalidPromotionPiece', message: 'Pawn cannot promote to that piece.' };
      let result = getPromoteResult(match, playerNumber, pieceType);
      expect(result).toEqual(expected);
    });
  });

  describe('when promotion is valid', () => {
    it('returns a ValidPromotion result', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      let expected = { name: 'ValidPromotion', message: '' };
      let result = getPromoteResult(match, playerNumber, pieceType);
      expect(result).toEqual(expected);
    });
  });
});

describe('gameOver', () => {
  it('returns true if there is a winner', () => {
    let match = winnerMatch();
    let result = gameOver(match);
    expect(result).toBe(true);
  });

  it('returns false if there is no winner', () => {
    let match = defaultMatch();
    let result = gameOver(match);
    expect(result).toBe(false);
  });
});

describe('playersTurn', () => {
  it('returns true if it is the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = playersTurn(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if it is not the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let result = playersTurn(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('matchInPromotion', () => {
  it('returns true if match in promotion', () => {
    let match = promotionMatch();
    let result = matchInPromotion(match);
    expect(result).toBe(true);
  });

  it('returns false if match not in promotion', () => {
    let match = defaultMatch();
    let result = matchInPromotion(match);
    expect(result).toBe(false);
  });
});

describe('validPromotionPiece', () => {
  it('returns true if it is a valid promotion piece type', () => {
    let result = validPromotionPiece('queen');
    expect(result).toBe(true);
  });

  it('returns false if it is not a valid promotion piece type', () => {
    let result = validPromotionPiece('king');
    expect(result).toBe(false);
  });
});
