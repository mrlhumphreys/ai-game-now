import type Match from '$lib/checkers/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  gameState: {
    currentPlayerNumber: 1,
    squares: [
      { id: 1, x: 6, y: 7, marked: false, piece: { id: 0, king: false, playerNumber: 1, selected: false} },
  
      { id: 2, x: 4, y: 7, marked: false, piece: { id: 1, king: false, playerNumber: 1, selected: false} },
      { id: 3, x: 2, y: 7, marked: false, piece: { id: 2, king: false, playerNumber: 1, selected: false} },
      { id: 4, x: 0, y: 7, marked: false, piece: { id: 3, king: false, playerNumber: 1, selected: false} },
  
      { id: 5, x: 7, y: 6, marked: false, piece: { id: 4, king: false, playerNumber: 1, selected: false} },
      { id: 6, x: 5, y: 6, marked: false, piece: { id: 5, king: false, playerNumber: 1, selected: false} },
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, playerNumber: 1, selected: true} },
      { id: 8, x: 1, y: 6, marked: false, piece: { id: 7, king: false, playerNumber: 1, selected: false} },
  
      { id: 9, x: 6, y: 5, marked: false, piece: null },
      { id: 10, x: 4, y: 5, marked: false, piece: { id: 16, king: false, playerNumber: 2, selected: false } },
      { id: 11, x: 2, y: 5, marked: false, piece: null },
      { id: 12, x: 0, y: 5, marked: false, piece: null },
  
      { id: 13, x: 7, y: 4, marked: false, piece: null },
      { id: 14, x: 5, y: 4, marked: false, piece: null },
      { id: 15, x: 3, y: 4, marked: false, piece: null },
      { id: 16, x: 1, y: 4, marked: false, piece: null },
  
      { id: 17, x: 6, y: 3, marked: false, piece: null },
      { id: 18, x: 4, y: 3, marked: false, piece: { id: 17, king: false, playerNumber: 2, selected: false } },
      { id: 19, x: 2, y: 3, marked: false, piece: null },
      { id: 20, x: 0, y: 3, marked: false, piece: null },
  
      { id: 21, x: 7, y: 2, marked: false, piece: null },
      { id: 22, x: 5, y: 2, marked: false, piece: null },
      { id: 23, x: 3, y: 2, marked: false, piece: null },
      { id: 24, x: 1, y: 2, marked: false, piece: null },
  
      { id: 25, x: 6, y: 1, marked: false, piece: { id: 16, king: false, playerNumber: 2, selected: false} },
      { id: 26, x: 4, y: 1, marked: false, piece: { id: 17, king: false, playerNumber: 2, selected: false} },
      { id: 27, x: 2, y: 1, marked: false, piece: { id: 18, king: false, playerNumber: 2, selected: false} },
      { id: 28, x: 0, y: 1, marked: false, piece: { id: 19, king: false, playerNumber: 2, selected: false} },
  
      { id: 29, x: 7, y: 0, marked: false, piece: { id: 20, king: false, playerNumber: 2, selected: false} },
      { id: 30, x: 5, y: 0, marked: false, piece: { id: 21, king: false, playerNumber: 2, selected: false} },
      { id: 31, x: 3, y: 0, marked: false, piece: { id: 22, king: false, playerNumber: 2, selected: false} },
      { id: 32, x: 1, y: 0, marked: false, piece: { id: 23, king: false, playerNumber: 2, selected: false} }
    ]
  },
  players: [
    { playerNumber: 1, name: 'Player', resigned: false },
    { playerNumber: 2, name: 'Computer', resigned: false }
  ],
  winner: null,
  currentMoveFromId: 7,
  currentMoveToIds: [],
  lastAction: null,
  notification: 'Player to move'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
