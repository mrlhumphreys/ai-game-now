import type GameState from '$lib/chess/interfaces/GameState';
import type Player from '$lib/chess/interfaces/Player';
import type Action from '$lib/chess/interfaces/Action';
import type CurrentMove from '$lib/chess/interfaces/CurrentMove';

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
