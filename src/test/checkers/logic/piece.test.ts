import { describe, it, expect } from 'vitest';
import { 
  direction,
  select,
  deselect,
  promote
} from '$lib/checkers/logic/piece';

describe('direction', () => {
  describe('player 1', () => {
    it('returns 1', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      expect(direction(piece)).toEqual(-1); 
    });
  });
  
  describe('player 2', () => {
    it('returns -1', () => {
      let piece = { id: 1, playerNumber: 2, king: false, selected: false };
      expect(direction(piece)).toEqual(1); 
    });
  });
});

describe('select', () => {
  it('marks the piece as selected', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    select(piece);
    expect(piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('marks the piece as unselected', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: true };
    deselect(piece);
    expect(piece.selected).toBe(false);
  });
});

describe('promote', () => {
  it('marks the piece as king', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    promote(piece);
    expect(piece.king).toBe(true);
  });
});
