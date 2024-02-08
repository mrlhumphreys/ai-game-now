import type Piece from '$lib/checkers/interfaces/Piece';
import type Square from '$lib/checkers/interfaces/Square';
import type Match from '$lib/checkers/interfaces/Match';

import eachCons from '$lib/utils/eachCons';
import { distance } from '$lib/checkers/logic/vector';
import { 
  selectable, 
  point, 
  possibleJumps,
  actionable
} from '$lib/checkers/logic/square';
import { difference } from '$lib/checkers/logic/squareSet';
import { 
  playersTurn,
  selectedSquare,
  findSquareById,
  filterSquaresByIds
} from '$lib/checkers/logic/gameState';
import { winner } from '$lib/checkers/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getMoveResult = function(match: Match, playerNumber: number, touchedSquareId: number): Result {
  if (gameOver(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (notPlayersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (isSquareSelected(match)) {
    if (moveValid(match, touchedSquareId)) {
      if (moveComplete(match, touchedSquareId)) {
        return { name: 'MoveComplete', message: defaultMessage(match) };  
      } else {
        return { name: 'MoveIncomplete', message: 'Piece can still jump.' };  
      }
    } else {
      return { name: 'MoveInvalid', message: 'Move is invalid.' };  
    }
  } else {
    if (emptySquare(match, touchedSquareId)) {
      return { name: 'EmptySquare', message: 'That square is empty.' };  
    }

    if (notPlayersPiece(match, playerNumber, touchedSquareId)) {
      return { name: 'NotPlayersPiece', message: 'That piece is not yours.' };  
    }

    if (movePossible(match, touchedSquareId)) {
      return { name: 'MovePossible', message: '' };  
    } else {
      return { name: 'MoveImpossible', message: 'That piece cannot move.' };  
    }
  }
};

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const notPlayersTurn = function(match: Match, playerNumber: number): boolean {
  return !playersTurn(match.game_state, playerNumber);  
};

export const isSquareSelected = function(match: Match): boolean {
  return selectedSquare(match.game_state) !== undefined; 
};

export const getTouchedSquare = function(match: Match, touchedSquareId: number): Square | undefined {
  return findSquareById(match.game_state, touchedSquareId);
};

export const movePossible = function(match: Match, touchedSquareId: number): boolean {
  let square = getTouchedSquare(match, touchedSquareId);
  if (square !== undefined) {
    return selectable(square, match.game_state.squares);
  } else {
    return false;
  }
};

export const notPlayersPiece = function(match: Match, playerNumber: number, touchedSquareId: number): boolean {
  let square = getTouchedSquare(match, touchedSquareId);
  if (square !== undefined && square.piece !== null) {
    return square.piece.player_number !== playerNumber;
  } else {
    return false;
  }
};

export const emptySquare = function(match: Match, touchedSquareId: number): boolean {
  let square = getTouchedSquare(match, touchedSquareId);
  if (square !== undefined) {
    return (square.piece === null);
  } else {
    return true;
  }
};

export const moveComplete = function(match: Match, touchedSquareId: number): boolean {
  let fromSquare = getFrom(match);
  let touchedSquare = getTouchedSquare(match, touchedSquareId);
  if (fromSquare !== undefined && fromSquare.piece !== null && touchedSquare !== undefined) {
    let toSquares = getTos(match);
    let legs = getLegs(fromSquare, toSquares, touchedSquare); 
    let lastLeg = getLastLeg(legs);

    return (moveType(lastLeg) || jumpType(lastLeg) && lastLegEnd(match, fromSquare.piece, touchedSquare, toSquares));
  } else {
    return false;
  }
};

export const moveValid = function(match: Match, touchedSquareId: number): boolean {
  let fromSquare = getFrom(match);
  let toSquares = getTos(match);
  let touchedSquare = getTouchedSquare(match, touchedSquareId);
  if (fromSquare !== undefined && touchedSquare !== undefined) {
    let legs = getLegs(fromSquare, toSquares, touchedSquare); 
    return eachCons(legs, 2).every((leg) => {
      if (fromSquare !== undefined && fromSquare.piece !== null) {
        return actionable(leg[0], fromSquare.piece, leg[1], match.game_state.squares);
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

export const getFrom = function(match: Match): Square | undefined {
  if (match.current_move_from_id !== null) {
    return findSquareById(match.game_state, match.current_move_from_id);
  } else {
    return undefined;
  }
};

export const getTos = function(match: Match): Array<Square> {
  return filterSquaresByIds(match.game_state, match.current_move_to_ids);
};

export const lastLegEnd = function(match: Match, piece: Piece, lastSquare: Square, toSquares: Array<Square>): boolean {
  let jumps = possibleJumps(lastSquare, piece, match.game_state.squares);
  let withoutToSquares = difference(jumps, toSquares); 
  return withoutToSquares.length === 0;
};

export const getLegs = function(fromSquare: Square, toSquares: Array<Square>, touchedSquare: Square): Array<Square> {
  return [fromSquare].concat(toSquares).concat([touchedSquare]);
};

export const getLastLeg = function(legs: Array<Square>): Array<Square> {
  return legs.slice(-2);
};

export const moveType = function(leg: Array<Square>): boolean {
  if (leg[0] !== undefined && leg[1] !== undefined) {
    return distance(point(leg[0]), point(leg[1])) === 1;
  } else {
    return false;
  }
};

export const jumpType = function(leg: Array<Square>): boolean {
  if (leg[0] !== undefined && leg[1] !== undefined) {
    return distance(point(leg[0]), point(leg[1])) === 2;
  } else {
    return false;
  }
};

export const defaultMessage = function(match: Match): string {
  if (winner(match)) {
    return winnerMessage(match);
  } else {
    return nextTurnMessage(match);
  }
};

export const nextTurnMessage = function(match: Match): string {
  let nextPlayer = match.players.find((p) => {
    return p.player_number !== match.game_state.current_player_number;
  });

  if (nextPlayer !== undefined) {
    return `${nextPlayer.name} to move.`;
  } else {
    return '';
  }
};

export const winnerMessage = function(match: Match): string {
  let winningPlayer = match.players.find((p) => {
    return p.player_number === winner(match);
  });

  if (winningPlayer !== undefined) {
    return `${winningPlayer.name} wins.`;
  } else {
    return '';
  }
};

