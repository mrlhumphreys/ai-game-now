import type Point from '$lib/go/interfaces/Point';
import type PlayerStat from '$lib/go/interfaces/PlayerStat';

interface GameState {
  currentPlayerNumber: number;
  points: Array<Point>;
  playerStats: Array<PlayerStat>;
  previousState: string;
}

export type { GameState as default };
