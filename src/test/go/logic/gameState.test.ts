import { describe, it, expect, assert } from 'vitest';

import defaultGameState from '../fixtures/defaultGameState';
import playerPassedGameState from '../fixtures/playerPassedGameState';
import captureGameState from '../fixtures/captureGameState';
import endGameState from '../fixtures/endGameState';
import scoreGameState from '../fixtures/scoreGameState';
import winnerGameState from '../fixtures/winnerGameState';

import {
  move,
  pass,
  score,
  gameOver,
  winner,
  playerScore,
  prisonerCount,
  territoryCount,
  passTurn,
  nextPlayerNumber
} from '$lib/go/logic/gameState';

describe('move', () => {
  it('places a stone at the point for player', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let pointId = 74;
    move(gameState, playerNumber, pointId);
    let point = gameState.points.find(function(p) { return p.id === pointId; });
    let stone = { id: 1, playerNumber: 1, chainId: 1 };
    if (point !== undefined) {
      expect(point.stone).toEqual(stone);
    } else {
      assert.fail('expected point');
    }
  });

  it('marks the passed player as continuing', () => {
    let gameState = playerPassedGameState();
    let playerNumber = 1;
    let pointId = 74;
    move(gameState, playerNumber, pointId);
    let playerStat = gameState.playerStats.find(function(ps) { return ps.playerNumber === 2; });
    if (playerStat !== undefined) {
      expect(playerStat.passed).toBe(false);
    } else {
      assert.fail('expected player stat');
    }
  });

  it('captures stones if possible', () => {
    let gameState = captureGameState();
    let playerNumber = 2;
    let pointId = 74;
    move(gameState, playerNumber, pointId);
    let capturedPoint = gameState.points.find(function(p) { return p.id === 55; });
    if (capturedPoint !== undefined) {
      expect(capturedPoint.stone).toBe(null);
    } else {
      assert.fail('expected point');
    }
  });

  it('updates the prisoner count if there are captures', () => {
    let gameState = captureGameState();
    let playerNumber = 2;
    let pointId = 74;
    move(gameState, playerNumber, pointId);
    let playerStat = gameState.playerStats.find(function(ps) { return ps.playerNumber === 2; });
    if (playerStat !== undefined) {
      expect(playerStat.prisonerCount).toEqual(1);
    } else {
      assert.fail('expected player stat');
    }
  });

  it('passes the turn', () => {
    let gameState = defaultGameState();
    let playerNumber = 1;
    let pointId = 74;
    move(gameState, playerNumber, pointId);
    expect(gameState.currentPlayerNumber).toEqual(2);
  });
});

describe('pass', () => {
  it('marks that the player has passed', () => {
    let gameState = defaultGameState();
    pass(gameState, 1);
    let playerStat = gameState.playerStats.find(function(ps) { return ps.playerNumber === 1; });
    if (playerStat !== undefined) {
      expect(playerStat.passed).toBe(true);
    } else {
      assert.fail('expected player stat');
    }
  });

  it('marks territories if both players have passed', () => {
    let gameState = endGameState();
    pass(gameState, 1);
    let point = gameState.points.find(function(p) { return p.id === 1; });
    if (point !== undefined) {
      expect(point.territoryId).toEqual(1);
    } else {
      assert.fail('expected point');
    }
  });

  it('passes the turn if the other player has not passed', () => {
    let gameState = defaultGameState();
    pass(gameState, 1);
    expect(gameState.currentPlayerNumber).toEqual(2);
  });
});

describe('score', () => {
  it('returns the players scores', () => {
    let gameState = scoreGameState();
    let result = score(gameState);
    let expected = [
      { playerNumber: 1, score: 1 },
      { playerNumber: 2, score: 3 }
    ];
    expect(result).toEqual(expected);
  });
});

describe('gameOver', () => {
  it('returns true if there is a winner', () => {
    let gameState = winnerGameState();
    let result = gameOver(gameState);
    expect(result).toBe(true);
  });

  it('returns false if there is no winner', () => {
    let gameState = defaultGameState();
    let result = gameOver(gameState);
    expect(result).toBe(false);
  });
});

describe('winner', () => {
  it('returns null if both players have not passed', () => {
    let gameState = defaultGameState();
    let result = winner(gameState);
    expect(result).toBe(null);
  });

  it('returns the player number with the highest score if both player has passed', () => {
    let gameState = winnerGameState();
    let result = winner(gameState);
    expect(result).toEqual(2);
  });
});

describe('playerScore', () => {
  it('returns the territory count plus prisoner count for the player', () => {
    let gameState = scoreGameState();
    let result = playerScore(gameState, 1);
    let expected = 1;
    expect(result).toEqual(expected);
  });
});

describe('prisonerCount', () => {
  it('returns the prisoner count for the player', () => {
    let gameState = scoreGameState();
    let result = prisonerCount(gameState, 2);
    let expected = 3;
    expect(result).toEqual(expected);
  });
});

describe('territoryCount', () => {
  it('returns the territory count for the player', () => {
    let gameState = scoreGameState();
    let result = territoryCount(gameState, 1);
    let expected = 1;
    expect(result).toEqual(expected);
  });
});

describe('passTurn', () => {
  it('sets the current player nubmer to the next player number', () => {
    let gameState = defaultGameState();
    passTurn(gameState);
    expect(gameState.currentPlayerNumber).toEqual(2);
  });
});

describe('nextPlayerNumber', () => {
  it('returns the other players number', () => {
    let gameState = defaultGameState();
    let result = nextPlayerNumber(gameState);
    let expected = 2;
    expect(result).toEqual(expected);
  });
});
