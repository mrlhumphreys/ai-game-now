interface ActionData {
  pointId: string;
}

interface Action {
  kind: string;
  data: ActionData | null;
}

export type { Action as default };
