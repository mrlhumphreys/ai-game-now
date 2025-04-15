import { describe, it, expect } from 'vitest';

import {
  occupied,
  unoccupied,
  promotionZone,
  compulsoryPromotionZone,
  occupiedByPieceType,
  notOccupiedByPieceType,
  occupiedByPlayer,
  unoccupiedOrOccupiedByOpponentOf,
  point,
  addPiece,
  removePiece,
  select,
  deselect
} from '$lib/shogi/logic/square';

describe('occupied', () => {
  it('returns true if piece is present', () => {
    let square = { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false } };
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
    let square = { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false } };
    expect(unoccupied(square)).toBe(false);
  });
});

describe('promotionZone', () => {
  describe('when player 1', () => {
    it('returns true if y is between 0 and 2', () => {
      let playerNumber = 1;
      let square = { id: '13', x: 8, y: 2, piece: null };
      let result = promotionZone(square, playerNumber);
      expect(result).toBe(true);
    });

    it('returns false if y is greater than 2', () => {
      let playerNumber = 1;
      let square = { id: '94', x: 0, y: 3, piece: null };
      let result = promotionZone(square, playerNumber);
      expect(result).toBe(false);
    });
  });

  describe('when player 2', () => {
    it('returns true if y is between 6 and 8', () => {
      let playerNumber = 2;
      let square = { id: '97', x: 0, y: 6, piece: null };
      let result = promotionZone(square, playerNumber);
      expect(result).toBe(true);
    });

    it('returns false if y less than 6', () =>{
      let playerNumber = 2;
      let square = { id: '16', x: 8, y: 5, piece: null };
      let result = promotionZone(square, playerNumber);
      expect(result).toBe(false);
    });
  });
});

describe('compulsoryPromotionZone', () => {
  describe('when fuhyou', () => {
    describe('and player 1', () => {
      it('returns true if last rank', () => {
        let square = { id: '91', x: 0, y: 0, piece: null };
        let piece =  { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last rank', () => {
        let square = { id: '92', x: 0, y: 1, piece: null };
        let piece =  { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });

    describe('and player 2', () => {
      it('returns true if last rank', () => {
        let square = { id: '99', x: 0, y: 8, piece: null };
        let piece = { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last rank', () => {
        let square = { id: '98', x: 0, y: 7, piece: null };
        let piece = { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });
  });

  describe('when kyousha', () => {
    describe('and player 1', () => {
      it('returns true if last rank', () => {
        let square = { id: '91', x: 0, y: 0, piece: null };
        let piece = { id: 32, playerNumber: 1, type: 'kyousha' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last rank', () => {
        let square = { id: '92', x: 0, y: 1, piece: null };
        let piece = { id: 32, playerNumber: 1, type: 'kyousha' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });

    describe('and player 2', () => {
      it('returns true if last rank', () => {
        let square = { id: '99', x: 0, y: 8, piece: null };
        let piece = { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last rank', () => {
        let square = { id: '98', x: 0, y: 7, piece: null };
        let piece = { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });
  });

  describe('when keima', () => {
    describe('and player 1', () => {
      it('returns true if last two ranks', () => {
        let square = { id: '92', x: 0, y: 1, piece: null };
        let piece = { id: 33, playerNumber: 1, type: 'keima' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last two ranks', () => {
        let square = { id: '93', x: 0, y: 2, piece: null };
        let piece = { id: 33, playerNumber: 1, type: 'keima' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });

    describe('and player 2', () => {
      it('returns true if last two ranks', () => {
        let square = { id: '98', x: 0, y: 7, piece: null };
        let piece = { id: 33, playerNumber: 1, type: 'keima' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(true);
      });

      it('returns false if not last two ranks', () => {
        let square = { id: '97', x: 0, y: 6, piece: null };
        let piece = { id: 33, playerNumber: 1, type: 'keima' as const, selected: false };
        let playerNumber = 2;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
      });
    });
  });

  describe('when other piece', () => {
    it('returns false', () => {
        let square = { id: '91', x: 0, y: 0, piece: null };
        let piece = { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false };
        let playerNumber = 1;

        let result = compulsoryPromotionZone(square, piece, playerNumber);
        expect(result).toBe(false);
    });
  });
});

describe('occupiedByPieceType', () => {
  it('returns true if occupied by pieceType', () => {
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou' as const, selected: false } };
    expect(occupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(true);
  });

  it('returns false if occupied by a different pieceType', () => {
    let square = { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'kinshou' as const, selected: false } };
    expect(occupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: '92', x: 0, y: 1, piece: null };
    expect(occupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(false);
  });
});

describe('notOccupiedByPieceType', () => {
  it('returns true if not occupied by pieceType', () => {
    let square = { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'kinshou' as const, selected: false } };
    expect(notOccupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(true);
  });

  it('returns false if not occupied by a different pieceType', () => {
    let square = { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou' as const, selected: false } };
    expect(notOccupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(false);
  });

  it('returns false if not occupied', () => {
    let square = { id: '92', x: 0, y: 1, piece: null };
    expect(notOccupiedByPieceType(square, ['oushou', 'gyokushou'])).toBe(false);
  });
});

describe('occupiedByPlayer', () => {
  it('returns true if occupied by player', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    expect(occupiedByPlayer(square, 1)).toBe(true);
  });

  it('returns false if occupied by opponent', () => {
    let square = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou' as const, selected: false } };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });

  it('returns false if unoccupied', () => {
    let square = { id: '94', x: 0, y: 3, piece: null };
    expect(occupiedByPlayer(square, 1)).toBe(false);
  });
});

describe('unoccupiedOrOccupiedByOpponentOf', () => {
  it('returns true if occupied by opponent', () => {
    let square = { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou' as const, selected: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
  });

  it('returns false if occupied by player', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(false);
  });

  it('returns true if unoccupied', () => {
    let square = { id: '16', x: 8, y: 5, piece: null };
    expect(unoccupiedOrOccupiedByOpponentOf(square, 1)).toBe(true);
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
    let piece = { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false };
    addPiece(square, piece);
    expect(square.piece).toEqual(piece);
  });
});

describe('removePiece', () => {
  it('removes the piece to the square', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false } }
    removePiece(square);
    expect(square.piece).toBe(null);
  });
});

describe('select', () => {
  it('selects the piece', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    select(square);
    expect(square.piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('selects the piece', () => {
    let square = { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: true } };
    deselect(square);
    expect(square.piece.selected).toBe(false);
  });
});
