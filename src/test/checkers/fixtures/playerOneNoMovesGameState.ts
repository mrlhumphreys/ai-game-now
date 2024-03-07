import type GameState from '$lib/checkers/interfaces/GameState';
import deepClone from '$lib/utils/deepClone';

let gameState = {
  player_number: 1,
  squares: [
    { id: 1, x: 6, y: 7, piece: null },

    { id: 2, x: 4, y: 7, piece: null },
    { id: 3, x: 2, y: 7, piece: null },
    { id: 4, x: 0, y: 7, piece: null },

    { id: 5, x: 7, y: 6, piece: null },
    { id: 6, x: 5, y: 6, piece: null },
    { id: 7, x: 3, y: 6, piece: null },
    { id: 8, x: 1, y: 6, piece: null },

    { id: 9, x: 6, y: 5, piece: null },
    { id: 10, x: 4, y: 5, piece: null },
    { id: 11, x: 2, y: 5, piece: null },
    { id: 12, x: 0, y: 5, piece: null },

    { id: 13, x: 7, y: 4, piece: null },
    { id: 14, x: 5, y: 4, piece: null },
    { id: 15, x: 3, y: 4, piece: null },
    { id: 16, x: 1, y: 4, piece: null },

    { id: 17, x: 6, y: 3, piece: null },
    { id: 18, x: 4, y: 3, piece: null },
    { id: 19, x: 2, y: 3, piece: null },
    { id: 20, x: 0, y: 3, piece: null },

    { id: 21, x: 7, y: 2, piece: null },
    { id: 22, x: 5, y: 2, piece: null },
    { id: 23, x: 3, y: 2, piece: null },
    { id: 24, x: 1, y: 2, piece: null },

    { id: 25, x: 6, y: 1, piece: null },
    { id: 26, x: 4, y: 1, piece: null },
    { id: 27, x: 2, y: 1, piece: null },
    { id: 28, x: 0, y: 1, piece: { id: 3, king: false, player_number: 1, selected: false} },

    { id: 29, x: 7, y: 0, piece: { id: 20, king: false, player_number: 2, selected: false} },
    { id: 30, x: 5, y: 0, piece: { id: 21, king: false, player_number: 2, selected: false} },
    { id: 31, x: 3, y: 0, piece: { id: 22, king: false, player_number: 2, selected: false} },
    { id: 32, x: 1, y: 0, piece: { id: 23, king: false, player_number: 2, selected: false} }
  ]
};

const generateGameState = function(): GameState {
  return deepClone(gameState);
};

export default generateGameState;