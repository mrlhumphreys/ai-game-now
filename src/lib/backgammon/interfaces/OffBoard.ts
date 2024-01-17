import type Piece from '$lib/backgammon/interfaces/Piece';

interface OffBoard {
  pieces: Array<Piece>;
  selected: boolean;
}

export type { OffBoard as default };
