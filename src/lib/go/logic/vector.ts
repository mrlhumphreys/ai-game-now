import type Point from '$lib/go/interfaces/Point';

export const magnitude = function(origin: Point, destination: Point): number | null {
  if (dx(origin, destination) === 0) {
    return Math.abs(dy(origin, destination));
  } else if (dy(origin, destination) === 0) {
    return Math.abs(dx(origin, destination));
  } else {
    return null;
  }
};

export const orthogonal = function(origin: Point, destination: Point): boolean {
  return (dx(origin, destination) === 0 || dy(origin, destination) === 0);
}

export const dx = function(origin: Point, destination: Point): number {
  return destination.x - origin.x;
};

export const dy = function(origin: Point, destination: Point): number {
  return destination.y - origin.y;
};

