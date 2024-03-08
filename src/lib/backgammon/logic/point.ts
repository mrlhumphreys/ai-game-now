import type Point from '$lib/backgammon/interfaces/Point';
import type Piece from '$lib/backgammon/interfaces/Piece';

export const blocked = function(point: Point): boolean {
  return point.pieces.length >= 2;
};

export const blot = function(point: Point): boolean {
  return point.pieces.length === 1;
};

export const empty = function(point: Point): boolean {
  return point.pieces.length === 0;
};

export const ownedBy = function(point: Point, playerNumber: number): boolean {
  let piece = point.pieces[0];
  if (piece !== undefined) {
    return piece.playerNumber === playerNumber;
  } else {
    return false;
  }
};

export const ownedByOpponent = function(point: Point, playerNumber: number): boolean {
  let piece = point.pieces[0];
  if (piece !== undefined) {
    return piece.playerNumber !== playerNumber;
  } else {
    return false;
  }
};

export const enemyBlot = function(point: Point, playerNumber: number): boolean {
  return blot(point) && ownedByOpponent(point, playerNumber);
};

export const home = function(point: Point, playerNumber: number): boolean {
  switch(playerNumber) {
    case 1:
      return 19 <= point.number && point.number <= 24;
    case 2:
      return 1 <= point.number && point.number <= 6;
    default:
      return false;
  };
};

export const distanceFromOffBoard = function(point: Point, playerNumber: number): number | undefined {
  switch (playerNumber) {
    case 1:
      return 25 - point.number;
    case 2:
      return point.number; // 0 + number
    default:
      return undefined;
  } 
};

export const getPlayerNumber = function(point: Point): number | null {
  let piece = point.pieces[0];
  if (piece !== undefined) {
    return piece.playerNumber;
  } else {
    return null;
  }
};

export const select = function(point: Point): boolean {
  point.selected = true;
  return true;
};

export const deselect = function(point: Point): boolean {
  point.selected = false;
  return true;
};

export const pop = function(point: Point): Piece | undefined {
  let piece = point.pieces.pop();
  return piece;
};

export const push = function(point: Point, piece: Piece): boolean {
  point.pieces.push(piece);
  return true;
};
