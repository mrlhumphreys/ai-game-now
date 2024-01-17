interface Piece {
  id: number;
  player_number: number;
  type: string;
  has_moved: boolean;
}

export type { Piece as default };
