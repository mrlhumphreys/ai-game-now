import { describe, it, expect } from 'vitest';

import defaultGameState from '../fixtures/defaultGameState';
import selectedGameState from '../fixtures/selectedGameState';
import playerTwoGameState from '../fixtures/playerTwoGameState';
import enPassantGameState from '../fixtures/enPassantGameState';
import pawnCaptureGameState from '../fixtures/pawnCaptureGameState';
import pawnPromoteMoveGameState from '../fixtures/pawnPromoteMoveGameState';
import kingMoveGameState from '../fixtures/kingMoveGameState';
import inCheckGameState from '../fixtures/inCheckGameState';
import notInCheckGameState from '../fixtures/notInCheckGameState';
import inStalemateGameState from '../fixtures/inStalemateGameState';
import playerTwoInStalemateGameState from '../fixtures/playerTwoInStalemateGameState';
import inCheckmateGameState from '../fixtures/inCheckmateGameState';
import inCheckAndOtherPieceCanStopCheckmateGameState from '../fixtures/inCheckAndOtherPieceCanStopCheckmateGameState';
import playerTwoInCheckmateGameState from '../fixtures/playerTwoInCheckmateGameState';

import {
  gameOver,
  winner,
  playersTurn,
  opponentOf,
  opponent,
  selectedSquare,
  findSquare,
  capturedSquare,
  capturedSquareId,
  inStalemate,
  inCheckmate,
  inCheck,
  rookCastleMove,
  pawnMoveToLastRank,
  performMove,
  move,
  selectPiece,
  deselectPiece,
  promote,
  passTurn
} from '$lib/chess/logic/gameState';

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

  it('returns true if player 1 is in stalemate', () => {
    let gameState = inStalemateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });

  it('returns true if player 2 is in stalemate', () => {
    let gameState = playerTwoInStalemateGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(true);
  });

  it('returns false if no one in checkmate and no one in stalemnate', () => {
    let gameState = defaultGameState();
    let result = gameOver(gameState);
    expect(result).toEqual(false);
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

describe('selectedSquare', () => {
  it('returns the square if square is selected', () => {
    let gameState = defaultGameState();
    let result = selectedSquare(gameState);
    expect(result).toBe(undefined);
  });

  it('returns undefined if the square is not selected', () => {
    let gameState = selectedGameState();
    let expected = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: true } };
    let result = selectedSquare(gameState);
    expect(result).toEqual(expected);
  });
});

describe('findSquare', () => {
  it('returns the square matching the id if found', () => {
    let gameState = defaultGameState();
    let expected = { id: 'a8', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'rook', selected: false } };
    let result = findSquare(gameState, 'a8');
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square matches the id', () => {
    let gameState = defaultGameState();
    let result = findSquare(gameState, 'xx');
    expect(result).toBe(undefined);
  });
});

describe('capturedSquare', () => {
  describe('when to is occupied', () => {
    it('returns to', () => {
      let gameState = pawnCaptureGameState();
      let from = { id: 'e4', x: 4, y: 4, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
      let to = { id: 'd5', x: 3, y: 3, piece: { id: 12, playerNumber: 2, type: 'pawn', selected: false } };
      let result = capturedSquare(gameState, from, to);
      expect(result).toEqual(to);
    });
  });

  describe('when pawn has moved 2 spaces in the last turn', () => {
    describe('and pawn has moved diagonally behind opposing pawn', () => {
      it('returns the opposing pawns square', () => {
        let gameState = enPassantGameState();
        let from = { id: 'e5', x: 4, y: 3, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
        let to = { id: 'd6', x: 3, y: 2, piece: null };
        let expected = { id: 'd5', x: 3, y: 3, piece: { id: 12, playerNumber: 2, type: 'pawn', selected: false } };
        let result = capturedSquare(gameState, from, to);
        expect(result).toEqual(expected);
      });
    });

    describe('and pawn has moved in front of opposing pawn', () => {
      it('returns undefined', () => {
        let gameState = enPassantGameState();
        let from = { id: 'd2', x: 3, y: 6, piece: { id: 20, playerNumber: 1, type: 'pawn', selected: false } };
        let to = { id: 'd3', x: 3, y: 5, piece: null };
        let result = capturedSquare(gameState, from, to);
        expect(result).toBe(undefined);
      });
    });

    describe('and pawn has moved far away from opposing pawn', () => {
      it('returns undefined', () => {
        let gameState = enPassantGameState();
        let from = { id: 'h5', x: 7, y: 3, piece: { id: 24, playerNumber: 1, type: 'pawn', selected: false } };
        let to = { id: 'h6', x: 7, y: 2, piece: null };
        let result = capturedSquare(gameState, from, to);
        expect(result).toBe(undefined);
      });
    });
  });

  describe('default', () => {
    it('returns undefined', () => {
      let gameState = defaultGameState();
      let from = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
      let to = { id: 'e4', x: 4, y: 4, piece: null };
      let result = capturedSquare(gameState, from, to);
      expect(result).toBe(undefined);
    });
  });
});

describe('capturedSquareId', () => {
  it('returns the captured square id if there is one', () => {
    let gameState = enPassantGameState();
    let from = { id: 'e5', x: 4, y: 3, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
    let to = { id: 'd6', x: 3, y: 2, piece: null };
    let expected = 'd5';
    let result = capturedSquareId(gameState, from, to);
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is no captured square', () => {
    let gameState = defaultGameState();
    let from = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
    let to = { id: 'e4', x: 4, y: 4, piece: null };
    let result = capturedSquareId(gameState, from, to);
    expect(result).toBe(undefined);
  });
});

describe('inStalemate', () => {
  it('returns true if king is not in check and no move gets it out of check', () => {
    let gameState = inStalemateGameState();
    let playerNumber = 1;
    let result = inStalemate(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if king is in check and no moves get it out of check', () => {
    let gameState = inCheckmateGameState();
    let playerNumber = 1;
    let result = inStalemate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if it is not in check and other moves do not lead to check', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let result = inStalemate(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('inCheckmate', () => {
  it('returns true if king is in check and no move gets out of check', () => {
    let gameState = inCheckmateGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if king is in check and the king moving gets it out of check', () => {
    let gameState = inCheckGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if king is in check and another piece moving gets it out of check', () => {
    let gameState = inCheckAndOtherPieceCanStopCheckmateGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if the king is not in check', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let result = inCheckmate(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('inCheck', () => {
  it('returns true if king is under threat', () => {
    let gameState = inCheckGameState();
    let playerNumber = 1;
    let result = inCheck(gameState, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if king is not under threat', () => {
    let gameState = notInCheckGameState();
    let playerNumber = 1;
    let result = inCheck(gameState, playerNumber);
    expect(result).toBe(false);
  });
});

describe('rookCastleMove', () => {
  describe('when king and making a king side castle move', () => {
    it('returns the rooks move', () => {
      let gameState = kingMoveGameState();
      let from = { id: 'e1', x: 4, y: 7, piece: { id: 29, playerNumber: 1, type: 'king', selected: false } };
      let to = { id: 'g1', x: 6, y: 7, piece: null };
      let expected = { fromId: 'h1', toId: 'f1' };
      let result = rookCastleMove(gameState, from, to);
      expect(result).toEqual(expected);
    });
  });

  describe('when king and making a queen side castle move', () => {
    it('returns the rooks move', () => {
      let gameState = kingMoveGameState();
      let from = { id: 'e1', x: 4, y: 7, piece: { id: 29, playerNumber: 1, type: 'king', selected: false } };
      let to = { id: 'c1', x: 2, y: 7, piece: null };
      let expected = { fromId: 'a1', toId: 'd1' };
      let result = rookCastleMove(gameState, from, to);
      expect(result).toEqual(expected);
    });
  });

  describe('when king and making a normal move', () => {
    it('returns null', () => {
      let gameState = kingMoveGameState();
      let from = { id: 'e1', x: 4, y: 7, piece: { id: 29, playerNumber: 1, type: 'king', selected: false } };
      let to = { id: 'f1', x: 5, y: 7, piece: null };
      let result = rookCastleMove(gameState, from, to);
      expect(result).toBe(null);
    });
  });

  describe('when not king', () => {
    it('returns null', () => {
      let gameState = defaultGameState();
      let from = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', selected: false } };
      let to = { id: 'e4', x: 4, y: 4, piece: null };
      let result = rookCastleMove(gameState, from, to);
      expect(result).toBe(null);
    });
  });
});

describe('pawnMoveToLastRank', () => {
  it('returns true if pawn and moving to last rank', () => {
    let gameState = pawnPromoteMoveGameState();
    let from = { id: 'h7', x: 7, y: 1, piece: { id: 24, playerNumber: 1, type: 'pawn', selected: false } };
    let to = { id: 'h8', x: 7, y: 0, piece: null };
    let result = pawnMoveToLastRank(gameState, from, to);
    expect(result).toBe(true);
  });

  it('returns false if pawn and not moving to last rank', () => {
    let gameState = pawnPromoteMoveGameState();
    let from = { id: 'g6', x: 6, y: 2, piece: { id: 23, playerNumber: 1, type: 'pawn', selected: false } };
    let to = { id: 'g7', x: 6, y: 1, piece: null };
    let result = pawnMoveToLastRank(gameState, from, to);
    expect(result).toBe(false);
  });

  it('returns false if not pawn', () => {
    let gameState = pawnPromoteMoveGameState();
    let from = { id: 'a7', x: 0, y: 1, piece: { id: 25, playerNumber: 1, type: 'rook', selected: false } };
    let to = { id: 'a8', x: 0, y: 0, piece: null };
    let result = pawnMoveToLastRank(gameState, from, to);
    expect(result).toBe(false);
  });
});

describe('performMove', () => {
  describe('when move', () => {
    it('moves the piece', () => {
      let gameState = defaultGameState();
      let fromId = 'e2';
      let toId = 'e4';
      let capturedId = undefined;
      performMove(gameState, fromId, toId, capturedId);

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
        let movedPiece = { id: 21, playerNumber: 1, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });
  });

  describe('when capture', () => {
    it('moves and captures a piece', () => {
      let gameState = pawnCaptureGameState();
      let fromId = 'e4';
      let toId = 'd5';
      let capturedId = 'd5';
      performMove(gameState, fromId, toId, capturedId);

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
        let movedPiece = { id: 21, playerNumber: 1, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });
  });

  describe('when en passant', () => {
    it('moves and captures en passant', () => {
      let gameState = enPassantGameState();
      let fromId = 'e5';
      let toId = 'd6';
      let capturedId = 'd5';
      performMove(gameState, fromId, toId, capturedId);

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
        let movedPiece = { id: 21, playerNumber: 1, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      let capturedSquare = gameState.squares.find((s) => {
        return s.id === capturedId;
      });

      if (capturedSquare !== undefined) {
        expect(capturedSquare.piece).toBe(null);
      } else {
        expect(capturedSquare).not.toBe(undefined);
      }
    });
  });

  describe('when no piece', () => {
    it('does not move or capture', () => {
      let gameState = defaultGameState();
      let fromId = 'h6';
      let toId = 'h7';
      let capturedId = undefined;
      performMove(gameState, fromId, toId, capturedId);

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
        let existingPiece = { id: 16, playerNumber: 2, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(existingPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }
    });
  });

  describe('when king', () => {
    it('removes the players castle moves', () => {
      let gameState = kingMoveGameState();
      let fromId = 'e1';
      let toId = 'e2';
      let capturedId = undefined;
      let expected = [
        { playerNumber: 2, side: 'king' },
        { playerNumber: 2, side: 'queen' }
      ];
      performMove(gameState, fromId, toId, capturedId);
      expect(gameState.castleMoves).toEqual(expected);
    });
  });

  describe('when rook', () => {
    it('removes its side castle moves', () => {
      let gameState = kingMoveGameState();
      let fromId = 'h1';
      let toId = 'h2';
      let capturedId = undefined;
      let expected = [
        { playerNumber: 2, side: 'king' },
        { playerNumber: 1, side: 'queen' },
        { playerNumber: 2, side: 'queen' }
      ];
      performMove(gameState, fromId, toId, capturedId);
      expect(gameState.castleMoves).toEqual(expected);
    });
  });
});

describe('move', () => {
  describe('when an ordinary move', () => {
    it('moves the piece', () => {
      let gameState = enPassantGameState();
      let fromId = 'd2';
      let toId = 'd3';
      move(gameState, fromId, toId);

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
        let movedPiece = { id: 20, playerNumber: 1, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(movedPiece);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      expect(gameState.enPassantTarget).toBe(null);
    });

    it('clears last double step pawn id', () => {
      let gameState = enPassantGameState();
      let fromId = 'd2';
      let toId = 'd3';
      move(gameState, fromId, toId);
      expect(gameState.enPassantTarget).toBe(null);
    });
  });

  describe('when pawn moves 2 spaces', () => {
    it('sets last double step pawn id', () => {
      let gameState = defaultGameState();
      let fromId = 'e2';
      let toId = 'e4';
      move(gameState, fromId, toId);
      expect(gameState.enPassantTarget).toEqual('e5');
    });
  });

  describe('when castling', () => {
    it('moves the rook', () => {
      let gameState = kingMoveGameState();
      let fromId = 'e1';
      let toId = 'g1';
      move(gameState, fromId, toId);

      let rookFromSquare = gameState.squares.find((s) => {
        return s.id === 'h1';
      });

      if (rookFromSquare !== undefined) {
        expect(rookFromSquare.piece).toBe(null);
      } else {
        expect(rookFromSquare).not.toBe(undefined);
      }

      let rookToSquare = gameState.squares.find((s) => {
        return s.id === 'f1';
      });

      if (rookToSquare !== undefined) {
        let expected = { id: 32, playerNumber: 1, type: 'rook', selected: false };
        expect(rookToSquare.piece).toEqual(expected);
      } else {
        expect(rookToSquare).not.toBe(undefined);
      }
    });
  });

  describe('when en passant', () => {
    it('removes the piece that previously moved 2 squares', () => {
      let gameState = enPassantGameState();
      let fromId = 'e5';
      let toId = 'd6';
      move(gameState, fromId, toId);

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
        let expected = { id: 21, playerNumber: 1, type: 'pawn', selected: false };
        expect(toSquare.piece).toEqual(expected);
      } else {
        expect(toSquare).not.toBe(undefined);
      }

      let enPassantSquare = gameState.squares.find((s) => {
        return s.id === 'd5';
      });

      if (enPassantSquare !== undefined) {
        expect(enPassantSquare.piece).toBe(null);
      } else {
        expect(enPassantSquare).not.toBe(undefined);
      }
    });
  });

  describe('when capture', () => {
    it('resets the halfmove', () => {
      let gameState = pawnCaptureGameState();
      let fromId = 'e4';
      let toId = 'd5';
      move(gameState, fromId, toId);
      expect(gameState.halfmove).toEqual(0);
    });
  });

  describe('when pawn', () => {
    it('resets the halfmove', () => {
      let gameState = pawnCaptureGameState();
      let fromId = 'e4';
      let toId = 'e5';
      move(gameState, fromId, toId);
      expect(gameState.halfmove).toEqual(0);
    });
  });

  describe('when non-pawn', () => {
    it('increments the halfmove', () => {
      let gameState = kingMoveGameState();
      let fromId = 'e1';
      let toId = 'd2';
      move(gameState, fromId, toId);
      expect(gameState.halfmove).toEqual(1);
    });
  });
});

describe('selectPiece', () => {
  it('selects the matching piece', () => {
    let gameState = defaultGameState();
    let id = 'e2';
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
    let id = 'e2';
    deselectPiece(gameState);

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

describe('promote', () => {
  it('promotes the piece to the specified type', () => {
    let gameState = pawnPromoteMoveGameState();
    let id = 'h7';
    let pieceType = 'queen';
    promote(gameState, id, pieceType);

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

  it('increments the full move if player number is 2', () => {
    let gameState = playerTwoGameState();
    passTurn(gameState);
    expect(gameState.fullmove).toEqual(2);
  });

  it('sets the current player number to 2 if 1', () => {
    let gameState = defaultGameState();
    passTurn(gameState);
    expect(gameState.currentPlayerNumber).toEqual(2);
  });

  it('does not increment the full move if player number is 1', () => {
    let gameState = defaultGameState();
    passTurn(gameState);
    expect(gameState.fullmove).toEqual(1);
  });
});
