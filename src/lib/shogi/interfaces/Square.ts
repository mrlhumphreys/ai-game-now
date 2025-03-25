import type Piece from '$lib/shogi/interfaces/Piece';

interface Square {
  id: string;
  x: number;
  y: number;
  piece: Piece | null;
}

export type { Square as default };
