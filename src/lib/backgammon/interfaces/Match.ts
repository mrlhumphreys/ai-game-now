import type GameState from '$lib/backgammon/interfaces/GameState';
import type Player from '$lib/backgammon/interfaces/Player';
import type Action from '$lib/backgammon/interfaces/Action';
import type Move from '$lib/backgammon/interfaces/Move';

interface Match {
  id: number;
  game_state: GameState;
  players: Array<Player>;
  winner: number | null;
  move_list: Array<Move>;
  last_action: Action | null;
  notification: string;
}

export type { Match as default };
