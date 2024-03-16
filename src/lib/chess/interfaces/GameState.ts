import type Square from '$lib/chess/interfaces/Square';
import type CastleMove from '$lib/chess/interfaces/CastleMove';

interface GameState {
  currentPlayerNumber: number;
  lastDoubleStepPawnId: number | null;
  squares: Array<Square>;
  castleMoves: Array<CastleMove>;
  halfmove: number;
  fullmove: number;
}

export type { GameState as default };
