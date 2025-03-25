import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import selectedPieceInHandMatch from '../fixtures/selectedPieceInHandMatch';
import pieceInHandMatch from '../fixtures/pieceInHandMatch';

import {
  getPickupResult,
  gameOver,
  playersTurn,
  selectedPieceInHandExists,
  selectedPieceInHand,
  pieceNotFound
} from '$lib/shogi/logic/pickupResult';

describe('getPickupResult', () => {
  describe('when game is over', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let touchedPieceId = 12;
      let expected = { name: 'GameOver', message: 'Game is over.' };
      let result = getPickupResult(match, playerNumber, touchedPieceId);
      expect(result).toEqual(expected);
    });
  });

  describe('when not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let touchedPieceId = 12;
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      let result = getPickupResult(match, playerNumber, touchedPieceId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece is selected', () => {
    it('returns a PieceAlreadySelected result', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 12;
      let expected = { name: 'PieceAlreadySelected', message: '' };
      let result = getPickupResult(match, playerNumber, touchedPieceId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece does not exist', () => {
    it('returns a PieceNotFound result', () => {
      let match = pieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 12;
      let expected = { name: 'PieceNotFound', message: 'Piece does not exist.' };
      let result = getPickupResult(match, playerNumber, touchedPieceId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece is found', () => {
    it('returns a PieceSelected result', () => {
      let match = pieceInHandMatch();
      let playerNumber = 1;
      let touchedPieceId = 17;
      let expected = { name: 'PieceSelected', message: '' };
      let result = getPickupResult(match, playerNumber, touchedPieceId);
      expect(result).toEqual(expected);
    });
  });
});

describe('gameOver', () => {
  it('returns true if there is a winner', () => {
    let match = winnerMatch();
    let result = gameOver(match);
    expect(result).toBe(true);
  });

  it('returns false if there is no winner', () => {
    let match = defaultMatch();
    let result = gameOver(match);
    expect(result).toBe(false);
  });
});

describe('playersTurn', () => {
  it('returns true if it is the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = playersTurn(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if it is not the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let result = playersTurn(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('selectedPieceInHandExists', () => {
  it('returns true if there is a piece in hand selected', () => {
    let match = selectedPieceInHandMatch();
    let result = selectedPieceInHandExists(match);
    expect(result).toBe(true);
  });

  it('returns false if there is no piece in hand selected', () => {
    let match = pieceInHandMatch();
    let result = selectedPieceInHandExists(match);
    expect(result).toBe(false);
  });
});

describe('selectedPieceInHand', () => {
  it('returns the piece if the piece is selected', () => {
    let match = selectedPieceInHandMatch();
    let expected = { id: 17, playerNumber: 1, type: 'fuhyou', selected: true };
    let result = selectedPieceInHand(match);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no piece selected', () => {
    let match = pieceInHandMatch();
    let result = selectedPieceInHand(match);
    expect(result).toBe(undefined);
  });
});

describe('pieceNotFound', () => {
  it('returns true if there is no piece matching the id', () => {
    let match = pieceInHandMatch();
    let touchedPieceId = 12;
    let result = pieceNotFound(match, touchedPieceId);
    expect(result).toBe(true);
  });

  it('returns false if there is a piece matching the id', () => {
    let match = pieceInHandMatch();
    let touchedPieceId = 17;
    let result = pieceNotFound(match, touchedPieceId);
    expect(result).toBe(false);
  });
});

