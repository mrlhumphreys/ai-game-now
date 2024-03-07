import type Match from '$lib/chess/interfaces/Match';

import { 
  winner as gameStateWinner,
  selectedSquare,
  selectPiece,
  deselectPiece,
  move,
  passTurn,
  promote
} from '$lib/chess/logic/gameState';
import { 
  getMoveResult 
} from '$lib/chess/logic/moveResult';
import { 
  getPromoteResult
} from '$lib/chess/logic/promoteResult';

export const winner = function(match: Match): number | null {
  let playerResigned = match.players.filter(function(p) { return p.resigned; }).length > 0;
  if (playerResigned) {
    return match.players.find(function(p) { return !p.resigned; })?.player_number || null;
  } else {
    return gameStateWinner(match.game_state);
  }
};

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: string): boolean {
  let selected = selectedSquare(match.game_state);
  clearLastAction(match);
  let result = getMoveResult(match, playerNumber, touchedSquareId);

  switch (result.name) {
    case 'MoveValid':
      deselectPiece(match.game_state);
      if (selected !== undefined) {
        move(match.game_state, selected.id, touchedSquareId);
        passTurn(match.game_state);
        addMoveToLastAction(match, selected.id, touchedSquareId, null);
        return true;
      } else {
        return false;
      }
    case 'PawnMovesToLastRank':
      deselectPiece(match.game_state);
      if (selected !== undefined) {
        move(match.game_state, selected.id, touchedSquareId);
        setupPromotion(match, selected.id, touchedSquareId);
        return true;
      } else {
        return false;
      }
    case 'MovePossible':
      selectPiece(match.game_state, touchedSquareId);
      return true;
    case 'MoveInvalid':
      deselectPiece(match.game_state);
      notify(match, result.message);
      return false;
    case 'KingInCheck':
      deselectPiece(match.game_state);
      notify(match, result.message);
      return false;
    default:
      deselectPiece(match.game_state);
      notify(match, result.message);
      return false;
  }
};

export const touchPromotionPiece = function(match: Match, playerNumber: number, pieceType: string): boolean {
  let result = getPromoteResult(match, playerNumber, pieceType);

  switch(result.name) {
    case 'ValidPromotion':
      if (match.current_move !== null) {
        promote(match.game_state, match.current_move.toId, pieceType);
        addMoveToLastAction(match, match.current_move.fromId, match.current_move.toId, pieceType);
        teardownPromotion(match);
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
  match.current_move = { fromId: fromId, toId: toId };
  match.promotion = true;
  return true;
};

export const teardownPromotion = function(match: Match): boolean {
  match.current_move = null;
  match.promotion = false;
  return true;
};

export const addMoveToLastAction = function(match: Match, fromId: string, toId: string, pieceType: string | null): boolean {
  match.last_action = {
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
  match.last_action = null;
  return true;
};

export const notify = function(match: Match, message: string): boolean {
  match.notification = message;
  return true;
};
