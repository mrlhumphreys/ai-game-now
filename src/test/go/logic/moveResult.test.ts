import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import endMatch from '../fixtures/endMatch';
import noLibertiesMatch from '../fixtures/noLibertiesMatch';
import koRuleMatch from '../fixtures/koRuleMatch';
import deprivesLibertiesMatch from '../fixtures/deprivesLibertiesMatch';
import deprivesOpponentsLibertiesMatch from '../fixtures/deprivesOpponentsLibertiesMatch';
import connectingChainsMatch from '../fixtures/connectingChainsMatch';

import {
  getMoveResult,
  proposedPoint,
  noLiberties,
  surroundedByEnemies,
  deprivesLiberties,
  deprivesOpponentsLiberties,
  koRuleViolation,
  winnerMessage
} from '$lib/go/logic/moveResult';

describe('getMoveResult', () => {
  describe('when there is a winner', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let pointId = 55;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'GameOver', message: 'Game is over.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when it is not the players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let pointId = 55;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the point does not exist', () => {
    it('returns a PointNotFound result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let pointId = 455;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'PointNotFound', message: 'Point does not exist.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the point is occupied', () => {
    it('returns a PointOccupied result', () => {
      let match = endMatch();
      let playerNumber = 1;
      let pointId = 2;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'PointOccupied', message: 'Point is already occupied.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the point has no liberties and deprives friendly liberties and does not deprive opponents liberties', () => {
    it('returns a NoLiberties result', () => {
      let match = noLibertiesMatch();
      let playerNumber = 1;
      let pointId = 1;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'NoLiberties', message: 'Point has no liberties.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the board returns to the previous state', () => {
    it('returns a KoRuleViolation result', () => {
      let match = koRuleMatch();
      let playerNumber = 2;
      let pointId = 21;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'KoRuleViolation', message: 'Move would return board to previous state.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the move is valid', () => {
    it('returns a MoveValid result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let pointId = 55;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'MoveValid', message: '' };
      expect(result).toEqual(expected);
    });
  });

  describe('when the move connects chains', () => {
    it('returns a MoveValid result', () => {
      let match = connectingChainsMatch();
      let playerNumber = 1;
      let pointId = 77;
      let result = getMoveResult(match, playerNumber, pointId);
      let expected = { name: 'MoveValid', message: '' };
      expect(result).toEqual(expected);
    });
  });
});

describe('proposedPoint', () => {
  it('returns the point matching the id', () => {
    let match = defaultMatch();
    let pointId = 55;
    let result = proposedPoint(match, pointId);
    let expected = { id: 55, x: 16, y: 2, stone: null, territoryId: null };
    expect(result).toEqual(expected);
  });
});

describe('noLiberties', () => {
  it('returns true if the point has no liberties', () => {
    let match = noLibertiesMatch();
    let pointId = 1;
    let result = noLiberties(match, pointId);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if the point has one or more liberties', () => {
    let match = defaultMatch();
    let pointId = 1;
    let result = noLiberties(match, pointId);
    let expected = false;
    expect(result).toEqual(expected);
  });

  it('returns true if the point is not found', () => {
    let match = defaultMatch();
    let pointId = 1000;
    let result = noLiberties(match, pointId);
    let expected = true;
    expect(result).toEqual(expected);
  });
});

describe('surroundedByEnemies', () => {
  it('returns true if the point is surrounded by enemy stones', () => {
    let match = noLibertiesMatch();
    let pointId = 1;
    let playerNumber = 1;
    let result = surroundedByEnemies(match, pointId, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if not completely surrounded by enemy stones', () => {
    let match = defaultMatch();
    let pointId = 1;
    let playerNumber = 1;
    let result = surroundedByEnemies(match, pointId, playerNumber);
    expect(result).toBe(false);
  });
});

describe('deprivesLiberties', () => {
  it('returns true if the move would deprive the players liberties', () => {
    let match = deprivesLibertiesMatch();
    let pointId = 2;
    let playerNumber = 1;
    let result = deprivesLiberties(match, pointId, playerNumber);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if it does not deprive players liberties', () => {
    let match = defaultMatch();
    let pointId = 2;
    let playerNumber = 1;
    let result = deprivesLiberties(match, pointId, playerNumber);
    let expected = false;
    expect(result).toEqual(expected);
  });

  it('returns false if the point does not exist', () => {
    let match = defaultMatch();
    let pointId = 2000;
    let playerNumber = 1;
    let result = deprivesLiberties(match, pointId, playerNumber);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('deprivesOpponentsLiberties', () => {
  it('returns true if it deprives opponents liberties', () => {
    let match = deprivesOpponentsLibertiesMatch();
    let pointId = 2;
    let playerNumber = 1;
    let result = deprivesOpponentsLiberties(match, pointId, playerNumber);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if it does not deprive opponents liberties', () => {
    let match = deprivesOpponentsLibertiesMatch();
    let pointId = 6;
    let playerNumber = 1;
    let result = deprivesOpponentsLiberties(match, pointId, playerNumber);
    let expected = false;
    expect(result).toEqual(expected);
  });

  it('returns false if the point does not exist ', () => {
    let match = deprivesOpponentsLibertiesMatch();
    let pointId = 600;
    let playerNumber = 1;
    let result = deprivesOpponentsLiberties(match, pointId, playerNumber);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('koRuleViolation', () => {
  it('returns true if the board returns to a previous state', () => {
    let match = koRuleMatch();
    let pointId = 21;
    let playerNumber = 2;
    let result = koRuleViolation(match, pointId, playerNumber);
    let expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false if the board does not return to a previous state', () => {
    let match = koRuleMatch();
    let pointId = 23;
    let playerNumber = 2;
    let result = koRuleViolation(match, pointId, playerNumber);
    let expected = false;
    expect(result).toEqual(expected);
  });
});

describe('winnerMessage', () => {
  it('returns a winning message if there is a winner', () => {
    let match = winnerMatch();
    let result = winnerMessage(match);
    let expected = 'Computer wins.';
    expect(result).toEqual(expected);
  });

  it('returns blank if there is no winner', () => {
    let match = defaultMatch();
    let result = winnerMessage(match);
    let expected = '';
    expect(result).toEqual(expected);
  });
});
