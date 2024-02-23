import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import moveIncompleteMatch from '../fixtures/moveIncompleteMatch';

import {
  getRollResult,
  winner,
  playersTurn,
  movePhase
} from '$lib/backgammon/logic/rollResult';

describe('getRollResult', () => {
  it('returns a GameOver result if there is a winner', () => {
    let match = winnerMatch();
    let playerNumber = 1;
    let result = getRollResult(match, playerNumber);
    let expected = { name: 'GameOver', message: 'Game is over.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a NotPlayersTurn result if it is not the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let result = getRollResult(match, playerNumber);
    let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a MovePhase result if in move phase', () => {
    let match = moveIncompleteMatch();
    let playerNumber = 1;
    let result = getRollResult(match, playerNumber);
    let expected = { name: 'MovePhase', message: 'Dice have already been rolled.' }; 
    expect(result).toEqual(expected);
  });

  it('returns a RollValid result if possible', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = getRollResult(match, playerNumber);
    let expected = { name: 'RollValid', message: 'Dice have been rolled.' }; 
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

describe('movePhase', () => {
  it('should return true if move phase', () => {
    let match = moveIncompleteMatch();
    let result = movePhase(match);
    expect(result).toBe(true);
  });

  it('should return false if roll phase', () => {
    let match = defaultMatch();
    let result = movePhase(match);
    expect(result).toBe(false);
  });
});
