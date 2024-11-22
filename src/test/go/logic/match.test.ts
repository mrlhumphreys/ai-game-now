import { describe, it, expect, assert } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import resignedMatch from '../fixtures/resignedMatch';
import passedMatch from '../fixtures/passedMatch';
import winnerMatch from '../fixtures/winnerMatch';
import endMatch from '../fixtures/endMatch';

import {
  winner,
  playerScore,
  gameOver,
  canPass,
  touchPoint,
  touchPass,
  clearLastAction,
  notify,
  addMoveToLastAction,
  addPassToLastAction
} from '$lib/go/logic/match';

describe('winner', () => {
  it('returns game state winner if no player has resigned', () => {
    let match = defaultMatch();
    let result = winner(match);
    expect(result).toBe(null);
  });

  it('returns player if other player has resigned', () => {
    let match = resignedMatch();
    let result = winner(match);
    expect(result).toEqual(2);
  });
});

describe('playerScore', () => {
  it('returns null if there is no winner', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = playerScore(match, playerNumber);
    expect(result).toBe(null);
  });

  it('returns score if there is a winner', () => {
    let match = winnerMatch();
    let playerNumber = 1;
    let result = playerScore(match, playerNumber);
    expect(result).toEqual(0);
  });
});

describe('gameOver', () => {
  it('returns true if there is a winner', () => {
    let match = resignedMatch();
    let result = gameOver(match);
    expect(result).toBe(true);
  });

  it('returns false if there is no winner', () => {
    let match = defaultMatch();
    let result = gameOver(match);
    expect(result).toBe(false);
  });
});

describe('canPass', () => {
  it('returns true if the player has not yet passed', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = canPass(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if the player has already passed', () => {
    let match = passedMatch();
    let playerNumber = 1;
    let result = canPass(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('touchPoint', () => {
  describe('when move valid', () => {
    it('adds a stone to the point', () => {
      let match = defaultMatch();
      let pointId = 'qc';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let point = match.gameState.points.find(function(p) { return p.id === pointId });
      let stone = { id: 1, playerNumber: 1, chainId: 1 };
      if (point !== undefined) {
        expect(point.stone).toEqual(stone);
      } else {
        assert.fail("Expected point");
      }
    });

    it('adds move details to last action', () => {
      let match = defaultMatch();
      let pointId = 'qc';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let expected = { kind: 'move', data: { pointId: pointId } };
      expect(match.lastAction).toEqual(expected);
    });

    it('notifies of winner if there is a winner', () => {
      let match = winnerMatch();
      let pointId = 'qc';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let expected = 'Game is over.';
      expect(match.notification).toEqual(expected);
    });

    it('notifies blank if there is no winner', () => {
      let match = defaultMatch();
      let pointId = 'qc';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let expected = '';
      expect(match.notification).toEqual(expected);
    });
  });

  describe('when move is not valid', () => {
    it('does not place stone', () => {
      let match = endMatch();
      let pointId = 'ab';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let point = match.gameState.points.find(function(p) { return p.id === pointId });
      let stone = { id: 2, playerNumber: 1, chainId: 2 };
      if (point !== undefined) {
        expect(point.stone).toEqual(stone);
      } else {
        assert.fail("Expected point");
      }
    });

    it('notifies of invalid move', () => {
      let match = endMatch();
      let pointId = 'ab';
      let playerNumber = 1;
      touchPoint(match, playerNumber, pointId);
      let expected = 'Point is already occupied.';
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('touchPass', () => {
  describe('when pass valid', () => {
    it('marks turn as passed for player', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      let playerStat = match.gameState.playerStats.find(function(ps) { return ps.playerNumber === playerNumber });
      if (playerStat !== undefined) {
        expect(playerStat.passed).toBe(true);
      } else {
        assert.fail("Expected playerStat");
      }
    });

    it('adds pass details to last action', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      let action = { kind: 'pass', data: null };
      expect(match.lastAction).toEqual(action);
    });

    it('notifies of winner if there is a winner', () => {
      let match = endMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      let expected = 'Computer wins.';
      expect(match.notification).toEqual(expected);
    });

    it('notifies of pass if there is no winner', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      let expected = 'Player passes.';
      expect(match.notification).toEqual(expected);
    });
  });

  describe('when pass invalid', () => {
    it('does not mark turn as passed for player', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      touchPass(match, playerNumber);
      let playerStat = match.gameState.playerStats.find(function(ps) { return ps.playerNumber === playerNumber });
      if (playerStat !== undefined) {
        expect(playerStat.passed).toBe(false);
      } else {
        assert.fail("Expected playerStat");
      }
    });

    it('notifies of invalid pass', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      touchPass(match, playerNumber);
      let expected = 'It is not your turn.';
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('clearLastAction', () => {
  it('sets lastAction to null', () => {
    let match = defaultMatch();
    clearLastAction(match);
    expect(match.lastAction).toBe(null);
  });
});

describe('notify', () => {
  it('sets the notification to message', () => {
    let match = defaultMatch();
    let message = 'It is not your turn.';
    notify(match, message);
    expect(match.notification).toEqual(message);
  });
});

describe('addMoveToLastAction', () => {
  it('sets the lastAction to a move with details', () => {
    let match = defaultMatch();
    let pointId = 'qc';
    addMoveToLastAction(match, pointId);
    let expected = { kind: 'move', data: { pointId: pointId } };
    expect(match.lastAction).toEqual(expected);
  });
});

describe('addPassToLastAction', () => {
  it('sets the lastAction to a pass', () => {
    let match = defaultMatch();
    addPassToLastAction(match);
    let expected = { kind: 'pass', data: null };
    expect(match.lastAction).toEqual(expected);
  });
});
