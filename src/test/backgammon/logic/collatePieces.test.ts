import { describe, it, expect } from 'vitest';
import collatePieces from '$lib/backgammon/logic/collatePieces';
import buildMatchAttributes from '$lib/backgammon/logic/buildMatchAttributes';

describe('with a match', () => {
  it('it collates all the pieces on points, bar and off board', () => {
    let match = buildMatchAttributes(1);
    let result = collatePieces(match);
    let expected = [
      {
        piece: { id: 1, playerNumber: 1 },
        point: { number: 1, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 2, playerNumber: 1 },
        point: { number: 1, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 3, playerNumber: 2 },
        point: { number: 6, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 4, playerNumber: 2 },
        point: { number: 6, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 5, playerNumber: 2 },
        point: { number: 6, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 6, playerNumber: 2 },
        point: { number: 6, selected: false },
        pieceIndex: 3
      },
      {
        piece: { id: 7, playerNumber: 2 },
        point: { number: 6, selected: false },
        pieceIndex: 4
      },
      {
        piece: { id: 8, playerNumber: 2 },
        point: { number: 8, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 9, playerNumber: 2 },
        point: { number: 8, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 10, playerNumber: 2 },
        point: { number: 8, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 11, playerNumber: 1 },
        point: { number: 12, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 12, playerNumber: 1 },
        point: { number: 12, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 13, playerNumber: 1 },
        point: { number: 12, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 14, playerNumber: 1 },
        point: { number: 12, selected: false },
        pieceIndex: 3
      },
      {
        piece: { id: 15, playerNumber: 1 },
        point: { number: 12, selected: false },
        pieceIndex: 4
      },
      {
        piece: { id: 16, playerNumber: 2 },
        point: { number: 13, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 17, playerNumber: 2 },
        point: { number: 13, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 18, playerNumber: 2 },
        point: { number: 13, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 19, playerNumber: 2 },
        point: { number: 13, selected: false },
        pieceIndex: 3
      },
      {
        piece: { id: 20, playerNumber: 2 },
        point: { number: 13, selected: false },
        pieceIndex: 4
      },
      {
        piece: { id: 21, playerNumber: 1 },
        point: { number: 17, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 22, playerNumber: 1 },
        point: { number: 17, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 23, playerNumber: 1 },
        point: { number: 17, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 24, playerNumber: 1 },
        point: { number: 19, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 25, playerNumber: 1 },
        point: { number: 19, selected: false },
        pieceIndex: 1
      },
      {
        piece: { id: 26, playerNumber: 1 },
        point: { number: 19, selected: false },
        pieceIndex: 2
      },
      {
        piece: { id: 27, playerNumber: 1 },
        point: { number: 19, selected: false },
        pieceIndex: 3
      },
      {
        piece: { id: 28, playerNumber: 1 },
        point: { number: 19, selected: false },
        pieceIndex: 4
      },
      {
        piece: { id: 29, playerNumber: 2 },
        point: { number: 24, selected: false },
        pieceIndex: 0
      },
      {
        piece: { id: 30, playerNumber: 2 },
        point: { number: 24, selected: false },
        pieceIndex: 1
      }
    ];
    expect(result).toEqual(expected);
  });
});
