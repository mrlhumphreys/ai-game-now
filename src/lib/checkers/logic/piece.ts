import type Piece from '$lib/checkers/interfaces/Piece';

export const direction = function(piece: Piece): number {
  return (piece.player_number === 1 ? -1 : 1); 
};

export const select = function(piece: Piece): boolean {
  piece.selected = true;
  return true;
};

export const deselect = function(piece: Piece): boolean {
  piece.selected = false;
  return true;
};

export const promote = function(piece: Piece): boolean {
  piece.king = true;
  return true;
};

