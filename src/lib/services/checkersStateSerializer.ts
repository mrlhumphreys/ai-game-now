import exists from '../utils/exists'
import type GameState from '$lib/checkers/interfaces/GameState';

const checkersStateSerializer = function(state: GameState) {
  let board = state.squares.map((s) => {
    if (exists(s.piece)) {
      let playerNumber = s.piece?.playerNumber;
      let king = s.piece?.king;
      if (playerNumber === 1) {
        if (king) {
          return 'B';
        } else {
          return 'b';
        }
      } else {
        if (king) {
          return 'W';
        } else {
          return 'w';
        }
      }
    } else {
      return '-';
    }
  }).join('');

  let player = state.currentPlayerNumber === 1 ? 'b' : 'w';

  return board + player;
}

export default checkersStateSerializer

