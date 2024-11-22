import type GameState from '$lib/go/interfaces/GameState';
import type PlayerStat from '$lib/go/interfaces/PlayerStat';
import type Point from '$lib/go/interfaces/Point';

import maxBy from '$lib/utils/maxBy';
import sum from '$lib/utils/sum';

import {
  findById,
  minify,
  performMove,
  markTerritories,
  territoriesFor
} from '$lib/go/logic/pointSet';
import {
  markAsContinuing,
  addToPrisonerCount,
  markAsPassed
} from '$lib/go/logic/playerStat';

interface PlayerScore {
  playerNumber: number;
  score: number;
}

export const move = function(gameState: GameState, playerNumber: number, pointId: string): boolean {
  let point = findById(gameState.points, pointId);

  if (point !== undefined && playerNumber === gameState.currentPlayerNumber) {
    let nextPlayerStat = gameState.playerStats.find((ps: PlayerStat) => {
      return ps.playerNumber === nextPlayerNumber(gameState);
    });

    if (nextPlayerStat !== undefined) {
      markAsContinuing(nextPlayerStat);
    }

    gameState.previousState = minify(gameState.points);

    let stoneCount = performMove(gameState.points, point, playerNumber);

    let thisPlayerStat = gameState.playerStats.find((ps: PlayerStat) => {
      return ps.playerNumber === playerNumber;
    });

    if (thisPlayerStat !== undefined) {
      addToPrisonerCount(thisPlayerStat, stoneCount);
    }

    passTurn(gameState);
    return true;
  } else {
    return false;
  }
}

export const pass = function(gameState: GameState, playerNumber: number): boolean {
  if (playerNumber === gameState.currentPlayerNumber) {
    let thisPlayerStat = gameState.playerStats.find(function(ps: PlayerStat) {
      return ps.playerNumber === playerNumber;
    });

    if (thisPlayerStat !== undefined) {
      markAsPassed(thisPlayerStat);
    }

    let nextPlayerStat = gameState.playerStats.find((ps) => {
      return ps.playerNumber == nextPlayerNumber(gameState);
    })

    if (nextPlayerStat !== undefined && nextPlayerStat.passed) {
      markTerritories(gameState.points);
    } else {
      passTurn(gameState);
    }
    return true;
  } else {
    return false;
  }
}

export const score = function(gameState: GameState): Array<PlayerScore> {
  return [
    { playerNumber: 1, score: playerScore(gameState, 1) },
    { playerNumber: 2, score: playerScore(gameState, 2) }
  ];
};

export const gameOver = function(gameState: GameState): boolean {
  return winner(gameState) !== null;
};

export const winner = function(gameState: GameState): number | null {
  if (gameState.playerStats.every(function(ps: PlayerStat) { return ps.passed; })) {
    let playerScore = maxBy(score(gameState), function(s: PlayerScore) { return s.score; })
    if (playerScore !== undefined) {
      return playerScore.playerNumber;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export const playerScore = function(gameState: GameState, playerNumber: number): number {
  return prisonerCount(gameState, playerNumber) + territoryCount(gameState, playerNumber);
}

export const prisonerCount = function(gameState: GameState, playerNumber: number): number {
  let playerStat = gameState.playerStats.find(function(ps: PlayerStat) {
    return ps.playerNumber === playerNumber;
  });
  if (playerStat !== undefined) {
    return playerStat.prisonerCount;
  } else {
    return 0;
  }
}

export const territoryCount = function(gameState: GameState, playerNumber: number): number {
  return sum(territoriesFor(gameState.points, playerNumber), function(t: Array<Point>) {
    return t.length;
  });
}

export const passTurn = function(gameState: GameState): boolean {
  gameState.currentPlayerNumber = nextPlayerNumber(gameState);
  return true;
}

export const nextPlayerNumber = function(gameState: GameState): number {
  return gameState.currentPlayerNumber === 1 ? 2 : 1;
}

