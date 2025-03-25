import type Match from '$lib/shogi/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  gameState: {
    currentPlayerNumber: 1,
    squares: [
      { id: '91', x: 0, y: 0, piece: null },
      { id: '81', x: 1, y: 0, piece: null },
      { id: '71', x: 2, y: 0, piece: null },
      { id: '61', x: 3, y: 0, piece: null },
      { id: '51', x: 4, y: 0, piece: { id: 5, playerNumber: 2, type: 'gyokushou', selected: false } },
      { id: '41', x: 5, y: 0, piece: null },
      { id: '31', x: 6, y: 0, piece: null },
      { id: '21', x: 7, y: 0, piece: null },
      { id: '11', x: 8, y: 0, piece: null },

      { id: '92', x: 0, y: 1, piece: null },
      { id: '82', x: 1, y: 1, piece: null },
      { id: '72', x: 2, y: 1, piece: { id: 35, playerNumber: 1, type: 'kinshou', selected: false } },
      { id: '62', x: 3, y: 1, piece: null },
      { id: '52', x: 4, y: 1, piece: null },
      { id: '42', x: 5, y: 1, piece: null },
      { id: '32', x: 6, y: 1, piece: { id: 37, playerNumber: 1, type: 'kinshou', selected: false } },
      { id: '22', x: 7, y: 1, piece: null },
      { id: '12', x: 8, y: 1, piece: null },

      { id: '93', x: 0, y: 2, piece: null },
      { id: '83', x: 1, y: 2, piece: null },
      { id: '73', x: 2, y: 2, piece: null },
      { id: '63', x: 3, y: 2, piece: null },
      { id: '53', x: 4, y: 2, piece: { id: 38, playerNumber: 1, type: 'ginshou', selected: false } },
      { id: '43', x: 5, y: 2, piece: null },
      { id: '33', x: 6, y: 2, piece: null },
      { id: '23', x: 7, y: 2, piece: null },
      { id: '13', x: 8, y: 2, piece: null },

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

      { id: '97', x: 0, y: 6, piece: null },
      { id: '87', x: 1, y: 6, piece: null },
      { id: '77', x: 2, y: 6, piece: null },
      { id: '67', x: 3, y: 6, piece: null },
      { id: '57', x: 4, y: 6, piece: null },
      { id: '47', x: 5, y: 6, piece: null },
      { id: '37', x: 6, y: 6, piece: null },
      { id: '27', x: 7, y: 6, piece: null },
      { id: '17', x: 8, y: 6, piece: null },

      { id: '98', x: 0, y: 7, piece: null },
      { id: '88', x: 1, y: 7, piece: null },
      { id: '78', x: 2, y: 7, piece: null },
      { id: '68', x: 3, y: 7, piece: null },
      { id: '58', x: 4, y: 7, piece: null },
      { id: '48', x: 5, y: 7, piece: null },
      { id: '38', x: 6, y: 7, piece: null },
      { id: '28', x: 7, y: 7, piece: null },
      { id: '18', x: 8, y: 7, piece: null },

      { id: '99', x: 0, y: 8, piece: null },
      { id: '89', x: 1, y: 8, piece: null },
      { id: '79', x: 2, y: 8, piece: null },
      { id: '69', x: 3, y: 8, piece: null },
      { id: '59', x: 4, y: 8, piece: { id: 36, playerNumber: 1, type: 'oushou', selected: false } },
      { id: '49', x: 5, y: 8, piece: null },
      { id: '39', x: 6, y: 8, piece: null },
      { id: '29', x: 7, y: 8, piece: null },
      { id: '19', x: 8, y: 8, piece: null }
    ],
    hands: [
      { playerNumber: 1, pieces: [
        { id: 17, playerNumber: 1, type: 'fuhyou', selected: true }
      ] },
      { playerNumber: 2, pieces: [] }
    ]
  },
  players: [
    { playerNumber: 1, name: 'Player', resigned: false },
    { playerNumber: 2, name: 'Computer', resigned: false }
  ],
  winner: null,
  currentMove: null,
  promotion: false,
  lastAction: null,
  notification: 'Player to move'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
