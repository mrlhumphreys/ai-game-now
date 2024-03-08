import type Point from '$lib/chess/interfaces/Point';
import type Piece from '$lib/chess/interfaces/Piece';
import type Square from '$lib/chess/interfaces/Square';

import {
  select as pieceSelect,
  deselect as pieceDeselect
} from '$lib/chess/logic/piece';

export const occupied = function(square: Square): boolean {
  return square.piece !== null;
};

export const unoccupied = function(square: Square): boolean {
  return square.piece === null;
};

export const occupiedByPlayer = function(square: Square, playerNumber: number): boolean {
  return square.piece !== null && square.piece.playerNumber === playerNumber;
};

export const occupiedByOpponentOf = function(square: Square, playerNumber: number): boolean {
  return square.piece !== null && square.piece.playerNumber !== playerNumber;
};

export const unoccupiedOrOccupiedByOpponentOf = function(square: Square, playerNumber: number): boolean {
  return square.piece === null || square.piece.playerNumber !== playerNumber;
};

export const occupiedByPieceType = function(square: Square, pieceType: string): boolean {
  return square.piece !== null && square.piece.type === pieceType;
};

export const notOccupiedByPieceType = function(square: Square, pieceType: string): boolean {
  return square.piece !== null && square.piece.type !== pieceType;
};

export const point = function(square: Square): Point {
  return { x: square.x, y: square.y };
};

export const select = function(square: Square): boolean {
  if (square.piece !== null) {
    pieceSelect(square.piece);
    return true;
  } else {
    return false;
  }
};

export const deselect = function(square: Square): boolean {
  if (square.piece !== null) {
    pieceDeselect(square.piece);
    return true;
  } else {
    return false;
  }
};

export const addPiece = function(square: Square, piece: Piece): boolean {
  square.piece = piece;
  return true;
};

export const removePiece = function(square: Square): boolean {
  square.piece = null;
  return true;
};

// chess specific

export const startingFor = function(square: Square, playerNumber: number): boolean {
  return rankNumber(square, playerNumber) === 2;
};

export const rankNumber = function(square: Square, playerNumber: number): number {
  if (playerNumber === 1) {
    return 8 - square.y;
  } else {
    return square.y + 1;
  }
};

export const lastRank = function(square: Square, playerNumber: number): boolean {
  return rankNumber(square, playerNumber) === 8;
};

export const promote = function(square: Square, pieceType: string): boolean {
  if (square.piece !== null) {
    square.piece.type = pieceType;
    return true; 
  } else {
    return false;
  }
};

