interface ActionData {
  pieceId: number | null;
  fromId: string | null;
  toId: string;
  promote: boolean;
}

interface Action {
  kind: string;
  data: ActionData;
}

export type { Action as default };
