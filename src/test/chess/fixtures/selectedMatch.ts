import type Match from '$lib/chess/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  game_state: {
    current_player_number: 1,
    last_double_step_pawn_id: null,
    squares: [
      { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook', has_moved: false, selected: false } },
      { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight', has_moved: false, selected: false } },
      { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop', has_moved: false, selected: false } },
      { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen', has_moved: false, selected: false } },
      { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king', has_moved: false, selected: false } },
      { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop', has_moved: false, selected: false } },
      { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight', has_moved: false, selected: false } },
      { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook', has_moved: false, selected: false } },

      { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn', has_moved: false, selected: false } },
      { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn', has_moved: false, selected: false } },

      { id: 'a6', x: 0, y: 2, piece: null },
      { id: 'b6', x: 1, y: 2, piece: null },
      { id: 'c6', x: 2, y: 2, piece: null },
      { id: 'd6', x: 3, y: 2, piece: null },
      { id: 'e6', x: 4, y: 2, piece: null },
      { id: 'f6', x: 5, y: 2, piece: null },
      { id: 'g6', x: 6, y: 2, piece: null },
      { id: 'h6', x: 7, y: 2, piece: null },

      { id: 'a5', x: 0, y: 3, piece: null },
      { id: 'b5', x: 1, y: 3, piece: null },
      { id: 'c5', x: 2, y: 3, piece: null },
      { id: 'd5', x: 3, y: 3, piece: null },
      { id: 'e5', x: 4, y: 3, piece: null },
      { id: 'f5', x: 5, y: 3, piece: null },
      { id: 'g5', x: 6, y: 3, piece: null },
      { id: 'h5', x: 7, y: 3, piece: null },

      { id: 'a4', x: 0, y: 4, piece: null },
      { id: 'b4', x: 1, y: 4, piece: null },
      { id: 'c4', x: 2, y: 4, piece: null },
      { id: 'd4', x: 3, y: 4, piece: null },
      { id: 'e4', x: 4, y: 4, piece: null },
      { id: 'f4', x: 5, y: 4, piece: null },
      { id: 'g4', x: 6, y: 4, piece: null },
      { id: 'h4', x: 7, y: 4, piece: null },

      { id: 'a3', x: 0, y: 5, piece: null },
      { id: 'b3', x: 1, y: 5, piece: null },
      { id: 'c3', x: 2, y: 5, piece: null },
      { id: 'd3', x: 3, y: 5, piece: null },
      { id: 'e3', x: 4, y: 5, piece: null },
      { id: 'f3', x: 5, y: 5, piece: null },
      { id: 'g3', x: 6, y: 5, piece: null },
      { id: 'h3', x: 7, y: 5, piece: null },

      { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn', has_moved: false, selected: true } },
      { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn', has_moved: false, selected: false } },
      { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn', has_moved: false, selected: false } },

      { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook', has_moved: false, selected: false } },
      { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight', has_moved: false, selected: false } },
      { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop', has_moved: false, selected: false } },
      { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen', has_moved: false, selected: false } },
      { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king', has_moved: false, selected: false } },
      { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop', has_moved: false, selected: false } },
      { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight', has_moved: false, selected: false } },
      { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook', has_moved: false, selected: false } }
    ]
  },
  players: [
    { player_number: 1, name: 'Player', resigned: false },
    { player_number: 2, name: 'Computer', resigned: false }
  ],
  winner: null,
  current_move: null,
  promotion: false,
  last_action: null,
  notification: 'Player to move'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
