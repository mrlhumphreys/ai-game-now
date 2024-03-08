import type Piece from '$lib/backgammon/interfaces/Piece';
import type Bar from '$lib/backgammon/interfaces/Bar';

export const piecesOwnedByPlayer = function(bar: Bar, playerNumber: number): Array<Piece> {
  return bar.pieces.filter((p) => {
    return p.playerNumber === playerNumber;
  });
};

export const push = function(bar: Bar, piece: Piece): boolean {
  bar.pieces.push(piece);
  return true;
};

export const hasPiecesOwnedByPlayer = function(bar: Bar, playerNumber: number): boolean {
  return bar.pieces.some((p) => {
    return p.playerNumber === playerNumber;
  });
};

export const noPiecesOwnedByPlayer = function(bar: Bar, playerNumber: number): boolean {
  return !hasPiecesOwnedByPlayer(bar, playerNumber);
};

export const select = function(bar: Bar): boolean {
  bar.selected = true;
  return true;
};

export const deselect = function(bar: Bar): boolean {
  bar.selected = false;
  return true;
};

export const pop = function(bar: Bar, playerNumber: number): Piece | undefined {
  let piece = bar.pieces.find((p) => {
    return p.playerNumber === playerNumber;
  });
  let pieceIndex = bar.pieces.findIndex((p) => {
    return p.playerNumber === playerNumber;
  });

  if (pieceIndex !== -1) {
    bar.pieces.splice(pieceIndex, 1);
  }

  return piece;
};
