interface ActionData {
  fromId: string | null;
  toId: string;
}

interface Action {
  kind: string;
  data: ActionData;
}

export type { Action as default };
