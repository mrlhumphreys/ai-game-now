import type Piece from '$lib/shogi/interfaces/Piece';
import type Square from '$lib/shogi/interfaces/Square';
import type GameState from '$lib/shogi/interfaces/GameState';

import diff from '$lib/utils/diff';
import deepClone from '$lib/utils/deepClone';

import {
  destinations,
  promotable,
  promote as piecePromote,
  hasLegalMovesFromY
} from '$lib/shogi/logic/piece';
import {
  occupied,
  promotionZone,
  addPiece,
  removePiece,
  select,
  deselect
} from '$lib/shogi/logic/square';
import {
  findSelected,
  findById,
  findOuForPlayer,
  threatenedBy,
  threatsToSquare,
  pinnedToSquare,
  between,
  occupiedByPlayer,
  excludingPieceType
} from '$lib/shogi/logic/squareSet';
import {
  findById as handFindById,
  pushPiece,
  popPiece,
  selectPiece as handSelectPiece,
  deselectPiece as handDeselectPiece
} from '$lib/shogi/logic/hand';

export const gameOver = function(gameState: GameState): boolean {
  return inCheckmate(gameState, 1) || inCheckmate(gameState, 2);
};

export const selectedSquare = function(gameState: GameState): Square | undefined {
  return findSelected(gameState.squares); 
};

export const selectedPieceInHand = function(gameState: GameState): Piece | undefined {
  let hand = gameState.hands.find(function(h) { return h.playerNumber == gameState.currentPlayerNumber; });
  if (hand !== undefined) {
    return hand.pieces.find(function(p) { return p.selected });
  } else {
    return undefined;
  }
};

export const findSquare = function(gameState: GameState, id: string): Square | undefined {
  return findById(gameState.squares, id);
};

export const findPieceInHand = function(gameState: GameState, id: number): Piece | undefined {
  let hand = gameState.hands.find(function(h) { return h.playerNumber == gameState.currentPlayerNumber; });
  if (hand !== undefined) {
    return handFindById(hand, id);
  } else {
    return undefined;
  }
};

export const playersTurn = function(gameState: GameState, playerNumber: number): boolean {
  return gameState.currentPlayerNumber === playerNumber;
};

export const capturedSquare = function(to: Square): Square | undefined {
  if (occupied(to)) {
    return to;
  } else {
    return undefined;
  }
};

export const capturedSquareId = function(to: Square): string | undefined {
  let square = capturedSquare(to);
  if (square !== undefined) {
    return square.id;
  } else {
    return undefined;
  }
};

export const pieceMovedToPromotionZone = function(from: Square, to: Square): boolean {
  let piece = from.piece;

  if (piece !== null) {
    return promotionZone(to, piece.playerNumber);
  } else {
    return false;
  }
};

export const inCheckmate = function(gameState: GameState, playerNumber: number): boolean {
  return inCheck(gameState, playerNumber) && (ouCannotMove(gameState, playerNumber) && !threatsToOuCanBeCaptured(gameState, playerNumber) && !threatsToOuCanBeBlocked(gameState, playerNumber));
};

export const inCheck = function(gameState: GameState, playerNumber: number): boolean {
  let ouSquare = findOuForPlayer(gameState.squares, playerNumber);
  if (ouSquare !== undefined) {
    let threatenedBySquares = threatenedBy(gameState.squares, opponentOf(playerNumber), gameState);
    return threatenedBySquares.includes(ouSquare);
  } else {
    return false;
  }
};

export const threatsToOuCanBeCaptured = function(gameState: GameState, playerNumber: number): boolean {
  // player number - owner of ou
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let ouSquare = findOuForPlayer(gameState.squares, playerNumber);
  if (ouSquare !== undefined) {
    let threatsToOu = threatsToSquare(gameState.squares, ouSquare, playerNumber, gameState);
    let pinnedToOu = pinnedToSquare(gameState.squares, ouSquare, playerNumber, gameState);
    return threatsToOu.every((threat) => {
      // can any threat be captured by player number    
      let threatsToThreats = threatsToSquare(gameState.squares, threat, opposingPlayer, gameState);
      // exclude threat to threats that are pinned
      return diff(threatsToThreats, pinnedToOu).length > 0;
    });
  } else {
    return true;
  }
};

export const threatsToOuCanBeBlocked = function(gameState: GameState, playerNumber: number): boolean {
  // player number - owner of ou
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let ouSquare = findOuForPlayer(gameState.squares, playerNumber);
  let playerHand = gameState.hands.find((h) => {
    return h.playerNumber === playerNumber; 
  });
  if (ouSquare !== undefined) {
    let threatsToOu = threatsToSquare(gameState.squares, ouSquare, playerNumber, gameState);
    let pinnedToOu = pinnedToSquare(gameState.squares, ouSquare, playerNumber, gameState);
    return threatsToOu.every((threat) => {
      // check if threat can be blocked 
      if (ouSquare !== undefined) { 
        let betweenSquares = between(gameState.squares, threat, ouSquare);
        return betweenSquares.some((b) => {
          if (playerHand !== undefined) {
            let threatsToBetween = threatsToSquare(gameState.squares, b, opposingPlayer, gameState);
            // exclude threat to threats that are pinned
            let hasThreats = diff(threatsToBetween, pinnedToOu).length > 0;
            let canDrop = playerHand.pieces.some((p) => {
              return hasLegalMovesFromY(p, b.y);
            });
            return hasThreats || canDrop;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    });
  } else {
    return true;
  }
};

export const ouCannotMove = function(gameState: GameState, playerNumber: number): boolean {
  let ouSquare = findOuForPlayer(gameState.squares, playerNumber);
  if (ouSquare !== undefined && ouSquare.piece !== null) {
    let ouDestinations = destinations(ouSquare.piece, ouSquare, gameState); 
    return ouDestinations.every((d: Square) => {
      if (ouSquare !== undefined) {
        let duplicate = deepClone(gameState);
        move(duplicate, ouSquare.id, d.id);
        return inCheck(duplicate, playerNumber);
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

export const winner = function(gameState: GameState): number | null {
  if (inCheckmate(gameState, 1)) {
    return 2;
  } else if (inCheckmate(gameState, 2)) {
    return 1;
  } else {
    return null;
  }
};

export const opponentOf = function(playerNumber: number): number {
  return playerNumber === 1 ? 2 : 1;
}

export const opponent = function(gameState: GameState): number {
  return opponentOf(gameState.currentPlayerNumber);
};

export const move = function(gameState: GameState, fromId: string, toId: string): boolean {
  let from = findById(gameState.squares, fromId);
  let to = findById(gameState.squares, toId);

  if (from !== undefined && to !== undefined) {
    let capturedId = capturedSquareId(to);
    performMove(gameState, fromId, toId, capturedId);
    return true;
  } else {
    return false;
  }
};

export const performMove = function(gameState: GameState, fromId: string, toId: string, capturedId: string | undefined): boolean {
  if (fromId !== toId) {
    let from = findById(gameState.squares, fromId);
    let to = findById(gameState.squares, toId);
    let captured = capturedId !== undefined ? findById(gameState.squares, capturedId) : undefined;
    if (from !== undefined && to !== undefined) {
      if (captured !== undefined) {
        let hand = gameState.hands.find((h) => {
          return from !== undefined && from.piece !== null && h.playerNumber === from.piece.playerNumber;
        });
        if (hand !== undefined && to.piece !== null) {
          pushPiece(hand, to.piece);
        }
      }
      if (from.piece !== null) {
        addPiece(to, from.piece);
        removePiece(from);
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const drop = function(gameState: GameState, pieceId: number, squareId: string): boolean {
  let hand = gameState.hands.find((h) => {
    return h.playerNumber === gameState.currentPlayerNumber; 
  });
  let square = findById(gameState.squares, squareId);

  if (hand !== undefined && square !== undefined) {
    let piece = popPiece(hand, pieceId);
    if (piece !== undefined) {
      addPiece(square, piece);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const selectPiece = function(gameState: GameState, squareId: string): boolean {
  let square = findSquare(gameState, squareId);
  if (square !== undefined) {
    return select(square);
  } else {
    return false;
  }
};

export const deselectPiece = function(gameState: GameState, squareId: string): boolean {
  let square = findSquare(gameState, squareId);
  if (square !== undefined) {
    return deselect(square);
  } else {
    return false;
  }
};

export const selectPieceInHand = function(gameState: GameState, pieceId: number): boolean {
  let hand = gameState.hands.find((h) => {
    return h.playerNumber === gameState.currentPlayerNumber; 
  });

  if (hand !== undefined) {
    return handSelectPiece(hand, pieceId);
  } else {
    return false;
  }
};

export const deselectPieceInHand = function(gameState: GameState, pieceId: number): boolean {
  let hand = gameState.hands.find((h) => {
    return h.playerNumber === gameState.currentPlayerNumber; 
  });

  if (hand !== undefined) {
    return handDeselectPiece(hand, pieceId);
  } else {
    return false;
  }
}

export const promote = function(gameState: GameState, squareId: string): boolean {
  let square = findSquare(gameState, squareId);

  if (square !== undefined && square.piece !== null) {
    if (promotable(square.piece)) {
      return piecePromote(square.piece); 
    } else {
      return false;
    }
  } else {
    return false;
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
