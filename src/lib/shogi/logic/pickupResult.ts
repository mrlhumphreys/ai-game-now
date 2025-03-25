import type Piece from '$lib/shogi/interfaces/Piece';
import type Match from '$lib/shogi/interfaces/Match';

import {
  findPieceInHand,
  selectedPieceInHand as gameStateSelectedPieceInHand,
  playersTurn as gameStatePlayersTurn
} from '$lib/shogi/logic/gameState';
import {
  winner,
} from '$lib/shogi/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getPickupResult = function(match: Match, playerNumber: number, touchedPieceId: number): Result {
  if (gameOver(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (selectedPieceInHandExists(match)) {
    return { name: 'PieceAlreadySelected', message: '' };
  } else if (pieceNotFound(match, touchedPieceId)) {
    return { name: 'PieceNotFound', message: 'Piece does not exist.' };
  } else {
    return { name: 'PieceSelected', message: '' };
  }
};

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};

export const selectedPieceInHandExists = function(match: Match): boolean {
  return selectedPieceInHand(match) !== undefined;
};

export const selectedPieceInHand = function(match: Match): Piece | undefined {
  return gameStateSelectedPieceInHand(match.gameState);
};

export const pieceNotFound = function(match: Match, touchedPieceId: number): boolean {
  return findPieceInHand(match.gameState, touchedPieceId) === undefined;
};
