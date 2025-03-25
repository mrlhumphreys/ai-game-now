import type Point from '$lib/chess/interfaces/Point';

export const add = function(a: Point, b: Point): Point {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
};
