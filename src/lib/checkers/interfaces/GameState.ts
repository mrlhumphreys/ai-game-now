import type Square from '$lib/checkers/interfaces/Square';

interface GameState {
  current_player_number: number;
  squares: Array<Square>;
}

export type { GameState as default };
