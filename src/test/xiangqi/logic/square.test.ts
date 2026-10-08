import { describe, it, expect } from 'vitest';

import {
  occupied,
  unoccupied,
  occupiedByPieceType,
  notOccupiedByPieceType,
  occupiedByPlayer,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByOpponentOf,
  point,
  addPiece,
  removePiece,
  select,
  deselect
} from '#lib/xiangqi/logic/square';

describe('occupied', () => {
  it('returns true if piece is present', () => {
    let square = { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'chariot' as const, selected: false } };
    expect(occupied(square)).toBe(true);
  });

  it('returns false if piece is null', () => {
    let square = { id: '91', x: 0, y: 0, piece: null };
    expect(occupied(square)).toBe(false);
  });
});

describe('unoccupied', () => {
  it('returns true if piece is null', () => {
    let square = { id: '91', x: 0, y: 0, piece: null };
    expect(unoccupied(square)).toBe(true);
  });

  it('returns false if piece is present', () => {
    let square = { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'chariot' as const, selected: false } };
    expect(unoccupied(square)).toBe(false);
  });
});

describe('occupiedByPieceType', () => {
  it('returns true if occupied by pieceType', () => {
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } };
    expect(occupiedByPieceType(square, ['king'])).toBe(true);
  });

  it('returns false if occupied by a different pieceType', () => {
    let square = { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor' as const, selected: false } };
    expect(occupiedByPieceType(square, ['king'])).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: '92', x: 0, y: 1, piece: null };
    expect(occupiedByPieceType(square, ['king'])).toBe(false);
  });
});

describe('notOccupiedByPieceType', () => {
  it('returns true if not occupied by pieceType', () => {
    let square = { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'advisor' as const, selected: false } };
    expect(notOccupiedByPieceType(square, ['king'])).toBe(true);
  });

  it('returns false if not occupied by a different pieceType', () => {
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } };
    expect(notOccupiedByPieceType(square, ['king'])).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: '92', x: 0, y: 1, piece: null };
    expect(notOccupiedByPieceType(square, ['king'])).toBe(false);
  });
});

describe('occupiedByPlayer', () => {
  it('returns true if occupied by player', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } };
    expect(occupiedByPlayer(square, 1)).toBe(true);
  });

  it('returns false if occupied by opponent', () => {
    let square = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let square = { id: '94', x: 0, y: 3, piece: null };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });
});

describe('unoccupiedOrOccupiedByOpponentOf', () => {
  it('returns true if occupied by opponent', () => {
    let square = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
  });

  it('returns false if occupied by player', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(false);
  });

  it('returns true if unoccupied', () => {
    let square = { id: '16', x: 8, y: 5, piece: null };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
  });
});

describe('occupiedByOpponentOf', () => {
  it('returns true if occupied by opponent', () => {
    let square = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'soldier' as const, selected: false } };
    expect(occupiedByOpponentOf(square, 1)).toBe(true);
  });

  it('returns false if occupied by player', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } };
    expect(occupiedByOpponentOf(square, 1)).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let square = { id: '16', x: 8, y: 5, piece: null };
    expect(occupiedByOpponentOf(square, 1)).toBe(false);
  });
});

describe('point', () => {
  it('returns a point with the same cooridinates', () => {
    let square = { id: '16', x: 8, y: 5, piece: null };
    let expected = { x: 8, y: 5 };
    expect(point(square)).toEqual(expected);
  });
});

describe('addPiece', () => {
  it('adds the piece to the square', () => {
    let square = { id: '97', x: 0, y: 6, piece: null };
    let piece = { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false };
    addPiece(square, piece);
    expect(square.piece).toEqual(piece);
  });
});

describe('removePiece', () => {
  it('removes the piece to the square', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } }
    removePiece(square);
    expect(square.piece).toBe(null);
  });
});

describe('select', () => {
  it('selects the piece', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false } };
    select(square);
    expect(square.piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('selects the piece', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'soldier' as const, selected: true } };
    deselect(square);
    expect(square.piece.selected).toBe(false);
  });
});
