import type Match from '$lib/checkers/interfaces/Match';

import { 
  winner as gameStateWinner,
  deselectSquares,
  markSquare,
  move,
  selectSquare
} from '$lib/checkers/logic/gameState';
import { getMoveResult, winnerMessage } from '$lib/checkers/logic/moveResult';

export const winner = function(match: Match): number | null {
  let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
  if (playerResigned) {
    return match.players.find(function(p) { return !p.resigned; })?.playerNumber || null;
  } else {
    return gameStateWinner(match.gameState);
  }
};

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: number): boolean {
  clearLastAction(match);
  let result = getMoveResult(match, playerNumber, touchedSquareId);

  switch(result.name) {
    case 'MoveInvalid':
      clearMove(match);
      deselectSquares(match.gameState);
      break;
    case 'MoveIncomplete':
      markSquare(match.gameState, touchedSquareId);
      addToToCurrentMove(match, touchedSquareId);
      break;
    case 'MoveComplete':
      let fromId = match.currentMoveFromId;
      if (fromId !== null) {
        let toIds = match.currentMoveToIds.concat([touchedSquareId]);
        move(match.gameState, fromId, toIds);
        addMoveToLastAction(match, fromId, toIds);
        clearMove(match);
      } else {
        return false;
      }
      break;
    case 'MovePossible':
      selectSquare(match.gameState, touchedSquareId);
      addFromToCurrentMove(match, touchedSquareId);
      break;
    default:
      clearMove(match);
  }

  if (winner(match)) {
    notify(match, winnerMessage(match));
  } else {
    notify(match, result.message);
  }

  return true;
};

export const addFromToCurrentMove = function(match: Match, squareId: number): boolean {
  match.currentMoveFromId = squareId;
  return true;
};

export const addToToCurrentMove = function(match: Match, squareId: number): boolean {
  match.currentMoveToIds.push(squareId);
  return true;
};

export const clearMove = function(match: Match): boolean {
  match.currentMoveFromId = null;
  match.currentMoveToIds = [];
  return true;
};

export const clearLastAction = function(match: Match): boolean {
  match.lastAction = null;
  return true;
};

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
};

export const addMoveToLastAction = function(match: Match, fromId: number | null, toIds: Array<number>): boolean {
  match.lastAction = {
    kind: 'move',
    data: {
      fromId: fromId,
      toIds: toIds
    }
  };
  return true;
};

