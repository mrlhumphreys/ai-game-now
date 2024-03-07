import type Match from '$lib/chess/interfaces/Match';

import {
  playersTurn as gameStatePlayersTurn
} from '$lib/chess/logic/gameState';
import {
  winner
} from '$lib/chess/logic/match';

interface Result {
  name: string;
  message: string;
}

export const getPromoteResult = function(match: Match, playerNumber: number, pieceType: string): Result {
  if (gameOver(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (!matchInPromotion(match)) {
    return { name: 'NoPieceToPromote', message: 'There is no piece to promote.' };
  }

  if (!validPromotionPiece(pieceType)) {
    return { name: 'InvalidPromotionPiece', message: 'Pawn cannot promote to that piece.' };
  }

  return { name: 'ValidPromotion', message: '' };
};

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.game_state, playerNumber);  
};

export const matchInPromotion = function(match: Match): boolean {
  return match.promotion;
};

export const validPromotionPiece = function(pieceType: string): boolean {
  let validPromotionPieces = ['queen', 'rook', 'bishop', 'knight'];
  let found = validPromotionPieces.find((p) => { 
    return p === pieceType; 
  });
  return found !== undefined;
};
