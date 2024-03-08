import type Move from '$lib/backgammon/interfaces/Move';

interface ActionData {
  moveList: Array<Move>;
}

interface Action {
  kind: string;
  data: ActionData | null;
}

export type { Action as default };
