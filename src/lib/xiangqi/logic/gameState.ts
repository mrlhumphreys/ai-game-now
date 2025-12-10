import type Square from '$lib/xiangqi/interfaces/Square';
import type GameState from '$lib/xiangqi/interfaces/GameState';

import diff from '$lib/utils/diff';
import deepClone from '$lib/utils/deepClone';

import {
  destinations,
} from '$lib/xiangqi/logic/piece';
import {
  occupied,
  addPiece,
  removePiece,
  select,
  deselect
} from '$lib/xiangqi/logic/square';
import {
  findSelected,
  findById,
  findKingForPlayer,
  threatenedBy,
  threatsToSquare,
  pinnedToSquare,
  between,
  occupiedByPlayer,
  excludingPieceType
} from '$lib/xiangqi/logic/squareSet';

export const gameOver = function(gameState: GameState): boolean {
  return inCheckmate(gameState, 1) || inCheckmate(gameState, 2) || inStalemate(gameState, 1) || inStalemate(gameState, 2);
};

export const selectedSquare = function(gameState: GameState): Square | undefined {
  return findSelected(gameState.squares);
};

export const findSquare = function(gameState: GameState, id: string): Square | undefined {
  return findById(gameState.squares, id);
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

export const inStalemate = function(gameState: GameState, playerNumber: number): boolean {
  let nonKingSquares = excludingPieceType(occupiedByPlayer(gameState.squares, playerNumber), ['king']);
  return kingCannotMove(gameState, playerNumber) && nonKingSquares.every((s) => {
    if (s.piece !== null) {
      let pieceDestinations = destinations(s.piece, s, gameState);
      return pieceDestinations.length === 0;
    } else {
      return true;
    }
  });
};

export const inCheckmate = function(gameState: GameState, playerNumber: number): boolean {
  return inCheck(gameState, playerNumber) && (kingCannotMove(gameState, playerNumber) && !threatsToKingCanBeCaptured(gameState, playerNumber) && !threatsToKingCanBeBlocked(gameState, playerNumber));
};

export const inCheck = function(gameState: GameState, playerNumber: number): boolean {
  let kingSquare = findKingForPlayer(gameState.squares, playerNumber);
  if (kingSquare !== undefined) {
    let threatenedBySquares = threatenedBy(gameState.squares, opponentOf(playerNumber), gameState);
    return threatenedBySquares.includes(kingSquare);
  } else {
    return false;
  }
};

export const threatsToKingCanBeCaptured = function(gameState: GameState, playerNumber: number): boolean {
  // player number - owner of king
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let kingSquare = findKingForPlayer(gameState.squares, playerNumber);
  if (kingSquare !== undefined) {
    let threatsToKing = threatsToSquare(gameState.squares, kingSquare, playerNumber, gameState);
    let pinnedToKing = pinnedToSquare(gameState.squares, kingSquare, playerNumber, gameState);
    return threatsToKing.every((threat) => {
      // can any threat be captured by player number
      let threatsToThreats = threatsToSquare(gameState.squares, threat, opposingPlayer, gameState);
      // exclude threat to threats that are pinned
      return diff(threatsToThreats, pinnedToKing).length > 0;
    });
  } else {
    return true;
  }
};

export const threatsToKingCanBeBlocked = function(gameState: GameState, playerNumber: number): boolean {
  // player number - owner of king
  let opposingPlayer = playerNumber === 2 ? 1 : 2;
  let kingSquare = findKingForPlayer(gameState.squares, playerNumber);
  if (kingSquare !== undefined) {
    let threatsToKing = threatsToSquare(gameState.squares, kingSquare, playerNumber, gameState);
    let pinnedToKing = pinnedToSquare(gameState.squares, kingSquare, playerNumber, gameState);
    return threatsToKing.every((threat) => {
      // check if threat can be blocked
      if (kingSquare !== undefined) {
        let betweenSquares = between(gameState.squares, threat, kingSquare);
        return betweenSquares.some((b) => {
          let threatsToBetween = threatsToSquare(gameState.squares, b, opposingPlayer, gameState);
          // exclude threat to threats that are pinned
          let hasThreats = diff(threatsToBetween, pinnedToKing).length > 0;
          return hasThreats;
        });
      } else {
        return false;
      }
    });
  } else {
    return true;
  }
};

export const kingCannotMove = function(gameState: GameState, playerNumber: number): boolean {
  let kingSquare = findKingForPlayer(gameState.squares, playerNumber);
  if (kingSquare !== undefined && kingSquare.piece !== null) {
    let kingDestinations = destinations(kingSquare.piece, kingSquare, gameState);
    return kingDestinations.every((d: Square) => {
      if (kingSquare !== undefined) {
        let duplicate = deepClone(gameState);
        move(duplicate, kingSquare.id, d.id);
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
  if (inCheckmate(gameState, 1) || inStalemate(gameState, 1)) {
    return 2;
  } else if (inCheckmate(gameState, 2) || inStalemate(gameState, 2)) {
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
    performMove(gameState, fromId, toId);
    // if there is a capture, or the piece that moved is pawn, reset the halfmove
    if (capturedId !== undefined || (to.piece !== null && to.piece.type === 'soldier')) {
      gameState.halfmove = 0;
    } else {
      gameState.halfmove += 1;
    }

    return true;
  } else {
    return false;
  }
};

export const performMove = function(gameState: GameState, fromId: string, toId: string): boolean {
  if (fromId !== toId) {
    let from = findById(gameState.squares, fromId);
    let to = findById(gameState.squares, toId);
    if (from !== undefined && to !== undefined) {
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

export const passTurn = function(gameState: GameState): boolean {
  if (gameState.currentPlayerNumber === 1) {
    gameState.currentPlayerNumber = 2;
  } else {
    gameState.fullmove += 1;
    gameState.currentPlayerNumber = 1;
  }
  return true;
};
