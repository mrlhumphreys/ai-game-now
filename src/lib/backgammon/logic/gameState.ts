import type Bar from '$lib/backgammon/interfaces/Bar';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';
import type Point from '$lib/backgammon/interfaces/Point';
import type GameState from '$lib/backgammon/interfaces/GameState';

import {
  hasPiecesOwnedByPlayer,
  select as barSelect,
  deselect as barDeselect,
  pop as barPop,
  push as barPush,
} from '$lib/backgammon/logic/bar';
import {
  piecesOwnedByPlayer,
  hasAllOfPlayersPieces
} from '$lib/backgammon/logic/offBoard';
import {
  enemyBlot,
  pop as pointPop,
  push as pointPush
} from '$lib/backgammon/logic/point';
import {
  roll as diceRoll,
  unused,
  findByNumber as diceFindByNumber,
  highestUnused,
  use
} from '$lib/backgammon/logic/diceSet';
import {
  selected,
  findByNumber,
  destinations,
  ownedByPlayer,
  somePiecesNotHome,
  cannotBearOff,
  select as pointSelect,
  deselect as pointDeselect
} from '$lib/backgammon/logic/pointSet';

export const selectedPoint = function(gameState: GameState): Point | Bar | undefined {
  let point = selected(gameState.points);
  if (point !== undefined) {
    return point;
  } else if (gameState.bar.selected) {
    return gameState.bar
  } else {
    return undefined;
  }
};

export const findPoint = function(gameState: GameState, id: String | number): Point | Bar | OffBoard | undefined {
  switch(id) {
    case 'bar':
      return gameState.bar;
    case 'offBoard':
      return gameState.offBoard;
    default:
      if (typeof id === 'number') {
        return findByNumber(gameState.points, id);
      } else {
        return undefined;
      }
  }
};

export const noMovesForPlayer = function(gameState: GameState, playerNumber: number): boolean {
  if (hasPiecesOwnedByPlayer(gameState.bar, playerNumber)) {
    return destinations(gameState.points, gameState.bar, gameState.dice, playerNumber).length === 0;
  } else {
    return ownedByPlayer(gameState.points, playerNumber).every((p) => {
      let noDestinations = destinations(gameState.points, p, gameState.dice, playerNumber).length === 0;
      let somePiecesNotHomeVar = somePiecesNotHome(gameState.points, playerNumber);
      let cannotBearOffVar = cannotBearOff(gameState.points, playerNumber, gameState.dice);
      return noDestinations && (somePiecesNotHomeVar || cannotBearOffVar);
    });
  }
};

export const allPiecesOffBoard = function(gameState: GameState): boolean {
  return piecesOwnedByPlayer(gameState.offBoard, gameState.currentPlayerNumber).length === 15;
};

export const playersTurn = function(gameState: GameState, playerNumber: number): boolean {
  return gameState.currentPlayerNumber === playerNumber;
};

export const rollPhase = function(gameState: GameState): boolean {
  return gameState.currentPhase === 'roll';
};

export const movePhase = function(gameState: GameState): boolean {
  return gameState.currentPhase === 'move';
};

export const winner = function(gameState: GameState): number | null {
  if (hasAllOfPlayersPieces(gameState.offBoard, 1)) {
    return 1;
  } else if (hasAllOfPlayersPieces(gameState.offBoard, 2)) {
    return 2;
  } else {
    return null;
  };
};

export const select = function(gameState: GameState, id: string | number): boolean {
  switch(id) {
    case 'bar':
      return selectBar(gameState);
    default:
      if (typeof id === 'number') {
        return selectPoint(gameState, id);
      } else {
        return false;
      }
  }
};

export const selectBar = function(gameState: GameState): boolean {
  return barSelect(gameState.bar);
};

export const selectPoint = function(gameState: GameState, number: number): boolean {
  return pointSelect(gameState.points, number);
};

export const deselect = function(gameState: GameState): boolean {
  pointDeselect(gameState.points);
  barDeselect(gameState.bar);
  return true;
};

export const move = function(gameState: GameState, fromId: string | number, toId: string | number, playerNumber: number): boolean {
  let from = findPoint(gameState, fromId);
  let to = findPoint(gameState, toId);

  if (from !== undefined && to !== undefined) {
    let blot = undefined;
    if ('number' in to && enemyBlot(to, playerNumber)) {
      blot = pointPop(to);
    };

    let movingPiece = undefined;
    if ('number' in from) {
      movingPiece = pointPop(from);
    } else {
      movingPiece = barPop(from, playerNumber);
    }

    if (movingPiece !== undefined) {
      if ('number' in to) {
        pointPush(to, movingPiece);
      } else {
        barPush(to, movingPiece);
      }
    }

    if (blot !== undefined) {
      barPush(gameState.bar, blot);
    }
    return true;
  } else {
    return false;
  }
};

export const roll = function(gameState: GameState): boolean {
  diceRoll(gameState.dice, !gameState.firstTurn);
  return true;
};

export const useDie = function(gameState: GameState, number: number): boolean {
  let die = diceFindByNumber(unused(gameState.dice), number);
  if (die !== undefined) {
    return use(gameState.dice, number);
  } else {
    return use(gameState.dice, highestUnused(gameState.dice));
  }
};

export const passTurn = function(gameState: GameState): boolean {
  if (gameState.currentPlayerNumber === 1) {
    gameState.currentPlayerNumber = 2;
  } else {
    gameState.currentPlayerNumber = 1;
  }
  return true;
};

export const stepPhase = function(gameState: GameState): boolean {
  if (gameState.currentPhase === 'roll') {
    gameState.currentPhase = 'move';
  } else {
    gameState.currentPhase = 'roll';
  }
  return true;
};

export const clearDice = function(gameState: GameState): boolean {
  gameState.dice = [
    { id: 0, number: null, used: false },
    { id: 1, number: null, used: false }
  ];
  return true;
};
