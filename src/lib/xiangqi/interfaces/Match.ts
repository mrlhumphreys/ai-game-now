import type GameState from '$lib/xiangqi/interfaces/GameState';
import type Player from '$lib/xiangqi/interfaces/Player';
import type Action from '$lib/xiangqi/interfaces/Action';
import type CurrentMove from '$lib/xiangqi/interfaces/CurrentMove';

interface Match {
  id: number;
  gameState: GameState;
  players: Array<Player>;
  winner: number | null;
  currentMove: CurrentMove | null;
  lastAction: Action | null;
  notification: string;
}

export type { Match as default };
