import type Piece from '$lib/chess/interfaces/Piece';

interface Square {
  id: string;
  x: number;
  y: number;
  piece: Piece | null;
}

export type { Square as default };
