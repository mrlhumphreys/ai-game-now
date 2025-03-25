import type GameState from '$lib/shogi/interfaces/GameState';
import type Player from '$lib/shogi/interfaces/Player';
import type Action from '$lib/shogi/interfaces/Action';
import type CurrentMove from '$lib/shogi/interfaces/CurrentMove';

interface Match {
  id: number;
  gameState: GameState;
  players: Array<Player>;
  winner: number | null;
  currentMove: CurrentMove | null;
  promotion: boolean;
  lastAction: Action | null;
  notification: string;
}

export type { Match as default };
