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
    return match.players.find(function(p) { return !p.resigned; })?.player_number || null;
  } else {
    return gameStateWinner(match.game_state);
  }
};

export const touchSquare = function(match: Match, playerNumber: number, touchedSquareId: number): boolean {
  clearLastAction(match);
  let result = getMoveResult(match, playerNumber, touchedSquareId);

  switch(result.name) {
    case 'MoveInvalid':
      clearMove(match);
      deselectSquares(match.game_state);
      notify(match, result.message);
      break;
    case 'MoveIncomplete':
      markSquare(match.game_state, touchedSquareId);
      addToToCurrentMove(match, touchedSquareId);
      notify(match, result.message);
      break;
    case 'MoveComplete':
      let fromId = match.current_move_from_id;
      if (fromId !== null) {
        let toIds = match.current_move_to_ids.concat([touchedSquareId]);
        move(match.game_state, fromId, toIds);
        addMoveToLastAction(match, fromId, toIds);
        clearMove(match);
        if (winner(match)) {
          notify(match, winnerMessage(match));
        } else {
          notify(match, result.message);
        }
      } else {
        return false;
      }
      break;
    case 'MovePossible':
      selectSquare(match.game_state, touchedSquareId);
      addFromToCurrentMove(match, touchedSquareId);
      break;
    default:
      clearMove(match);
      notify(match, result.message);
  }

  return true;
};

export const addFromToCurrentMove = function(match: Match, squareId: number): boolean {
  match.current_move_from_id = squareId;
  return true;
};

export const addToToCurrentMove = function(match: Match, squareId: number): boolean {
  match.current_move_to_ids.push(squareId);
  return true;
};

export const clearMove = function(match: Match): boolean {
  match.current_move_from_id = null;
  match.current_move_to_ids = [];
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

export const addMoveToLastAction = function(match: Match, fromId: number | null, toIds: Array<number>): boolean {
  match.last_action = {
    kind: 'move',
    data: {
      fromId: fromId,
      toIds: toIds
    }
  };
  return true;
};

