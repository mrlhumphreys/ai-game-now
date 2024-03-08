interface Piece {
  id: number;
  playerNumber: number;
  type: string;
  hasMoved: boolean;
  selected: boolean;
}

export type { Piece as default };
