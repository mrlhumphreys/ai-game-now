import type Match from '$lib/chess/interfaces/Match';

import { 
  gameOver as gameStateGameOver,
  winner as gameStateWinner,
  selectedSquare,
  selectPiece,
  deselectPiece,
  move,
  passTurn,
  promote
} from '$lib/chess/logic/gameState';
import { 
  getMoveResult,
  winnerMessage
} from '$lib/chess/logic/moveResult';
import { 
  getPromoteResult
} from '$lib/chess/logic/promoteResult';

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

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: string): boolean {
  let selected = selectedSquare(match.gameState);
  clearLastAction(match);
  let result = getMoveResult(match, playerNumber, touchedSquareId);

  switch (result.name) {
    case 'MoveValid':
      deselectPiece(match.gameState);
      if (selected !== undefined) {
        move(match.gameState, selected.id, touchedSquareId);
        passTurn(match.gameState);
        addMoveToLastAction(match, selected.id, touchedSquareId, null);
      } else {
        return false;
      }
      break;
    case 'PawnMovesToLastRank':
      deselectPiece(match.gameState);
      if (selected !== undefined) {
        move(match.gameState, selected.id, touchedSquareId);
        setupPromotion(match, selected.id, touchedSquareId);
      } else {
        return false;
      }
      break;
    case 'MovePossible':
      selectPiece(match.gameState, touchedSquareId);
      break;
    case 'MoveInvalid':
      deselectPiece(match.gameState);
      break;
    case 'KingInCheck':
      deselectPiece(match.gameState);
      break;
    default:
      deselectPiece(match.gameState);
  }

  if (winner(match)) {
    notify(match, winnerMessage(match));
  } else {
    notify(match, result.message);
  }

  return true;
};

export const touchPromotionPiece = function(match: Match, playerNumber: number, pieceType: string): boolean {
  let result = getPromoteResult(match, playerNumber, pieceType);

  switch(result.name) {
    case 'ValidPromotion':
      if (match.currentMove !== null) {
        promote(match.gameState, match.currentMove.toId, pieceType);
        addMoveToLastAction(match, match.currentMove.fromId, match.currentMove.toId, pieceType);
        teardownPromotion(match);
        passTurn(match.gameState);
        return true;
      } else {
        notify(match, result.message);
        return false;
      }
    default:
      notify(match, result.message);
      return false;
  }
};

export const setupPromotion = function(match: Match, fromId: string, toId: string): boolean {
  match.currentMove = { fromId: fromId, toId: toId };
  match.promotion = true;
  return true;
};

export const teardownPromotion = function(match: Match): boolean {
  match.currentMove = null;
  match.promotion = false;
  return true;
};

export const addMoveToLastAction = function(match: Match, fromId: string, toId: string, pieceType: string | null): boolean {
  match.lastAction = {
    kind: 'move',
    data: {
      fromId: fromId,
      toId: toId,
      pieceType: pieceType
    }
  }
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
