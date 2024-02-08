import { describe, it, expect } from 'vitest';
import type Square from '$lib/checkers/interfaces/Square';
import selectedGameState from '../fixtures/selectedGameState';
import defaultGameState from '../fixtures/defaultGameState';
import playerOneNoMovesGameState from '../fixtures/playerOneNoMovesGameState';
import playerTwoNoMovesGameState from '../fixtures/playerTwoNoMovesGameState';
import markedGameState from '../fixtures/markedGameState';
import jumpGameState from '../fixtures/jumpGameState';
import promoteGameState from '../fixtures/promoteGameState';
import playerTwoGameState from '../fixtures/playerTwoGameState';
import doubleJumpLastLegGameState from '../fixtures/doubleJumpLastLegGameState';
import { 
  selectedSquare,
  winner,
  findSquareById,
  playersTurn,
  selectSquare,
  deselectSquares,
  markSquare,
  unmarkSquares,
  move,
  movePieces,
  passTurn
} from '$lib/checkers/logic/gameState';

describe('selectedSquare', () => {
  it('returns a square if it is selected', () => {
    let result = selectedSquare(selectedGameState()); 
    let expected = { id: 11, x: 2, y: 5, marked: false, piece: { id: 10, king: false, player_number: 1, selected: true } };
    expect(result).toEqual(expected);
  });

  it('returns undefined if it is not selected', () => {
    let result = selectedSquare(defaultGameState()); 
    let expected = undefined;
    expect(result).toEqual(expected);
  });
});

describe('winner', () => {
  it('returns player 1 if player 2 has no moves', () => {
    let result = winner(playerTwoNoMovesGameState());
    expect(result).toEqual(1);
  });

  it('returns player 2 if player 1 has no moves', () => {
    let result = winner(playerOneNoMovesGameState());
    expect(result).toEqual(2);
  });

  it('returns null if players still have moves', () => {
    let result = winner(defaultGameState());
    expect(result).toBe(null);
  });
});

describe('findSquareById', () => {
  it('must return square if id matches', () => {
    let result = findSquareById(defaultGameState(), 1);
    if (result !== undefined) {
      expect(result.id).toEqual(1);
    } else {
      expect(result).not.toBe(undefined);
    }
  });

  it('must return undefined if id does not match', () => {
    let result = findSquareById(defaultGameState(), -1);
    expect(result).toBe(undefined);
  });
});

describe('playersTurn', () => {
  it('returns true if it is the players turn', () => {
    let result = playersTurn(defaultGameState(), 1);
    expect(result).toBe(true);
  });

  it('returns false if it is not the players turn', () => {
    let result = playersTurn(defaultGameState(), 2);
    expect(result).toBe(false);
  });
});

describe('selectSquare', () => {
  it('must select the square if id matches', () => {
    let gameState = defaultGameState();
    let result = selectSquare(gameState, 1);
    expect(result).toBe(true);
    let square = gameState.squares.find(function(s: Square) { return s.id === 1; });
    if (square !== undefined && square.piece !== null) {
      expect(square.piece.selected).toBe(true);
    } else {
      expect(square).not.toBe(undefined);
    }
  });

  it('must not select the any square if id does not match', () => {
    let gameState = defaultGameState();
    let result = selectSquare(gameState, -1);
    expect(result).toBe(false);
    gameState.squares.forEach(function(s: Square) { 
      expect(s.piece !== null && s.piece.selected).toBe(false);
    });
  });
});

describe('deselectSquares', () => {
  it('must deselect squares', () => {
    let gameState = selectedGameState();
    let result = deselectSquares(gameState);
    expect(result).toBe(true);
    gameState.squares.forEach(function(s: Square) {
      expect(s.piece !== null && s.piece.selected).toBe(false);
    });
  });
});

describe('markSquare', () => {
  it('must mark the square if the id matches', () => {
    let gameState = defaultGameState();
    let result = markSquare(gameState, 13);
    expect(result).toBe(true);
    let square = gameState.squares.find(function(s: Square) {
      return s.id === 13;
    });
    if (square !== undefined) {
      expect(square.marked).toBe(true);
    } else {
      expect(square).not.toBe(undefined);
    }
  });

  it('must not mark any square if the id does not match', () => {
    let gameState = defaultGameState();
    let result = markSquare(gameState, -13);
    expect(result).toBe(false);
    gameState.squares.forEach(function(s: Square) {
      expect(s.marked).toBe(false);
    });
  });
});

describe('unmarkSquare', () => {
  it('unmarks marked squares', () => {
    let gameState = markedGameState();
    let result = unmarkSquares(gameState);
    expect(result).toBe(true);
    gameState.squares.forEach(function(s: Square) {
      expect(s.marked).toBe(false);
    });
  });
});

describe('move', () => {
  it('moves the piece', () => {
    let gameState = selectedGameState();
    let fromId = 11;
    let toIds = [15];
    let result = move(gameState, fromId, toIds);
    expect(result).toBe(true);

    let from = gameState.squares.find(function(s: Square) {
      return s.id === fromId;
    });
    if (from !== undefined) {
      expect(from.piece).toBe(null);
    } else {
      expect(from).not.toBe(undefined);
    }

    let to = gameState.squares.find(function(s: Square) {
      return s.id === toIds.slice(-1)[0];
    });
    if (to !== undefined && to.piece !== null) {
      expect(to.piece.id).toEqual(10);
    } else {
      expect(to).not.toBe(undefined);
    }
  });

  it('deselects squares', () => {
    let gameState = selectedGameState();
    let fromId = 11;
    let toIds = [15];
    move(gameState, fromId, toIds);

    gameState.squares.forEach(function(s: Square) {
      if (s.piece !== null) {
        expect(s.piece.selected).toBe(false);
      };
    });
  });

  it('passes the turn', () => {
    let gameState = selectedGameState();
    let fromId = 11;
    let toIds = [15];
    move(gameState, fromId, toIds);

    expect(gameState.current_player_number).toEqual(2);
  });

  it('unmarks squares', () => {
    let gameState = doubleJumpLastLegGameState();
    let fromId = 7;
    let toIds = [14, 23];
    let result = move(gameState, fromId, toIds);
    expect(result).toBe(true);
    gameState.squares.forEach(function(s: Square) {
      expect(s.marked).toBe(false);
    });
  });
});

describe('movePieces', () => {
  it('moves a piece', () => {
    let gameState = defaultGameState();
    let fromId = 11;
    let toIds = [15];
    let result = movePieces(gameState, fromId, toIds); 
    expect(result).toBe(true);

    let from = gameState.squares.find(function(s: Square) {
      return s.id === fromId;
    });
    if (from !== undefined) {
      expect(from.piece).toBe(null);
    } else {
      expect(from).not.toBe(undefined);
    }

    let to = gameState.squares.find(function(s: Square) {
      return s.id === toIds.slice(-1)[0];
    });
    if (to !== undefined && to.piece !== null) {
      expect(to.piece.id).toEqual(10);
    } else {
      expect(to).not.toBe(undefined);
    }
  });

  it('captures a piece', () => {
    let gameState = jumpGameState();
    let fromId = 15;
    let toIds = [22];
    let betweenId = 18; 
    let result = movePieces(gameState, fromId, toIds); 
    expect(result).toBe(true);

    let from = gameState.squares.find(function(s: Square) {
      return s.id === fromId;
    });
    if (from !== undefined) {
      expect(from.piece).toBe(null);
    } else {
      expect(from).not.toBe(undefined);
    }

    let to = gameState.squares.find(function(s: Square) {
      return s.id === toIds.slice(-1)[0];
    });
    if (to !== undefined && to.piece !== null) {
      expect(to.piece.id).toEqual(10);
    } else {
      expect(to).not.toBe(undefined);
    }

    let between = gameState.squares.find(function(s: Square) {
      return s.id === betweenId;
    });
    if (between !== undefined) {
      expect(between.piece).toBe(null);
    } else {
      expect(between).not.toBe(undefined);
    }
  });

  it('double jumps and captures two pieces', () => {
    let gameState = doubleJumpLastLegGameState();
    let fromId = 7;
    let toIds = [14, 23];
    let firstBetweenId = 10; 
    let secondBetweenId = 18; 
    let result = movePieces(gameState, fromId, toIds); 
    expect(result).toBe(true);

    let from = gameState.squares.find(function(s: Square) {
      return s.id === fromId;
    });
    if (from !== undefined) {
      expect(from.piece).toBe(null);
    } else {
      expect(from).not.toBe(undefined);
    }

    let to = gameState.squares.find(function(s: Square) {
      return s.id === toIds.slice(-1)[0];
    });
    if (to !== undefined && to.piece !== null) {
      expect(to.piece.id).toEqual(6);
    } else {
      expect(to).not.toBe(undefined);
    }

    let firstBetween = gameState.squares.find(function(s: Square) {
      return s.id === firstBetweenId;
    });
    if (firstBetween !== undefined) {
      expect(firstBetween.piece).toBe(null);
    } else {
      expect(firstBetween).not.toBe(undefined);
    }

    let secondBetween = gameState.squares.find(function(s: Square) {
      return s.id === secondBetweenId;
    });
    if (secondBetween !== undefined) {
      expect(secondBetween.piece).toBe(null);
    } else {
      expect(secondBetween).not.toBe(undefined);
    }
  });

  it('promotes', () => {
    let gameState = promoteGameState();
    let fromId = 26;
    let toIds = [30];
    let result = movePieces(gameState, fromId, toIds); 
    expect(result).toBe(true);
    
    let from = gameState.squares.find(function(s: Square) {
      return s.id === fromId;
    });
    if (from !== undefined) {
      expect(from.piece).toBe(null);
    } else {
      expect(from).not.toBe(undefined);
    }

    let to = gameState.squares.find(function(s: Square) {
      return s.id === toIds.slice(-1)[0];
    });
    if (to !== undefined && to.piece !== null) {
      expect(to.piece.id).toEqual(10);
      expect(to.piece.king).toBe(true);
    } else {
      expect(to).not.toBe(undefined);
    }
  });
});

describe('passTurn', () => {
  it('should set the player to 2 if currently 1', () => {
    let gameState = defaultGameState();
    let result = passTurn(gameState);
    expect(gameState.current_player_number).toEqual(2);
  });

  it('should set the player to 1 if currently 2', () => {
    let gameState = playerTwoGameState();
    let result = passTurn(gameState);
    expect(gameState.current_player_number).toEqual(1);
  });
});
