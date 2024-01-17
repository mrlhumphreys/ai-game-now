import type Square from '$lib/chess/interfaces/Square';

interface GameState {
  current_player_number: number;
  last_double_step_pawn_id: number | null;
  squares: Array<Square>;
}

export type { GameState as default };
