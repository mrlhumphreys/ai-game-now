import { describe, it, expect } from 'vitest';

import { 
  occupied,
  unoccupied,
  occupiedByPlayer,
  occupiedByOpponentOf,
  unoccupiedOrOccupiedByOpponentOf,
  occupiedByPieceType,
  notOccupiedByPieceType,
  point,
  select,
  deselect,
  addPiece,
  removePiece,
  startingFor,
  rankNumber,
  lastRank,
  promote
} from '$lib/chess/logic/square';

describe('occupied', () => {
  it('returns true if piece is present', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupied(square)).toBe(true);
  });

  it('returns false if piece is null', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(occupied(square)).toBe(false);
  });
});

describe('unoccupied', () => {
  it('returns true if piece is null', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(unoccupied(square)).toBe(true);
  });

  it('returns false if piece is present', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    expect(unoccupied(square)).toBe(false);
  });
});

describe('occupiedByPlayer', () => {
  it('returns true if occupied by player', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupiedByPlayer(square, 1)).toBe(true);
  });

  it('returns false if occupied by opponent', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });
});

describe('occupiedByOpponentOf', () => {
  it('returns true if occupied by opponent', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupiedByOpponentOf(square, 1)).toBe(true);
  });

  it('returns false if occupied by player', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupiedByOpponentOf(square, 1)).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(occupiedByOpponentOf(square, 1)).toBe(false);
  });
});

describe('unoccupiedOrOccupiedByOpponentOf', () => {
  it('returns true if occupied by opponent', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
  });

  it('returns false if occupied by player', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: false, hasMoved: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(false);
  });

  it('returns true if unoccupied', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
  });
});

describe('occupiedByPieceType', () => {
  it('returns true if occupied by pieceType', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    expect(occupiedByPieceType(square, 'pawn')).toBe(true);
  });

  it('returns false if occupied by a different pieceType', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'king', selected: false, hasMoved: false } };
    expect(occupiedByPieceType(square, 'pawn')).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(occupiedByPieceType(square, 'pawn')).toBe(false);
  });
});

describe('notOccupiedByPieceType', () => {
  it('returns true if not occupied by pieceType', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'king', selected: false, hasMoved: false } };
    expect(notOccupiedByPieceType(square, 'pawn')).toBe(true);
  });

  it('returns false if not occupied by a different pieceType', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    expect(notOccupiedByPieceType(square, 'pawn')).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    expect(notOccupiedByPieceType(square, 'pawn')).toBe(false);
  });
});

describe('point', () => {
  it('returns a point with the same cooridinates', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    let expected = { x: 0, y: 0 };
    expect(point(square)).toEqual(expected);
  });
});

describe('select', () => {
  it('selects the piece', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: false, hasMoved: false } };
    select(square);
    expect(square.piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('selects the piece', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: true, hasMoved: false } };
    deselect(square);
    expect(square.piece.selected).toBe(false);
  });
});

describe('addPiece', () => {
  it('adds the piece to the square', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    let piece =  { id: 0, playerNumber: 2, type: 'pawn', selected: true, hasMoved: false };
    addPiece(square, piece);
    expect(square.piece).toEqual(piece);
  });
});

describe('removePiece', () => {
  it('removes the piece to the square', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'pawn', selected: true, hasMoved: false } };
    removePiece(square);
    expect(square.piece).toBe(null);
  });
});

// chess specific

describe('startingFor', () => {
  it('returns true if rank number is 2', () => {
    let square = { id: 'a2', x: 0, y: 6, piece: null };
    let playerNumber = 1;
    expect(startingFor(square, playerNumber)).toBe(true);
  });

  it('returns false if rank number is not 2', () => {
    let square = { id: 'a3', x: 0, y: 5, piece: null };
    let playerNumber = 1;
    expect(startingFor(square, playerNumber)).toBe(false);
  });
});

describe('rankNumber', () => {
  it('returns the row number from player ones edge for player one', () => {
    let square = { id: 'a5', x: 0, y: 3, piece: null };
    let playerNumber = 1;
    expect(rankNumber(square, playerNumber)).toEqual(5);
  });

  it('returns the row number from player ones edge for player two', () => {
    let square = { id: 'a5', x: 0, y: 3, piece: null };
    let playerNumber = 2;
    expect(rankNumber(square, playerNumber)).toEqual(4);
  });
});

describe('lastRank', () => {
  it('returns true if the rank number is 8', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: null };
    let playerNumber = 1;
    expect(lastRank(square, playerNumber)).toBe(true);
  });

  it('returns false if the rank number is not 8', () => {
    let square = { id: 'a7', x: 0, y: 1, piece: null };
    let playerNumber = 1;
    expect(lastRank(square, playerNumber)).toBe(false);
  });
});

describe('promote', () => {
  it('sets the piece type if there is a piece', () => {
    let square = { id: 'a8', x: 0, y: 0, piece: { id: 0, playerNumber: 1, type: 'pawn', selected: true, hasMoved: false } };
    let pieceType = 'queen';
    promote(square, pieceType);
    expect(square.piece.type).toEqual(pieceType);
  });
  
  it('does nothing if there is no piece', () => {
    let square = { id: 'a7', x: 0, y: 1, piece: null };
    promote(square, 'queen');
    expect(square.piece).toBe(null);
  });
});

