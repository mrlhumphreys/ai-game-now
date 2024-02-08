import type Piece from '$lib/checkers/interfaces/Piece';

interface Square {
  id: number;
  x: number;
  y: number;
  marked: boolean;
  piece: Piece | null;
}

export type { Square as default };
