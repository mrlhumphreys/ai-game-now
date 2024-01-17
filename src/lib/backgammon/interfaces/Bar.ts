import type Piece from '$lib/backgammon/interfaces/Piece';

interface Bar {
  pieces: Array<Piece>;
  selected: boolean;
}

export type { Bar as default };
