import { describe, it, expect } from 'vitest';

import defaultGameState from '../fixtures/defaultGameState';
import unmoveableGameState from '../fixtures/unmoveableGameState';
import soldierGameState from '../fixtures/soldierGameState';
import cannonGameState from '../fixtures/cannonGameState';
import horseGameState from '../fixtures/horseGameState';
import elephantGameState from '../fixtures/elephantGameState';
import advisorGameState from '../fixtures/advisorGameState';
import kingGameState from '../fixtures/kingGameState';
import flyingKingGameState from '../fixtures/flyingKingGameState';
import chariotGameState from '../fixtures/chariotGameState';

import {
  canMoveFrom,
  canMove,
  destinations,
  captureSquares,
  switchPlayer,
  select,
  deselect
} from '$lib/xiangqi/logic/piece';

describe('canMoveFrom', () => {
  it('returns true if there is at least one destination', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false } };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(true);
  });

  it('returns false if there is no destinations', () => {
    let gameState = unmoveableGameState();
    let piece = { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false };
    let from = { id: '57', x: 4, y: 6, piece: { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false } };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(false);
  });
});

describe('canMove', () => {
  it('returns true if the square is one of the destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false } };
    let to = { id: '76', x: 2, y: 5, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(true);
  });

  it('returns false if the square is not one of the destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'soldier' as const, selected: false } };
    let to = { id: '66', x: 3, y: 5, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(false);
  });
});

describe('destinations', () => {
  describe('when soldier', () => {
    it('returns the square in front', () => {
      let gameState = soldierGameState();
      let soldier = { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false };
      let square = { id: '56', x: 4, y: 5, piece: { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false } };
      let expected = [
        { id: '55', x: 4, y: 4, piece: null }
      ];
      let result = destinations(soldier, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns the side squares if on the opposing side', () => {
      let gameState = soldierGameState();
      let soldier = { id: 18, playerNumber: 1, type: 'soldier' as const, selected: false };
      let square = { id: '75', x: 2, y: 4, piece: { id: 18, playerNumber: 1, type: 'soldier' as const, selected: false } };
      let expected = [
        { id: '74', x: 2, y: 3, piece: { id: 13, playerNumber: 2, type: 'soldier' as const, selected: false } },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null }
      ];
      let result = destinations(soldier, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when cannon', () => {
    it('returns the unblocked orthognal squares and the capture jump', () => {
      let gameState = cannonGameState();
      let cannon = { id: 22, playerNumber: 1, type: 'cannon' as const, selected: false };
      let square = { id: '76', x: 2, y: 5, piece: { id: 22, playerNumber: 1, type: 'cannon' as const, selected: false } };
      let expected = [
        { id: '71', x: 2, y: 0, piece: { id: 3, playerNumber: 2, type: 'elephant' as const, selected: false } },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null }
      ];
      let result = destinations(cannon, square, gameState, false);
      expect(result).toEqual(expected);
    });

    it('returns the orthogonal squares ignoring blocks if ignoreBlocks is set', () => {
      let gameState = cannonGameState();
      let cannon = { id: 22, playerNumber: 1, type: 'cannon' as const, selected: false };
      let square = { id: '76', x: 2, y: 5, piece: { id: 22, playerNumber: 1, type: 'cannon' as const, selected: false } };
      let expected = [
        { id: '71', x: 2, y: 0, piece: { id: 3, playerNumber: 2, type: 'elephant' as const, selected: false } },
        { id: '72', x: 2, y: 1, piece: null },
        { id: '73', x: 2, y: 2, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null },
        { id: '78', x: 2, y: 7, piece: null },
        { id: '79', x: 2, y: 8, piece: null }
      ];
      let result = destinations(cannon, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when horse', () => {
    it('returns the squares in l shape that are not blocked', () => {
      let gameState = horseGameState();
      let horse = { id: 25, playerNumber: 1, type: 'horse' as const, selected: false };
      let square = { id: '56', x: 4, y: 5, piece: { id: 25, playerNumber: 1, type: 'horse' as const, selected: false } };
      let expected = [
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null }
      ];
      let result = destinations(horse, square, gameState, false);
      expect(result).toEqual(expected);
    });

    it('returns the squares in l shape that are blocked if ignoreBlocks is set', () => {
      let gameState = horseGameState();
      let horse = { id: 25, playerNumber: 1, type: 'horse' as const, selected: false };
      let square = { id: '56', x: 4, y: 5, piece: { id: 25, playerNumber: 1, type: 'horse' as const, selected: false } };
      let expected = [
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '68', x: 3, y: 7, piece: null },
        { id: '48', x: 5, y: 7, piece: null }
      ];
      let result = destinations(horse, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when advisor', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = advisorGameState();
      let advisor = { id: 29, playerNumber: 1, type: 'advisor' as const, selected: false };
      let square = { id: '48', x: 5, y: 7, piece: { id: 29, playerNumber: 1, type: 'advisor' as const, selected: false } };
      let expected = [
        { id: '59', x: 4, y: 8, piece: null }
      ];
      let result = destinations(advisor, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when king', () => {
    it('returns 1 step away squares', () => {
      let gameState = kingGameState();
      let king = { id: 28, playerNumber: 1, type: 'king' as const, selected: false };
      let square = { id: '58', x: 4, y: 7, piece: { id: 28, playerNumber: 1, type: 'king' as const, selected: false } };
      let expected = [
        { id: '68', x: 3, y: 7, piece: null },
        { id: '48', x: 5, y: 7, piece: null },
        { id: '59', x: 4, y: 8, piece: null }
      ];
      let result = destinations(king, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns flying king squares', () => {
      let gameState = flyingKingGameState();
      let king = { id: 28, playerNumber: 1, type: 'king' as const, selected: false };
      let square = { id: '510', x: 4, y: 9, piece: { id: 28, playerNumber: 1, type: 'king' as const, selected: false } };
      let expected = [
        { id: '59', x: 4, y: 8, piece: null },
        { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } }
      ];
      let result = destinations(king, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when chariot', () => {
    it('returns orthgonal squares', () => {
      let gameState = chariotGameState();
      let chariot = { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false };
      let square = { id: '56', x: 4, y: 5, piece: { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: { id: 14, playerNumber: 2, type: 'soldier' as const, selected: false } },
        { id: '55', x: 4, y: 4, piece: null },
        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '76', x: 2, y: 5, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null },
      ];
      let result = destinations(chariot, square, gameState, false);
      expect(result).toEqual(expected);
    });

    it('returns orthgonal squares ignoring blocks if ignoreBlocks is set', () => {
      let gameState = chariotGameState();
      let chariot = { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false };
      let square = { id: '56', x: 4, y: 5, piece: { id: 24, playerNumber: 1, type: 'chariot' as const, selected: false } };
      let expected = [
        { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'king' as const, selected: false } },
        { id: '52', x: 4, y: 1, piece: null },
        { id: '53', x: 4, y: 2, piece: null },
        { id: '54', x: 4, y: 3, piece: { id: 14, playerNumber: 2, type: 'soldier' as const, selected: false } },
        { id: '55', x: 4, y: 4, piece: null },
        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '76', x: 2, y: 5, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null },
        { id: '58', x: 4, y: 7, piece: null },
        { id: '59', x: 4, y: 8, piece: null }
      ];
      let result = destinations(chariot, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when elephant', () => {
    it('returns diagonal squares, 2 steps away on its side of the river', () => {
      let gameState = elephantGameState();
      let elephant = { id: 26, playerNumber: 1, type: 'elephant' as const, selected: false };
      let square = { id: '76', x: 2, y: 5, piece: { id: 26, playerNumber: 1, type: 'elephant' as const, selected: false } };
      let expected = [
        { id: '58', x: 4, y: 7, piece: null }
      ];
      let result = destinations(elephant, square, gameState, false);
      expect(result).toEqual(expected);
    });

    it('returns diagonal squares, 2 steps away on its side of the river, ignoring blocks if ignoreBlocks is set', () => {
      let gameState = elephantGameState();
      let elephant = { id: 26, playerNumber: 1, type: 'elephant' as const, selected: false };
      let square = { id: '76', x: 2, y: 5, piece: { id: 26, playerNumber: 1, type: 'elephant' as const, selected: false } };
      let expected = [
        { id: '98', x: 0, y: 7, piece: null },
        { id: '58', x: 4, y: 7, piece: null }
      ];
      let result = destinations(elephant, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });
});

describe('captureSquares', () => {
  it('returns destinations', () => {
      let gameState = defaultGameState();
      let soldier = { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false };
      let square = { id: '57', x: 4, y: 6, piece: { id: 19, playerNumber: 1, type: 'soldier' as const, selected: false } };
      let expected = [
        { id: '56', x: 4, y: 5, piece: null }
      ];
      let result = captureSquares(soldier, square, gameState);
      expect(result).toEqual(expected);
  });
});

describe('switchPlayer', () => {
  describe('when player 1', () => {
    it('switches to player 2', () => {
      let piece = { id: 12, playerNumber: 2, type: 'soldier' as const, selected: false };
      let result = switchPlayer(piece);
      expect(result).toBe(true);
      expect(piece.playerNumber).toEqual(1);
    });
  });

  describe('when player 2', () => {
    it('switches to player 1', () => {
      let piece = { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false };
      let result = switchPlayer(piece);
      expect(result).toBe(true);
      expect(piece.playerNumber).toEqual(2);
    });
  });
});

describe('select', () => {
  it('marks the piece as selected', () => {
      let piece = { id: 21, playerNumber: 1, type: 'soldier' as const, selected: false };
      let result = select(piece);
      expect(result).toBe(true);
      expect(piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('unmarks the piece as selected', () => {
      let piece = { id: 21, playerNumber: 1, type: 'soldier' as const, selected: true };
      let result = deselect(piece);
      expect(result).toBe(true);
      expect(piece.selected).toBe(false);
  });
});
