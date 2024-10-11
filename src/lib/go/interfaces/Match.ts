import type GameState from '$lib/go/interfaces/GameState';
import type Player from '$lib/go/interfaces/Player';
import type Action from '$lib/go/interfaces/Action';

interface Match {
  id: number;
  gameState: GameState;
  players: Array<Player>;
  lastAction: Action | null;
  notification: string;
}

export type { Match as default };
