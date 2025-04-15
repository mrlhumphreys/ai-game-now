import type PieceType from '$lib/shogi/types/PieceType';

interface Piece {
  id: number;
  playerNumber: number;
  type: PieceType;
  selected: boolean;
}

export type { Piece as default };
