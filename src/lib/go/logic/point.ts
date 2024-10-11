import type Point from '$lib/go/interfaces/Point';
import type Stone from '$lib/go/interfaces/Stone';

import exists from '$lib/utils/exists';

export const occupied = function(point: Point): boolean {
  return exists(point.stone);
};

export const unoccupied = function(point: Point): boolean {
  return !exists(point.stone);
};

export const occupiedBy = function(point: Point, playerNumber: number): boolean {
  if (point.stone !== null) {
    return point.stone.playerNumber === playerNumber;
  } else {
    return false;
  }
};

export const occupiedByOpponent = function(point: Point, playerNumber: number): boolean {
  if (point.stone !== null) {
    return point.stone.playerNumber !== playerNumber;
  } else {
    return false;
  }
};

export const unmarked = function(point: Point): boolean {
  return !exists(point.territoryId);
};

export const place = function(point: Point, stone: Stone): boolean {
  point.stone = stone;
  return true;
};

export const captureStone = function(point: Point): boolean {
  point.stone = null;
  return true;
};

export const addToTerritory = function(point: Point, territoryId: number): boolean {
  point.territoryId = territoryId;
  return true;
};

export const clearTerritory = function(point: Point): boolean {
  point.territoryId = null;
  return true;
};

