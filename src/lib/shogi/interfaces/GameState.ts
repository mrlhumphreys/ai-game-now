import type Square from '$lib/shogi/interfaces/Square';
import type Hand from '$lib/shogi/interfaces/Hand';

interface GameState {
  currentPlayerNumber: number;
  squares: Array<Square>;
  hands: Array<Hand>;
}

export type { GameState as default };
