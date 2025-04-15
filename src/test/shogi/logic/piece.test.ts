import { describe, it, expect } from 'vitest';

import defaultGameState from '../fixtures/defaultGameState';
import firstRankGameState from '../fixtures/firstRankGameState';
import ginshouGameState from '../fixtures/ginshouGameState';
import kinshouGameState from '../fixtures/kinshouGameState';
import oushouGameState from '../fixtures/oushouGameState';
import hishaGameState from '../fixtures/hishaGameState';
import kakugyouGameState from '../fixtures/kakugyouGameState';
import tokinGameState from '../fixtures/tokinGameState';
import narikyouGameState from '../fixtures/narikyouGameState';
import narikeiGameState from '../fixtures/narikeiGameState';
import nariginGameState from '../fixtures/nariginGameState';
import ryuuouGameState from '../fixtures/ryuuouGameState';
import ryuumaGameState from '../fixtures/ryuumaGameState';

import {
  canMoveFrom,
  canMove,
  hasLegalMovesFromY,
  destinations,
  captureSquares,
  promotable,
  promote,
  demote,
  switchPlayer,
  select,
  deselect
} from '$lib/shogi/logic/piece';

describe('canMoveFrom', () => {
  it('returns true if there is at least one destination', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(true);
  });

  it('returns false if there is no destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false };
    let from = { id: '88', x: 1, y: 7, piece: { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false } };
    let result = canMoveFrom(piece, from, gameState);
    expect(result).toBe(false);
  });
});

describe('canMove', () => {
  it('returns true if the square is one of the destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    let to = { id: '76', x: 2, y: 5, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(true);
  });

  it('returns false if the square is not one of the destinations', () => {
    let gameState = defaultGameState();
    let piece = { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false };
    let from = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
    let to = { id: '66', x: 3, y: 5, piece: null };
    let result = canMove(piece, from, to, gameState);
    expect(result).toBe(false);
  });
});

describe('hasLegalMovesFromY', () => {
  describe('when fuhyou', () => {
    describe('when player 1', () => {
      it('returns true if y is not 0', () => {
        let piece = { id: 1, type: 'fuhyou' as const, playerNumber: 1, selected: false };
        let y = 1;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 0', () => {
        let piece = { id: 1, type: 'fuhyou' as const, playerNumber: 1, selected: false };
        let y = 0;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });

    describe('when player 2', () => {
      it('returns true if y is not 8', () => {
        let piece = { id: 1, type: 'fuhyou' as const, playerNumber: 2, selected: false };
        let y = 7;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 8', () => {
        let piece = { id: 1, type: 'fuhyou' as const, playerNumber: 2, selected: false };
        let y = 8;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });
  });

  describe('when kyousha', () => {
    describe('when player 1', () => {
      it('returns true if y is not 0', () => {
        let piece = { id: 1, type: 'kyousha' as const, playerNumber: 1, selected: false };
        let y = 1;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 0', () => {
        let piece = { id: 1, type: 'kyousha' as const, playerNumber: 1, selected: false };
        let y = 0;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });

    describe('when player 2', () => {
      it('returns true if y is not 8', () => {
        let piece = { id: 1, type: 'kyousha' as const, playerNumber: 2, selected: false };
        let y = 7;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 8', () => {
        let piece = { id: 1, type: 'kyousha' as const, playerNumber: 2, selected: false };
        let y = 8;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });
  });

  describe('when keima', () => {
    describe('when player 1', () => {
      it('returns true if y is not 0 and is not 1', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 1, selected: false };
        let y = 2;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 0', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 1, selected: false };
        let y = 0;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });

      it('returns false if y is 1', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 1, selected: false };
        let y = 1;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });

    describe('when player 2', () => {
      it('returns true if y is not 8 and is not 7', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 2, selected: false };
        let y = 6;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(true);
      });

      it('returns false if y is 8', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 2, selected: false };
        let y = 8;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });

      it('returns false if y is 7', () => {
        let piece = { id: 1, type: 'keima' as const, playerNumber: 2, selected: false };
        let y = 7;
        let result = hasLegalMovesFromY(piece, y);
        expect(result).toBe(false);
      });
    });
  });

  describe('default', () => {
    it('returns true', () => {
      let piece = { id: 1, type: 'ginshou' as const, playerNumber: 1, selected: false };
      let y = 0;
      let result = hasLegalMovesFromY(piece, y);
      expect(result).toBe(true);
    });
  });
});

describe('destinations', () => {
  describe('when fuhyou', () => {
    it('returns the square in front', () => {
      let gameState = defaultGameState();
      let pawn = { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false };
      let square = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
      let expected = [
        { id: '76', x: 2, y: 5, piece: null }
      ];
      let result = destinations(pawn, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when kyousha', () => {
    it('returns the unblocked squares in front', () => {
      let gameState = defaultGameState();
      let kyousha = { id: 40, playerNumber: 1, type: 'kyousha' as const, selected: false };
      let square = { id: '19', x: 8, y: 8, piece: { id: 40, playerNumber: 1, type: 'kyousha' as const, selected: false } };
      let expected = [
        { id: '18', x: 8, y: 7, piece: null }
      ];
      let result = destinations(kyousha, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns the squares in from ignoring blocks if ignoreBlocks is set', () => {
      let gameState = defaultGameState();
      let kyousha = { id: 40, playerNumber: 1, type: 'kyousha' as const, selected: false };
      let square = { id: '19', x: 8, y: 8, piece: { id: 40, playerNumber: 1, type: 'kyousha' as const, selected: false } };
      let expected = [
        { id: '11', x: 8, y: 0, piece: { id: 9, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '12', x: 8, y: 1, piece: null },
        { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '14', x: 8, y: 3, piece: null },
        { id: '15', x: 8, y: 4, piece: null },
        { id: '16', x: 8, y: 5, piece: null },
        { id: '18', x: 8, y: 7, piece: null }
      ];
      let result = destinations(kyousha, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when keima', () => {
    it('returns the two squares in l shape forwards', () => {
      let gameState = firstRankGameState();
      let keima = { id: 39, playerNumber: 1, type: 'keima' as const, selected: false };
      let square = { id: '29', x: 7, y: 8, piece: { id: 39, playerNumber: 1, type: 'keima' as const, selected: false } };
      let expected = [
        { id: '37', x: 6, y: 6, piece: null },
        { id: '17', x: 8, y: 6, piece: null }
      ];
      let result = destinations(keima, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when ginshou', () => {
    it('returns diagonal and forward steps', () => {
      let gameState = ginshouGameState();
      let ginshou = { id: 38, playerNumber: 1, type: 'ginshou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 38, playerNumber: 1, type: 'ginshou' as const, selected: false } };
      let expected = [
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '54', x: 4, y: 3, piece: null }
      ];
      let result = destinations(ginshou, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when kinshou', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = kinshouGameState();
      let ginshou = { id: 37, playerNumber: 1, type: 'kinshou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 37, playerNumber: 1, type: 'kinshou' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null }
      ];
      let result = destinations(ginshou, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when oushou', () => {
    it('returns 1 step away squares', () => {
      let gameState = oushouGameState();
      let oushou = { id: 36, playerNumber: 1, type: 'oushou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 36, playerNumber: 1, type: 'oushou' as const, selected: false } };
      let expected = [
        { id: '64', x: 3, y: 3, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null }
      ];
      let result = destinations(oushou, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when gyokushou', () => {
    it('returns 1 step away squares', () => {
      let gameState = oushouGameState();
      let gyokushou = { id: 5, playerNumber: 2, type: 'gyokushou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 5, playerNumber: 2, type: 'gyokushou' as const, selected: false } };
      let expected = [
        { id: '64', x: 3, y: 3, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null }
      ];
      let result = destinations(gyokushou, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when hisha', () => {
    it('returns orthgonal squares', () => {
      let gameState = hishaGameState();
      let hisha = { id: 31, playerNumber: 1, type: 'hisha' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 31, playerNumber: 1, type: 'hisha' as const, selected: false } };
      let expected = [
        { id: '53', x: 4, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: null },
        { id: '15', x: 8, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null }
      ];
      let result = destinations(hisha, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns orthgonal squares ignoring blocks if ignoreBlocks is set', () => {
      let gameState = hishaGameState();
      let hisha = { id: 31, playerNumber: 1, type: 'hisha' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 31, playerNumber: 1, type: 'hisha' as const, selected: false } };
      let expected = [
        { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou', selected: false } },
        { id: '52', x: 4, y: 1, piece: null },
        { id: '53', x: 4, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: null },
        { id: '15', x: 8, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '58', x: 4, y: 7, piece: null }
      ];
      let result = destinations(hisha, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when kakugyou', () => {
    it('returns diagonal squares', () => {
      let gameState = kakugyouGameState();
      let kakugyou = { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false } };
      let expected = [
        { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null }
      ];
      let result = destinations(kakugyou, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns diagonal squares ignoring blocks if ignoreBlocks is set', () => {
      let gameState = kakugyouGameState();
      let kakugyou = { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 30, playerNumber: 1, type: 'kakugyou' as const, selected: false } };
      let expected = [
        { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '11', x: 8, y: 0, piece: { id: 9, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'hisha', selected: false } },
        { id: '22', x: 7, y: 1, piece: { id: 11, playerNumber: 2, type: 'kakugyou', selected: false } },
        { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '88', x: 1, y: 7, piece: null }
      ];
      let result = destinations(kakugyou, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when tokin', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = tokinGameState();
      let tokin = { id: 25, playerNumber: 1, type: 'tokin' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 25, playerNumber: 1, type: 'tokin' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null }
      ];
      let result = destinations(tokin, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when narikyou', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = narikyouGameState();
      let narikyou = { id: 40, playerNumber: 1, type: 'narikyou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 40, playerNumber: 1, type: 'narikyou' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null }
      ];
      let result = destinations(narikyou, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when narikei', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = narikeiGameState();
      let narikei = { id: 39, playerNumber: 1, type: 'narikei' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 39, playerNumber: 1, type: 'narikei' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null }
      ];
      let result = destinations(narikei, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when narigin', () => {
    it('returns orthogonal and forward steps', () => {
      let gameState = nariginGameState();
      let narigin = { id: 38, playerNumber: 1, type: 'narigin' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 38, playerNumber: 1, type: 'narigin' as const, selected: false } };
      let expected = [
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null }
      ];
      let result = destinations(narigin, square, gameState);
      expect(result).toEqual(expected);
    });
  });

  describe('when ryuuou', () => {
    it('returns orthgonal squares and diagonal steps', () => {
      let gameState = ryuuouGameState();
      let ryuuou = { id: 31, playerNumber: 1, type: 'ryuuou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 31, playerNumber: 1, type: 'ryuuou' as const, selected: false } };
      let expected = [
        { id: '53', x: 4, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: null },
        { id: '15', x: 8, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null }
      ];
      let result = destinations(ryuuou, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns orthgonal squares and diagonal steps ignoring blocks if ignoreBlocks is set', () => {
      let gameState = ryuuouGameState();
      let ryuuou = { id: 31, playerNumber: 1, type: 'ryuuou' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 31, playerNumber: 1, type: 'ryuuou' as const, selected: false } };
      let expected = [
        { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou', selected: false } },
        { id: '52', x: 4, y: 1, piece: null },
        { id: '53', x: 4, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: null },
        { id: '15', x: 8, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '58', x: 4, y: 7, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null }
      ];
      let result = destinations(ryuuou, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });

  describe('when ryuuma', () => {
    it('returns diagonal squares and orthogonal steps', () => {
      let gameState = ryuumaGameState();
      let ryuuma = { id: 30, playerNumber: 1, type: 'ryuuma' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 30, playerNumber: 1, type: 'ryuuma' as const, selected: false } };
      let expected = [
        { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null }
      ];
      let result = destinations(ryuuma, square, gameState);
      expect(result).toEqual(expected);
    });

    it('returns diagonal squares and orthogonal steps ignoring blocks if ignoreBlocks is set', () => {
      let gameState = ryuumaGameState();
      let ryuuma = { id: 30, playerNumber: 1, type: 'ryuuma' as const, selected: false };
      let square = { id: '55', x: 4, y: 4, piece: { id: 30, playerNumber: 1, type: 'ryuuma' as const, selected: false } };
      let expected = [
        { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '11', x: 8, y: 0, piece: { id: 9, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'hisha', selected: false } },
        { id: '22', x: 7, y: 1, piece: { id: 11, playerNumber: 2, type: 'kakugyou', selected: false } },
        { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '88', x: 1, y: 7, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '56', x: 4, y: 5, piece: null }
      ];
      let result = destinations(ryuuma, square, gameState, true);
      expect(result).toEqual(expected);
    });
  });
});

describe('captureSquares', () => {
  it('returns destinations', () => {
      let gameState = defaultGameState();
      let pawn = { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false };
      let square = { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou' as const, selected: false } };
      let expected = [
        { id: '76', x: 2, y: 5, piece: null }
      ];
      let result = captureSquares(pawn, square, gameState);
      expect(result).toEqual(expected);
  });
});

describe('promotable', () => {
  describe('when fuhyou', () => {
    it('returns true', () => {
      let piece = { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when kyousha', () => {
    it('returns true', () => {
      let piece = { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when keima', () => {
    it('returns true', () => {
      let piece = { id: 2, playerNumber: 2, type: 'keima' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when ginshou', () => {
    it('returns true', () => {
      let piece = { id: 3, playerNumber: 2, type: 'ginshou' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when hisha', () => {
    it('returns true', () => {
      let piece = { id: 10, playerNumber: 2, type: 'hisha' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when kakugyou', () => {
    it('returns true', () => {
      let piece = { id: 11, playerNumber: 2, type: 'kakugyou' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(true);
    });
  });

  describe('when other', () => {
    it('returns false', () => {
      let piece = { id: 4, playerNumber: 2, type: 'kinshou' as const, selected: false };
      let result = promotable(piece);
      expect(result).toBe(false);
    });
  });
});

describe('promote', () => {
  describe('when fuhyou', () => {
    it('promotes to tokin', () => {
      let piece = { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false };
      let expected = { id: 12, playerNumber: 2, type: 'tokin', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when kyousha', () => {
    it('promotes to narikyou', () => {
      let piece = { id: 1, playerNumber: 2, type: 'kyousha' as const, selected: false };
      let expected = { id: 1, playerNumber: 2, type: 'narikyou', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when keima', () => {
    it('promotes to narikei', () => {
      let piece = { id: 2, playerNumber: 2, type: 'keima' as const, selected: false };
      let expected = { id: 2, playerNumber: 2, type: 'narikei', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when ginshou', () => {
    it('promotes to narigin', () => {
      let piece = { id: 3, playerNumber: 2, type: 'ginshou' as const, selected: false };
      let expected = { id: 3, playerNumber: 2, type: 'narigin', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when hisha', () => {
    it('promotes to ryuuou', () => {
      let piece = { id: 10, playerNumber: 2, type: 'hisha' as const, selected: false };
      let expected = { id: 10, playerNumber: 2, type: 'ryuuou', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when kakugyou', () => {
    it('promotes to ryuuma', () => {
      let piece = { id: 11, playerNumber: 2, type: 'kakugyou' as const, selected: false };
      let expected = { id: 11, playerNumber: 2, type: 'ryuuma', selected: false };
      let result = promote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when other', () => {
    it('does not promote', () => {
      let piece = { id: 4, playerNumber: 2, type: 'kinshou' as const, selected: false };
      let expected = { id: 4, playerNumber: 2, type: 'kinshou', selected: false };
      let result = promote(piece);
      expect(result).toBe(false);
      expect(piece).toEqual(expected);
    });
  });
});

describe('demote', () => {
  describe('when tokin', () => {
    it('demotes to fuhyou', () => {
      let piece = { id: 12, playerNumber: 2, type: 'tokin' as const, selected: false };
      let expected = { id: 12, playerNumber: 2, type: 'fuhyou', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when narikyou', () => {
    it('demotes to kyousha', () => {
      let piece = { id: 1, playerNumber: 2, type: 'narikyou' as const, selected: false };
      let expected = { id: 1, playerNumber: 2, type: 'kyousha', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when narikei', () => {
    it('demotes to keima', () => {
      let piece = { id: 2, playerNumber: 2, type: 'narikei' as const, selected: false };
      let expected = { id: 2, playerNumber: 2, type: 'keima', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when narigin', () => {
    it('demotes to ginshou', () => {
      let piece = { id: 3, playerNumber: 2, type: 'narigin' as const, selected: false };
      let expected = { id: 3, playerNumber: 2, type: 'ginshou', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when ryuuou', () => {
    it('demotes to hisha', () => {
      let piece = { id: 10, playerNumber: 2, type: 'ryuuou' as const, selected: false };
      let expected = { id: 10, playerNumber: 2, type: 'hisha', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when ryuuma', () => {
    it('demotes to kakugyou', () => {
      let piece = { id: 11, playerNumber: 2, type: 'ryuuma' as const, selected: false };
      let expected = { id: 11, playerNumber: 2, type: 'kakugyou', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });

  describe('when other', () => {
    it('does not demote', () => {
      let piece = { id: 4, playerNumber: 2, type: 'kinshou' as const, selected: false };
      let expected = { id: 4, playerNumber: 2, type: 'kinshou', selected: false };
      let result = demote(piece);
      expect(result).toBe(true);
      expect(piece).toEqual(expected);
    });
  });
});

describe('switchPlayer', () => {
  describe('when player 1', () => {
    it('switches to player 2', () => {
      let piece = { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false };
      let result = switchPlayer(piece);
      expect(result).toBe(true);
      expect(piece.playerNumber).toEqual(1);
    });
  });

  describe('when player 2', () => {
    it('switches to player 1', () => {
      let piece = { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false };
      let result = switchPlayer(piece);
      expect(result).toBe(true);
      expect(piece.playerNumber).toEqual(2);
    });
  });
});

describe('select', () => {
  it('marks the piece as selected', () => {
      let piece = { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: false };
      let result = select(piece);
      expect(result).toBe(true);
      expect(piece.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('unmarks the piece as selected', () => {
      let piece = { id: 21, playerNumber: 1, type: 'fuhyou' as const, selected: true };
      let result = deselect(piece);
      expect(result).toBe(true);
      expect(piece.selected).toBe(false);
  });
});
