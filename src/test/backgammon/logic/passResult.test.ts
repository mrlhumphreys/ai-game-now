import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import moveIncompleteMatch from '../fixtures/moveIncompleteMatch';
import noMovesMatch from '../fixtures/noMovesMatch';
import allDiceUsedMatch from '../fixtures/allDiceUsedMatch';

import {
  getPassResult,
  winner,
  playersTurn,
  rollPhase,
  movesAvailable,
  allDiceUsed
} from '$lib/backgammon/logic/passResult';

describe('getPassResult', () => {
  it('returns a GameOver result if there is a winner', () => {
    let match = winnerMatch();
    let playerNumber = 1;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'GameOver', message: 'Game is over.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a NotPlayersTurn result if it is not the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a RollPhase result if in move phase', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'RollPhase', message: 'Dice must be rolled first.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a MovesAvailable result if there are moves to be made', () => {
    let match = moveIncompleteMatch();
    let playerNumber = 1;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'MovesAvailable', message: 'A move can still be made.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a AllDiceUsed result if all the dice have been used', () => {
    let match = allDiceUsedMatch();
    let playerNumber = 1;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'AllDiceUsed', message: 'All dice have been used.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a PassValid result if possible', () => {
    let match = noMovesMatch();
    let playerNumber = 1;
    let result = getPassResult(match, playerNumber);
    let expected = { name: 'PassValid', message: '' }; 
    expect(result).toEqual(expected);
  });
});

describe('winner', () => {
  it('should return true if there is a winner', () => {
    let match = winnerMatch();
    let result = winner(match);
    expect(result).toBe(true);
  });

  it('should return false if there is no winner', () => {
    let match = defaultMatch();
    let result = winner(match);
    expect(result).toBe(false);
  });
});

describe('playersTurn', () => {
  it('should return true if it is the players turn', () => {
    let match = defaultMatch();
    let result = playersTurn(match, 1);
    expect(result).toBe(true);
  });

  it('should return false if it is not the players turn', () => {
    let match = defaultMatch();
    let result = playersTurn(match, 2);
    expect(result).toBe(false);
  });
});

describe('rollPhase', () => {
  it('should return true if roll phase', () => {
    let match = defaultMatch();
    let result = rollPhase(match);
    expect(result).toBe(true);
  });

  it('should return false if move phase', () => {
    let match = moveIncompleteMatch();
    let result = rollPhase(match);
    expect(result).toBe(false);
  });
});

describe('movesAvailable', () => {
  it('returns true if there are moves available', () => {
    let match = moveIncompleteMatch();
    let playerNumber = 1;
    let result = movesAvailable(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if there are no moves available', () => {
    let match = noMovesMatch();
    let playerNumber = 1;
    let result = movesAvailable(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('allDiceUsed', () => {
  it('returns true if all dice are used', () => {
    let match = allDiceUsedMatch();
    let result = allDiceUsed(match);
    expect(result).toBe(true);
  });

  it('returns false if some dice are not used', () => {
    let match = defaultMatch();
    let result = allDiceUsed(match);
    expect(result).toBe(false);
  });
});
