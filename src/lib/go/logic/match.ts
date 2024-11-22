import type Match from '$lib/go/interfaces/Match';

import {
  gameOver as gameStateGameOver,
  winner as gameStateWinner,
  move,
  pass,
  playerScore as gameStatePlayerScore
} from '$lib/go/logic/gameState';
import {
  getMoveResult,
  winnerMessage
} from '$lib/go/logic/moveResult';
import {
  getPassResult
} from '$lib/go/logic/passResult';

export const winner = function(match: Match): number | null {
  let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
  if (playerResigned) {
    return match.players.find(function(p) { return !p.resigned; })?.playerNumber || null;
  } else {
    return gameStateWinner(match.gameState);
  }
};

export const playerScore = function(match: Match, playerNumber: number): number | null {
  if (winner(match) !== null) {
    return gameStatePlayerScore(match.gameState, playerNumber);
  } else {
    return null;
  }
};

export const gameOver = function(match: Match): boolean {
  return winner(match) !== null;
};

export const canPass = function(match: Match, playerNumber: number): boolean {
  let playerStat = match.gameState.playerStats.find(function(ps) { return ps.playerNumber === playerNumber; });
  if (playerStat !== undefined) {
    return !playerStat.passed;
  } else {
    return false;
  }
};

export const touchPoint = function(match: Match, playerNumber: number, pointId: string): boolean {
  clearLastAction(match);

  let result = getMoveResult(match, playerNumber, pointId);

  switch (result.name) {
    case 'MoveValid':
      move(match.gameState, playerNumber, pointId);
      addMoveToLastAction(match, pointId);
      if (winner(match)) {
        notify(match, winnerMessage(match));
      } else {
        notify(match, result.message);
      }
      return true;
    default:
      notify(match, result.message);
      return false;
  }
}

export const touchPass = function(match: Match, playerNumber: number): boolean {
  clearLastAction(match);

  let result = getPassResult(match, playerNumber);

  switch (result.name) {
    case 'PassValid':
      pass(match.gameState, playerNumber);
      addPassToLastAction(match);
      if (winner(match)) {
        notify(match, winnerMessage(match));
      } else {
        notify(match, result.message);
      }
      return true;
    default:
      notify(match, result.message);
      return false;
  }
}

export const clearLastAction = function(match: Match): boolean {
  match.lastAction = null;
  return true;
}

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
}

export const addMoveToLastAction = function(match: Match, pointId: string): boolean {
  match.lastAction = { kind: 'move', data: { pointId: pointId } };
  return true;
}

export const addPassToLastAction = function(match: Match): boolean {
  match.lastAction = { kind: 'pass', data: null };
  return true;
}

