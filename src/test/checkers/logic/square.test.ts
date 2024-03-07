import { describe, it, expect } from 'vitest';
import { 
  occupied, 
  unoccupied, 
  occupiedByPlayer,
  occupiedByOpponentOf,
  point,
  player,
  selectable,
  actionable,
  possibleJumps,
  possibleMoves,
  lastRankForPlayer,
  select,
  deselect,
  mark,
  unmark,
  promote
} from '$lib/checkers/logic/square';

describe('occupied', () => {
  describe('with piece', () => {
    it('returns true', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupied(square)).toBe(true); 
    });
  });
  
  describe('without piece', () => {
    it('returns false', () => {
      let piece = null;
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupied(square)).toBe(false); 
    });
  });
});

describe('unoccupied', () => {
  describe('with piece', () => {
    it('returns false', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(unoccupied(square)).toBe(false); 
    });
  });
  
  describe('without piece', () => {
    it('returns true', () => {
      let piece = null;
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(unoccupied(square)).toBe(true); 
    });
  });
});

describe('occupiedByPlayer', () => {
  describe('with piece owned by player', () => {
    it('returns true', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByPlayer(square, 1)).toBe(true); 
    });
  });

  describe('with piece not owned by player', () => {
    it('returns false', () => {
      let piece = { id: 1, playerNumber: 2, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByPlayer(square, 1)).toBe(false); 
    });
  });
  
  describe('without piece', () => {
    it('returns false', () => {
      let piece = null;
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByPlayer(square, 1)).toBe(false); 
    });
  });
});

describe('occupiedByOpponentOf', () => {
  describe('with piece owned by player', () => {
    it('returns false', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByOpponentOf(square, 1)).toBe(false); 
    });
  });

  describe('with piece not owned by player', () => {
    it('returns true', () => {
      let piece = { id: 1, playerNumber: 2, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByOpponentOf(square, 1)).toBe(true); 
    });
  });
  
  describe('without piece', () => {
    it('returns false', () => {
      let piece = null;
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(occupiedByOpponentOf(square, 1)).toBe(false); 
    });
  });
});

describe('point', () => {
  it('returns a point with the same co-ordinate', () => {
    let square = { id: 1, x: 1, y: 2, marked: false, piece: null };
    expect(point(square)).toEqual({x: 1, y: 2});
  });
});

describe('player', () => {
  describe('with piece', () => {
    it('returns player number', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(player(square)).toEqual(1); 
    });
  });

  describe('without piece', () => {
    it('returns false', () => {
      let piece = null;
      let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
      expect(player(square)).toEqual(null); 
    });
  });
});

describe('selectable', () => {
  it('must return false if there are other pieces that can jump', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
    let destination = { id: 2, x: 3, y: 7, marked: false, piece: null };

    let otherPiece = { id: 2, playerNumber: 1, king: false, selected: false };
    let otherOrigin = { id: 3, x: 1, y: 6, marked: false, piece: otherPiece };
    let otherOpponentPiece = { id: 4, playerNumber: 2, king: false, selected: false };
    let otherBetween = { id: 4, x: 2, y: 5, marked: false, piece: otherOpponentPiece };
    let otherDestination = { id: 5, x: 3, y: 4, marked: false, piece: null };

    let squares = [
      origin,
      destination,
      otherOrigin,
      otherBetween,
      otherDestination
    ];
    expect(selectable(origin, squares)).toBe(false);
  });

  it('must return true if there are no jumps, but some moves', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
    let destination = { id: 3, x: 3, y: 7, marked: false, piece: null };
    let squares = [
      origin,
      destination
    ];
    expect(selectable(origin, squares)).toBe(true);
  });

  it('must be false if there is no piece', () => {
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: null };
    let destination = { id: 3, x: 3, y: 7, marked: false, piece: null };
    let squares = [
      origin,
      destination
    ];
    expect(selectable(origin, squares)).toBe(false);
  });

  it('must be false if it is blocked', () => {
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: { id: 1, playerNumber: 1, king: false, selected: false } };
    let blocked = { id: 3, x: 3, y: 7, marked: false, piece: { id: 2, playerNumber: 1, king: false, selected: false } };
    let farBlocked = { id: 5, x: 2, y: 6, marked: false, piece: { id: 3, playerNumber: 1, king: false, selected: false } };
    let squares = [
      origin,
      blocked,
      farBlocked
    ];
    expect(selectable(origin, squares)).toBe(false);
  });
});

describe('actionable', () => {
  it('must return true with jumps', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
    let opponentPiece = { id: 2, playerNumber: 2, king: false, selected: false };
    let opponentSquare = { id: 2, x: 3, y: 7, marked: false, piece: opponentPiece };
    let destination = { id: 3, x: 2, y: 6, marked: false, piece: null };
    let squares = [
      origin,
      opponentSquare,
      destination
    ];
    expect(actionable(origin, piece, destination, squares)).toBe(true);
  });

  it('must return true with no jumps and some moves', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
    let destination = { id: 3, x: 3, y: 7, marked: false, piece: null };
    let squares = [
      origin,
      destination
    ];
    expect(actionable(origin, piece, destination, squares)).toBe(true);
  });

  it('must return false with no jumps or moves', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
    let opposingPiece = { id: 1, playerNumber: 2, king: false, selected: false };
    let destination = { id: 3, x: 3, y: 7, marked: false, piece: opposingPiece };
    let squares = [
      origin,
      destination
    ];
    expect(actionable(origin, piece, destination, squares)).toBe(false);
  });
});

describe('possibleJumps', () => {
  it('must return squares that can be jumped to', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
      let opponentPiece = { id: 2, playerNumber: 2, king: false, selected: false };
      let opponentSquare = { id: 2, x: 3, y: 7, marked: false, piece: opponentPiece };
      let destination = { id: 3, x: 2, y: 6, marked: false, piece: null };
      let squares = [
        origin,
        opponentSquare,
        destination
      ];
      let expected = [
        destination
      ];
      let result = possibleJumps(origin, piece, squares); 
      expect(result).toEqual(expected);
  });
});

describe('possibleMoves', () => {
  it('must return squares that can be move to', () => {
      let piece = { id: 1, playerNumber: 1, king: false, selected: false };
      let origin = { id: 1, x: 4, y: 8, marked: false, piece: piece };
      let opponentPiece = { id: 2, playerNumber: 2, king: false, selected: false };
      let opponentSquare = { id: 2, x: 3, y: 7, marked: false, piece: opponentPiece };
      let destination = { id: 3, x: 5, y: 7, marked: false, piece: null };
      let squares = [
        origin,
        opponentSquare,
        destination
      ];
      let expected = [
        destination
      ];
      let result = possibleMoves(origin, piece, squares); 
      expect(result).toEqual(expected);
  });
});

describe('lastRankForPlayer', () => {
  it('must return true if player 1 on rank 0', () => {
    let square = { id: 1, x: 4, y: 0, marked: false, piece: null };
    let playerNumber = 1;
    expect(lastRankForPlayer(square, playerNumber)).toBe(true);
  });

  it('must return false if player 1 and not on rank 0', () => {
    let square = { id: 1, x: 4, y: 1, marked: false, piece: null };
    let playerNumber = 1;
    expect(lastRankForPlayer(square, playerNumber)).toBe(false);
  });

  it('must return true if player 2 on rank 7', () => {
    let square = { id: 1, x: 4, y: 7, marked: false, piece: null };
    let playerNumber = 2;
    expect(lastRankForPlayer(square, playerNumber)).toBe(true);
  });
  
  it('must return false if player 2 and not on rank 7', () => {
    let square = { id: 1, x: 4, y: 6, marked: false, piece: null };
    let playerNumber = 2;
    expect(lastRankForPlayer(square, playerNumber)).toBe(false);
  });
});

describe('select', () => {
  it('must select the piece and return true if there is one', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: false };
    let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
    let result = select(square);
    expect(result).toBe(true);
    expect(square.piece.selected).toBe(true);
  });

  it('must return false if there is no piece', () => {
    let square = { id: 1, x: 1, y: 1, marked: false, piece: null };
    let result = select(square);
    expect(result).toBe(false);
  });
});

describe('deselect', () => {
  it('must select the piece and return true if there is one', () => {
    let piece = { id: 1, playerNumber: 1, king: false, selected: true };
    let square = { id: 1, x: 1, y: 1, marked: false, piece: piece };
    let result = deselect(square);
    expect(result).toBe(true);
    expect(square.piece.selected).toBe(false);
  });

  it('must return false if there is no piece', () => {
    let square = { id: 1, x: 1, y: 1, marked: false, piece: null };
    let result = deselect(square);
    expect(result).toBe(false);
  });
});

describe('mark', () => {
  it('marks the square', () => {
    let square = { id: 1, x: 1, y: 1, piece: null, marked: false };
    let result = mark(square);
    expect(result).toBe(true);
    expect(square.marked).toBe(true);
  });
});

describe('unmark', () => {
  it('unmarks the square', () => {
    let square = { id: 1, x: 1, y: 1, piece: null, marked: true };
    let result = unmark(square);
    expect(result).toBe(true);
    expect(square.marked).toBe(false);
  });
});

describe('promote', () => {
  it('promotes the piece', () => {
    let square = { id: 1, x: 1, y: 1, piece: { id: 1, playerNumber: 1, king: false, selected: false }, marked: true };
    let result = promote(square);
    expect(result).toBe(true);
    expect(square.piece.king).toBe(true);
  });
});
