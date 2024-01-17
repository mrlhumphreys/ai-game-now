import type GameState from '$lib/checkers/interfaces/GameState';
import type Player from '$lib/checkers/interfaces/Player';
import type Action from '$lib/checkers/interfaces/Action';

interface Match {
  id: number;
  game_state: GameState;
  players: Array<Player>;
  winner: number | null;
  current_move_from_id: number | null;
  current_move_to_ids: Array<number>;
  last_action: Action | null;
  notification: string;
}

export type { Match as default };
