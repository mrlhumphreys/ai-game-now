import { describe, it, expect } from 'vitest';

import {
  hasPiece,
  findById,
  selectedPiece,
  pushPiece,
  popPiece,
  selectPiece,
  deselectPiece
} from '$lib/shogi/logic/hand';

describe('hasPiece', () => {
  it('returns true if there is a piece matching the id', () => {
    let hand = { playerNumber: 1, pieces: [ { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false } ] };
    let result = hasPiece(hand, 12);
    expect(result).toBe(true);
  });

  it('returns false if there is no piece matching the id', () => {
    let hand = { playerNumber: 1, pieces: [ { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false } ] };
    let result = hasPiece(hand, 13);
    expect(result).toBe(false);
  });
});

describe('findById', () => {
  it('returns true if there is a piece matching the id', () => {
    let hand = { playerNumber: 1, pieces: [ { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false } ] };
    let expected = { id: 12, playerNumber: 2, type: 'fuhyou', selected: false };
    let result = findById(hand, 12);
    expect(result).toEqual(expected);
  });

  it('returns false if there is no piece matching the id', () => {
    let hand = { playerNumber: 1, pieces: [ { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false } ] };
    let result = findById(hand, 13);
    expect(result).toBe(undefined);
  });
});

describe('selectedPiece', () => {
  it('returns a the piece if a selected piece is found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: true },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expected = { id: 12, playerNumber: 2, type: 'fuhyou', selected: true };
    let result = selectedPiece(hand);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no selected piece is found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let result = selectedPiece(hand);
    expect(result).toBe(undefined);
  });
});

describe('pushPiece', () => {
  it('adds the piece in the hand, demotes and switches the player', () => {
    let hand = { playerNumber: 1, pieces: [ ] };
    let piece = { id: 12, playerNumber: 2, type: 'tokin' as const, selected: false };
    let result = pushPiece(hand, piece);
    let expectedPiece = { id: 12, playerNumber: 1, type: 'fuhyou', selected: false };
    expect(hand.pieces[0]).toEqual(expectedPiece);
    expect(result).toBe(true);
  });
});

describe('popPiece', () => {
  it('removes the specified piece and returns it if found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expectedHand = {
      playerNumber: 1,
      pieces: [
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let expectedPiece = { id: 12, playerNumber: 2, type: 'fuhyou', selected: false };
    let result = popPiece(hand, 12);
    expect(result).toEqual(expectedPiece);
    expect(hand).toEqual(expectedHand);
  });

  it('does not remove any piece and returns undefined', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expected_hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou', selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let result = popPiece(hand, 14);
    expect(result).toBe(undefined);
    expect(hand).toEqual(expected_hand);
  });
});

describe('selectPiece', () => {
  it('marks the piece as selected and returns true if found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expectedHand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou', selected: true },
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let result = selectPiece(hand, 12);
    expect(result).toBe(true);
    expect(hand).toEqual(expectedHand);
  });

  it('does not mark any piece and returns false if not found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expectedHand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou', selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let result = selectPiece(hand, 14);
    expect(result).toBe(false);
    expect(hand).toEqual(expectedHand);
  });
});

describe('deselectPiece', () => {
  it('unmarks the piece as selected and returns true if found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: true },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expectedHand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou', selected: false },
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let result = deselectPiece(hand, 12);
    expect(result).toBe(true);
    expect(hand).toEqual(expectedHand);
  });

  it('does not unmark any piece and returns false if not found', () => {
    let hand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou' as const, selected: true },
        { id: 13, playerNumber: 2, type: 'fuhyou' as const, selected: false }
      ]
    };
    let expectedHand = {
      playerNumber: 1,
      pieces: [
        { id: 12, playerNumber: 2, type: 'fuhyou', selected: true },
        { id: 13, playerNumber: 2, type: 'fuhyou', selected: false }
      ]
    };
    let result = deselectPiece(hand, 14);
    expect(result).toBe(false);
    expect(hand).toEqual(expectedHand);
  });
});
