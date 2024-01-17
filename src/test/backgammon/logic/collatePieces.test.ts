import { describe, it, expect } from 'vitest';
import collatePieces from '$lib/backgammon/logic/collatePieces';
import buildMatchAttributes from '$lib/backgammon/logic/buildMatchAttributes';

describe('with a match', () => {
  it('it collates all the pieces on points, bar and off board', () => {
    let match = buildMatchAttributes(1); 
    let result = collatePieces(match);
    let expected = [
      { 
        piece: { id: 1, player_number: 1 }, 
        point: { number: 1, selected: false }, 
        pieceIndex: 0
      },
      { 
        piece: { id: 2, player_number: 1 }, 
        point: { number: 1, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 3, player_number: 2 }, 
        point: { number: 6, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 4, player_number: 2 }, 
        point: { number: 6, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 5, player_number: 2 }, 
        point: { number: 6, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 6, player_number: 2 }, 
        point: { number: 6, selected: false }, 
        pieceIndex: 3 
      },
      { 
        piece: { id: 7, player_number: 2 }, 
        point: { number: 6, selected: false }, 
        pieceIndex: 4 
      },
      { 
        piece: { id: 8, player_number: 2 }, 
        point: { number: 8, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 9, player_number: 2 }, 
        point: { number: 8, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 10, player_number: 2 }, 
        point: { number: 8, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 11, player_number: 1 }, 
        point: { number: 12, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 12, player_number: 1 }, 
        point: { number: 12, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 13, player_number: 1 }, 
        point: { number: 12, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 14, player_number: 1 }, 
        point: { number: 12, selected: false }, 
        pieceIndex: 3 
      },
      { 
        piece: { id: 15, player_number: 1 }, 
        point: { number: 12, selected: false }, 
        pieceIndex: 4 
      },
      { 
        piece: { id: 16, player_number: 2 }, 
        point: { number: 13, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 17, player_number: 2 }, 
        point: { number: 13, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 18, player_number: 2 }, 
        point: { number: 13, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 19, player_number: 2 }, 
        point: { number: 13, selected: false }, 
        pieceIndex: 3 
      },
      { 
        piece: { id: 20, player_number: 2 }, 
        point: { number: 13, selected: false }, 
        pieceIndex: 4 
      },
      { 
        piece: { id: 21, player_number: 1 }, 
        point: { number: 17, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 22, player_number: 1 }, 
        point: { number: 17, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 23, player_number: 1 }, 
        point: { number: 17, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 24, player_number: 1 }, 
        point: { number: 19, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 25, player_number: 1 }, 
        point: { number: 19, selected: false }, 
        pieceIndex: 1 
      },
      { 
        piece: { id: 26, player_number: 1 }, 
        point: { number: 19, selected: false }, 
        pieceIndex: 2 
      },
      { 
        piece: { id: 27, player_number: 1 }, 
        point: { number: 19, selected: false }, 
        pieceIndex: 3 
      },
      { 
        piece: { id: 28, player_number: 1 }, 
        point: { number: 19, selected: false }, 
        pieceIndex: 4 
      },
      { 
        piece: { id: 29, player_number: 2 }, 
        point: { number: 24, selected: false }, 
        pieceIndex: 0 
      },
      { 
        piece: { id: 30, player_number: 2 }, 
        point: { number: 24, selected: false }, 
        pieceIndex: 1 
      }
    ];
    expect(result).toEqual(expected);
  });
});
