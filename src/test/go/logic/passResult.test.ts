import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';

import {
  getPassResult
} from '$lib/go/logic/passResult';

describe('getPassResult', () => {
  describe('when there is a winner', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let result = getPassResult(match, 1);
      let expected = { name: 'GameOver', message: 'Game is over.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when it is not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let result = getPassResult(match, 2);
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when pass is valid', () => {
    it('returns a PassValid result', () => {
      let match = defaultMatch();
      let result = getPassResult(match, 1);
      let expected = { name: 'PassValid', message: 'Player passes.' };
      expect(result).toEqual(expected);
    });
  });
});
