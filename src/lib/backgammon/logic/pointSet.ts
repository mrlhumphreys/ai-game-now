import type Point from '$lib/backgammon/interfaces/Point';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';
import type Die from '$lib/backgammon/interfaces/Die';

import {
  unused,
  filterGreaterThanOrEqualToNumber,
  filterEqualToNumber
} from '$lib/backgammon/logic/diceSet';
import {
  empty,
  ownedBy,
  enemyBlot,
  home,
  distanceFromOffBoard,
  deselect as pointDeselect,
  select as pointSelect
} from '$lib/backgammon/logic/point';

export const sort = function(points: Array<Point>): Array<Point> {
  return points.sort((a, b) => {
    if (a.number > b.number) {
      return 1;
    } else if (a.number < b.number) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const findByNumber = function(points: Array<Point>, number: number): Point | undefined {
  return points.find((p) => {
    return p.number === number;
  });
};

export const ownedByPlayer = function(points: Array<Point>, playerNumber: number): Array<Point> {
  return points.filter((p) => {
    return ownedBy(p, playerNumber);
  });
};

export const backPointForPlayer = function(points: Array<Point>, playerNumber: number): Point | undefined {
  switch (playerNumber) {
    case 1:
      return sort(ownedByPlayer(points, playerNumber))[0];
    case 2:
      return sort(ownedByPlayer(points, playerNumber)).slice(-1)[0];
    default:
      return undefined;
  }
};

export const somePiecesNotHome = function(points: Array<Point>, playerNumber: number): boolean {
  return ownedByPlayer(points, playerNumber).some((p) => {
    return !home(p, playerNumber);
  });
};

export const cannotBearOff = function(points: Array<Point>, playerNumber: number, dice: Array<Die>): boolean {
  return ownedByPlayer(points, playerNumber).every((p) => {
    let distance = distanceFromOffBoard(p, playerNumber);
    let backPoint = backPointForPlayer(points, playerNumber)
    if (distance !== undefined && backPoint !== undefined) {
      let unusedDice = unused(dice);
      if (backPoint.number === p.number) {
        // if this point is the back point.
        // there are no dice number equal to greater than distance to off board 
        return filterGreaterThanOrEqualToNumber(unusedDice, distance).length === 0;
      } else {
        // there are no dice number equal to distance to off board 
        return filterEqualToNumber(unusedDice, distance).length === 0;
      }
    } else {
      return true;
    }
  });
};

export const selected = function(points: Array<Point>): Point | undefined {
  return points.find((p) => {
    return p.selected;
  });
};

export const destinations = function(points: Array<Point>, from: Point | Bar | OffBoard, dice: Array<Die>, playerNumber: number): Array<Point> {
  let inRange = unused(dice).map((d) => {
    return destination(points, from, d, playerNumber);  
  });

  return inRange.filter((p: Point | undefined): p is Point => {
    if (p !== undefined) {
      return empty(p) || ownedBy(p, playerNumber) || enemyBlot(p, playerNumber);
    } else {
      return false;
    }
  });
};

export const destination = function(points: Array<Point>, from: Point | Bar | OffBoard, die: Die, playerNumber: number): Point | undefined {
  let fromNumber = undefined;
  switch (playerNumber) {
    case 1:
      if (die.number !== null) {
        fromNumber = ('number' in from) ? from.number : 0;
        return findByNumber(points, fromNumber + die.number);
      } else {
        return undefined;
      }
    case 2:
      if (die.number !== null) {
        fromNumber = ('number' in from) ? from.number : 25;
        return findByNumber(points, fromNumber - die.number);
      } else {
        return undefined;
      }
    default:
      return undefined;
  }
};

export const select = function(points: Array<Point>, number: number): boolean {
  let point = points.find((p) => {
    return p.number === number;
  });
  if (point !== undefined) {
    pointSelect(point);
    return true;
  } else {
    return false; 
  }
};

export const deselect = function(points: Array<Point>): boolean {
  let selectedPoint = points.find((p) => {
    return p.selected;
  });
  if (selectedPoint !== undefined) {
    return pointDeselect(selectedPoint);
  } else {
    return false;
  }
};
