import type Match from '$lib/shogi/interfaces/Match';

import {
  playersTurn as gameStatePlayersTurn
} from '$lib/shogi/logic/gameState';
import {
  winner,
} from '$lib/shogi/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getPromoteResult = function(match: Match, playerNumber: number): Result {
  if (gameOver(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (!match.promotion) {
    return { name: 'NoPieceToPromote', message: 'There is no piece to promote.' };
  }

  return { name: 'ValidPromotion', message: '' };
}

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};
