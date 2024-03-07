import type Point from '$lib/chess/interfaces/Point';

export const distance = function(from: Point, to: Point): number {
  return Math.max(Math.abs(dx(from, to)), Math.abs(dy(from, to)));  
};

export const dx = function(from: Point, to: Point): number {
  return to.x - from.x;
};

export const dy = function(from: Point, to: Point): number {
  return to.y - from.y;
};

export const directionD = function(d: number): number {
  if (d > 0) {
    return 1;
  } else if (d === 0) {
    return 0;
  } else {
    return -1;
  }
};

export const directionY = function(from: Point, to: Point): number {
  return directionD(dy(from, to));
};

export const directionX = function(from: Point, to: Point): number {
  return directionD(dx(from, to));
};

export const orthogonalOrDiagonal = function(from: Point, to: Point): boolean {
  return orthogonal(from, to) || diagonal(from, to);
};

export const orthogonal = function(from: Point, to: Point): boolean {
  return from.x === to.x || from.y === to.y; 
};

export const diagonal = function(from: Point, to: Point): boolean {
  return Math.abs(dx(from, to)) === Math.abs(dy(from, to));
};

export const direction = function(from: Point, to: Point): Point {
  return { x: directionX(from, to), y: directionY(from, to) };
};
