import type Square from '$lib/chess/interfaces/Square';

interface GameState {
  currentPlayerNumber: number;
  lastDoubleStepPawnId: number | null;
  squares: Array<Square>;
  halfmove: number;
  fullmove: number;
}

export type { GameState as default };
