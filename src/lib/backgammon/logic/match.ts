import type Move from '$lib/backgammon/interfaces/Move';
import type Match from '$lib/backgammon/interfaces/Match';

import {
  winner as gameStateWinner,
  selectedPoint,
  roll,
  move,
  useDie,
  select,
  deselect,
  passTurn,
  stepPhase,
  clearDice
} from '$lib/backgammon/logic/gameState';
import {
  getRollResult,
} from '$lib/backgammon/logic/rollResult';
import {
  getPassResult,
} from '$lib/backgammon/logic/passResult';
import {
  getMoveResult,
  dieNumber,
  completeMoveList,
  details
} from '$lib/backgammon/logic/moveResult';

export const winner = function(match: Match): number | null {
  let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
  if (playerResigned) {
    return match.players.find(function(p) { return !p.resigned; })?.playerNumber || null;
  } else {
    return gameStateWinner(match.gameState);
  }
};

export const passable = function(match: Match, playerNumber: number): boolean {
  let result = getPassResult(match, playerNumber);
  return result.name === 'PassValid';
};

export const touchDice = function(match: Match, playerNumber: number): boolean {
  clearLastAction(match);

  let result = getRollResult(match, playerNumber);

  switch(result.name) {
    case 'RollValid':
      roll(match.gameState);
      stepPhase(match.gameState);
      addRollToLastAction(match);
      notify(match, result.message);
      return true;
    default:
      notify(match, result.message);
      return false;
  }
};

export const touchPoint = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  clearLastAction(match);

  let result = getMoveResult(match, playerNumber, touchedId);

  let fromPoint = selectedPoint(match.gameState);
  let number = dieNumber(match, playerNumber, touchedId);

  switch(result.name) {
    case 'MoveComplete':
      if (fromPoint !== undefined && number !== undefined) {
        if ("number" in fromPoint) {
          move(match.gameState, fromPoint.number, touchedId, playerNumber);
        } else {
          move(match.gameState, 'bar', touchedId, playerNumber);
        }
        // useDie(match.gameState, number); will be cleared
        clearDice(match.gameState);
        stepPhase(match.gameState);
        passTurn(match.gameState);
        addMoveToLastAction(match, completeMoveList(match, touchedId));
        clearMoveList(match);
        deselect(match.gameState);
        return true;
      } else {
        return false;
      }
    case 'MoveIncomplete':
      let moveDetails = details(match, touchedId)
      if (fromPoint !== undefined && number !== undefined && moveDetails !== undefined) {
        if ("number" in fromPoint) {
          move(match.gameState, fromPoint.number, touchedId, playerNumber);
        } else {
          move(match.gameState, 'bar', touchedId, playerNumber);
        }
        useDie(match.gameState, number);
        addMoveToList(match, moveDetails);
        deselect(match.gameState);
        notify(match, result.message);
        return false;
      } else {
        return false;
      }
    case 'MovePossible':
      select(match.gameState, touchedId);
      notify(match, result.message);
      return false;
    default:
      deselect(match.gameState);
      notify(match, result.message);
      return false;
  }
};

export const touchPass = function(match: Match, playerNumber: number): boolean {
  let result = getPassResult(match, playerNumber);
  switch(result.name) {
    case 'PassValid':
      passTurn(match.gameState);
      stepPhase(match.gameState);
      clearDice(match.gameState);
      addMoveToLastAction(match, match.moveList);
      clearMoveList(match);
      return true;
    default:
      notify(match, result.message);
      return false;
  }
};

export const addMoveToList = function(match: Match, move: Move): boolean {
  match.moveList.push(move);
  return true;
};

export const clearMoveList = function(match: Match): boolean {
  match.moveList = [];
  return true;
};

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
};

export const addRollToLastAction = function(match: Match): boolean {
  match.lastAction = {
    kind: 'roll',
    data: null
  };
  return true;
};

export const addMoveToLastAction = function(match: Match, moveList: Array<Move>): boolean {
  match.lastAction = {
    kind: 'move',
    data: {
      moveList: moveList
    }
  };
  return true;
};

export const clearLastAction = function(match: Match): boolean {
  match.lastAction = null;
  return true;
};
