import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import selectedMatch from '../fixtures/selectedMatch';
import lastActionMatch from '../fixtures/lastActionMatch';
import pawnMoveToLastRankMatch from '../fixtures/pawnMoveToLastRankMatch';
import promotionMatch from '../fixtures/promotionMatch';
import putsKingInCheckMatch from '../fixtures/putsKingInCheckMatch';
import winnerMatch from '../fixtures/winnerMatch';

import {
  winner,
  touchSquare,
  touchPromotionPiece,
  setupPromotion,
  teardownPromotion,
  addMoveToLastAction,
  clearLastAction,
  notify
} from '$lib/chess/logic/match';

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
  it('notifies with a message', () => {
    let match = selectedMatch();
    let playerNumber = 1;
    let touchedSquareId = 'e4';
    touchSquare(match, playerNumber, touchedSquareId);
    expect(match.notification).toEqual('');
  });

  describe('when move valid', () => {
    it('deselects the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e4';
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
      let touchedSquareId = 'e4';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === 'e2';
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
        let movedPiece = { id: 21, playerNumber: 1, type: 'pawn', selected: false, hasMoved: true };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('passes the turn', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e4';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('adds the move to last action', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e4';
      let expected = {
        kind: 'move',
        data: {
          fromId: 'e2',
          toId: 'e4',
          pieceType: null
        }
      };
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.lastAction).toEqual(expected);
    });
  });

  describe('when pawn moves to last rank', () => {
    it('deselects the piece', () => {
      let match = pawnMoveToLastRankMatch();
      let playerNumber = 1;
      let touchedSquareId = 'h8';
      touchSquare(match, playerNumber, touchedSquareId);

      let toSquare = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (toSquare !== undefined && toSquare.piece !== null) {
        expect(toSquare.piece.selected).toBe(false);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('moves the piece', () => {
      let match = pawnMoveToLastRankMatch();
      let playerNumber = 1;
      let touchedSquareId = 'h8';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === 'h7';
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
        let movedPiece = { id: 24, playerNumber: 1, type: 'pawn', selected: false, hasMoved: true };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('sets up the promotion state', () => {
      let match = pawnMoveToLastRankMatch();
      let playerNumber = 1;
      let touchedSquareId = 'h8';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.promotion).toBe(true);
    });
  });

  describe('when move possible', () => {
    it('selects the piece', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (fromSquare !== undefined && fromSquare.piece !== null) {
        expect(fromSquare.piece.selected).toBe(true);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }
    });
  });

  describe('when move invalid', () => {
    it('deselects the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'd3';
      touchSquare(match, playerNumber, touchedSquareId);

      let square = match.gameState.squares.find((s) => {
        return s.id === 'e2';
      });

      if (square !== undefined && square.piece !== null) {
        expect(square.piece.selected).toBe(false);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('notifies with a message', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'd3';
      let expected = 'Piece cannot move.';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual(expected);
    });
  });

  describe('when move in puts king in check', () => {
    it('deselects the piece', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      touchSquare(match, playerNumber, touchedSquareId);

      let square = match.gameState.squares.find((s) => {
        return s.id === 'e1';
      });

      if (square !== undefined && square.piece !== null) {
        expect(square.piece.selected).toBe(false);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('notifies with a message', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = 'Move puts king in check.';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual(expected);
    });
  });

  describe('default', () => {
    it('notifies with a message', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = 'Player wins.';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('touchPromotionPiece', () => {
  describe('when promotion valid', () => {
    it('promotes the piece', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      touchPromotionPiece(match, playerNumber, pieceType);

      let square = match.gameState.squares.find((s) => {
        return s.id === 'h8';
      });

      if (square !== undefined && square.piece !== null) {
        expect(square.piece.type).toEqual(pieceType);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('adds move to last action', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      let expected = {
        kind: 'move',
        data: {
          fromId: 'h7',
          toId: 'h8',
          pieceType: pieceType
        }
      };
      touchPromotionPiece(match, playerNumber, pieceType);
      expect(match.lastAction).toEqual(expected);
    });

    it('tearsdown promotion', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      touchPromotionPiece(match, playerNumber, pieceType);
      expect(match.currentMove).toBe(null);
      expect(match.promotion).toBe(false);
    });

    it('passes the turn', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'queen';
      touchPromotionPiece(match, playerNumber, pieceType);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });
  });

  describe('when promotion invalid', () => {
    it('notifies with a message', () => {
      let match = promotionMatch();
      let playerNumber = 1;
      let pieceType = 'king';
      let expected = 'Pawn cannot promote to that piece.';
      touchPromotionPiece(match, playerNumber, pieceType);
      expect(match.notification).toEqual(expected);
    });
  });
});

describe('setupPromotion', () => {
  it('sets the current move', () => {
    let match = pawnMoveToLastRankMatch();
    let fromId = 'h7';
    let toId = 'h8';
    let expected = { fromId: fromId, toId: toId };
    setupPromotion(match, fromId, toId);
    expect(match.currentMove).toEqual(expected);
  });

  it('sets promotion to true', () => {
    let match = pawnMoveToLastRankMatch();
    let fromId = 'h7';
    let toId = 'h8';
    setupPromotion(match, fromId, toId);
    expect(match.promotion).toBe(true);
  });
});

describe('teardownPromotion', () => {
  it('sets current move to null', () => {
    let match = promotionMatch();
    teardownPromotion(match);
    expect(match.currentMove).toBe(null);
  });

  it('sets promotion to false', () => {
    let match = promotionMatch();
    teardownPromotion(match);
    expect(match.promotion).toBe(false);
  });
});

describe('addMoveToLastAction', () => {
  it('sets the last action without pieceType', () => {
    let match = defaultMatch();
    let fromId = 'e2';
    let toId = 'e4';
    let pieceType = null;
    let expected = {
      kind: 'move',
      data: {
        fromId: fromId,
        toId: toId,
        pieceType: pieceType
      }
    };
    addMoveToLastAction(match, fromId, toId, pieceType);
    expect(match.lastAction).toEqual(expected);
  });

  it('sets the last action with pieceType', () => {
    let match = promotionMatch();
    let fromId = 'h7';
    let toId = 'h8';
    let pieceType = 'queen';
    let expected = {
      kind: 'move',
      data: {
        fromId: fromId,
        toId: toId,
        pieceType: pieceType
      }
    }
    addMoveToLastAction(match, fromId, toId, pieceType);
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

describe('notify', () => {
  it('sets the notification to message', () => {
    let match = defaultMatch();
    let message = 'message';
    notify(match, message);
    expect(match.notification).toEqual(message);
  });
});
