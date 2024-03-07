interface Piece {
  id: number;
  player_number: number;
  type: string;
  has_moved: boolean;
  selected: boolean;
}

export type { Piece as default };
