interface ActionData {
  fromId: string;
  toId: string;
  pieceType: string | null;
}

interface Action {
  kind: string;
  data: ActionData;
}

export type { Action as default };
