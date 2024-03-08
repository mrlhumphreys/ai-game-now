import type Match from '$lib/backgammon/interfaces/Match';

interface Result {
  name: string;
  message: string;
}

import {
  playersTurn as gameStatePlayersTurn ,
  movePhase as gameStateMovePhase
} from '$lib/backgammon/logic/gameState';
import {
  winner as matchWinner
} from '$lib/backgammon/logic/match';

export const getRollResult = function(match: Match, playerNumber: number): Result {
  if (winner(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (movePhase(match)) {
    return { name: 'MovePhase', message: 'Dice have already been rolled.' };
  }

  return { name: 'RollValid', message: 'Dice have been rolled.' };
};

export const winner = function(match: Match): boolean {
  return matchWinner(match) !== null;
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};

export const movePhase = function(match: Match): boolean {
  return gameStateMovePhase(match.gameState);
};
