import type Square from '$lib/checkers/interfaces/Square';

interface GameState {
  currentPlayerNumber: number;
  squares: Array<Square>;
}

export type { GameState as default };
