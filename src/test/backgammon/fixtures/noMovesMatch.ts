import type Match from '$lib/backgammon/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  gameState: {
    currentPlayerNumber: 1,
    currentPhase: 'move',
    firstTurn: true,
    dice: [
      { id: 0, number: 1, used: false },
      { id: 1, number: 2, used: true }
    ],
    bar: {
      pieces: [],
      selected: false
    },
    points: [
      { number: 1, pieces: [], selected: false },
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false },
      { number: 4, pieces: [], selected: false },
      { number: 5, pieces: [], selected: false },
      { number: 6, pieces: [{id: 3, playerNumber: 2}, {id: 4, playerNumber: 2}, {id: 5, playerNumber: 2}, {id: 6, playerNumber: 2}, {id: 7, playerNumber: 2}], selected: false },

      { number: 7, pieces: [], selected: false },
      { number: 8, pieces: [{id: 8, playerNumber: 2}, {id: 9, playerNumber: 2}, {id: 10, playerNumber: 2}], selected: false},
      { number: 9, pieces: [], selected: false },
      { number: 10, pieces: [], selected: false },
      { number: 11, pieces: [], selected: false },
      { number: 12, pieces: [], selected: false },

      { number: 13, pieces: [{id: 18, playerNumber: 2}, {id: 19, playerNumber: 2}, {id: 20, playerNumber: 2}], selected: false },
      { number: 14, pieces: [], selected: false },
      { number: 15, pieces: [], selected: false },
      { number: 16, pieces: [], selected: false },
      { number: 17, pieces: [], selected: false },
      { number: 18, pieces: [], selected: false },

      { number: 19, pieces: [ {id: 27, playerNumber: 1}, {id: 28, playerNumber: 1}], selected: false },
      { number: 20, pieces: [{id: 29, playerNumber: 2}, {id: 30, playerNumber: 2}], selected: false },
      { number: 21, pieces: [{id: 16, playerNumber: 2}, {id: 17, playerNumber: 2}], selected: false },
      { number: 22, pieces: [], selected: false },
      { number: 23, pieces: [], selected: false },
      { number: 24, pieces: [], selected: false },
    ],
    offBoard: {
      pieces: [
        {id: 1, playerNumber: 1},
        {id: 2, playerNumber: 1},
        {id: 11, playerNumber: 1},
        {id: 12, playerNumber: 1},
        {id: 13, playerNumber: 1},
        {id: 14, playerNumber: 1},
        {id: 15, playerNumber: 1},
        {id: 21, playerNumber: 1},
        {id: 22, playerNumber: 1},
        {id: 23, playerNumber: 1},
        {id: 24, playerNumber: 1},
        {id: 25, playerNumber: 1},
        {id: 26, playerNumber: 1}
      ],
      selected: false
    }
  },
  players: [
    { playerNumber: 1, name: 'Player', resigned: false },
    { playerNumber: 2, name: 'Computer', resigned: false }
  ],
  winner: null,
  moveList: [
    { fromId: 24, toId: 'offBoard' }
  ],
  lastAction: null,
  notification: 'Player to roll dice'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
