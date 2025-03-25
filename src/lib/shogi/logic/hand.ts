import type Piece from '$lib/shogi/interfaces/Piece';
import type Hand from '$lib/shogi/interfaces/Hand';

import {
  demote,
  switchPlayer,
  select,
  deselect
} from '$lib/shogi/logic/piece';

export const hasPiece = function(hand: Hand, id: number): boolean {
  let piece = findById(hand, id);
  return piece !== undefined;
};

export const findById = function(hand: Hand, id: number): Piece | undefined {
  return hand.pieces.find((p) => {
    return p.id === id;
  });
};

export const selectedPiece = function(hand: Hand): Piece | undefined {
  return hand.pieces.find((p) => {
    return p.selected;
  });
};

export const pushPiece = function(hand: Hand, piece: Piece): boolean {
  demote(piece);
  switchPlayer(piece);
  hand.pieces.push(piece);
  return true;
};

export const popPiece = function(hand: Hand, pieceId: number): Piece | undefined {
  let piece = hand.pieces.find((p) => {
    return p.id === pieceId;
  });

  if (piece !== undefined) {
    let index = hand.pieces.findIndex((p) => {
      return p.id === pieceId;
    });
    hand.pieces.splice(index, 1);
    return piece;
  } else {
    return undefined;
  }
};

export const selectPiece = function(hand: Hand, pieceId: number): boolean {
  let piece = findById(hand, pieceId);

  if (piece !== undefined) {
    return select(piece);
  } else {
    return false;
  }
};

export const deselectPiece = function(hand: Hand, pieceId: number): boolean {
  let piece = findById(hand, pieceId);

  if (piece !== undefined) {
    return deselect(piece);
  } else {
    return false;
  }
};
