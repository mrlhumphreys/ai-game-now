import { describe, it, expect } from 'vitest';
import fenToGameState from '$lib/shogi/logic/fenToGameState';

describe('default fen', () => {
  it('should return default game state', () => {
    let fen = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -';
    let result = fenToGameState(fen);
    let expected = {
      currentPlayerNumber: 1,
      squares: [
        { id: '91', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '81', x: 1, y: 0, piece: { id: 1, playerNumber: 2, type: 'keima', selected: false } },
        { id: '71', x: 2, y: 0, piece: { id: 2, playerNumber: 2, type: 'ginshou', selected: false } },
        { id: '61', x: 3, y: 0, piece: { id: 3, playerNumber: 2, type: 'kinshou', selected: false } },
        { id: '51', x: 4, y: 0, piece: { id: 4, playerNumber: 2, type: 'gyokushou', selected: false } },
        { id: '41', x: 5, y: 0, piece: { id: 5, playerNumber: 2, type: 'kinshou', selected: false } },
        { id: '31', x: 6, y: 0, piece: { id: 6, playerNumber: 2, type: 'ginshou', selected: false } },
        { id: '21', x: 7, y: 0, piece: { id: 7, playerNumber: 2, type: 'keima', selected: false } },
        { id: '11', x: 8, y: 0, piece: { id: 8, playerNumber: 2, type: 'kyousha', selected: false } },

        { id: '92', x: 0, y: 1, piece: null },
        { id: '82', x: 1, y: 1, piece: { id: 11, playerNumber: 2, type: 'hisha', selected: false } },
        { id: '72', x: 2, y: 1, piece: null },
        { id: '62', x: 3, y: 1, piece: null },
        { id: '52', x: 4, y: 1, piece: null },
        { id: '42', x: 5, y: 1, piece: null },
        { id: '32', x: 6, y: 1, piece: null },
        { id: '22', x: 7, y: 1, piece: { id: 13, playerNumber: 2, type: 'kakugyou', selected: false } },
        { id: '12', x: 8, y: 1, piece: null },

        { id: '93', x: 0, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '83', x: 1, y: 2, piece: { id: 17, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '73', x: 2, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '63', x: 3, y: 2, piece: { id: 19, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '53', x: 4, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '43', x: 5, y: 2, piece: { id: 21, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: { id: 22, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '23', x: 7, y: 2, piece: { id: 23, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '13', x: 8, y: 2, piece: { id: 24, playerNumber: 2, type: 'fuhyou', selected: false } },

        { id: '94', x: 0, y: 3, piece: null },
        { id: '84', x: 1, y: 3, piece: null },
        { id: '74', x: 2, y: 3, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '34', x: 6, y: 3, piece: null },
        { id: '24', x: 7, y: 3, piece: null },
        { id: '14', x: 8, y: 3, piece: null },

        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '55', x: 4, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: null },
        { id: '15', x: 8, y: 4, piece: null },

        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '76', x: 2, y: 5, piece: null },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null },

        { id: '97', x: 0, y: 6, piece: { id: 32, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '87', x: 1, y: 6, piece: { id: 33, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '77', x: 2, y: 6, piece: { id: 34, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '67', x: 3, y: 6, piece: { id: 35, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '57', x: 4, y: 6, piece: { id: 36, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '47', x: 5, y: 6, piece: { id: 37, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '37', x: 6, y: 6, piece: { id: 38, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '27', x: 7, y: 6, piece: { id: 39, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '17', x: 8, y: 6, piece: { id: 40, playerNumber: 1, type: 'fuhyou', selected: false } },

        { id: '98', x: 0, y: 7, piece: null },
        { id: '88', x: 1, y: 7, piece: { id: 43, playerNumber: 1, type: 'kakugyou', selected: false } },
        { id: '78', x: 2, y: 7, piece: null },
        { id: '68', x: 3, y: 7, piece: null },
        { id: '58', x: 4, y: 7, piece: null },
        { id: '48', x: 5, y: 7, piece: null },
        { id: '38', x: 6, y: 7, piece: null },
        { id: '28', x: 7, y: 7, piece: { id: 45, playerNumber: 1, type: 'hisha', selected: false } },
        { id: '18', x: 8, y: 7, piece: null },

        { id: '99', x: 0, y: 8, piece: { id: 48, playerNumber: 1, type: 'kyousha', selected: false } },
        { id: '89', x: 1, y: 8, piece: { id: 49, playerNumber: 1, type: 'keima', selected: false } },
        { id: '79', x: 2, y: 8, piece: { id: 50, playerNumber: 1, type: 'ginshou', selected: false } },
        { id: '69', x: 3, y: 8, piece: { id: 51, playerNumber: 1, type: 'kinshou', selected: false } },
        { id: '59', x: 4, y: 8, piece: { id: 52, playerNumber: 1, type: 'oushou', selected: false } },
        { id: '49', x: 5, y: 8, piece: { id: 53, playerNumber: 1, type: 'kinshou', selected: false } },
        { id: '39', x: 6, y: 8, piece: { id: 54, playerNumber: 1, type: 'ginshou', selected: false } },
        { id: '29', x: 7, y: 8, piece: { id: 55, playerNumber: 1, type: 'keima', selected: false } },
        { id: '19', x: 8, y: 8, piece: { id: 56, playerNumber: 1, type: 'kyousha', selected: false } }
      ],
      hands: [
        { playerNumber: 1, pieces: [] },
        { playerNumber: 2, pieces: [] },
      ]
    };
    expect(result).toEqual(expected);
  });
});

describe('fen with hand', () => {
  it('should return gameState', () => {
    let fen = 'lnsgk2nl/1r4gs1/p1pppp1pp/1p4p2/7P1/2P6/PP1PPPP1P/1SG4R1/LN2KGSNL b Bb';
    let result = fenToGameState(fen);
    let expected = {
      currentPlayerNumber: 1,
      squares: [
        { id: '91', x: 0, y: 0, piece: { id: 0, playerNumber: 2, type: 'kyousha', selected: false } },
        { id: '81', x: 1, y: 0, piece: { id: 1, playerNumber: 2, type: 'keima', selected: false } },
        { id: '71', x: 2, y: 0, piece: { id: 2, playerNumber: 2, type: 'ginshou', selected: false } },
        { id: '61', x: 3, y: 0, piece: { id: 3, playerNumber: 2, type: 'kinshou', selected: false } },
        { id: '51', x: 4, y: 0, piece: { id: 4, playerNumber: 2, type: 'gyokushou', selected: false } },
        { id: '41', x: 5, y: 0, piece: null },
        { id: '31', x: 6, y: 0, piece: null },
        { id: '21', x: 7, y: 0, piece: { id: 6, playerNumber: 2, type: 'keima', selected: false } },
        { id: '11', x: 8, y: 0, piece: { id: 7, playerNumber: 2, type: 'kyousha', selected: false } },

        { id: '92', x: 0, y: 1, piece: null },
        { id: '82', x: 1, y: 1, piece: { id: 10, playerNumber: 2, type: 'hisha', selected: false } },
        { id: '72', x: 2, y: 1, piece: null },
        { id: '62', x: 3, y: 1, piece: null },
        { id: '52', x: 4, y: 1, piece: null },
        { id: '42', x: 5, y: 1, piece: null },
        { id: '32', x: 6, y: 1, piece: { id: 12, playerNumber: 2, type: 'kinshou', selected: false } },
        { id: '22', x: 7, y: 1, piece: { id: 13, playerNumber: 2, type: 'ginshou', selected: false } },
        { id: '12', x: 8, y: 1, piece: null },

        { id: '93', x: 0, y: 2, piece: { id: 16, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '83', x: 1, y: 2, piece: null },
        { id: '73', x: 2, y: 2, piece: { id: 18, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '63', x: 3, y: 2, piece: { id: 19, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '53', x: 4, y: 2, piece: { id: 20, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '43', x: 5, y: 2, piece: { id: 21, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '33', x: 6, y: 2, piece: null },
        { id: '23', x: 7, y: 2, piece: { id: 23, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '13', x: 8, y: 2, piece: { id: 24, playerNumber: 2, type: 'fuhyou', selected: false } },

        { id: '94', x: 0, y: 3, piece: null },
        { id: '84', x: 1, y: 3, piece: { id: 27, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '74', x: 2, y: 3, piece: null },
        { id: '64', x: 3, y: 3, piece: null },
        { id: '54', x: 4, y: 3, piece: null },
        { id: '44', x: 5, y: 3, piece: null },
        { id: '34', x: 6, y: 3, piece: { id: 29, playerNumber: 2, type: 'fuhyou', selected: false } },
        { id: '24', x: 7, y: 3, piece: null },
        { id: '14', x: 8, y: 3, piece: null },

        { id: '95', x: 0, y: 4, piece: null },
        { id: '85', x: 1, y: 4, piece: null },
        { id: '75', x: 2, y: 4, piece: null },
        { id: '65', x: 3, y: 4, piece: null },
        { id: '55', x: 4, y: 4, piece: null },
        { id: '45', x: 5, y: 4, piece: null },
        { id: '35', x: 6, y: 4, piece: null },
        { id: '25', x: 7, y: 4, piece: { id: 33, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '15', x: 8, y: 4, piece: null },

        { id: '96', x: 0, y: 5, piece: null },
        { id: '86', x: 1, y: 5, piece: null },
        { id: '76', x: 2, y: 5, piece: { id: 37, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '66', x: 3, y: 5, piece: null },
        { id: '56', x: 4, y: 5, piece: null },
        { id: '46', x: 5, y: 5, piece: null },
        { id: '36', x: 6, y: 5, piece: null },
        { id: '26', x: 7, y: 5, piece: null },
        { id: '16', x: 8, y: 5, piece: null },

        { id: '97', x: 0, y: 6, piece: { id: 40, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '87', x: 1, y: 6, piece: { id: 41, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '77', x: 2, y: 6, piece: null },
        { id: '67', x: 3, y: 6, piece: { id: 43, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '57', x: 4, y: 6, piece: { id: 44, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '47', x: 5, y: 6, piece: { id: 45, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '37', x: 6, y: 6, piece: { id: 46, playerNumber: 1, type: 'fuhyou', selected: false } },
        { id: '27', x: 7, y: 6, piece: null },
        { id: '17', x: 8, y: 6, piece: { id: 48, playerNumber: 1, type: 'fuhyou', selected: false } },

        { id: '98', x: 0, y: 7, piece: null },
        { id: '88', x: 1, y: 7, piece: { id: 51, playerNumber: 1, type: 'ginshou', selected: false } },
        { id: '78', x: 2, y: 7, piece: { id: 52, playerNumber: 1, type: 'kinshou', selected: false } },
        { id: '68', x: 3, y: 7, piece: null },
        { id: '58', x: 4, y: 7, piece: null },
        { id: '48', x: 5, y: 7, piece: null },
        { id: '38', x: 6, y: 7, piece: null },
        { id: '28', x: 7, y: 7, piece: { id: 54, playerNumber: 1, type: 'hisha', selected: false } },
        { id: '18', x: 8, y: 7, piece: null },

        { id: '99', x: 0, y: 8, piece: { id: 57, playerNumber: 1, type: 'kyousha', selected: false } },
        { id: '89', x: 1, y: 8, piece: { id: 58, playerNumber: 1, type: 'keima', selected: false } },
        { id: '79', x: 2, y: 8, piece: null },
        { id: '69', x: 3, y: 8, piece: null },
        { id: '59', x: 4, y: 8, piece: { id: 60, playerNumber: 1, type: 'oushou', selected: false } },
        { id: '49', x: 5, y: 8, piece: { id: 61, playerNumber: 1, type: 'kinshou', selected: false } },
        { id: '39', x: 6, y: 8, piece: { id: 62, playerNumber: 1, type: 'ginshou', selected: false } },
        { id: '29', x: 7, y: 8, piece: { id: 63, playerNumber: 1, type: 'keima', selected: false } },
        { id: '19', x: 8, y: 8, piece: { id: 64, playerNumber: 1, type: 'kyousha', selected: false } }
      ],
      hands: [
        { playerNumber: 1, pieces: [ { id: 68, playerNumber: 1, type: 'kakugyou', selected: false } ] },
        { playerNumber: 2, pieces: [ { id: 69, playerNumber: 2, type: 'kakugyou', selected: false } ] },
      ]
    };
    expect(result).toEqual(expected);
  });
});

