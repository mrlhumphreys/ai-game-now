import type Piece from '$lib/shogi/interfaces/Piece';
import type Square from '$lib/shogi/interfaces/Square';
import type Match from '$lib/shogi/interfaces/Match';

import deepClone from '$lib/utils/deepClone';
import {
  canMove,
  canMoveFrom,
  promotable,
  hasLegalMovesFromY
} from '$lib/shogi/logic/piece';
import {
  occupied,
  unoccupied,
  occupiedByPlayer
} from '$lib/shogi/logic/square';
import {
  whereX,
  occupiedByPlayer as squareSetOccupiedByPlayer,
  occupiedByPieceType
} from '$lib/shogi/logic/squareSet';
import {
  findSquare,
  selectedSquare as gameStateSelectedSquare,
  selectedPieceInHand as gameStateSelectedPieceInHand,
  pieceMovedToPromotionZone,
  move,
  drop,
  inCheck,
  inCheckmate,
  playersTurn as gameStatePlayersTurn
} from '$lib/shogi/logic/gameState';
import {
  winner,
} from '$lib/shogi/logic/match';

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
  } else if (selectedPieceInHandExists(match)) {
    return dropResult(match, playerNumber, touchedSquareId);
  } else {
    return unselectedResult(match, playerNumber, touchedSquareId);
  }
}

export const selectedResult = function(match: Match, playerNumber: number, touchedSquareId: string): Result {
  if (putsOuInCheck(match, playerNumber, touchedSquareId)) {
    return { name: 'OuInCheck', message: 'Move puts ou in check.' };
  } else if (!moveValid(match, touchedSquareId)) {
    return { name: 'MoveInvalid', message: 'Piece cannot move.' };
  } else if (pieceCanPromote(match, touchedSquareId)) {
    return { name: 'PieceMovedToPromotionZone', message: 'Piece can promote.' };
  } else {
    return { name: 'MoveValid', message: '' };
  }
}

export const dropResult = function(match: Match, playerNumber: number, touchedSquareId: string): Result {
  if (squareOccupied(match, touchedSquareId)) {
    return { name: 'SquareOccupied', message: 'Piece must be dropped on an empty square.' };
  } else if (preventsLegalMoves(match, touchedSquareId)) {
    return { name: 'NoLegalMoves', message: 'Piece cannot move if placed on that square.' };
  } else if (putsTwoFuhyouInFile(match, touchedSquareId, playerNumber)) {
    return { name: 'TwoFuhyouInFile', message: 'Cannot place two fuhyou in the same file.' };
  } else if (fuhyouCausesCheckmate(match, touchedSquareId, playerNumber)) {
    return { name: 'FuhyouCausesCheckmate', message: 'Fuhyou cannot cause checkmate when dropped.' };
  } else {
    return { name: 'DropValid', message: '' };
  }
}
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
}

export const gameOver = function(match: Match): boolean {
  return (winner(match) !== null);
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};

export const selectedSquareExists = function(match: Match): boolean {
  return selectedSquare(match) !== undefined;
};

export const selectedPieceInHandExists = function(match: Match): boolean {
  return selectedPieceInHand(match) !== undefined;
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

export const selectedSquare = function(match: Match): Square | undefined {
  return gameStateSelectedSquare(match.gameState);
};

export const selectedPieceInHand = function(match: Match): Piece | undefined {
  return gameStateSelectedPieceInHand(match.gameState);
};

export const squareOccupied = function(match: Match, touchedSquareId: string): boolean {
  let to = touchedSquare(match, touchedSquareId);
  return to !== undefined && occupied(to);
};

export const preventsLegalMoves = function(match: Match, touchedSquareId: string): boolean {
  let piece = selectedPieceInHand(match);
  let to = touchedSquare(match, touchedSquareId);
  if (piece !== undefined && to !== undefined) {
    return !hasLegalMovesFromY(piece, to.y);
  } else {
    return false;
  }
};

export const putsTwoFuhyouInFile = function(match: Match, touchedSquareId: string, playerNumber: number): boolean {
  let selectedPiece = selectedPieceInHand(match);
  let touched = touchedSquare(match, touchedSquareId);

  if (touched !== undefined && selectedPiece !== undefined && selectedPiece.type === 'fuhyou') {
    let fileSquares = whereX(match.gameState.squares, touched.x);
    let occupiedByFuhyou = occupiedByPieceType(fileSquares, ['fuhyou']);
    return squareSetOccupiedByPlayer(occupiedByFuhyou, playerNumber).length > 0;
  } else {
    return false;
  }
};

export const fuhyouCausesCheckmate = function(match: Match, touchedSquareId: string, playerNumber: number): boolean {
  let selectedPiece = selectedPieceInHand(match);
  if (selectedPiece !== undefined && selectedPiece.type === 'fuhyou') {
    let dupState = deepClone(match.gameState);
    drop(dupState, selectedPiece.id, touchedSquareId);
    return inCheckmate(dupState, opponentNumber(playerNumber));
  } else {
    return false;
  }
};

export const opponentNumber = function(playerNumber: number): number {
  if (playerNumber === 1) {
    return 2;
  } else {
    return 1;
  }
};

export const putsOuInCheck = function(match: Match, playerNumber: number, touchedSquareId: string): boolean {
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

export const touchedSquare = function(match: Match, touchedSquareId: string): Square | undefined {
  return findSquare(match.gameState, touchedSquareId);
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

export const pieceCanPromote = function(match: Match, touchedSquareId: string): boolean {
  let from = selectedSquare(match);
  let to = touchedSquare(match, touchedSquareId);
  return from !== undefined && to !== undefined && from.piece !== null && promotable(from.piece) && pieceMovedToPromotionZone(from, to);
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
