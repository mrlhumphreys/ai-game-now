import type Square from '$lib/chess/interfaces/Square';
import type GameState from '$lib/chess/interfaces/GameState';

import deepClone from '$lib/utils/deepClone';
import {
  directionX,
  distance
} from '$lib/chess/logic/vector';
import {
  kingCastle,
  destinations
} from '$lib/chess/logic/piece';
import {
  occupied,
  point,
  lastRank,
  addPiece,
  removePiece,
  select,
  deselect,
  promote as squarePromote
} from '$lib/chess/logic/square';
import {
  includes,
  findSelected,
  findById,
  findByPieceId,
  findByCoordinate,
  findKingForPlayer,
  threatenedBy,
  occupiedByPlayer
} from '$lib/chess/logic/squareSet';

interface Move {
  fromId: string;
  toId: string;
}

export const gameOver = function(gameState: GameState): boolean {
  return inCheckmate(gameState, 1) || inCheckmate(gameState, 2) || inStalemate(gameState, 1) || inStalemate(gameState, 2);
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

export const playersTurn = function(gameState: GameState, playerNumber: number): boolean {
  return gameState.currentPlayerNumber === playerNumber;
};

export const opponentOf = function(playerNumber: number): number {
  return playerNumber === 1 ? 2 : 1;
};

export const opponent = function(gameState: GameState): number {
  return opponentOf(gameState.currentPlayerNumber);
};

export const selectedSquare = function(gameState: GameState): Square | undefined {
  return findSelected(gameState.squares);
};

export const findSquare = function(gameState: GameState, id: string): Square | undefined {
  return findById(gameState.squares, id);
};

export const capturedSquare = function(gameState: GameState, from: Square, to: Square): Square | undefined {
  if (occupied(to)) {
    return to;
  } else if (gameState.lastDoubleStepPawnId !== null && from.piece !== null && from.piece.type === 'pawn') {
    let opposingSquare = findByPieceId(gameState.squares, gameState.lastDoubleStepPawnId);
    // moving from square in same rank as opposing piece
    // and moving to same file i.e. moving behind diagonally
    if (opposingSquare !== undefined && opposingSquare.x === to.x && opposingSquare.y === from.y) {
      return opposingSquare;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const capturedSquareId = function(gameState: GameState, from: Square, to: Square): string | undefined {
  let square = capturedSquare(gameState, from, to);
  if (square !== undefined) {
    return square.id;
  } else {
    return undefined;
  }
};

export const inStalemate = function(gameState: GameState, playerNumber: number): boolean {
  return !inCheck(gameState, playerNumber) && occupiedByPlayer(gameState.squares, playerNumber).every((from) => {
    if (from.piece !== null) {
      return destinations(from.piece, from, gameState).every((to) => {
        let newState = deepClone(gameState);
        move(newState, from.id, to.id);
        return inCheck(newState, playerNumber);
      });
    } else {
      return false;
    }
  });
};

export const inCheckmate = function(gameState: GameState, playerNumber: number): boolean {
  return inCheck(gameState, playerNumber) && occupiedByPlayer(gameState.squares, playerNumber).every((from) => {
    if (from.piece !== null) {
      return destinations(from.piece, from, gameState).every((to) => {
        let newState = deepClone(gameState);
        move(newState, from.id, to.id);
        return inCheck(newState, playerNumber);
      });
    } else {
      return false;
    }
  });
};

export const inCheck = function(gameState: GameState, playerNumber: number): boolean {
  let kingSquare = findKingForPlayer(gameState.squares, playerNumber);
  if (kingSquare !== undefined) {
    let threatened = threatenedBy(gameState.squares, opponentOf(playerNumber), gameState);
    return includes(threatened, kingSquare);
  } else {
    return false;
  }
};

export const rookCastleMove = function(gameState: GameState, from: Square, to: Square): Move | null {
  if (from.piece !== null && from.piece.type === 'king' && includes(kingCastle(from.piece, from, gameState), to)) {
    let direction = directionX(point(from), point(to));

    let rookFromX = direction > 0 ? 7 : 0;
    let rookFromY = from.y;
    let rookFrom = findByCoordinate(gameState.squares, rookFromX, rookFromY);

    let rookToX = direction > 0 ? from.x + 1 : from.x - 1;
    let rookToY = from.y;
    let rookTo = findByCoordinate(gameState.squares, rookToX, rookToY);

    if (rookFrom !== undefined && rookTo !== undefined) {
      return { fromId: rookFrom.id, toId: rookTo.id };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const pawnMoveToLastRank = function(gameState: GameState, from: Square, to: Square): boolean {
  return from.piece !== null && from.piece.type === 'pawn' && lastRank(to, from.piece.playerNumber);
};

// simple move: a -> b
export const performMove = function(gameState: GameState, fromId: string, toId: string, capturedId: string | undefined): boolean {
  let from = findById(gameState.squares, fromId);
  let to = findById(gameState.squares, toId);
  let captured = capturedId !== undefined ? findById(gameState.squares, capturedId) : undefined;

  if (from !== undefined && to !== undefined) {
    if (captured !== undefined) {
      removePiece(captured);
    }
    if (from.piece !== null) {
      addPiece(to, from.piece);
      removePiece(from);
      if (to.piece !== null) {
        to.piece.hasMoved = true;
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// complete move: handle en passant, castle, etc
export const move = function(gameState: GameState, fromId: string, toId: string): boolean {
  let from = findById(gameState.squares, fromId); 
  let to = findById(gameState.squares, toId); 

  if (from !== undefined && to !== undefined) {

    let rookMove = rookCastleMove(gameState, from, to);

    if (rookMove !== null) {
      // move rook
      performMove(gameState, rookMove.fromId, rookMove.toId, undefined);
    }

    let capturedId = capturedSquareId(gameState, from, to);
    performMove(gameState, fromId, toId, capturedId);

    // set this after move so that it doesn't think en passant happened
    if (to.piece !== null && to.piece.type === 'pawn' && distance(point(from), point(to)) === 2) {
      gameState.lastDoubleStepPawnId = to.piece.id;
    } else {
      gameState.lastDoubleStepPawnId = null;
    }

    return true;
  } else {
    return false;
  }
};

export const selectPiece = function(gameState: GameState, squareId: string): boolean {
  let square = findById(gameState.squares, squareId);
  if (square !== undefined) {
    return select(square);
  } else {
    return false;
  }
};

export const deselectPiece = function(gameState: GameState): boolean {
  let square = selectedSquare(gameState);
  if (square !== undefined) {
    return deselect(square);
  } else {
    return false;
  }
};

export const promote = function(gameState: GameState, squareId: string, pieceType: string): boolean {
  let square = findById(gameState.squares, squareId);
  if (square !== undefined) {
    return squarePromote(square, pieceType);
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

