import type Phase from '$lib/backgammon/interfaces/Phase';
import type Die from '$lib/backgammon/interfaces/Die';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type Point from '$lib/backgammon/interfaces/Point';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';

interface GameState {
  current_player_number: number;
  current_phase: string;
  first_turn: boolean;
  dice: Array<Die>;
  bar: Bar;
  points: Array<Point>;
  off_board: OffBoard;
}

export type { GameState as default };
