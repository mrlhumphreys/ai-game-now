import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import selectedMatch from '../fixtures/selectedMatch';
import putsKingInCheckMatch from '../fixtures/putsKingInCheckMatch';
import lastActionMatch from '../fixtures/lastActionMatch';

import {
  winner,
  touchSquare,
  clearLastAction,
  addMoveToLastAction,
  notify
} from '#lib/xiangqi/logic/match';

describe('winner', () => {
  it('returns the winner if there is one', () => {
    let match = winnerMatch();
    expect(winner(match)).toEqual(1);
  });

  it('returns null if there is no winner', () => {
    let match = defaultMatch();
    expect(winner(match)).toBe(null);
  });
});

describe('touchSquare', () => {
  describe('when move is valid', () => {
    it('deselects the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
      touchSquare(match, playerNumber, touchedSquareId);

      let square = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (square !== undefined && square.piece !== null) {
        expect(square.piece.selected).toBe(false);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('moves the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '28';
      });

      if (fromSquare !== undefined ) {
        expect(fromSquare.piece).toBe(null);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }

      let toSquare = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (toSquare !== undefined ) {
        let movedPiece = { id: 23, playerNumber: 1, type: 'cannon', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('passes the turn', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('adds the move to last action', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
      let expected = {
        kind: 'move',
        data: {
          fromId: '28',
          toId: '38'
        }
      };
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.lastAction).toEqual(expected);
    });
  });

  describe('when move is possible', () => {
    it('selects the piece', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = '57';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (fromSquare !== undefined ) {
        let expected = { id: 19, playerNumber: 1, type: 'soldier', selected: true };
        expect(fromSquare.piece).toEqual(expected);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }
    });
  });

  describe('when move is invalid', () => {
    it('notifies with a message', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '19';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual('Piece cannot move.');
    });

    it('deselects the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '19';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '28';
      });

      if (fromSquare !== undefined ) {
        let expected = { id: 23, playerNumber: 1, type: 'cannon', selected: false };
        expect(fromSquare.piece).toEqual(expected);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }
    });
  });

  describe('when king is in check', () => {
    it('notifies with a message', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '59';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual('Move puts king in check.');
    });

    it('deselects the piece', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '59';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '510';
      });

      if (fromSquare !== undefined ) {
        let expected = { id: 28, playerNumber: 1, type: 'king', selected: false };
        expect(fromSquare.piece).toEqual(expected);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }
    });
  });

  describe('when default', () => {
    it('notfies with a message', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let touchedSquareId = '49';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual('Player wins.');
    });
  });
});

describe('clearLastAction', () => {
  it('sets the lastAction to null', () => {
    let match = lastActionMatch();
    clearLastAction(match);
    expect(match.lastAction).toBe(null);
  });
});

describe('addMoveToLastAction', () => {
  it('sets the lastAction', () => {
    let match = defaultMatch();
    let fromId = '57';
    let toId = '56';
    let expected = { kind: 'move', data: { fromId: fromId, toId: toId }};
    addMoveToLastAction(match, fromId, toId);
    expect(match.lastAction).toEqual(expected);
  });
});

describe('notify', () => {
  it('sets the notificaiton message', () => {
    let match = defaultMatch();
    let message = 'Player 2 to move.';
    notify(match, message);
    expect(match.notification).toEqual(message);
  });
});
