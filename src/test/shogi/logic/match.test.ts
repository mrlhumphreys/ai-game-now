import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import selectedMatch from '../fixtures/selectedMatch';
import selectedPieceInHandMatch from '../fixtures/selectedPieceInHandMatch';
import moveToPromotionZoneMatch from '../fixtures/moveToPromotionZoneMatch';
import putsOuInCheckMatch from '../fixtures/putsOuInCheckMatch';
import promoteMatch from '../fixtures/promoteMatch';
import pieceInHandMatch from '../fixtures/pieceInHandMatch';
import lastActionMatch from '../fixtures/lastActionMatch';

import {
  winner,
  touchSquare,
  touchPromotionOption,
  touchPieceInHand,
  clearLastAction,
  addMoveToLastAction,
  addDropToLastAction,
  setupPromotion,
  teardownPromotion,
  notify
} from '$lib/shogi/logic/match';

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
      let touchedSquareId = '56';
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
      let touchedSquareId = '56';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '57';
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
        let movedPiece = { id: 25, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('passes the turn', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '56';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('adds the move to last action', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '56';
      let expected = {
        kind: 'move',
        data: {
          fromId: '57',
          pieceId: null,
          toId: '56',
          promote: false
        }
      };
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.lastAction).toEqual(expected);
    });
  });

  describe('when drop is valid', () => {
    it('deselects the piece', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '17';
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

    it('drops the piece on the square', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '17';
      touchSquare(match, playerNumber, touchedSquareId);

      let hand = match.gameState.hands.find((h) => {
        return h.playerNumber === playerNumber;
      });

      if (hand !== undefined) {
        expect(hand.pieces[0]).toBe(undefined);
      } else {
        expect(hand).not.toBe(undefined);
      }

      let square = match.gameState.squares.find((s) => {
        return s.id === touchedSquareId;
      });

      if (square !== undefined && square.piece !== null) {
        let expected = { id: 17, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(square.piece).toEqual(expected);
      } else {
        expect(square).not.toBe(undefined);
      }
    });

    it('passes the turn', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '17';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('adds drop to last action', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '17';
      let expected = {
        kind: 'drop',
        data: {
          fromId: null,
          pieceId: 17,
          toId: '17',
          promote: false
        }
      };
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.lastAction).toEqual(expected);
    });
  });

  describe('when piece moves to promotion zone', () => {
    it('moves the piece', () => {
      let match = moveToPromotionZoneMatch();
      let playerNumber = 1;
      let touchedSquareId = '53';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '54';
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
        let movedPiece = { id: 25, playerNumber: 1, type: 'fuhyou', selected: true };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('sets up the promotion', () => {
      let match = moveToPromotionZoneMatch();
      let playerNumber = 1;
      let touchedSquareId = '53';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.promotion).toBe(true);
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
        let expected = { id: 25, playerNumber: 1, type: 'fuhyou', selected: true };
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
      let touchedSquareId = '55';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual('Piece cannot move.');
    });

    it('deselects the piece', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '55';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '57';
      });

      if (fromSquare !== undefined ) {
        let expected = { id: 25, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(fromSquare.piece).toEqual(expected);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }
    });
  });

  describe('when ou is in check', () => {
    it('notifies with a message', () => {
      let match = putsOuInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '49';
      touchSquare(match, playerNumber, touchedSquareId);
      expect(match.notification).toEqual('Move puts ou in check.');
    });

    it('deselects the piece', () => {
      let match = putsOuInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '49';
      touchSquare(match, playerNumber, touchedSquareId);

      let fromSquare = match.gameState.squares.find((s) => {
        return s.id === '59';
      });

      if (fromSquare !== undefined ) {
        let expected = { id: 36, playerNumber: 1, type: 'oushou', selected: false };
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

describe('touchPromotionOption', () => {
  describe('when valid promotion', () => {
    it('deselects the piece', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let promoteOption = true;
      touchPromotionOption(match, playerNumber, promoteOption);

      let toSquare = match.gameState.squares.find((s) => {
        return s.id === '53';
      });

      if (toSquare !== undefined && toSquare.piece !== null) {
        expect(toSquare.piece.selected).toBe(false);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('promotes the piece if promotionOption is true', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let promoteOption = true;
      touchPromotionOption(match, playerNumber, promoteOption);

      let toSquare = match.gameState.squares.find((s) => {
        return s.id === '53';
      });

      if (toSquare !== undefined && toSquare.piece !== null) {
        expect(toSquare.piece.type).toEqual('tokin');
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('does not promote the piece if promotionOption is false', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let promoteOption = false;
      touchPromotionOption(match, playerNumber, promoteOption);

      let toSquare = match.gameState.squares.find((s) => {
        return s.id === '53';
      });

      if (toSquare !== undefined && toSquare.piece !== null) {
        expect(toSquare.piece.type).toEqual('fuhyou');
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });

    it('passes the turn', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let promoteOption = true;
      touchPromotionOption(match, playerNumber, promoteOption);
      expect(match.gameState.currentPlayerNumber).toEqual(2);
    });

    it('adds move to last action', () => {
      let match = promoteMatch();
      let playerNumber = 1;
      let promoteOption = true;
      touchPromotionOption(match, playerNumber, promoteOption);
      let expected = { kind: 'move', data: { fromId: '54', pieceId: null, toId: '53', promote: true } };
      expect(match.lastAction).toEqual(expected);
    });
  });

  describe('when invalid promotion', () => {
    it('does nothing', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let promoteOption = true;
      let result = touchPromotionOption(match, playerNumber, promoteOption);
      expect(result).toBe(false);
    });
  });
});

describe('touchPieceInHand', () => {
  describe('when piece can be selected', () => {
    it('selects the piece in hand', () => {
      let match = pieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 17;
      touchPieceInHand(match, playerNumber, touchedPieceId);

      let hand = match.gameState.hands.find((h) => {
        return h.playerNumber === playerNumber;
      });

      if (hand !== undefined) {
        let expected = { id: 17, playerNumber: 1, type: 'fuhyou', selected: true };
        expect(hand.pieces[0]).toEqual(expected);
      } else {
        expect(hand).not.toBe(undefined);
      }
    });
  });

  describe('when piece is already selected', () => {
    it('deselects the piece', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 17;
      touchPieceInHand(match, playerNumber, touchedPieceId);

      let hand = match.gameState.hands.find((h) => {
        return h.playerNumber === playerNumber;
      });

      if (hand !== undefined) {
        let expected = { id: 17, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(hand.pieces[0]).toEqual(expected);
      } else {
        expect(hand).not.toBe(undefined);
      }
    });
  });

  describe('default', () => {
    it('notifies with a message', () => {
      let match = pieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 12;
      touchPieceInHand(match, playerNumber, touchedPieceId);
      expect(match.notification).toEqual('Piece does not exist.');
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
    let promote = false;
    let expected = { kind: 'move', data: { fromId: fromId, pieceId: null, toId: toId, promote: promote }};
    addMoveToLastAction(match, fromId, toId, promote);
    expect(match.lastAction).toEqual(expected);
  });
});

describe('addDropToLastAction', () => {
  it('sets the lastAction', () => {
    let match = defaultMatch();
    let pieceId = 17;
    let toId = '56';
    let promote = false;
    let expected = { kind: 'drop', data: { fromId: null, pieceId: pieceId, toId: toId, promote: promote }};
    addDropToLastAction(match, pieceId, toId);
    expect(match.lastAction).toEqual(expected);
  });
});

describe('setupPromotion', () => {
  it('stores the currentMove and sets the promotion flag', () => {
    let match = defaultMatch();
    let fromId = '57';
    let toId = '56';
    let expected = { fromId: fromId, toId: toId };
    setupPromotion(match, fromId, toId);
    expect(match.currentMove).toEqual(expected);
    expect(match.promotion).toBe(true);
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

describe('teardownPromotion', () => {
  it('clears the currentMove and turns off the promotion flag', () => {
    let match = promoteMatch();
    teardownPromotion(match);
    expect(match.currentMove).toBe(null);
    expect(match.promotion).toBe(false);
  });
});
