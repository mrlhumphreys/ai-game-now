import type GameState from '$lib/backgammon/interfaces/GameState';
import type Player from '$lib/backgammon/interfaces/Player';
import type Action from '$lib/backgammon/interfaces/Action';
import type Move from '$lib/backgammon/interfaces/Move';

interface Match {
  id: number;
  gameState: GameState;
  players: Array<Player>;
  winner: number | null;
  moveList: Array<Move>;
  lastAction: Action | null;
  notification: string;
}

export type { Match as default };
