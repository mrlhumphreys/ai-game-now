import { describe, it, expect } from 'vitest';
import {
  piecesOwnedByPlayer,
  push,
  emptyBlot,
  hasAllOfPlayersPieces
} from '$lib/backgammon/logic/offBoard';

describe('piecesOwnedByPlayer', () => {
  it('returns pieces owned by the player', () => {
    let offBoard = { name: 'off', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = piecesOwnedByPlayer(offBoard, playerNumber);
    let expected = [ { id: 1, player_number: 1 } ];
    expect(result).toEqual(expected);
  });
});

describe('push', () => {
  it('pushes a piece off board', () => {
    let offBoard = { name: 'off', pieces: [ ], selected: false }; 
    let piece = { id: 1, player_number: 1 };
    push(offBoard, piece);
    expect(offBoard.pieces).toEqual([piece]);
  });
});

describe('emptyBlot', () => {
  it('returns false', () => {
    let offBoard = { name: 'off', pieces: [ ], selected: false }; 
    expect(emptyBlot(offBoard)).toBe(false);
  });
});

describe('hasAllOfPlayersPieces', () => {
  it('returns true if off board has all 15 of players pieces', () => {
    let offBoard = { 
      name: 'off',
      pieces: [ 
        { id: 1, player_number: 1 },
        { id: 2, player_number: 1 },
        { id: 3, player_number: 1 },
        { id: 4, player_number: 1 },
        { id: 5, player_number: 1 },

        { id: 6, player_number: 1 },
        { id: 7, player_number: 1 },
        { id: 8, player_number: 1 },
        { id: 9, player_number: 1 },
        { id: 10, player_number: 1 },

        { id: 11, player_number: 1 },
        { id: 12, player_number: 1 },
        { id: 13, player_number: 1 },
        { id: 14, player_number: 1 },
        { id: 15, player_number: 1 },
      ], 
      selected: false 
    }; 
    expect(hasAllOfPlayersPieces(offBoard, 1)).toBe(true);
  });

  it('returns false if off board does not have all 15 of players pieces', () => {
    let offBoard = { 
      name: 'off',
      pieces: [ 
        { id: 1, player_number: 1 },
        { id: 2, player_number: 1 },
        { id: 3, player_number: 1 },
        { id: 4, player_number: 1 },
        { id: 5, player_number: 1 },

        { id: 6, player_number: 1 },
        { id: 7, player_number: 1 },
        { id: 8, player_number: 1 },
        { id: 9, player_number: 1 },
        { id: 10, player_number: 1 },

        { id: 11, player_number: 1 },
        { id: 12, player_number: 1 },
        { id: 13, player_number: 1 },
        { id: 14, player_number: 1 }
      ], 
      selected: false 
    }; 
    expect(hasAllOfPlayersPieces(offBoard, 1)).toBe(false);
  });
});
