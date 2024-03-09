import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import resignedMatch from '../fixtures/resignedMatch';
import winnerMatch from '../fixtures/winnerMatch';
import firstLegCompleteMatch from '../fixtures/firstLegCompleteMatch';
import firstLegIncompleteMatch from '../fixtures/firstLegIncompleteMatch';
import lastActionMatch from '../fixtures/lastActionMatch';

import { 
  winner,
  touchSquare,
  addFromToCurrentMove,
  addToToCurrentMove,
  clearMove,
  clearLastAction,
  notify,
  addMoveToLastAction
} from '$lib/checkers/logic/match';

describe('winner', () => {
  it('must return winner if player resigned', () => {
    let match = resignedMatch();
    expect(winner(match)).toEqual(2);
  });

  it('must return winner if player has no moves', () => {
    let match = winnerMatch();
    expect(winner(match)).toEqual(1);
  });
});

describe('touchSquare', () => {
  it('clears last action', () => {
    let match = lastActionMatch();
    touchSquare(match, 1, 11);
    expect(match.lastAction).toBe(null);
  });

  it('notifies with a message', () => {
    let match = lastActionMatch();
    touchSquare(match, 1, 11);
    expect(match.notification).toEqual('Move is invalid.');
  });

  describe('when move is invalid', () => {
    it('must clears move', () => {
      let match = firstLegIncompleteMatch();
      touchSquare(match, 1, 15);
      expect(match.currentMoveFromId).toBe(null);
      expect(match.currentMoveToIds).toEqual([]);
    });

    it('must deselects squares', () => {
      let match = firstLegIncompleteMatch();
      touchSquare(match, 1, 15);
      match.gameState.squares.forEach((s) => {
        if (s.piece !== null) {
          expect(s.piece.selected).toBe(false);
        }
      });
    });

    it('must notify with a message', () => {
      let match = firstLegIncompleteMatch();
      touchSquare(match, 1, 15);
      expect(match.notification).toEqual('Move is invalid.');
    });
  });

  describe('when move is incomplete', () => {
    it('must mark the square', () => {
      let match = firstLegIncompleteMatch();
      let touchedSquareId = 14; 
      touchSquare(match, 1, touchedSquareId);
      let square = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (square !== undefined) {
        expect(square.marked).toBe(true);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('must add to to current move', () => {
      let match = firstLegIncompleteMatch();
      let touchedSquareId = 14; 
      touchSquare(match, 1, touchedSquareId);
      expect(match.currentMoveToIds).toEqual([touchedSquareId]);
    });

    it('must notify with a message', () => {
      let match = firstLegIncompleteMatch();
      let touchedSquareId = 14; 
      touchSquare(match, 1, touchedSquareId);
      expect(match.notification).toEqual('Piece can still jump.');
    });
  });

  describe('when move is complete', () => {
    it('must move the piece', () => {
      let match = firstLegCompleteMatch();
      let fromId = 7;
      let touchedSquareId = 23; 
      let piece = { id: 6, king: false, playerNumber: 1, selected: false };

      touchSquare(match, 1, touchedSquareId);

      let from = match.gameState.squares.find((s) => {
        return s.id === fromId;
      });
      if (from !== undefined) {
        expect(from.piece).toBe(null);
      } else {
        expect(from).not.toBe(undefined);
      }

      let to = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });
      if (to !== undefined) {
        expect(to.piece).toEqual(piece);
      } else {
        expect(to).not.toBe(undefined);
      }
    });

    it('must add move details to last action', () => {
      let match = firstLegCompleteMatch();
      let fromId = 7;
      let toIds = [14, 23];
      let touchedSquareId = 23; 
      touchSquare(match, 1, touchedSquareId);
      let expected = {
        kind: 'move',
        data: {
          fromId: fromId,
          toIds: toIds
        }
      };
      expect(match.lastAction).toEqual(expected);
    });

    it('must clear current move', () => {
      let match = firstLegCompleteMatch();
      let touchedSquareId = 23; 
      touchSquare(match, 1, touchedSquareId);
      expect(match.currentMoveFromId).toBe(null);
      expect(match.currentMoveToIds).toEqual([]);
    });

    it('must notify with message', () => {
      let match = firstLegCompleteMatch();
      let touchedSquareId = 23; 
      touchSquare(match, 1, touchedSquareId);
      expect(match.notification).toBe('Computer to move.');
    });
  });

  describe('when move is possible', () => {
    it('must select the square', () => {
      let match = defaultMatch();
      let touchedSquareId = 11;
      touchSquare(match, 1, touchedSquareId);
      let square = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });
      if (square !== undefined && square.piece !== null) {
        expect(square.piece.selected).toBe(true); 
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('must add from to current move', () => {
      let match = defaultMatch();
      let touchedSquareId = 11;
      touchSquare(match, 1, touchedSquareId);
      expect(match.currentMoveFromId).toEqual(touchedSquareId);
    });
  });

  describe('default', () => {
    // empty square case
    it('must clear move', () => {
      let match = defaultMatch();
      let touchedSquareId = 15;
      touchSquare(match, 1, touchedSquareId);
      expect(match.currentMoveFromId).toBe(null);
    });

    it('must notify with a message', () => {
      let match = defaultMatch();
      let touchedSquareId = 15;
      touchSquare(match, 1, touchedSquareId);
      expect(match.notification).toEqual('That square is empty.');
    });
  });
});

describe('addFromToCurrentMove', () => {
  it('must add from to current move', () => {
    let match = defaultMatch();
    let squareId = 11;
    addFromToCurrentMove(match, squareId);
    expect(match.currentMoveFromId).toEqual(squareId);
  });
});

describe('addToToCurrentMove', () => {
  it('must add to to current move', () => {
    let match = firstLegIncompleteMatch();
    let squareId = 14;
    addToToCurrentMove(match, squareId);
    expect(match.currentMoveToIds).toEqual([squareId]);
  });
});

describe('clearMove', () => {
  it('clears current move from and tos ids', () => {
    let match = firstLegCompleteMatch();
    clearMove(match);
    expect(match.currentMoveFromId).toBe(null);
    expect(match.currentMoveToIds).toEqual([]);
  });
});

describe('clearLastAction', () => {
  it('sets last action to null', () => {
    let match = lastActionMatch();
    clearLastAction(match);
    expect(match.lastAction).toBe(null);
  });
});

describe('notify', () => {
  it('sets the notification to a message', () => {
    let match = defaultMatch();
    let message = 'message';
    notify(match, message);
    expect(match.notification).toEqual(message);
  });
});

describe('addMoveToLastAction', () => {
  it('adds a last action with move details', () => {
    let match = firstLegCompleteMatch();
    let fromId = 7;
    let toIds = [14, 23];
    let expected = {
      kind: 'move',
      data: {
        fromId: fromId,
        toIds: toIds
      }
    };
    addMoveToLastAction(match, fromId, toIds);
    expect(match.lastAction).toEqual(expected);
  });
});
