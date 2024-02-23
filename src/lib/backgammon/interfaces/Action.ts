import type Move from '$lib/backgammon/interfaces/Move';

interface ActionData {
  move_list: Array<Move>;
}

interface Action {
  kind: string;
  data: ActionData | null;
}

export type { Action as default };
