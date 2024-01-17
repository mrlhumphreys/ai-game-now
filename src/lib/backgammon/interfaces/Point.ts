import type Piece from '$lib/backgammon/interfaces/Piece';

interface Point {
  number: number;
  pieces: Array<Piece>;
  selected: boolean;
}

export type { Point as default };
