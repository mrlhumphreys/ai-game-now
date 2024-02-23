import type Match from '$lib/backgammon/interfaces/Match';

interface Result {
  name: string;
  message: string;
}

import {
  unused 
} from '$lib/backgammon/logic/diceSet';
import {
  playersTurn as gameStatePlayersTurn ,
  rollPhase as gameStateRollPhase,
  noMovesForPlayer
} from '$lib/backgammon/logic/gameState';
import {
  winner as matchWinner
} from '$lib/backgammon/logic/match';

export const getPassResult = function(match: Match, playerNumber: number): Result {
  if (winner(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (rollPhase(match)) {
    return { name: 'RollPhase', message: 'Dice must be rolled first.' };
  }

  if (movesAvailable(match, playerNumber)) {
    return { name: 'MovesAvailable', message: 'A move can still be made.' };
  }

  if (allDiceUsed(match)) {
    return { name: 'AllDiceUsed', message: 'All dice have been used.' };
  }

  return { name: 'PassValid', message: '' };
}

export const winner = function(match: Match): boolean {
  return matchWinner(match) !== null;
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.game_state, playerNumber);
};

export const rollPhase = function(match: Match): boolean {
  return gameStateRollPhase(match.game_state); 
};

export const movesAvailable = function(match: Match, playerNumber: number): boolean {
  return !noMovesForPlayer(match.game_state, playerNumber); 
};

export const allDiceUsed = function(match: Match): boolean {
  return unused(match.game_state.dice).length === 0;
}
