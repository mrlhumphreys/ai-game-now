import type Square from '$lib/chess/interfaces/Square';
import type Match from '$lib/chess/interfaces/Match';

import deepClone from '$lib/utils/deepClone';
import {
  canMove,
  canMoveFrom
} from '$lib/chess/logic/piece';
import {
  unoccupied,
  occupiedByPlayer
} from '$lib/chess/logic/square';
import {
  pawnMoveToLastRank as gameStatePawnMoveToLastRank,
  findSquare,
  selectedSquare as gameStateSelectedSquare,
  move,
  inCheck,
  playersTurn as gameStatePlayersTurn
} from '$lib/chess/logic/gameState';
import {
  winner
} from '$lib/chess/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getMoveResult = function(match: Match, playerNumber: number, touchedSquareId: string): Result {
  if (gameOver(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (selectedSquareExists(match)) {
    return selectedResult(match, playerNumber, touchedSquareId);
  } else {
    return unselectedResult(match, playerNumber, touchedSquareId);
  }
};

export const selectedResult = function(match: Match, playerNumber: number, touchedSquareId: string): Result {
  if (putsKingInCheck(match, playerNumber, touchedSquareId)) {
    return { name: 'KingInCheck', message: 'Move puts king in check.' };
  } else if (pawnMoveToLastRank(match, touchedSquareId)) {
    return { name: 'PawnMovesToLastRank', message: 'Pawn can promote.' };
  } else if (!moveValid(match, touchedSquareId)) {
    return { name: 'MoveInvalid', message: 'Piece cannot move.' };
  } else {
    return { name: 'MoveValid', message: '' };
  }
};

export const unselectedResult = function(match: Match, playerNumber: number, touchedSquareId: string): Result {
  if (!touchedSquareExists(match, touchedSquareId)) {
    return { name: 'SquareNotFound', message: 'Square does not exist.' };
  } else if (touchedSquareEmpty(match, touchedSquareId)) {
    return { name: 'EmptySquare', message: 'Square is empty.' };
  } else if (!touchedSquareOccupiedByPlayer(match, playerNumber, touchedSquareId)) {
    return { name: 'PieceOwnershipMismatch', message: 'Piece is owned by opponent.' };
  } else if (!movePossible(match, touchedSquareId)) {
    return { name: 'MoveImpossible', message: 'Piece cannot move.' };
  } else {
    return { name: 'MovePossible', message: '' };
  }
};

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};

export const selectedSquareExists = function(match: Match): boolean {
  return selectedSquare(match) !== undefined;
};

export const touchedSquareExists = function(match: Match, touchedSquareId: string): boolean {
  return touchedSquare(match, touchedSquareId) !== undefined;
};

export const touchedSquareEmpty = function(match: Match, touchedSquareId: string): boolean {
  let square = touchedSquare(match, touchedSquareId);
  if (square !== undefined) {
    return unoccupied(square);
  } else {
    return false;
  }
};

export const touchedSquareOccupiedByPlayer = function(match: Match, playerNumber: number, touchedSquareId: string): boolean {
  let square = touchedSquare(match, touchedSquareId);
  if (square !== undefined) {
    return occupiedByPlayer(square, playerNumber);
  } else {
    return false;
  }
};

export const moveValid = function(match: Match, touchedSquareId: string): boolean {
  let from = selectedSquare(match);
  let to = touchedSquare(match, touchedSquareId);
  if (from !== undefined && to !== undefined && from.piece !== null) {
    return canMove(from.piece, from, to, match.gameState);
  } else {
    return false;
  }
};

export const movePossible = function(match: Match, touchedSquareId: string): boolean {
  let square = touchedSquare(match, touchedSquareId);
  if (square !== undefined && square.piece !== null) {
    return canMoveFrom(square.piece, square, match.gameState);
  } else {
    return false;
  }
};

export const putsKingInCheck = function(match: Match, playerNumber: number, touchedSquareId: string): boolean {
  let newState = deepClone(match.gameState);
  let from = selectedSquare(match);
  let to = touchedSquare(match, touchedSquareId);
  if (from !== undefined && to !== undefined) {
    move(newState, from.id, to.id);
    return inCheck(newState, playerNumber);
  } else {
    return false;
  }
};

export const pawnMoveToLastRank = function(match: Match, touchedSquareId: string): boolean {
  let from = selectedSquare(match);
  let to = touchedSquare(match, touchedSquareId);
  if (from !== undefined && to !== undefined) {
    return gameStatePawnMoveToLastRank(match.gameState, from, to);
  } else {
    return false;
  }
};

export const touchedSquare = function(match: Match, touchedSquareId: string): Square | undefined {
  return findSquare(match.gameState, touchedSquareId);
};

export const selectedSquare = function(match: Match): Square | undefined {
  return gameStateSelectedSquare(match.gameState);
};

export const winnerMessage = function(match: Match): string {
  let winningPlayer = match.players.find((p) => {
    return p.playerNumber === winner(match);
  });

  if (winningPlayer !== undefined) {
    return `${winningPlayer.name} wins.`;
  } else {
    return '';
  }
};

