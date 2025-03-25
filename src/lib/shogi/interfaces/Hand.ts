import type Piece from '$lib/shogi/interfaces/Piece';

interface Hand {
  playerNumber: number;
  pieces: Array<Piece>;
}

export type { Hand as default };
