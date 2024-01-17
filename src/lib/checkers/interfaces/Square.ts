import type Piece from '$lib/checkers/interfaces/Piece';

interface Square {
  id: number,
  x: number,
  y: number,
  piece: Piece | null;
}

export type { Square as default };
