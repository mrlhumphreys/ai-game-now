import exists from '../utils/exists'
import type GameState from '$lib/checkers/interfaces/GameState';

const checkersStateSerializer = function(state: GameState) {
  let player = state.currentPlayerNumber === 1 ? 'B' : 'W';

  let playerTwoPieces = state.squares.filter((s) => {
    return s.piece !== null && s.piece.playerNumber === 2;
  }).sort((a, b) => {
    return a.id - b.id;
  }).map((s) => {
    if (s.piece !== null && s.piece.king) {
      return `K${s.id}`;
    } else {
      return `${s.id}`;
    }
  }).join(',');

  let playerOnePieces = state.squares.filter((s) => {
    return s.piece !== null && s.piece.playerNumber === 1;
  }).sort((a, b) => {
    return a.id - b.id;
  }).map((s) => {
    if (s.piece !== null && s.piece.king) {
      return `K${s.id}`;
    } else {
      return `${s.id}`;
    }
  }).join(',');

  return `${player}:W${playerTwoPieces}:B${playerOnePieces}`;
}

export default checkersStateSerializer

