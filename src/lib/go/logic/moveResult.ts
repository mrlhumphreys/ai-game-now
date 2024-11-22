import type Match from '$lib/go/interfaces/Match';
import type Point from '$lib/go/interfaces/Point';

import exists from '$lib/utils/exists';
import deepClone from '$lib/utils/deepClone';

import {
  winner
} from '$lib/go/logic/match';
import {
  findById,
  libertiesFor,
  surroundedByEnemies as pointSetSurroundedByEnemies,
  deprivesLiberties as pointSetDeprivesLiberties,
  deprivesOpponentsLiberties as pointSetDeprivesOpponentsLiberties,
  performMove,
  minify
} from '$lib/go/logic/pointSet';
import {
  occupied
} from '$lib/go/logic/point';

interface Result {
  name: string;
  message: string;
}

export const getMoveResult = function(match: Match, playerNumber: number, proposedPointId: string): Result {
  if (exists(winner(match))) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (match.gameState.currentPlayerNumber !== playerNumber) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  let point = proposedPoint(match, proposedPointId);

  if (point === undefined) {
    return { name: 'PointNotFound', message: 'Point does not exist.' };
  }

  if (point !== undefined && occupied(point)) {
    return { name: 'PointOccupied', message: 'Point is already occupied.' };
  }

  // noLiberties && surroundedByEnemies | deprivesLiberties | deprivesOpponentLiberties | MoveValid?
  // false                              | false             | false                     | Valid
  // false                              | false             | true                      | Valid
  // false                              | true              | false                     | Valid
  // false                              | true              | true                      | Valid
  // true                               | false             | false                     | Invalid
  // true                               | false             | true                      | Valid
  // true                               | true              | false                     | Invalid
  // true                               | true              | true                      | Valid

  if (noLiberties(match, proposedPointId) && surroundedByEnemies(match, proposedPointId, playerNumber) && (deprivesLiberties(match, proposedPointId, playerNumber) === deprivesOpponentsLiberties(match, proposedPointId, playerNumber))) {
    return { name: 'NoLiberties', message: 'Point has no liberties.' };
  }

  if (koRuleViolation(match, proposedPointId, playerNumber)) {
    return { name: 'KoRuleViolation', message: 'Move would return board to previous state.' };
  }

  return { name: 'MoveValid', message: '' };
};

export const proposedPoint = function(match: Match, proposedPointId: string): Point | undefined {
  return findById(match.gameState.points, proposedPointId);
};

export const noLiberties = function(match: Match, proposedPointId: string): boolean {
  let point = proposedPoint(match, proposedPointId);
  if (point !== undefined) {
    return libertiesFor(match.gameState.points, point) === 0;
  } else {
    return true;
  }
};

export const surroundedByEnemies = function(match: Match, proposedPointId: string, playerNumber: number): boolean {
  let point = proposedPoint(match, proposedPointId);
  if (point !== undefined) {
    return pointSetSurroundedByEnemies(match.gameState.points, point, playerNumber);
  } else {
    return false;
  }
};

export const deprivesLiberties = function(match: Match, proposedPointId: string, playerNumber: number): boolean {
  let point = proposedPoint(match, proposedPointId);
  if (point !== undefined) {
    return pointSetDeprivesLiberties(match.gameState.points, point, playerNumber);
  } else {
    return false;
  }
}

export const deprivesOpponentsLiberties = function(match: Match, proposedPointId: string, playerNumber: number): boolean {
  let point = proposedPoint(match, proposedPointId);
  if (point !== undefined) {
    return pointSetDeprivesOpponentsLiberties(match.gameState.points, point, playerNumber);
  } else {
    return false;
  }
}

export const koRuleViolation = function(match: Match, proposedPointId: string, playerNumber: number): boolean {
  let point = proposedPoint(match, proposedPointId);
  if (point !== undefined) {
    let dupped = deepClone(match.gameState.points);
    performMove(dupped, point, playerNumber);
    return minify(dupped) === match.gameState.previousState;
  } else {
    return false;
  }
};

export const winnerMessage = function(match: Match): string {
  let winningPlayer = match.players.find((p) => {
    return p.playerNumber === winner(match);
  });

  if (winningPlayer !== undefined) {
    return `${winningPlayer.name} wins.`;
  } else {
    return '';
  }
};

