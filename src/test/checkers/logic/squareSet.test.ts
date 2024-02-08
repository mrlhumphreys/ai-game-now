import { describe, it, expect } from 'vitest';
import type Square from '$lib/checkers/interfaces/Square';
import { 
  findById,
  findByCoordinate,
  selected,
  difference,
  occupiedByPlayer,
  squaresAwayFrom,
  inDirectionOf,
  occupied,
  unoccupied,
  occupiedByOpponentOf,
  between,
  diagonal,
  orthogonal,
  orthogonalOrDiagonal,
  allMovesForPlayer,
  allPossibleJumps,
  allPossibleMoves,
  deselectSquares,
  unmarkSquares,
  filterByIds
} from '$lib/checkers/logic/squareSet';

describe('findById', () => {
  it('must return the square matching the id', () => {
    let squareA = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let squareB = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      squareA,
      squareB
    ];
    expect(findById(squares, 1)).toEqual(squareA);
  });
});

describe('filterByIds', () => {
  it('must return squares matching the ids', () => {
    let squareA = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let squareB = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squareC = { id: 3, x: 3, y: 3, marked: false, piece: null }; 
    let squares = [
      squareA,
      squareB,
      squareC
    ];
    let expected = [
      squareA,
      squareB
    ];
    expect(filterByIds(squares, [1, 2])).toEqual(expected);
  });
});

describe('findByCoordinate', () => {
  it('must return the square with the same x and y coordinate', () => {
    let squareA = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let squareB = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      squareA,
      squareB
    ];
    expect(findByCoordinate(squares, 1, 1)).toEqual(squareA);
  });
});

describe('selected', () => {
  it('must return only the squares with pieces that are selected', () => {
    let squareSelected = { id: 1, x: 1, y: 1, marked: false, piece: { id: 1, player_number: 1, king: false, selected: true } }; 
    let squareUnselected = { id: 2, x: 2, y: 2, marked: false, piece: { id: 2, player_number: 2, king: false, selected: false } }; 
    let squareEmpty = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      squareSelected,
      squareUnselected,
      squareEmpty
    ];
    let expected = squareSelected;
    let result = selected(squares);
    expect(result).toEqual(expected);
  });
});

describe('difference', () => {
  it('must return squares in A that are not in B', () => {
    let squareA = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let squareAB = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squareB = { id: 3, x: 3, y: 3, marked: false, piece: null }; 
    let squaresA = [
      squareA,
      squareAB
    ];
    let squaresB = [
      squareAB,
      squareB
    ];
    let expected = [
      squareA
    ];
    let result = difference(squaresA, squaresB);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByPlayer', () => {
  it('should return squares occupied by the player', () => {
    let occupiedByPlayerOne = { id: 1, x: 1, y: 1, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let occupiedByPlayerTwo = { id: 2, x: 1, y: 2, marked: false, piece: { id: 1, player_number: 2, king: false, selected: false } }; 
    let unoccupiedByPlayer = { id: 2, x: 1, y: 2, marked: false, piece: null }; 
    let squares = [
      occupiedByPlayerOne,
      occupiedByPlayerTwo,
      unoccupiedByPlayer
    ];
    let expected = [
      occupiedByPlayerOne
    ];
    let result = occupiedByPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('squaresAwayFrom', () => {
  it('must return only n squares away from origin', () => {
    let origin = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let underRange = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let atRange = { id: 3, x: 3, y: 3, marked: false, piece: null }; 
    let overRange = { id: 4, x: 4, y: 4, marked: false, piece: null }; 
    let squares = [
      origin,
      underRange,
      atRange,
      overRange
    ];
    let expected = [
      atRange
    ];
    let result = squaresAwayFrom(squares, 2, origin);
    expect(result).toEqual(expected);
  });
});

describe('inDirectionOf', () => {
  describe('king', () => {
    it('must return squares in all directions', () => {
      let piece = { id: 1, player_number: 1, king: true, selected: false }; 
      let origin = { id: 1, x: 4, y: 4, marked: false, piece: piece }; 
      let forwardDirection = { id: 2, x: 3, y: 3, marked: false, piece: null }; 
      let backwardDirection = { id: 3, x: 5, y: 5, marked: false, piece: null }; 
      let squares = [
        origin,
        forwardDirection,
        backwardDirection
      ];
      let expected = [
        origin,
        forwardDirection,
        backwardDirection
      ];
      let result = inDirectionOf(squares, piece, origin);
      expect(result).toEqual(expected);
    });
  });

  describe('non-king', () => {
    it('must return squares in forwards direction', () => {
      let piece = { id: 1, player_number: 1, king: false, selected: false }; 
      let origin = { id: 1, x: 4, y: 4, marked: false, piece: piece }; 
      let forwardDirection = { id: 2, x: 3, y: 3, marked: false, piece: null }; 
      let backwardDirection = { id: 3, x: 5, y: 5, marked: false, piece: null }; 
      let squares = [
        origin,
        forwardDirection,
        backwardDirection
      ];
      let expected = [
        forwardDirection
      ];
      let result = inDirectionOf(squares, piece, origin);
      expect(result).toEqual(expected);
    });
  });
});

describe('occupied', () => {
  it('must only return occupied squares', () => {
    let piece = { id: 1, player_number: 1, king: false, selected: false }; 
    let occupiedSquare = { id: 1, x: 1, y: 1, marked: false, piece: piece };
    let unoccupiedSquare = { id: 2, x: 2, y: 2, marked: false, piece: null };
    let squares = [
      occupiedSquare,
      unoccupiedSquare
    ];
    let expected = [
      occupiedSquare
    ];
    let result = occupied(squares);
    expect(result).toEqual(expected);
  });
});

describe('unoccupied', () => {
  it('must only return unoccupied squares', () => {
    let piece = { id: 1, player_number: 1, king: false, selected: false }; 
    let occupiedSquare = { id: 1, x: 1, y: 1, marked: false, piece: piece };
    let unoccupiedSquare = { id: 2, x: 2, y: 2, marked: false, piece: null };
    let squares = [
      occupiedSquare,
      unoccupiedSquare
    ];
    let expected = [
      unoccupiedSquare
    ];
    let result = unoccupied(squares);
    expect(result).toEqual(expected);
  });
});

describe('occupiedByOpponentOf', () => {
  it('must return squares occupied by opponent of player', () => {
    let playerPiece = { id: 1, player_number: 1, king: false, selected: false }; 
    let occupiedByPlayerSquare = { id: 1, x: 1, y: 1, marked: false, piece: playerPiece };
    let opponentPiece = { id: 2, player_number: 2, king: false, selected: false }; 
    let occupiedByOpponentSquare = { id: 2, x: 1, y: 1, marked: false, piece: opponentPiece };
    let unoccupiedSquare = { id: 3, x: 2, y: 2, marked: false, piece: null };
    let squares = [
      occupiedByPlayerSquare,
      occupiedByOpponentSquare,
      unoccupiedSquare
    ];
    let expected = [
      occupiedByOpponentSquare 
    ];
    let result = occupiedByOpponentOf(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('between', () => {
  it('must return squares between from and to', () => {
    let origin = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let betweenSquare = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let destination = { id: 3, x: 3, y: 3, marked: false, piece: null }; 
    let squares = [
      origin,
      betweenSquare,
      destination
    ];
    let expected = [
      betweenSquare
    ];
    let result = between(squares, origin, destination);
    expect(result).toEqual(expected);
  });
});

describe('diagonal', () => {
  it('must return squares diagonal to origin', () => {
    let origin = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let orthogonalSquare = { id: 2, x: 1, y: 2, marked: false, piece: null }; 
    let diagonalSquare = { id: 3, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      origin,
      orthogonalSquare,
      diagonalSquare
    ]; 
    let expected = [
      diagonalSquare 
    ];
    let result = diagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('orthogonal', () => {
  it('must return squares orthogonal to origin', () => {
    let origin = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let orthogonalSquare = { id: 2, x: 1, y: 2, marked: false, piece: null }; 
    let diagonalSquare = { id: 3, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      origin,
      orthogonalSquare,
      diagonalSquare
    ]; 
    let expected = [
      orthogonalSquare 
    ];
    let result = orthogonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('orthogonalOrDiagonal', () => {
  it('must return squares orthogonal or diagonal to origin', () => {
    let origin = { id: 1, x: 1, y: 1, marked: false, piece: null }; 
    let orthogonalSquare = { id: 2, x: 1, y: 2, marked: false, piece: null }; 
    let diagonalSquare = { id: 3, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      origin,
      orthogonalSquare,
      diagonalSquare
    ]; 
    let expected = [
      orthogonalSquare, 
      diagonalSquare
    ];
    let result = orthogonalOrDiagonal(squares, origin);
    expect(result).toEqual(expected);
  });
});

describe('allMovesForPlayer', () => {
  it('must return all squares with possible jumps if there are jumps', () => {
    let origin = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let opponentSquare = { id: 2, x: 2, y: 2, marked: false, piece: { id: 2, player_number: 2, king: false, selected: false } }; 
    let jumpSquare = { id: 3, x: 1, y: 1, marked: false, piece: null }; 
    let squares = [
      origin,
      opponentSquare,
      jumpSquare
    ];
    let expected = [
      origin 
    ];
    let result = allMovesForPlayer(squares, 1);
    expect(result).toEqual(expected);
  });

  it('must return all squares with possible moves if there are no jumps', () => {
    let origin = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let destinationSquare = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let squares = [
      origin,
      destinationSquare
    ];
    let expected = [
      origin 
    ];
    let result = allMovesForPlayer(squares, 1);
    expect(result).toEqual(expected);
  });

  it('must return no moves if there are no moves', () => {
    let origin = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let destinationSquare = { id: 2, x: 2, y: 2, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let squares = [
      origin,
      destinationSquare
    ];
    let expected: Array<Square> = [
    ];
    let result = allMovesForPlayer(squares, 1);
    expect(result).toEqual(expected);
  });
});

describe('allPossibleJumps', () => {
  it('returns all possible jumps', () => {
    let origin = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let opponentSquare = { id: 2, x: 2, y: 2, marked: false, piece: { id: 2, player_number: 2, king: false, selected: false } }; 
    let jumpSquare = { id: 3, x: 1, y: 1, marked: false, piece: null }; 
    let playerSquares = [
      origin
    ];
    let squares = [
      origin,
      opponentSquare,
      jumpSquare
    ];
    let expected = [
      origin 
    ];
    let result = allPossibleJumps(playerSquares, squares);
    expect(result).toEqual(expected);
  });
});

describe('allPossibleMoves', () => {
  it('returns all possible moves', () => {
    let origin = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let moveSquare = { id: 2, x: 2, y: 2, marked: false, piece: null }; 
    let playerSquares = [
      origin
    ];
    let squares = [
      origin,
      moveSquare
    ];
    let expected = [
      origin 
    ];
    let result = allPossibleMoves(playerSquares, squares);
    expect(result).toEqual(expected);
  });
});

describe('deselectSquares', () => {
  it('must deselect squares', () => {
    let selectedSquare = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: true } }; 
    let unselectedSquare = { id: 1, x: 3, y: 3, marked: false, piece: { id: 1, player_number: 1, king: false, selected: false } }; 
    let squares = [
      selectedSquare,
      unselectedSquare
    ];
    let result = deselectSquares(squares);
    expect(result).toBe(true);
    squares.forEach(function(s) {
      expect(s.piece !== null && s.piece.selected).toBe(false);
    });
  });
});

describe('unmarkSquares', () => {
  it('must unmark squares', () => {
    let markedSquare = { id: 1, x: 3, y: 3, piece: null, marked: true }; 
    let unmarkedSquare = { id: 1, x: 3, y: 3, piece: null, marked: false }; 
    let squares = [
      markedSquare,
      unmarkedSquare
    ];
    let result = unmarkSquares(squares);
    expect(result).toBe(true);
    squares.forEach(function(s) {
      expect(s.marked).toBe(false);
    });
  });
});
