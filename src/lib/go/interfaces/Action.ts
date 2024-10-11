interface ActionData {
  pointId: number;
}

interface Action {
  kind: string;
  data: ActionData | null;
}

export type { Action as default };
