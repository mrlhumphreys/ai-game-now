import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import promoteMatch from '../fixtures/promoteMatch';

import {
  getPromoteResult,
  gameOver,
  playersTurn
} from '$lib/shogi/logic/promoteResult';

describe('getPromoteResult', () => {
  describe('when game is over', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let expected = { name: 'GameOver', message: 'Game is over.' };
      let result = getPromoteResult(match, playerNumber);
      expect(result).toEqual(expected);
    });
  });

  describe('when not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      let result = getPromoteResult(match, playerNumber);
      expect(result).toEqual(expected);
    });
  });

  describe('when match is not in promotion state', () => {
    it('returns a NoPieceToPromote result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let expected = { name: 'NoPieceToPromote', message: 'There is no piece to promote.' };
      let result = getPromoteResult(match, playerNumber);
      expect(result).toEqual(expected);
    });
  });

  describe('when match is in promotion state', () => {
    it('returns a ValidPromotion result', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let expected = { name: 'ValidPromotion', message: '' };
      let result = getPromoteResult(match, playerNumber);
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
