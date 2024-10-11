import type Match from '$lib/go/interfaces/Match';

import exists from '$lib/utils/exists';
import {
  winner
} from '$lib/go/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getPassResult = function(match: Match, playerNumber: number): Result {
  if (exists(winner(match))) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (match.gameState.currentPlayerNumber !== playerNumber) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  return { name: 'PassValid', message: 'Player passes.' };
}

