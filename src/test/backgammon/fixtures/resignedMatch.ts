import type Match from '$lib/backgammon/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  game_state: {
    current_player_number: 1,
    current_phase: 'roll',
    first_turn: true,
    dice: [
      { id: 0, number: null, used: false },
      { id: 1, number: null, used: false }
    ],
    bar: {
      pieces: [],
      selected: false
    },
    points: [
      { number: 1, pieces: [{id: 1, player_number: 1}, {id: 2, player_number: 1}], selected: false },
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false },
      { number: 4, pieces: [], selected: false },
      { number: 5, pieces: [], selected: false },
      { number: 6, pieces: [{id: 3, player_number: 2}, {id: 4, player_number: 2}, {id: 5, player_number: 2}, {id: 6, player_number: 2}, {id: 7, player_number: 2}], selected: false },

      { number: 7, pieces: [], selected: false },
      { number: 8, pieces: [{id: 8, player_number: 2}, {id: 9, player_number: 2}, {id: 10, player_number: 2}], selected: false},
      { number: 9, pieces: [], selected: false },
      { number: 10, pieces: [], selected: false },
      { number: 11, pieces: [], selected: false },
      { number: 12, pieces: [{id: 11, player_number: 1}, {id: 12, player_number: 1}, {id: 13, player_number: 1}, {id: 14, player_number: 1}, {id: 15, player_number: 1}], selected: false },

      { number: 13, pieces: [{id: 16, player_number: 2}, {id: 17, player_number: 2}, {id: 18, player_number: 2}, {id: 19, player_number: 2}, {id: 20, player_number: 2}], selected: false },
      { number: 14, pieces: [], selected: false },
      { number: 15, pieces: [], selected: false },
      { number: 16, pieces: [], selected: false },
      { number: 17, pieces: [{id: 21, player_number: 1}, {id: 22, player_number: 1}, {id: 23, player_number: 1}], selected: false },
      { number: 18, pieces: [], selected: false },

      { number: 19, pieces: [{id: 24, player_number: 1}, {id: 25, player_number: 1}, {id: 26, player_number: 1}, {id: 27, player_number: 1}, {id: 28, player_number: 1}], selected: false },
      { number: 20, pieces: [], selected: false },
      { number: 21, pieces: [], selected: false },
      { number: 22, pieces: [], selected: false },
      { number: 23, pieces: [], selected: false },
      { number: 24, pieces: [{id: 29, player_number: 2}, {id: 30, player_number: 2}], selected: false },
    ],
    off_board: {
      pieces: [],
      selected: false
    }
  },
  players: [
    { player_number: 1, name: 'Player', resigned: true },
    { player_number: 2, name: 'Computer', resigned: false }
  ],
  winner: null,
  move_list: [],
  last_action: null,
  notification: 'Player to roll dice'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
