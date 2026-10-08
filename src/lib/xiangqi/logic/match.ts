import type Match from '#lib/xiangqi/interfaces/Match';

import {
  gameOver as gameStateGameOver,
  winner as gameStateWinner,
  selectedSquare,
  deselectPiece,
  move,
  selectPiece,
  passTurn
} from '#lib/xiangqi/logic/gameState';
import {
  getMoveResult,
  winnerMessage
} from '#lib/xiangqi/logic/moveResult';

export const winner = function(match: Match): number | null {
  let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
  if (playerResigned) {
    return match.players.find(function(p) { return !p.resigned; })?.playerNumber || null;
  } else {
    return gameStateWinner(match.gameState);
  }
};

export const gameOver = function(match: Match): boolean {
  return gameStateGameOver(match.gameState);
};

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: string) : boolean {
  let selected = selectedSquare(match.gameState);
  clearLastAction(match);

  let result = getMoveResult(match, playerNumber, touchedSquareId);
  let success = false;

  switch (result.name) {
    case 'MoveValid':
      if (selected !== undefined) {
        deselectPiece(match.gameState, selected.id);
        move(match.gameState, selected.id, touchedSquareId);
        passTurn(match.gameState);
        addMoveToLastAction(match, selected.id, touchedSquareId);
        success = true;
      }
      break;
    case 'MovePossible':
      selectPiece(match.gameState, touchedSquareId);
      success = true;
      break;
    case 'MoveInvalid':
      if (selected !== undefined) {
        deselectPiece(match.gameState, selected.id);
      }
      break;
    case 'KingInCheck':
      if (selected !== undefined) {
        deselectPiece(match.gameState, selected.id);
      }
      break;
    default:
      break;
  }

  if (winner(match)) {
    notify(match, winnerMessage(match));
  } else {
    notify(match, result.message);
  }

  return success;
};

export const clearLastAction = function(match: Match): boolean {
  match.lastAction = null;
  return true;
};

export const addMoveToLastAction = function(match: Match, fromId: string, toId: string): boolean {
  match.lastAction = { kind: 'move', data: { fromId: fromId, toId: toId } };
  return true;
};

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
};
