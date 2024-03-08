import { describe, it, expect } from 'vitest';

import type Square from '$lib/chess/interfaces/Square';

import defaultGameState from '../fixtures/defaultGameState';
import enPassantGameState from '../fixtures/enPassantGameState';
import pawnCaptureGameState from '../fixtures/pawnCaptureGameState';
import rookMoveGameState from '../fixtures/rookMoveGameState';
import knightMoveGameState from '../fixtures/knightMoveGameState';
import bishopMoveGameState from '../fixtures/bishopMoveGameState';
import queenMoveGameState from '../fixtures/queenMoveGameState';
import kingMoveGameState from '../fixtures/kingMoveGameState';
import rooksHaveMovedGameState from '../fixtures/rooksHaveMovedGameState';
import kingHasMovedGameState from '../fixtures/kingHasMovedGameState';

import {
  canMoveFrom,
  canMove,
  destinations,
  moveSquares,
  captureSquares,
  enPassantSquare,
  hasNotMoved,
  opponent,
  select,
  deselect,
  pawnMoveableDistance,
  pawnDirection,
  kingBaseDestinations,
  kingCastle
} from '$lib/chess/logic/piece';

describe('canMoveFrom', () => {
  it('returns true if there is at least one destination', () => {
    let gameState = pawnCaptureGameState();
    let piece = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
    let from = { id: 'e4', x: 4, y: 4, piece: { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(true);
  });

  it('returns false if there is no destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
    let from = { id: 'h1', x: 7, y: 7, piece: piece };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(false);
  });
});

describe('canMove', () => {
  it('returns true if the square is one of the destinations', () => {
    let gameState = pawnCaptureGameState();
    let piece = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
    let from = { id: 'e4', x: 4, y: 4, piece: { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } };
    let to = { id: 'e5', x: 4, y: 3, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(true);
  });

  it('returns false if the square is not one of the destinations', () => {
    let gameState = pawnCaptureGameState();
    let piece = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
    let from = { id: 'e4', x: 4, y: 4, piece: { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } };
    let to = { id: 'f5', x: 5, y: 3, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(false);
  });
});

describe('destinations', () => {
  describe('when pawn', () => {
    it('returns squares diagonal capture squares, forward move squares and', () => {
      let gameState = pawnCaptureGameState();
      let pawn = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
      let square = { id: 'e4', x: 4, y: 4, piece: pawn };
      let expected = [
        { id: 'e5', x: 4, y: 3, piece: null },
        { id: 'd5', x: 3, y: 3, piece: { id: 12, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } }
      ];
      let result = destinations(pawn, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns en passant squares', () => {
      let gameState = enPassantGameState();
      let pawn = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
      let square = { id: 'e5', x: 4, y: 3, piece: pawn };
      let expected = [
        { id: 'e6', x: 4, y: 2, piece: null },
        { id: 'd6', x: 3, y: 2, piece: null }
      ];
      let result = destinations(pawn, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when rook', () => {
    it('returns orthogonal squares', () => {
      let gameState = rookMoveGameState();
      let rook =  { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
      let square = { id: 'h2', x: 7, y: 6, piece: { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false } };
      let expected = [
        { id: 'h8', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
        { id: 'h7', x: 7, y: 1, piece: null },
        { id: 'h6', x: 7, y: 2, piece: null },
        { id: 'h5', x: 7, y: 3, piece: null },
        { id: 'h4', x: 7, y: 4, piece: null },
        { id: 'h3', x: 7, y: 5, piece: null },
        { id: 'b2', x: 1, y: 6, piece: { id: 10, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'c2', x: 2, y: 6, piece: null },
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'g2', x: 6, y: 6, piece: null },
        { id: 'h1', x: 7, y: 7, piece: null }
      ];
      let result = destinations(rook, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when knight', () => {
    it('must return 2 away and 1 across squares', () => {
      let gameState = knightMoveGameState();
      let knight = { id: 31, playerNumber: 1, type: 'knight', hasMoved: false, selected: false };
      let square = { id: 'g1', x: 6, y: 7, piece: { id: 31, playerNumber: 1, type: 'knight', hasMoved: false, selected: false } };
      let expected = [
        { id: 'f3', x: 5, y: 5, piece: null },
        { id: 'h3', x: 7, y: 5, piece: { id: 16, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'e2', x: 4, y: 6, piece: null }
      ];
      let result = destinations(knight, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when bishop', () => {
    it('returns diagonal squares', () => {
      let gameState = bishopMoveGameState();
      let bishop = { id: 30, playerNumber: 1, type: 'bishop', hasMoved: false, selected: false };
      let square = { id: 'f1', x: 5, y: 7, piece: bishop };
      let expected = [
        { id: 'd3', x: 3, y: 5, piece: { id: 12, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'h3', x: 7, y: 5, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'g2', x: 6, y: 6, piece: null }
      ];
      let result = destinations(bishop, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when queen', () => {
    it('returns orthogonal and diagonal squares', () => {
      let gameState = queenMoveGameState();
      let queen = { id: 28, playerNumber: 1, type: 'queen', hasMoved: false, selected: false };
      let square = { id: 'd1', x: 3, y: 7, piece: queen };
      let expected = [
        { id: 'h5', x: 7, y: 3, piece: null },
        { id: 'a4', x: 0, y: 4, piece: null },
        { id: 'g4', x: 6, y: 4, piece: null },
        { id: 'b3', x: 1, y: 5, piece: null },
        { id: 'd3', x: 3, y: 5, piece: null },
        { id: 'f3', x: 5, y: 5, piece: null },
        { id: 'c2', x: 2, y: 6, piece: null },
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'a1', x: 0, y: 7, piece: null },
        { id: 'b1', x: 1, y: 7, piece: null },
        { id: 'c1', x: 2, y: 7, piece: null }
      ];
      let result = destinations(queen, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when king', () => {
    it('returns all the adjacent squares', () => {
      let gameState = kingMoveGameState();
      let king = { id: 29, playerNumber: 1, type: 'king', hasMoved: false, selected: false };
      let square = { id: 'e1', x: 4, y: 7, piece: king };
      let expected = [
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: { id: 13, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'd1', x: 3, y: 7, piece: null },
        { id: 'f1', x: 5, y: 7, piece: null },
        { id: 'c1', x: 2, y: 7, piece: null },
        { id: 'g1', x: 6, y: 7, piece: null }
      ];
      let result = destinations(king, square, gameState);
      expect(result).toEqual(expected);
    });
  });
});

describe('moveSquares', () => {
  describe('when pawn', () => {
    it('returns one forward unoccupied', () => {
      let gameState = pawnCaptureGameState();
      let pawn = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
      let square = { id: 'e4', x: 4, y: 4, piece: pawn };
      let expected = [
        { id: 'e5', x: 4, y: 3, piece: null }
      ];
      let result = moveSquares(pawn, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when not pawn', () => {
    it('defaults to destinations', () => {
      let gameState = rookMoveGameState();
      let rook = { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
      let square = { id: 'h2', x: 7, y: 6, piece: rook };
      let expected = [
        { id: 'h8', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
        { id: 'h7', x: 7, y: 1, piece: null },
        { id: 'h6', x: 7, y: 2, piece: null },
        { id: 'h5', x: 7, y: 3, piece: null },
        { id: 'h4', x: 7, y: 4, piece: null },
        { id: 'h3', x: 7, y: 5, piece: null },
        { id: 'b2', x: 1, y: 6, piece: { id: 10, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'c2', x: 2, y: 6, piece: null },
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'g2', x: 6, y: 6, piece: null },
        { id: 'h1', x: 7, y: 7, piece: null }
      ];
      let result = moveSquares(rook, square, gameState);
      expect(result).toEqual(expected);
    });
  });
});

describe('captureSquares', () => {
  describe('when pawn', () => {
    it('returns the two forward diagonals occupied by opponents', () => {
      let gameState = pawnCaptureGameState();
      let pawn = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
      let square = { id: 'e4', x: 4, y: 4, piece: pawn };
      let expected = [
        { id: 'd5', x: 3, y: 3, piece: { id: 12, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } }
      ];
      let result = captureSquares(pawn, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when king', () => {
    it('returns base destinations', () => {
      let gameState = kingMoveGameState();
      let king = { id: 29, playerNumber: 1, type: 'king', hasMoved: false, selected: false };
      let square = { id: 'e1', x: 4, y: 7, piece: { id: 29, playerNumber: 1, type: 'king', hasMoved: false, selected: false } };
      let expected = [
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: { id: 13, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'd1', x: 3, y: 7, piece: null },
        { id: 'f1', x: 5, y: 7, piece: null }
      ];
      let result = captureSquares(king, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when not pawn', () => {
    it('defaults to destinations', () => {
      let gameState = rookMoveGameState();
      let rook = { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
      let square = { id: 'h2', x: 7, y: 6, piece: rook };
      let expected = [
        { id: 'h8', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
        { id: 'h7', x: 7, y: 1, piece: null },
        { id: 'h6', x: 7, y: 2, piece: null },
        { id: 'h5', x: 7, y: 3, piece: null },
        { id: 'h4', x: 7, y: 4, piece: null },
        { id: 'h3', x: 7, y: 5, piece: null },
        { id: 'b2', x: 1, y: 6, piece: { id: 10, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'c2', x: 2, y: 6, piece: null },
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'g2', x: 6, y: 6, piece: null },
        { id: 'h1', x: 7, y: 7, piece: null }
      ];
      let result = captureSquares(rook, square, gameState);
      expect(result).toEqual(expected);
    });
  });
});

describe('enPassantSquare', () => {
  describe('when pawn', () => {
    describe('and an pawn has moved 2 squares', () => {
      describe('and the pawn is adjacent to the opposing pawn', () => {
        it('returns the square behind the double step pawn', () => {
          let gameState = enPassantGameState();
          let pawn = { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
          let square = { id: 'e5', x: 4, y: 3, piece: pawn };
          let expected = { id: 'd6', x: 3, y: 2, piece: null };
          let result = enPassantSquare(pawn, square, gameState);
          expect(result).toEqual(expected);
        });
      });

      describe('and the pawn is not adjacent to the opposing pawn', () => {
        it('returns undefined', () => {
          let gameState = enPassantGameState();
          let pawn = { id: 19, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
          let square = { id: 'c2', x: 2, y: 6, piece: pawn };
          let result = enPassantSquare(pawn, square, gameState);
          expect(result).toBe(undefined);
        });
      });
    });

    describe('and no pawn has moved 2 squares', () => {
      it('returns undefined', () => {
        let gameState = defaultGameState();
        let pawn = { id: 19, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
        let square = { id: 'c2', x: 2, y: 6, piece: pawn };
        let result = enPassantSquare(pawn, square, gameState);
        expect(result).toBe(undefined);
      });
    });
  });

  describe('when not pawn', () => {
    it('returns undefined', () => {
      let gameState = enPassantGameState();
      let rook = { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
      let square = { id: 'c5', x: 2, y: 3, piece: rook };
      let result = enPassantSquare(rook, square, gameState);
      expect(result).toBe(undefined);
    });
  });
});

describe('hasNotMoved', () => {
  it('must return true if it has not moved', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false };
    expect(hasNotMoved(piece)).toBe(true);
  });

  it('must return false if it has moved', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: true, selected: false };
    expect(hasNotMoved(piece)).toBe(false);
  });
});

describe('opponent', () => {
  it('must return 2 if player number is 1', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: true, selected: false };
    expect(opponent(piece)).toEqual(2);
  });

  it('must return 1 if player number is 2', () => {
    let piece = { id: 0, playerNumber: 2, type: 'pawn', hasMoved: true, selected: false };
    expect(opponent(piece)).toEqual(1);
  });
});

describe('select', () => {
  it('marks the piece as selected', () => {
    let piece = { id: 0, playerNumber: 2, type: 'pawn', hasMoved: true, selected: false };
    select(piece);
    expect(piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('unmarks the piece as selected', () => {
    let piece = { id: 0, playerNumber: 2, type: 'pawn', hasMoved: true, selected: true };
    deselect(piece);
    expect(piece.selected).toBe(false);
  });
});

describe('pawnMoveableDistance', () => {
  it('returns 2 if pawn is on starting rank', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: true, selected: true };
    let square = { id: 'a1', x: 0, y: 6, piece: piece };
    let result = pawnMoveableDistance(piece, square);
    expect(result).toEqual(2);
  });

  it('returns 1 if pawn is not on starting rank', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: true, selected: true };
    let square = { id: 'a2', x: 0, y: 5, piece: piece };
    let result = pawnMoveableDistance(piece, square);
    expect(result).toEqual(1);
  });
});

describe('pawnDirection', () => {
  it('returns -1 if player number is 1', () => {
    let piece = { id: 0, playerNumber: 1, type: 'pawn', hasMoved: true, selected: true };
    expect(pawnDirection(piece)).toEqual(-1);
  });

  it('returns 1 if player number is 2', () => {
    let piece = { id: 0, playerNumber: 2, type: 'pawn', hasMoved: true, selected: true };
    expect(pawnDirection(piece)).toEqual(1);
  });
});

describe('kingBaseDestinations', () => {
  it('returns squares that a king could normally move to', () => {
    let gameState = kingMoveGameState();
    let king = { id: 32, playerNumber: 1, type: 'rook', hasMoved: false, selected: false };
    let square = { id: 'e1', x: 4, y: 7, piece: king };
    let result = kingBaseDestinations(king, square, gameState);
    let expected = [
      { id: 'd2', x: 3, y: 6, piece: null },
      { id: 'e2', x: 4, y: 6, piece: { id: 13, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
      { id: 'f2', x: 5, y: 6, piece: null },
      { id: 'd1', x: 3, y: 7, piece: null },
      { id: 'f1', x: 5, y: 7, piece: null }
    ];
    expect(result).toEqual(expected);
  });
});

describe('kingCastle', () => {
  it('returns square that a king moves to when castling', () => {
    let gameState = kingMoveGameState();
    let king = { id: 29, playerNumber: 1, type: 'king', hasMoved: false, selected: false };
    let square = { id: 'e1', x: 4, y: 7, piece: king };
    let expected = [
      { id: 'c1', x: 2, y: 7, piece: null },
      { id: 'g1', x: 6, y: 7, piece: null }
    ];
    let result = kingCastle(king, square, gameState);
    expect(result).toEqual(expected);
  });

  it('returns empty if rooks has moved', () => {
    let gameState = rooksHaveMovedGameState();
    let king = { id: 29, playerNumber: 1, type: 'king', hasMoved: false, selected: false };
    let square = { id: 'e1', x: 4, y: 7, piece: king };
    let expected: Array<Square> = [ ];
    let result = kingCastle(king, square, gameState);
    expect(result).toEqual(expected);
  });

  it('returns empty if king has moved', () => {
    let gameState = kingHasMovedGameState();
    let king = { id: 32, playerNumber: 1, type: 'king', hasMoved: true, selected: false };
    let square = { id: 'e1', x: 4, y: 7, piece: king };
    let expected: Array<Square> = [ ];
    let result = kingCastle(king, square, gameState);
    expect(result).toEqual(expected);
  });
});
