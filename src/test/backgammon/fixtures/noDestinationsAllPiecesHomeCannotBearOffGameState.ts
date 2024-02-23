import type GameState from '$lib/backgammon/interfaces/GameState';
import deepClone from '$lib/utils/deepClone';

let gameState = {
  current_player_number: 1,
  current_phase: 'move',
  first_turn: true,
  dice: [
    { id: 0, number: 3, used: false },
    { id: 1, number: 4, used: false }
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
    { number: 6, pieces: [{id: 3, player_number: 2}, {id: 4, player_number: 2}, {id: 5, player_number: 2}, {id: 6, player_number: 2}, {id: 7, player_number: 2}], selected: false },

    { number: 7, pieces: [], selected: false },
    { number: 8, pieces: [ {id: 9, player_number: 2}, {id: 10, player_number: 2}], selected: false},
    { number: 9, pieces: [], selected: false },
    { number: 10, pieces: [], selected: false },
    { number: 11, pieces: [  ], selected: false },
    { number: 12, pieces: [  ], selected: false },

    { number: 13, pieces: [  ], selected: false },
    { number: 14, pieces: [  ], selected: false },
    { number: 15, pieces: [ ], selected: false },
    { number: 16, pieces: [ ], selected: false },
    { number: 17, pieces: [ {id: 20, player_number: 2}, {id: 8, player_number: 2} ], selected: false },
    { number: 18, pieces: [ {id: 18, player_number: 2}, {id: 19, player_number: 2} ], selected: false },

    { number: 19, pieces: [ ], selected: false },
    { number: 20, pieces: [ {id: 24, player_number: 1}, {id: 25, player_number: 1} ], selected: false },
    { number: 21, pieces: [], selected: false },
    { number: 22, pieces: [], selected: false },
    { number: 23, pieces: [ {id: 16, player_number: 2}, {id: 17, player_number: 2} ], selected: false },
    { number: 24, pieces: [ {id: 29, player_number: 2}, {id: 30, player_number: 2} ], selected: false },
  ],
  off_board: {
    pieces: [
      {id: 11, player_number: 1}, 
      {id: 12, player_number: 1}, 
      {id: 13, player_number: 1}, 
      {id: 14, player_number: 1}, 
      {id: 15, player_number: 1},
      {id: 23, player_number: 1},
      {id: 1, player_number: 1}, 
      {id: 2, player_number: 1},
      {id: 21, player_number: 1}, 
      {id: 22, player_number: 1}
    ],
    selected: false
  }
};

const generateGameState = function(): GameState {
  return deepClone(gameState);
};

export default generateGameState;
