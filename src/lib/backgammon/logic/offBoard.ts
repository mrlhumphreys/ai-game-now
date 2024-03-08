import type Piece from '$lib/backgammon/interfaces/Piece';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';

export const piecesOwnedByPlayer = function(offBoard: OffBoard, playerNumber: number): Array<Piece> {
  return offBoard.pieces.filter((p) => {
    return p.playerNumber === playerNumber;
  });
};

export const push = function(offBoard: OffBoard, piece: Piece): boolean {
  offBoard.pieces.push(piece);
  return true;
};

export const emptyBlot = function(offBoard: OffBoard): boolean {
  return false;
};

export const hasAllOfPlayersPieces = function(offBoard: OffBoard, playerNumber: number): boolean {
  return piecesOwnedByPlayer(offBoard, playerNumber).length === 15;
};

