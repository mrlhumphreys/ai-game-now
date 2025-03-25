import type Point from '$lib/chess/interfaces/Point';
import type Piece from '$lib/chess/interfaces/Piece';
import type Square from '$lib/shogi/interfaces/Square';

import {
  select as pieceSelect,
  deselect as pieceDeselect
} from '$lib/shogi/logic/piece';

export const occupied = function(square: Square): boolean {
  return square.piece !== null;
};

export const unoccupied = function(square: Square): boolean {
  return square.piece === null;
};

export const promotionZone = function(square: Square, playerNumber: number): boolean {
  if (playerNumber === 2) {
    return square.y >= 6 && square.y <= 8;
  } else {
    return square.y >= 0 && square.y <= 2;
  }
};

export const occupiedByPieceType = function(square: Square, pieceType: Array<string>): boolean {
  return square.piece !== null && pieceType.includes(square.piece.type);
};

export const notOccupiedByPieceType = function(square: Square, pieceType: Array<string>): boolean {
  return square.piece !== null && !pieceType.includes(square.piece.type);
};

export const occupiedByPlayer = function(square: Square, playerNumber: number): boolean {
  return square.piece !== null && square.piece.playerNumber == playerNumber;
};

export const unoccupiedOrOccupiedByOpponentOf = function(square: Square, playerNumber: number): boolean {
  return square.piece === null || (square.piece !== null && square.piece.playerNumber !== playerNumber);
};

export const point = function(square: Square): Point {
  return { x: square.x, y: square.y };
};

export const addPiece = function(square: Square, piece: Piece): boolean {
  square.piece = piece;
  return true;
};

export const removePiece = function(square: Square): boolean {
  square.piece = null;
  return true;
};

export const select = function(square: Square): boolean {
  if (square.piece !== null) {
    return pieceSelect(square.piece);
  } else {
    return false;
  }
};

export const deselect = function(square: Square): boolean {
  if (square.piece !== null) {
    return pieceDeselect(square.piece);
  } else {
    return false;
  }
};
