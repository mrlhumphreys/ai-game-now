import type OffBoard from '$lib/backgammon/interfaces/OffBoard';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type Point from '$lib/backgammon/interfaces/Point';
import type Move from '$lib/backgammon/interfaces/Move';
import type Match from '$lib/backgammon/interfaces/Match';

import {
  piecesOwnedByPlayer
} from '$lib/backgammon/logic/offBoard';
import {
  ownedByOpponent as pointOwnedByOpponent,
  blocked,
  distanceFromOffBoard,
  empty
} from '$lib/backgammon/logic/point';
import {
  unused,
  filterGreaterThanOrEqualToNumber,
  filterEqualToNumber,
  findByNumber,
  highestUnused
} from '$lib/backgammon/logic/diceSet';
import {
  backPointForPlayer,
  somePiecesNotHome,
  destinations
} from '$lib/backgammon/logic/pointSet';
import {
  selectedPoint as gameStateSelectedPoint,
  findPoint,
  playersTurn as gameStatePlayersTurn,
  rollPhase as gameStateRollPhase
} from '$lib/backgammon/logic/gameState';
import {
  winner as matchWinner
} from '$lib/backgammon/logic/match';
import {noPiecesOwnedByPlayer} from './bar';

interface Result {
  name: string;
  message: string;
}

export const getMoveResult = function(match: Match, playerNumber: number, touchedId: string | number): Result {
  if (winner(match)) {
    return { name: 'GameOver', message: 'Game is over.' };
  }

  if (!playersTurn(match, playerNumber)) {
    return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
  }

  if (rollPhase(match)) {
    return { name: 'RollPhase', message: 'Pieces cannot move until the dice are rolled.' };
  }

  if (pointSelected(match)) {
    return selectedResult(match, playerNumber, touchedId);
  } else {
    return unselectedResult(match, playerNumber, touchedId);
  }
};

export const selectedResult = function(match: Match, playerNumber: number, touchedId: string | number): Result {
  if (touchedId === 'offBoard') {
    if (somePiecesAreNotHome(match, playerNumber)) {
      return { name: 'PiecesNotHome', message: 'Cannot bear off while pieces are not home.' };
    } else if (diceRollMismatch(match, playerNumber, touchedId)) {
      return { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
    } else if (complete(match, touchedId) || allPiecesOffBoard(match, playerNumber)) {
      return { name: 'MoveComplete', message: '' };
    } else {
      return { name: 'MoveIncomplete', message: '' };
    }
  } else {
    if (diceRollMismatch(match, playerNumber, touchedId)) {
      return { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
    } else if (toBlocked(match, playerNumber, touchedId)) {
      return { name: 'OpponentBlock', message: 'An opponent is blocking that point.' };
    } else if (wrongDirection(match, playerNumber, touchedId)) {
      return { name: 'WrongDirection', message: 'A piece cannot move backwards.' };
    } else if (complete(match, touchedId)) {
      return { name: 'MoveComplete', message: '' };
    } else {
      return { name: 'MoveIncomplete', message: '' };
    }
  }
};

export const unselectedResult = function(match: Match, playerNumber: number, touchedId: string | number): Result {
  if (touchedId === 'bar') {
    if (barHasNoPiecesOwnedByPlayer(match, playerNumber)) {
      return { name: 'NoPieces', message: 'There are no pieces on the bar.' };
    } else if (noDestinations(match, playerNumber, touchedId)) {
      return { name: 'Blocked', message: 'Those pieces cannot move.' };
    } else {
      return { name: 'MovePossible', message: '' };
    }
  } else {
    if (touchedEmpty(match, touchedId)) {
      return { name: 'EmptyPoint', message: 'That point is empty.' };
    } else if (touchedOwnedByOpponent(match, playerNumber, touchedId)) {
      return { name: 'PointOwnershipMismatch', message: 'That point is not yours.' };
    } else if (barHasPieces(match, playerNumber)) {
      return { name: 'PiecesOnBar', message: 'There are still pieces on the bar.' };
    } else if (noDestinations(match, playerNumber, touchedId) && (somePiecesAreNotHome(match, playerNumber) || cannotBearOff(match, playerNumber, touchedId))) {
      return { name: 'Blocked', message: 'Those pieces cannot move.' };
    } else {
      return { name: 'MovePossible', message: '' };
    }
  }
};

export const winner = function(match: Match): boolean {
  return matchWinner(match) !== null;
};

export const playersTurn = function(match: Match, playerNumber: number): boolean {
  return gameStatePlayersTurn(match.gameState, playerNumber);
};

export const rollPhase = function(match: Match): boolean {
  return gameStateRollPhase(match.gameState);
};

export const pointSelected = function(match: Match): boolean {
  return selectedPoint(match) !== undefined;
};

export const dieNumber = function(match: Match, playerNumber: number, touchedId: string | number): number | undefined {
  let pointDistance = distance(match, playerNumber, touchedId);
  if (pointDistance !== undefined) {
    if (findByNumber(unused(match.gameState.dice), pointDistance)) {
      return distance(match, playerNumber, touchedId);
    } else {
      return highestUnused(match.gameState.dice);
    }
  } else {
    return undefined;
  }
};

export const details = function(match: Match, touchedId: string | number): Move | undefined {
  let from = selectedPoint(match);
  let to = touchedPoint(match, touchedId);
  if (from !== undefined && to !== undefined) {
    let fromId = ("number" in from) ? from.number : 'bar';
    let toId = ("number" in to) ? to.number : 'offBoard';
    return { fromId: fromId, toId: toId };
  } else {
    return undefined;
  }
};

// selected off board/point
export const complete = function(match: Match, touchedId: string | number): boolean {
  return (selectedPoint(match) !== undefined) && (touchedPoint(match, touchedId) !== undefined) && (numberOfMoves(match) === match.gameState.dice.length);
};

// selected off board
export const allPiecesOffBoard = function(match: Match, playerNumber: number): boolean {
  return numberOfMoves(match) === numberOfPiecesOnBoard(match, playerNumber);
};

export const completeMoveList = function(match: Match, touchedId: string | number): Array<Move> {
  let from = selectedPoint(match);
  let to = touchedPoint(match, touchedId);
  if (from !== undefined && to !== undefined) {
    let fromId = ("number" in from) ? from.number : 'bar';
    let toId = ("number" in to) ? to.number : 'offBoard';
    return match.moveList.concat([
      { fromId: fromId, toId: toId }
    ]);
  } else {
    return match.moveList;
  }
};

// unselected bar
export const barHasNoPiecesOwnedByPlayer = function(match: Match, playerNumber: number): boolean {
  return noPiecesOwnedByPlayer(match.gameState.bar, playerNumber);
};

// unselected point
export const touchedEmpty = function(match: Match, touchedId: string | number): boolean {
  let point = touchedPoint(match, touchedId);
  if (point !== undefined && "number" in point) {
    return empty(point);
  } else {
    return false;
  }
};

// unselected point
export const touchedOwnedByOpponent = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  let point = touchedPoint(match, touchedId);
  if (point !== undefined && "number" in point) {
    return pointOwnedByOpponent(point, playerNumber);
  } else {
    return false;
  }
};

// unselected point
export const barHasPieces = function(match: Match, playerNumber: number): boolean {
  return match.gameState.bar.pieces.some((p) => {
    return p.playerNumber === playerNumber;
  });
};

// unselected bar/point
export const noDestinations = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  let point = touchedPoint(match, touchedId);
  if (point !== undefined) {
    return destinations(match.gameState.points, point, match.gameState.dice, playerNumber).length === 0;
  } else {
    return true;
  }
};

// unselected point / selected off board
export const somePiecesAreNotHome = function(match: Match, playerNumber: number): boolean {
  return somePiecesNotHome(match.gameState.points, playerNumber);
};

// unselected point
export const cannotBearOff = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  let backPoint = backPointForPlayer(match.gameState.points, playerNumber);
  let fromPoint = touchedPoint(match, touchedId);
  if (backPoint !== undefined && fromPoint !== undefined) {
    let backPointNumber = backPoint.number;
    if ("number" in fromPoint) {
      let pointDistance = distanceFromOffBoard(fromPoint, playerNumber);
      if (pointDistance !== undefined) {
        if (backPointNumber === touchedId) {
          return filterGreaterThanOrEqualToNumber(unused(match.gameState.dice), pointDistance).length === 0;
        } else {
          return filterEqualToNumber(unused(match.gameState.dice), pointDistance).length === 0;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};

// selected off board / point
export const diceRollMismatch = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  return !unused(match.gameState.dice).some((d) => {
    let pointDistance = distance(match, playerNumber, touchedId);
    if (d.number !== null && pointDistance !== undefined) {
      if (bearOff(touchedId)) {
        return d.number >= pointDistance;
      } else {
        return d.number === pointDistance;
      }
    } else {
      return true;
    }
  });
};

// selected point
export const toBlocked = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  let point = touchedPoint(match, touchedId);
  if (point !== undefined && "number" in point) {
    return pointOwnedByOpponent(point, playerNumber) && blocked(point);
  } else {
    return true;
  }
};

// selected point
export const wrongDirection = function(match: Match, playerNumber: number, touchedId: string | number): boolean {
  let from = fromInt(match, playerNumber);
  let to = toInt(playerNumber, touchedId);
  if (from !== undefined && to !== undefined) {
    let vectorDistance = to - from;
    switch(playerNumber) {
      case 1:
        return vectorDistance < 0;
      case 2:
        return vectorDistance > 0;
      default:
        return true;
    }
  } else {
    return true;
  }
};

export const distance = function(match: Match, playerNumber: number, touchedId: string | number): number | undefined {
  let from = fromInt(match, playerNumber);
  let to = toInt(playerNumber, touchedId);
  if (from !== undefined && to !== undefined) {
    return Math.abs(to - from);
  } else {
    return undefined;
  }
};

export const fromInt = function(match: Match, playerNumber: number): number | undefined {
  let point = selectedPoint(match);
  if (point !== undefined) {
    switch(playerNumber) {
      case 1:
        if ("number" in point) {
          return point.number;
        } else {
          return 0;
        }
      case 2:
        if ("number" in point) {
          return point.number;
        } else {
          return 25;
        }
      default:
        return undefined;
    }
  } else {
    return undefined;
  }
};

export const toInt = function(playerNumber: number, touchedId: string | number): number | undefined {
  switch(playerNumber) {
    case 1:
      if (typeof touchedId === 'string') {
        return touchedId === 'offBoard' ? 25 : undefined;
      } else {
        return touchedId;
      }
    case 2:
      if (typeof touchedId === 'string') {
        return touchedId === 'offBoard' ? 0 : undefined;
      } else {
        return touchedId;
      }
    default:
      return undefined;
  }
};

export const bearOff = function(touchedId: string | number): boolean {
  return touchedId === 'offBoard';
};

export const selectedPoint = function(match: Match): Point | Bar | undefined {
  return gameStateSelectedPoint(match.gameState);
};

export const touchedPoint = function(match: Match, touchedId: string | number): Point | Bar | OffBoard | undefined {
  return findPoint(match.gameState, touchedId);
};

export const numberOfMoves = function(match: Match): number {
  return match.moveList.length + 1;
};

export const numberOfPiecesOnBoard = function(match: Match, playerNumber: number): number {
  return 15 - piecesOwnedByPlayer(match.gameState.offBoard, playerNumber).length;
};

export const winnerMessage = function(match: Match): string {
  let winningPlayer = match.players.find((p) => {
    return p.playerNumber === matchWinner(match);
  });

  if (winningPlayer !== undefined) {
    return `${winningPlayer.name} wins.`;
  } else {
    return '';
  }
};
