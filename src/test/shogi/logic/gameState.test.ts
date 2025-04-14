import { describe, it, expect } from 'vitest';

import defaultGameState from '../fixtures/defaultGameState';
import inCheckmateGameState from '../fixtures/inCheckmateGameState';
import inCheckmatePinnedGameState from '../fixtures/inCheckmatePinnedGameState';
import inCheckmatePinnedWithBlockGameState from '../fixtures/inCheckmatePinnedWithBlockGameState';
import playerTwoInCheckmateGameState from '../fixtures/playerTwoInCheckmateGameState';
import selectedGameState from '../fixtures/selectedGameState';
import selectedPieceInHandGameState from '../fixtures/selectedPieceInHandGameState';
import inCheckGameState from '../fixtures/inCheckGameState';
import inCheckOuCannotMoveGameState from '../fixtures/inCheckOuCannotMoveGameState';
import inCheckCanBeBlockedGameState from '../fixtures/inCheckCanBeBlockedGameState';
import inCheckCanBeBlockedByDropGameState from '../fixtures/inCheckCanBeBlockedByDropGameState';
import playerTwoGameState from '../fixtures/playerTwoGameState';
import captureGameState from '../fixtures/captureGameState';
import pieceInHandGameState from '../fixtures/pieceInHandGameState';
import fuhyouPromoteMoveGameState from '../fixtures/fuhyouPromoteMoveGameState';

import {
  gameOver,
  selectedSquare,
  selectedPieceInHand,
  findSquare,
  findPieceInHand,
  playersTurn,
  capturedSquare,
  capturedSquareId,
  pieceMovedToPromotionZone,
  pieceMovedToCompulsoryPromotionZone,
  inCheckmate,
  inCheck,
  threatsToOuCanBeCaptured,
  threatsToOuCanBeBlocked,
  ouCannotMove,
  winner,
  opponentOf,
  opponent,
  move,
  performMove,
  drop,
  selectPiece,
  deselectPiece,
  selectPieceInHand,
  deselectPieceInHand,
  promote,
  passTurn
} from '$lib/shogi/logic/gameState';

describe('gameOver', () => {
  it('returns true if player 1 is in checkmate', () => {
    let gameState = inCheckmateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });

  it('returns true if player 2 is in checkmate', () => {
    let gameState = playerTwoInCheckmateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });
});

describe('selectedSquare', () => {
  it('returns the square if square is selected', () => {
    let gameState = selectedGameState();
    let expected = { id: '59', x: 4, y: 8, piece: { id: 36, playerNumber: 1, type: 'oushou', selected: true } };
    let result = selectedSquare(gameState);
    expect(result).toEqual(expected);
  });

  it('returns undefined if the square is not selected', () => {
    let gameState = defaultGameState();
    let result = selectedSquare(gameState);
    expect(result).toBe(undefined);
  });
});

describe('selectedPieceInHand', () => {
  it('returns the piece if piece selected', () => {
    let gameState = selectedPieceInHandGameState();
    let expected = { id: 16, playerNumber: 1, type: 'fuhyou', selected: true };
    let result = selectedPieceInHand(gameState);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no piece is selected', () => {
    let gameState = defaultGameState();
    let result = selectedPieceInHand(gameState);
    expect(result).toBe(undefined);
  });
});

describe('findSquare', () => {
  it('returns the square matching the id if found', () => {
    let gameState = defaultGameState();
    let expected = { id: '57', x: 4, y: 6, piece: { id: 25, playerNumber: 1, type: 'fuhyou', selected: false } };
    let result = findSquare(gameState, '57');
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square matches the id', () => {
    let gameState = defaultGameState();
    let result = findSquare(gameState, 'xx');
    expect(result).toBe(undefined);
  });
});

describe('findPieceInHand', () => {
  it('returns the piece matching the id if found', () => {
    let gameState = selectedPieceInHandGameState();
    let result = findPieceInHand(gameState, 16);
    let expected = { id: 16, playerNumber: 1, type: 'fuhyou', selected: true };
    expect(result).toEqual(expected);

  });

  it('returns undefined if the piece is not found', () => {
    let gameState = selectedPieceInHandGameState();
    let result = findPieceInHand(gameState, 123);
    expect(result).toBe(undefined);
  });
});

describe('playersTurn', () => {
  it('returns true if it is the players turn', () => {
    let gameState = defaultGameState();
    expect(playersTurn(gameState, 1)).toBe(true);
  });

  it('returns false if it is not the players turn', () => {
    let gameState = defaultGameState();
    expect(playersTurn(gameState, 2)).toBe(false);
  });
});

describe('capturedSquare', () => {
  describe('when to is occupied', () => {
    it('returns to', () => {
      let to = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } };
      let result = capturedSquare(to);
      expect(result).toEqual(to);
    });
  });

  describe('when to is unoccupied', () => {
    it('returns undefined', () => {
      let to = { id: '94', x: 0, y: 3, piece: null };
      let result = capturedSquare(to);
      expect(result).toBe(undefined);
    });
  });
});

describe('catpuredSquareId', () => {
  it('returns the captured square id if there is one', () => {
      let to = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } };
      let result = capturedSquareId(to);
      expect(result).toEqual(to.id);
  });

  it('returns undefined if there is no captured square', () => {
      let to = { id: '94', x: 0, y: 3, piece: null };
      let result = capturedSquareId(to);
      expect(result).toBe(undefined);
  });
});

describe('pieceMovedToPromotionZone', () => {
  describe('when piece exists', () => {
    describe('and piece moves to promotion zone', () => {
      it('returns true', () => {
        let from = { id: '94', x: 0, y: 3, piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false } };
        let to = { id: '93', x: 0, y: 2, piece: null };
        let result = pieceMovedToPromotionZone(from, to);
        expect(result).toBe(true);
      });
    });

    describe('and piece does not move to promotion zone', () => {
      it('returns false', () => {
        let from = { id: '95', x: 0, y: 4, piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false } };
        let to = { id: '94', x: 0, y: 3, piece: null };
        let result = pieceMovedToPromotionZone(from, to);
        expect(result).toBe(false);
      });
    });
  });

  describe('when piece does not exist', () => {
    it('returns false', () => {
      let from = { id: '94', x: 0, y: 3, piece: null };
      let to = { id: '93', x: 0, y: 2, piece: null };
      let result = pieceMovedToPromotionZone(from, to);
      expect(result).toBe(false);
    });
  });
});

describe('pieceMovedToCompulsoryPromotionZone', () => {
  describe('when piece exists', () => {
    describe('and piece moves to compulsory promotion zone', () => {
      it('return true', () => {
        let from = { id: '94', x: 0, y: 3, piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false } };
        let to = { id: '91', x: 0, y: 0, piece: null };
        let result = pieceMovedToCompulsoryPromotionZone(from, to);
        expect(result).toBe(true);
      });
    });

    describe('and piece does not move to compulsory promotion zone', () => {
      it('returns false', () => {
        let from = { id: '94', x: 0, y: 3, piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false } };
        let to = { id: '92', x: 0, y: 1, piece: null };
        let result = pieceMovedToCompulsoryPromotionZone(from, to);
        expect(result).toBe(false);
      });
    });
  });

  describe('when piece does not exist', () => {
    it('returns false', () => {
      let from = { id: '95', x: 0, y: 4, piece: null };
      let to = { id: '94', x: 0, y: 3, piece: null };
      let result = pieceMovedToCompulsoryPromotionZone(from, to);
      expect(result).toBe(false);
    });
  });
});

describe('inCheckmate', () => {
  it('returns true if ou is in check and no move gets out of check', () => {
    let gameState = inCheckmateGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns true if piece that captures threats reveals pined threat', () => {
    let gameState = inCheckmatePinnedGameState();
    let playerNumber = 2;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if ou is in check and the king moving gets it out of check', () => {
    let gameState = inCheckGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if ou is in check and cannot move, but other pieces can capture threats', () => {
    let gameState = inCheckOuCannotMoveGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if ou is in check and cannot move, but other pieces can block threats', () => {
    let gameState = inCheckCanBeBlockedGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if the ou is not in check', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('inCheck', () => {
  it('returns true if ou is under threat', () => {
    let gameState = inCheckGameState();
    let playerNumber = 1;
    let result = inCheck(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if ou is not under threat', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let result = inCheck(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('threatsToOuCanBeCaptured', () => {
  it('returns true if threat causing check can be captured', () => {
    let gameState = inCheckOuCannotMoveGameState();
    let playerNumber = 1;
    let result = threatsToOuCanBeCaptured(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if capture threat reveals pin', () => {
    let gameState = inCheckmatePinnedGameState();
    let playerNumber = 2;
    let result = threatsToOuCanBeCaptured(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if threat to Ou cannot be captured', () => {
    let gameState = inCheckmateGameState();
    let playerNumber = 1;
    let result = threatsToOuCanBeCaptured(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('threatsToOuCanBeBlocked', () => {
  it('returns true if threat causing check can be blocked by moving', () => {
    let gameState = inCheckCanBeBlockedGameState();
    let playerNumber = 1;
    let result = threatsToOuCanBeBlocked(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if block threat reveals pin', () => {
    let gameState = inCheckmatePinnedWithBlockGameState();
    let playerNumber = 2;
    let result = threatsToOuCanBeBlocked(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns true if threat causing check can be blocked by moving', () => {
    let gameState = inCheckCanBeBlockedByDropGameState();
    let playerNumber = 1;
    let result = threatsToOuCanBeBlocked(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('return false if threat causing check cannot be blocked', () => {
    let gameState = inCheckmateGameState();
    let playerNumber = 1;
    let result = threatsToOuCanBeBlocked(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('ouCannotMove', () => {
  describe('all destinations result in check', () => {
    it('returns true', () => {
      let gameState = inCheckmateGameState();
      let result = ouCannotMove(gameState, 1);
      expect(result).toBe(true);
    });
  });

  describe('not all destinations result in check', () => {
    it('returns false', () => {
      let gameState = defaultGameState();
      let result = ouCannotMove(gameState, 1);
      expect(result).toBe(false);
    });
  });
});

describe('winner', () => {
  it('returns player 2 if player 1 is in checkmate', () => {
    let gameState = inCheckmateGameState();
    expect(winner(gameState)).toEqual(2);
  });

  it('returns player 1 if player 2 is in checkmate', () => {
    let gameState = playerTwoInCheckmateGameState();
    expect(winner(gameState)).toEqual(1);
  });

  it('returns null if no one in checkmate', () => {
    let gameState = defaultGameState();
    expect(winner(gameState)).toBe(null);
  });
});

describe('gameOver', () => {
  it('returns true if player 1 is in checkmate', () => {
    let gameState = inCheckmateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });

  it('returns true if player 2 is in checkmate', () => {
    let gameState = playerTwoInCheckmateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });

  it('returns false if no one in checkmate and no one in stalemnate', () => {
    let gameState = defaultGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(false);
  });
});

describe('opponentOf', () => {
  it('returns 1 if player number is 2', () => {
    expect(opponentOf(1)).toEqual(2);
  });

  it('returns 2 if player number is 1', () => {
    expect(opponentOf(2)).toEqual(1);
  });
});

describe('opponent', () => {
  it('returns 1 if current player number is 2', () => {
    let gameState = playerTwoGameState();
    expect(opponent(gameState)).toEqual(1);
  });

  it('returns 2 if current player number is 1', () => {
    let gameState = defaultGameState();
    expect(opponent(gameState)).toEqual(2);
  });
});

describe('move', () => {
  describe('when from and to is found', () => {
    it('performs the move', () => {
      let gameState = defaultGameState();
      let fromId = '57';
      let toId = '56';
      let result = move(gameState, fromId, toId);

      let fromSquare = gameState.squares.find((s) => {
        return s.id === fromId;
      });

      if (fromSquare !== undefined) {
        expect(fromSquare.piece).toBe(null);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }

      let toSquare = gameState.squares.find((s) => {
        return s.id === toId;
      });

      if (toSquare !== undefined) {
        let movedPiece = { id: 25, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      expect(result).toBe(true);
    });
  });

  describe('when from or to are not found', () => {
    it('does not perform the move', () => {
      let gameState = defaultGameState();
      let fromId = '57';
      let toId = 'xx';
      let result = move(gameState, fromId, toId);

      let fromSquare = gameState.squares.find((s) => {
        return s.id === fromId;
      });

      let expectedPiece = { id: 25, playerNumber: 1, selected: false, type: 'fuhyou' };

      if (fromSquare !== undefined) {
        expect(fromSquare.piece).toEqual(expectedPiece);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }

      expect(result).toBe(false);
    });
  });
});

describe('performMove', () => {
  describe('when from equals to', () => {
    it('returns false', () => {
      let gameState = defaultGameState();
      let fromId = '47';
      let toId = '47';
      let capturedId = undefined;
      let result = performMove(gameState, fromId, toId, capturedId);
      expect(result).toBe(false);
    });
  });

  describe('when no capture', () => {
    it('moves the piece', () => {
      let gameState = defaultGameState();
      let fromId = '47';
      let toId = '46';
      let capturedId = undefined;
      let result = performMove(gameState, fromId, toId, capturedId);

      let fromSquare = gameState.squares.find((s) => {
        return s.id === fromId;
      });

      if (fromSquare !== undefined) {
        expect(fromSquare.piece).toBe(null);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }

      let toSquare = gameState.squares.find((s) => {
        return s.id === toId;
      });

      if (toSquare !== undefined) {
        let movedPiece = { id: 26, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      expect(result).toBe(true);
    });
  });

  describe('when capture', () => {
    it('moves the piece and adds the captured piece to hand', () => {
      let gameState = captureGameState();
      let fromId = '47';
      let toId = '46';
      let capturedId = '46';
      let result = performMove(gameState, fromId, toId, capturedId);

      let fromSquare = gameState.squares.find((s) => {
        return s.id === fromId;
      });

      if (fromSquare !== undefined) {
        expect(fromSquare.piece).toBe(null);
      } else {
        expect(fromSquare).not.toBe(undefined);
      }

      let toSquare = gameState.squares.find((s) => {
        return s.id === toId;
      });

      if (toSquare !== undefined) {
        let movedPiece = { id: 26, playerNumber: 1, type: 'fuhyou', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      let hand = gameState.hands.find((h) => {
        return h.playerNumber === 1;
      });

      if (hand !== undefined) {
        let piece = hand.pieces[0];
        let expectedPiece = { id: 17, playerNumber: 1, selected: false, type: 'fuhyou' };
        expect(piece).toEqual(expectedPiece);
      } else {
        expect(hand).not.toBe(undefined);
      }

      expect(result).toBe(true);
    });
  });
});

describe('drop', () => {
  describe('when piece and square exist', () => {
    it('moves the piece from hand to square', () => {
      let gameState = selectedPieceInHandGameState();
      let pieceId = 16;
      let squareId = '46';
      let result = drop(gameState, pieceId, squareId);

      let hand = gameState.hands.find((h) => {
        return h.playerNumber === 1;
      });

      if (hand !== undefined) {
        let piece = hand.pieces[0];
        expect(piece).toBe(undefined);
      } else {
        expect(hand).not.toBe(undefined);
      }

      let toSquare = gameState.squares.find((s) => {
        return s.id === squareId;
      });

      if (toSquare !== undefined) {
        let movedPiece = { id: 16, playerNumber: 1, type: 'fuhyou', selected: true };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      expect(result).toBe(true);
    });
  });

  describe('when piece does not exist', () => {
    it('returns false', () => {
      let gameState = selectedPieceInHandGameState();
      let pieceId = 17;
      let squareId = '46';
      let result = drop(gameState, pieceId, squareId);

      let hand = gameState.hands.find((h) => {
        return h.playerNumber === 1;
      });

      if (hand !== undefined) {
        let piece = hand.pieces[0];
        let expectedPiece = { id: 16, playerNumber: 1, selected: true, type: 'fuhyou' };
        expect(piece).toEqual(expectedPiece);
      } else {
        expect(hand).not.toBe(undefined);
      }

      let toSquare = gameState.squares.find((s) => {
        return s.id === squareId;
      });

      if (toSquare !== undefined) {
        expect(toSquare.piece).toBe(null);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      expect(result).toBe(false);
    });
  });

  describe('when square does not exist', () => {
    it('returns false', () => {
      let gameState = selectedPieceInHandGameState();
      let pieceId = 16;
      let squareId = 'xx';
      let result = drop(gameState, pieceId, squareId);

      let hand = gameState.hands.find((h) => {
        return h.playerNumber === 1;
      });

      if (hand !== undefined) {
        let piece = hand.pieces[0];
        let expectedPiece = { id: 16, playerNumber: 1, selected: true, type: 'fuhyou' };
        expect(piece).toEqual(expectedPiece);
      } else {
        expect(hand).not.toBe(undefined);
      }

      expect(result).toBe(false);
    });
  });
});

describe('selectPiece', () => {
  it('selects the matching piece', () => {
    let gameState = defaultGameState();
    let id = '57';
    selectPiece(gameState, id);
    let square = gameState.squares.find((s) => {
      return s.id === id;
    });

    if (square !== undefined && square.piece !== null) {
      expect(square.piece.selected).toBe(true);
    } else {
      expect(square).not.toBe(undefined);
    }
  });
});

describe('deselectPiece', () => {
  it('deselcts the selected piece', () => {
    let gameState = selectedGameState();
    let id = '59';
    deselectPiece(gameState, id);

    let square = gameState.squares.find((s) => {
      return s.id === id;
    });

    if (square !== undefined && square.piece !== null) {
      expect(square.piece.selected).toBe(false);
    } else {
      expect(square).not.toBe(undefined);
    }
  });
});

describe('selectPieceInHand', () => {
  it('selects the specified piece', () => {
    let gameState = pieceInHandGameState();
    let pieceId = 16;
    let result = selectPieceInHand(gameState, pieceId);

    let hand = gameState.hands.find((h) => {
      return h.playerNumber === 1;
    });

    if (hand !== undefined) {
      let piece = hand.pieces[0];
      let expectedPiece = { id: 16, playerNumber: 1, selected: true, type: 'fuhyou' };
      expect(piece).toEqual(expectedPiece);
    } else {
      expect(hand).not.toBe(undefined);
    }

    expect(result).toBe(true);
  });
});

describe('deselectPieceInHand', () => {
  it('deselects the specified piece', () => {
    let gameState = selectedPieceInHandGameState();
    let pieceId = 16;
    let result = deselectPieceInHand(gameState, pieceId);

    let hand = gameState.hands.find((h) => {
      return h.playerNumber === 1;
    });

    if (hand !== undefined) {
      let piece = hand.pieces[0];
      let expectedPiece = { id: 16, playerNumber: 1, selected: false, type: 'fuhyou' };
      expect(piece).toEqual(expectedPiece);
    } else {
      expect(hand).not.toBe(undefined);
    }

    expect(result).toBe(true);
  });
});

describe('promote', () => {
  it('promotes the piece to the specified type', () => {
    let gameState = fuhyouPromoteMoveGameState();
    let id = '53';
    let pieceType = 'tokin';
    promote(gameState, id);

    let square = gameState.squares.find((s) => {
      return s.id === id;
    });

    if (square !== undefined && square.piece !== null) {
      expect(square.piece.type).toBe(pieceType);
    } else {
      expect(square).not.toBe(undefined);
    }
  });
});

describe('passTurn', () => {
  it('sets the current player number to 1 if 2', () => {
    let gameState = playerTwoGameState();
    passTurn(gameState);
    expect(gameState.currentPlayerNumber).toEqual(1);
  });

  it('sets the current player number to 2 if 1', () => {
    let gameState = defaultGameState();
    passTurn(gameState);
    expect(gameState.currentPlayerNumber).toEqual(2);
  });
});

