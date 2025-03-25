import { describe, it, expect } from 'vitest';
import piecesWithContext from '$lib/shogi/logic/piecesWithContext';
import pieceInHandGameState from '../fixtures/pieceInHandGameState';

describe('piecesWithContext', () => {
  it('combines all pieces on board and in hand and attaches context', () => {
    let gameState = pieceInHandGameState();
    let expected = [
      {
        piece: { id: 1, playerNumber: 2, type: 'kyousha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '91', x: 0, y: 0, piece: { id: 1, playerNumber: 2, type: 'kyousha', selected: false } }
      },
      {
        piece: { id: 2, playerNumber: 2, type: 'keima', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '81', x: 1, y: 0, piece: { id: 2, playerNumber: 2, type: 'keima', selected: false } }
      },
      {
        piece: { id: 3, playerNumber: 2, type: 'ginshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '71', x: 2, y: 0, piece: { id: 3, playerNumber: 2, type: 'ginshou', selected: false } }
      },
      {
        piece: { id: 4, playerNumber: 2, type: 'kinshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '61', x: 3, y: 0, piece: { id: 4, playerNumber: 2, type: 'kinshou', selected: false } }
      },
      {
        piece: { id: 5, playerNumber: 2, type: 'gyokushou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou', selected: false } }
      },
      {
        piece: { id: 6, playerNumber: 2, type: 'kinshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '41', x: 5, y: 0, piece: { id: 6, playerNumber: 2, type: 'kinshou', selected: false } }
      },
      {
        piece: { id: 7, playerNumber: 2, type: 'ginshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '31', x: 6, y: 0, piece: { id: 7, playerNumber: 2, type: 'ginshou', selected: false } }
      },
      {
        piece: { id: 8, playerNumber: 2, type: 'keima', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '21', x: 7, y: 0, piece: { id: 8, playerNumber: 2, type: 'keima', selected: false } }
      },
      {
        piece: { id: 9, playerNumber: 2, type: 'kyousha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '11', x: 8, y: 0, piece: { id: 9, playerNumber: 2, type: 'kyousha', selected: false } }
      },
      {
        piece: { id: 10, playerNumber: 2, type: 'hisha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'hisha', selected: false } }
      },
      {
        piece: { id: 11, playerNumber: 2, type: 'kakugyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '22', x: 7, y: 1, piece: { id: 11, playerNumber: 2, type: 'kakugyou', selected: false } }
      },
      {
        piece: { id: 12, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '93', x: 0, y: 2, piece: { id: 12, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 13, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '83', x: 1, y: 2, piece: { id: 13, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '73', x: 2, y: 2, piece: { id: 14, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 15, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '63', x: 3, y: 2, piece: { id: 15, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 16, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'hand',
        square: null
      },
      {
        piece: { id: 17, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '43', x: 5, y: 2, piece: { id: 17, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '33', x: 6, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 19, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '23', x: 7, y: 2, piece: { id: 19, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '13', x: 8, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '97', x: 0, y: 6, piece: { id: 21, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 22, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '87', x: 1, y: 6, piece: { id: 22, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 23, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '77', x: 2, y: 6, piece: { id: 23, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 24, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '67', x: 3, y: 6, piece: { id: 24, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 25, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '57', x: 4, y: 6, piece: { id: 25, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 26, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '47', x: 5, y: 6, piece: { id: 26, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 27, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '37', x: 6, y: 6, piece: { id: 27, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 28, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '27', x: 7, y: 6, piece: { id: 28, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 29, playerNumber: 1, type: 'fuhyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '17', x: 8, y: 6, piece: { id: 29, playerNumber: 1, type: 'fuhyou', selected: false } }
      },
      {
        piece: { id: 30, playerNumber: 1, type: 'kakugyou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '88', x: 1, y: 7, piece: { id: 30, playerNumber: 1, type: 'kakugyou', selected: false } }
      },
      {
        piece: { id: 31, playerNumber: 1, type: 'hisha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '28', x: 7, y: 7, piece: { id: 31, playerNumber: 1, type: 'hisha', selected: false } }
      },
      {
        piece: { id: 32, playerNumber: 1, type: 'kyousha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '99', x: 0, y: 8, piece: { id: 32, playerNumber: 1, type: 'kyousha', selected: false } }
      },
      {
        piece: { id: 33, playerNumber: 1, type: 'keima', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '89', x: 1, y: 8, piece: { id: 33, playerNumber: 1, type: 'keima', selected: false } }
      },
      {
        piece: { id: 34, playerNumber: 1, type: 'ginshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '79', x: 2, y: 8, piece: { id: 34, playerNumber: 1, type: 'ginshou', selected: false } }
      },
      {
        piece: { id: 35, playerNumber: 1, type: 'kinshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '69', x: 3, y: 8, piece: { id: 35, playerNumber: 1, type: 'kinshou', selected: false } }
      },
      {
        piece: { id: 36, playerNumber: 1, type: 'oushou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '59', x: 4, y: 8, piece: { id: 36, playerNumber: 1, type: 'oushou', selected: false } }
      },
      {
        piece: { id: 37, playerNumber: 1, type: 'kinshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '49', x: 5, y: 8, piece: { id: 37, playerNumber: 1, type: 'kinshou', selected: false } }
      },
      {
        piece: { id: 38, playerNumber: 1, type: 'ginshou', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '39', x: 6, y: 8, piece: { id: 38, playerNumber: 1, type: 'ginshou', selected: false } }
      },
      {
        piece: { id: 39, playerNumber: 1, type: 'keima', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '29', x: 7, y: 8, piece: { id: 39, playerNumber: 1, type: 'keima', selected: false } }
      },
      {
        piece: { id: 40, playerNumber: 1, type: 'kyousha', selected: false },
        pov: 1,
        context: 'square',
        square: { id: '19', x: 8, y: 8, piece: { id: 40, playerNumber: 1, type: 'kyousha', selected: false } }
      }
    ];
    let result = piecesWithContext(gameState, 1);
    expect(result).toEqual(expected);
  });
});
