import { describe, it, expect } from 'vitest';
import fenToGameState from '$lib/chess/logic/fenToGameState';

describe('default fen', () => {
  it('should return default game state', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    let result = fenToGameState(fen);
    let expected = {
      currentPlayerNumber: 1,
      lastDoubleStepPawnId: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },
        { id: 'b8', x: 1, y: 0, piece: { id: 1, playerNumber: 2, type: 'knight', hasMoved: false, selected: false } },
        { id: 'c8', x: 2, y: 0, piece: { id: 2, playerNumber: 2, type: 'bishop', hasMoved: false, selected: false } },
        { id: 'd8', x: 3, y: 0, piece: { id: 3, playerNumber: 2, type: 'queen', hasMoved: false, selected: false } },
        { id: 'e8', x: 4, y: 0, piece: { id: 4, playerNumber: 2, type: 'king', hasMoved: false, selected: false } },
        { id: 'f8', x: 5, y: 0, piece: { id: 5, playerNumber: 2, type: 'bishop', hasMoved: false, selected: false } },
        { id: 'g8', x: 6, y: 0, piece: { id: 6, playerNumber: 2, type: 'knight', hasMoved: false, selected: false } },
        { id: 'h8', x: 7, y: 0, piece: { id: 7, playerNumber: 2, type: 'rook', hasMoved: false, selected: false } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, playerNumber: 2, type: 'pawn', hasMoved: false, selected: false } },

        { id: 'a6', x: 0, y: 2, piece: null },
        { id: 'b6', x: 1, y: 2, piece: null },
        { id: 'c6', x: 2, y: 2, piece: null },
        { id: 'd6', x: 3, y: 2, piece: null },
        { id: 'e6', x: 4, y: 2, piece: null },
        { id: 'f6', x: 5, y: 2, piece: null },
        { id: 'g6', x: 6, y: 2, piece: null },
        { id: 'h6', x: 7, y: 2, piece: null },

        { id: 'a5', x: 0, y: 3, piece: null },
        { id: 'b5', x: 1, y: 3, piece: null },
        { id: 'c5', x: 2, y: 3, piece: null },
        { id: 'd5', x: 3, y: 3, piece: null },
        { id: 'e5', x: 4, y: 3, piece: null },
        { id: 'f5', x: 5, y: 3, piece: null },
        { id: 'g5', x: 6, y: 3, piece: null },
        { id: 'h5', x: 7, y: 3, piece: null },

        { id: 'a4', x: 0, y: 4, piece: null },
        { id: 'b4', x: 1, y: 4, piece: null },
        { id: 'c4', x: 2, y: 4, piece: null },
        { id: 'd4', x: 3, y: 4, piece: null },
        { id: 'e4', x: 4, y: 4, piece: null },
        { id: 'f4', x: 5, y: 4, piece: null },
        { id: 'g4', x: 6, y: 4, piece: null },
        { id: 'h4', x: 7, y: 4, piece: null },

        { id: 'a3', x: 0, y: 5, piece: null },
        { id: 'b3', x: 1, y: 5, piece: null },
        { id: 'c3', x: 2, y: 5, piece: null },
        { id: 'd3', x: 3, y: 5, piece: null },
        { id: 'e3', x: 4, y: 5, piece: null },
        { id: 'f3', x: 5, y: 5, piece: null },
        { id: 'g3', x: 6, y: 5, piece: null },
        { id: 'h3', x: 7, y: 5, piece: null },

        { id: 'a2', x: 0, y: 6, piece: { id: 26, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'b2', x: 1, y: 6, piece: { id: 27, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'c2', x: 2, y: 6, piece: { id: 28, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'd2', x: 3, y: 6, piece: { id: 29, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'e2', x: 4, y: 6, piece: { id: 30, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'f2', x: 5, y: 6, piece: { id: 31, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'g2', x: 6, y: 6, piece: { id: 32, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },
        { id: 'h2', x: 7, y: 6, piece: { id: 33, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } },

        { id: 'a1', x: 0, y: 7, piece: { id: 35, playerNumber: 1, type: 'rook', hasMoved: false, selected: false } },
        { id: 'b1', x: 1, y: 7, piece: { id: 36, playerNumber: 1, type: 'knight', hasMoved: false, selected: false } },
        { id: 'c1', x: 2, y: 7, piece: { id: 37, playerNumber: 1, type: 'bishop', hasMoved: false, selected: false } },
        { id: 'd1', x: 3, y: 7, piece: { id: 38, playerNumber: 1, type: 'queen', hasMoved: false, selected: false } },
        { id: 'e1', x: 4, y: 7, piece: { id: 39, playerNumber: 1, type: 'king', hasMoved: false, selected: false } },
        { id: 'f1', x: 5, y: 7, piece: { id: 40, playerNumber: 1, type: 'bishop', hasMoved: false, selected: false } },
        { id: 'g1', x: 6, y: 7, piece: { id: 41, playerNumber: 1, type: 'knight', hasMoved: false, selected: false } },
        { id: 'h1', x: 7, y: 7, piece: { id: 42, playerNumber: 1, type: 'rook', hasMoved: false, selected: false } }
      ],
      halfmove: 0,
      fullmove: 1
    };
    expect(result).toEqual(expected);
  });
});
