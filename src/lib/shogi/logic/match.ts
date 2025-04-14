import type Match from '$lib/shogi/interfaces/Match';

import {
  gameOver as gameStateGameOver,
  winner as gameStateWinner,
  selectedSquare,
  selectedPieceInHand,
  deselectPiece,
  selectPieceInHand,
  deselectPieceInHand,
  move,
  drop,
  promote,
  selectPiece,
  passTurn
} from '$lib/shogi/logic/gameState';
import {
  getMoveResult,
  winnerMessage
} from '$lib/shogi/logic/moveResult';
import {
  getPromoteResult
} from '$lib/shogi/logic/promoteResult';
import {
  getPickupResult
} from '$lib/shogi/logic/pickupResult';

export const winner = function(match: Match): number | null {
  if (match.promotion) {
    return null;
  } else {
    let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
    if (playerResigned) {
      return match.players.find(function(p) { return !p.resigned; })?.playerNumber || null;
    } else {
      return gameStateWinner(match.gameState);
    }
  }
};

export const gameOver = function(match: Match): boolean {
  return gameStateGameOver(match.gameState);
};

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: string) : boolean {
  let selected = selectedSquare(match.gameState);
  let selectedPiece = selectedPieceInHand(match.gameState);
  clearLastAction(match);

  let result = getMoveResult(match, playerNumber, touchedSquareId);
  let success = false;

  switch (result.name) {
    case 'MoveValid':
      if (selected !== undefined) {
        deselectPiece(match.gameState, selected.id);
        move(match.gameState, selected.id, touchedSquareId);
        passTurn(match.gameState);
        addMoveToLastAction(match, selected.id, touchedSquareId, false);
        success = true;
      }
      break;
    case 'DropValid':
      if (selectedPiece !== undefined) {
        deselectPieceInHand(match.gameState, selectedPiece.id);
        drop(match.gameState, selectedPiece.id, touchedSquareId);
        passTurn(match.gameState);
        addDropToLastAction(match, selectedPiece.id, touchedSquareId);
        success = true;
      }
      break;
    case 'PieceMovedToCompulsoryPromotionZone':
      if (selected !== undefined) {
        deselectPiece(match.gameState, selected.id);
        move(match.gameState, selected.id, touchedSquareId);
        promote(match.gameState, touchedSquareId);
        passTurn(match.gameState);
        addMoveToLastAction(match, selected.id, touchedSquareId, true);
        success = true;
      }
      break;
    case 'PieceMovedToPromotionZone':
      if (selected !== undefined) {
        move(match.gameState, selected.id, touchedSquareId);
        setupPromotion(match, selected.id, touchedSquareId);
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
    case 'OuInCheck':
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

export const touchPromotionOption = function(match: Match, playerNumber: number, promoteOption: boolean): boolean {
  let result = getPromoteResult(match, playerNumber);
  let success = false;

  switch (result.name) {
    case 'ValidPromotion':
      if (match.currentMove !== null) {
        deselectPiece(match.gameState, match.currentMove.toId);
        if (promoteOption) {
          promote(match.gameState, match.currentMove.toId);
        }
        passTurn(match.gameState);
        addMoveToLastAction(match, match.currentMove.fromId, match.currentMove.toId, promoteOption);
        teardownPromotion(match);
        success = true;
      }
      break;
    default:
      break;
  }

  notify(match, result.message);

  return success;
}

export const touchPieceInHand = function(match: Match, playerNumber: number, touchedPieceId: number): boolean {
  let result = getPickupResult(match, playerNumber, touchedPieceId);
  let success = false;

  switch(result.name) {
    case 'PieceSelected':
      selectPieceInHand(match.gameState, touchedPieceId);
      success = true;
      break;
    case 'PieceAlreadySelected':
      deselectPieceInHand(match.gameState, touchedPieceId);
      success = true;
      break;
    default:
      break;
  }

  notify(match, result.message);

  return success;
}

export const clearLastAction = function(match: Match): boolean {
  match.lastAction = null;
  return true;
};

export const addMoveToLastAction = function(match: Match, fromId: string, toId: string, promote: boolean): boolean {
  match.lastAction = { kind: 'move', data: { pieceId: null, fromId: fromId, toId: toId, promote: promote } };
  return true;
};

export const addDropToLastAction = function(match: Match, pieceId: number, toId: string): boolean {
  match.lastAction = { kind: 'drop', data: { pieceId: pieceId, fromId: null, toId: toId, promote: false } };
  return true;
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

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
};
