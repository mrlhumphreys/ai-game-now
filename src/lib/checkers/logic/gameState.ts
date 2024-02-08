import type GameState from '$lib/checkers/interfaces/GameState';
import type Square from '$lib/checkers/interfaces/Square';
import eachCons from '$lib/utils/eachCons';
import {
  selected,
  allMovesForPlayer,
  findById,
  filterByIds,
  deselectSquares as squaresDeselectSquares,
  unmarkSquares as squareUnmarkSquares,
  between
} from '$lib/checkers/logic/squareSet';
import {
  select,
  mark,
  lastRankForPlayer,
  promote
} from '$lib/checkers/logic/square';

export const selectedSquare = function(gameState: GameState): Square | undefined {
  return selected(gameState.squares);
};

export const winner = function(gameState: GameState): number | null {
  if (allMovesForPlayer(gameState.squares, 1).length === 0) {
    return 2;
  } else if (allMovesForPlayer(gameState.squares, 2).length === 0) {
    return 1;
  } else {
    return null;
  }
};

export const findSquareById = function(gameState: GameState, id: number): Square | undefined {
  return findById(gameState.squares, id);
};

export const filterSquaresByIds = function(gameState: GameState, ids: Array<number>): Array<Square> {
  return filterByIds(gameState.squares, ids);
};

export const playersTurn = function(gameState: GameState, playerNumber: number): boolean {
  return (gameState.current_player_number === playerNumber);
};

export const selectSquare = function(gameState: GameState, squareId: number): boolean {
  let square = findSquareById(gameState, squareId);
  if (square !== undefined) {
    return select(square);
  } else {
    return false;
  }
};

export const deselectSquares = function(gameState: GameState): boolean {
  return squaresDeselectSquares(gameState.squares);
};

export const markSquare = function(gameState: GameState, squareId: number): boolean {
  let square = findSquareById(gameState, squareId);
  if (square !== undefined) {
    return mark(square);
  } else {
    return false;
  }
};

export const unmarkSquares = function(gameState: GameState): boolean {
  return squareUnmarkSquares(gameState.squares);
};

export const move = function(gameState: GameState, fromId: number, toIds: Array<number>): boolean {
  return movePieces(gameState, fromId, toIds) && deselectSquares(gameState) && passTurn(gameState) && unmarkSquares(gameState);
};

export const movePieces = function(gameState: GameState, fromId: number, toIds: Array<number>): boolean {
  let from = findSquareById(gameState, fromId); 
  let tos = filterSquaresByIds(gameState, toIds);
  let last = tos.slice(-1)[0];
  let legs = [from].concat(tos);

  if (from !== undefined && last !== undefined) {
    // move piece to destination
    last.piece = from.piece;
    from.piece = null;

    // remove opposing piece from between jumps
    eachCons(legs, 2).forEach(function(leg) {
      let betweenSquare = between(gameState.squares, leg[0], leg[1])[0];
      if (betweenSquare !== undefined) {
        betweenSquare.piece = null;
      }
    });

    // promote
    if (lastRankForPlayer(last, gameState.current_player_number)) {
      promote(last);
    }

    return true;
  } else {
    return false;
  }
};

export const passTurn = function(gameState: GameState): boolean {
  if (gameState.current_player_number === 1) {
    gameState.current_player_number = 2;
  } else {
    gameState.current_player_number = 1;
  }
  return true;
};
