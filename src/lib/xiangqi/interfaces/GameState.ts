import type Square from '$lib/xiangqi/interfaces/Square';

interface GameState {
  currentPlayerNumber: number;
  squares: Array<Square>;
  halfmove: number;
  fullmove: number;
}

export type { GameState as default };
