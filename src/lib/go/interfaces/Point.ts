import type Stone from '$lib/go/interfaces/Stone';

interface Point {
  id: number;
  x: number;
  y: number;
  stone: Stone | null;
  territoryId: number | null;
}

export type { Point as default };
