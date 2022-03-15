import exists from '../utils/exists'

const checkersStateSerializer = function(state) {
  let board = state.squares.map((s) => {
    if (exists(s.piece)) {
      if (s.piece.player_number == 1) {
        if (s.piece.king) {
          return 'B';
        } else {
          return 'b';
        }
      } else if (s.piece.player_number == 2) {
        if (s.piece.king) {
          return 'W';
        } else {
          return 'w';
        }
      }
    } else {
      return '-';
    }
  }).join('');

  let player = state.current_player_number == 1 ? 'b' : 'w';

  return board + player;
}

export default checkersStateSerializer
