import type GameState from '$lib/chess/interfaces/GameState';
import type Player from '$lib/chess/interfaces/Player';
import type Action from '$lib/chess/interfaces/Action';
import type CurrentMove from '$lib/chess/interfaces/CurrentMove';

interface Match {
  id: number;
  game_state: GameState;
  players: Array<Player>;
  winner: number | null;
  current_move: CurrentMove | null;
  promotion: boolean;
  last_action: Action | null;
  notification: string;
}

export type { Match as default };
