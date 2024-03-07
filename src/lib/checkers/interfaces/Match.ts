import type GameState from '$lib/checkers/interfaces/GameState';
import type Player from '$lib/checkers/interfaces/Player';
import type Action from '$lib/checkers/interfaces/Action';

interface Match {
  id: number;
  gameState: GameState;
  players: Array<Player>;
  winner: number | null;
  currentMoveFromId: number | null;
  currentMoveToIds: Array<number>;
  lastAction: Action | null;
  notification: string;
}

export type { Match as default };
