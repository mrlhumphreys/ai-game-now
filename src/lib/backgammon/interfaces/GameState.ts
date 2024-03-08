import type Die from '$lib/backgammon/interfaces/Die';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type Point from '$lib/backgammon/interfaces/Point';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';

interface GameState {
  currentPlayerNumber: number;
  currentPhase: string;
  firstTurn: boolean;
  dice: Array<Die>;
  bar: Bar;
  points: Array<Point>;
  offBoard: OffBoard;
}

export type { GameState as default };
