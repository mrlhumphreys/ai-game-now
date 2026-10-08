import type Point from '#lib/xiangqi/interfaces/Point';
import type Piece from '#lib/xiangqi/interfaces/Piece';
import type Square from '#lib/xiangqi/interfaces/Square';

import {
  select as pieceSelect,
  deselect as pieceDeselect
} from '#lib/xiangqi/logic/piece';

export const occupied = function(square: Square): boolean {
  return square.piece !== null;
};

export const unoccupied = function(square: Square): boolean {
  return square.piece === null;
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

export const occupiedByOpponentOf = function(square: Square, playerNumber: number): boolean {
  return square.piece !== null && square.piece.playerNumber !== playerNumber;
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
