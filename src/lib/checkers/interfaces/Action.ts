interface ActionData {
  fromId: number | null;
  toIds: Array<number>;
};

interface Action {
  kind: string;
  data: ActionData;
}

export type { Action as default };
