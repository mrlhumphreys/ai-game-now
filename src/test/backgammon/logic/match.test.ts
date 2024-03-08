import { describe, it, expect } from 'vitest';

import type Move from '$lib/backgammon/interfaces/Move';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import resignedMatch from '../fixtures/resignedMatch';
import lastActionMatch from '../fixtures/lastActionMatch';
import moveListIncompleteMatch from '../fixtures/moveListIncompleteMatch';
import noMovesMatch from '../fixtures/noMovesMatch';
import moveCompleteMatch from '../fixtures/moveCompleteMatch';
import moveIncompleteMatch from '../fixtures/moveIncompleteMatch';
import moveUnselectedMatch from '../fixtures/moveUnselectedMatch';
import fromPointDiceRollMismatchMatch from '../fixtures/fromPointDiceRollMismatchMatch';

import {
  winner,
  passable,
  touchDice,
  touchPoint,
  touchPass,
  addMoveToList,
  clearMoveList,
  notify,
  addRollToLastAction,
  addMoveToLastAction,
  clearLastAction
} from '$lib/backgammon/logic/match';

describe('winner', () => {
  it('must return winner if player has resigned', () => {
    let match = resignedMatch();
    expect(winner(match)).toEqual(2);
  });

  it('must return winner if a player has no pieces on board', () =>  {
    let match = winnerMatch();
    expect(winner(match)).toEqual(1);
  });
});

describe('passable', () => {
  it('returns true if the player can pass', () => {
    let match = noMovesMatch();
    let playerNumber = 1;
    let result = passable(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if the player cannot pass', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = passable(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('touchDice', () => {
  describe('when roll is valid', () => {
    it('rolls the dice', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      touchDice(match, playerNumber);
      match.gameState.dice.forEach((d) => {
        expect(d.number).toBeGreaterThanOrEqual(1);
        expect(d.number).toBeLessThanOrEqual(6);
      });
    });

    it('sets the phase to move', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let expected = 'move';
      touchDice(match, playerNumber);
      expect(match.gameState.currentPhase).toEqual(expected);
    });

    it('adds roll to last action', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let expected = {
        kind: 'roll',
        data: null
      };
      touchDice(match, playerNumber);
      expect(match.lastAction).toEqual(expected);
    });

    it('sets the notification to the result message', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let expected = 'Dice have been rolled.';
      touchDice(match, playerNumber);
      expect(match.notification).toEqual(expected);
    });
  });

  describe('when roll is invalid', () => {
    it('sets the notification to the result message', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let expected = 'It is not your turn.';
      touchDice(match, playerNumber);
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('touchPoint', () => {
  describe('when move is complete', () => {
    it('moves the piece', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      touchPoint(match, playerNumber, touchedId);

      let fromPoint = match.gameState.points.find((p) => {
        return p.number === 1;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.pieces.length).toEqual(0);
      } else {
        expect(fromPoint).not.toBe(undefined);
      }

      let toPoint = match.gameState.points.find((p) => {
        return p.number === touchedId;
      });
      if (toPoint !== undefined) {
        expect(toPoint.pieces.length).toEqual(1);
      } else {
        expect(toPoint).not.toBe(undefined);
      }
    });

    it('clears the dice', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let expected = [
        { id: 0, number: null, used: false },
        { id: 1, number: null, used: false }
      ]
      touchPoint(match, playerNumber, touchedId);
      expect(match.gameState.dice).toEqual(expected);
    });

    it('steps the phase', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let expected = 'roll';
      touchPoint(match, playerNumber, touchedId);
      expect(match.gameState.currentPhase).toEqual(expected);
    });

    it('passes the turn', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let expected = 2;
      touchPoint(match, playerNumber, touchedId);
      expect(match.gameState.currentPlayerNumber).toEqual(expected);
    });

    it('adds the move to last action', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let expected = {
        kind: 'move',
        data: {
          moveList: [
            { fromId: 1, toId: 5 },
            { fromId: 1, toId: 4 }
          ]
        }
      };
      touchPoint(match, playerNumber, touchedId);
      expect(match.lastAction).toEqual(expected);
    });

    it('clears the move list', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let expected: Array<Move> = [];
      touchPoint(match, playerNumber, touchedId);
      expect(match.moveList).toEqual(expected);
    });

    it('deselects the point', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      touchPoint(match, playerNumber, touchedId);
      let fromPoint = match.gameState.points.find((p) => {
        return p.number === 1;
      });

      if (fromPoint !== undefined) {
        expect(fromPoint.selected).toBe(false);
      } else {
        expect(fromPoint).not.toBe(undefined);
      }
    });
  });

  describe('when move is incomplete', () => {
    it('moves the piece', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      touchPoint(match, playerNumber, touchedId);

      let fromPoint = match.gameState.points.find((p) => {
        return p.number === 1;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.pieces.length).toEqual(1);
      } else {
        expect(fromPoint).not.toBe(undefined);
      }

      let toPoint = match.gameState.points.find((p) => {
        return p.number === touchedId;
      });
      if (toPoint !== undefined) {
        expect(toPoint.pieces.length).toEqual(1);
      } else {
        expect(toPoint).not.toBe(undefined);
      }
    });

    it('marks the die as used', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let expected = [
        { id: 0, number: 3, used: false },
        { id: 1, number: 4, used: true }
      ];
      touchPoint(match, playerNumber, touchedId);
      expect(match.gameState.dice).toEqual(expected);
    });

    it('adds the move to the move list', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let expected = [
        { fromId: 1, toId: 5 }
      ];
      touchPoint(match, playerNumber, touchedId);
      expect(match.moveList).toEqual(expected);
    });

    it('deselects the point', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      touchPoint(match, playerNumber, touchedId);

      let fromPoint = match.gameState.points.find((p) => {
        return p.number === 1;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.selected).toBe(false);
      } else {
        expect(fromPoint).not.toBe(undefined);
      }
    });

    it('sets the notification to the result message', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let expected = '';
      touchPoint(match, playerNumber, touchedId);
      expect(match.notification).toEqual(expected);
    });
  });

  describe('when move is possible', () => {
    it('selects the point', () => {
      let match = moveUnselectedMatch();
      let playerNumber = 1;
      let touchedId = 1;
      touchPoint(match, playerNumber, touchedId);
      let point = match.gameState.points.find((p) => {
        return p.number === touchedId;
      });

      if (point !== undefined) {
        expect(point.selected).toBe(true);
      } else {
        expect(point).not.toBe(undefined);
      }
    });

    it('sets the notification to the result message', () => {
      let match = moveUnselectedMatch();
      let playerNumber = 1;
      let touchedId = 1;
      let expected = '';
      touchPoint(match, playerNumber, touchedId);
      expect(match.notification).toEqual(expected);
    });
  });

  describe('move is invalid', () => {
    it('deselects point', () => {
      let match = fromPointDiceRollMismatchMatch();
      let playerNumber = 1;
      let touchedId = 5;
      touchPoint(match, playerNumber, touchedId);
      let point = match.gameState.points.find((p) => {
        return p.number === touchedId;
      });

      if (point !== undefined) {
        expect(point.selected).toBe(false);
      } else {
        expect(point).not.toBe(undefined);
      }
    });

    it('sets the notification to result message', () => {
      let match = fromPointDiceRollMismatchMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let expected = 'That move does not match the die roll.';
      touchPoint(match, playerNumber, touchedId);
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('touchPass', () => {
  describe('pass is valid', () => {
    it('passes the turn', () => {
      let match = noMovesMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('steps the phase', () => {
      let match = noMovesMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      expect(match.gameState.currentPhase).toEqual('roll');
    });

    it('clears the dice', () => {
      let match = noMovesMatch();
      let playerNumber = 1;
      let expected = [
        { id: 0, number: null, used: false },
        { id: 1, number: null, used: false }
      ];
      touchPass(match, playerNumber);
      expect(match.gameState.dice).toEqual(expected);
    });

    it('adds the move list to last action', () => {
      let match = noMovesMatch();
      let playerNumber = 1;
      let expected = {
        kind: 'move',
        data: {
          moveList: [
            { fromId: 24, toId: 'offBoard' }
          ]
        }
      };
      touchPass(match, playerNumber);
      expect(match.lastAction).toEqual(expected);
    });

    it('clears the move list', () => {
      let match = noMovesMatch();
      let playerNumber = 1;
      touchPass(match, playerNumber);
      expect(match.moveList).toEqual([]);
    });
  });

  describe('pass is invalid', () => {
    it('sets the notification to the result message', () => {
      let match = noMovesMatch();
      let playerNumber = 2;
      touchPass(match, playerNumber);
      let expected = "It is not your turn.";
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('addMoveToList', () => {
  it('pushes the move into the move list', () => {
    let match = defaultMatch();
    let move = { fromId: 1, toId: 5 };
    addMoveToList(match, move);
    let expected = [ move ];
    expect(match.moveList).toEqual(expected);
  });
});

describe('clearMoveList', () => {
  it('sets the move list to null', () => {
    let match = moveListIncompleteMatch();
    clearMoveList(match);
    expect(match.moveList).toEqual([]);
  });
});

describe('notify', () => {
  it('sets the notification to message', () => {
    let match = defaultMatch();
    let message = 'sample message';
    notify(match, message);
    expect(match.notification).toEqual(message);
  });
});

describe('addRollToLastAction', () => {
  it('sets the last action to roll with its details', () => {
    let match = defaultMatch();
    let expected = {
      kind: 'roll',
      data: null
    };
    addRollToLastAction(match);
    expect(match.lastAction).toEqual(expected);
  });
});

describe('addMoveToLastAction', () => {
  it('sets the last action to a move with its details', () => {
    let match = defaultMatch();
    let moveList = [
      { fromId: 1, toId: 4 },
      { fromId: 1, toId: 5 }
    ];
    let expected = {
      kind: 'move',
      data: {
        moveList: moveList
      }
    };
    addMoveToLastAction(match, moveList);
    expect(match.lastAction).toEqual(expected);
  });
});

describe('clearLastAction', () => {
  it('sets the last action to null', () => {
    let match = lastActionMatch();
    clearLastAction(match);
    expect(match.lastAction).toBe(null);
  });
});
