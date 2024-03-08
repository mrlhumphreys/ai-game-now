import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import selectedMatch from '../fixtures/selectedMatch';
import winnerMatch from '../fixtures/winnerMatch';
import pawnMoveToLastRankMatch from '../fixtures/pawnMoveToLastRankMatch';
import putsKingInCheckMatch from '../fixtures/putsKingInCheckMatch';

import { 
  getMoveResult,
  selectedResult,
  unselectedResult,
  gameOver,
  playersTurn,
  selectedSquareExists,
  touchedSquareExists,
  touchedSquareEmpty,
  touchedSquareOccupiedByPlayer,
  moveValid,
  movePossible,
  putsKingInCheck,
  pawnMoveToLastRank,
  touchedSquare,
  selectedSquare,
} from '$lib/chess/logic/moveResult';

describe('getMoveResult', () => {
  describe('when game is over', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = { name: 'GameOver', message: 'Game is over.' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let touchedSquareId = 'e7';
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when square is selected', () => {
    it('returns a selected result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e4';
      let expected = { name: 'MoveValid', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when square is not selected', () => {
    it('returns an unselected result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = { name: 'MovePossible', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });
});

describe('selectedResult', () => {
  describe('when move puts king in check', () => {
    it('returns a KingInCheck result', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = { name: 'KingInCheck', message: 'Move puts king in check.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when pawn moves to last rank', () => {
    it('returns a PawnMovesToLastRank result', () => {
      let match = pawnMoveToLastRankMatch();
      let playerNumber = 1;
      let touchedSquareId = 'h8';
      let expected = { name: 'PawnMovesToLastRank', message: 'Pawn can promote.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when move is invalid', () => {
    it('returns a MoveInvalid result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'd3';
      let expected = { name: 'MoveInvalid', message: 'Piece cannot move.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when move is valid', () => {
    it('returns a MoveValid result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e4';
      let expected = { name: 'MoveValid', message: '' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });
});

describe('unselectedResult', () => {
  describe('when square does not exist', () => {
    it('returns a SquareNotFound result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'xx';
      let expected = { name: 'SquareNotFound', message: 'Square does not exist.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId); 
      expect(result).toEqual(expected);
    });
  });

  describe('when square is empty', () => {
    it('returns a EmptySquare result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e3';
      let expected = { name: 'EmptySquare', message: 'Square is empty.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId); 
      expect(result).toEqual(expected);
    });
  });

  describe('when square is owned by opponent', () => {
    it('returns a PieceOwnershipMismatch result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e7';
      let expected = { name: 'PieceOwnershipMismatch', message: 'Piece is owned by opponent.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId); 
      expect(result).toEqual(expected);
    });
  });

  describe('when move is not possible', () => {
    it('returns a MoveImpossible result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'h1';
      let expected = { name: 'MoveImpossible', message: 'Piece cannot move.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId); 
      expect(result).toEqual(expected);
    });
  });

  describe('when move is possible', () => {
    it('returns a MovePossible result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 'e2';
      let expected = { name: 'MovePossible', message: '' };
      let result = unselectedResult(match, playerNumber, touchedSquareId); 
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

describe('selectedSquareExist', () => {
  it('returns true if square is selected', () => {
    let match = selectedMatch();
    let result = selectedSquareExists(match);
    expect(result).toBe(true);
  });

  it('returns false if no square is selected', () => {
    let match = defaultMatch();
    let result = selectedSquareExists(match);
    expect(result).toBe(false);
  });
});

describe('touchedSquareExists', () => {
  it('returns true if touched square exists', () => {
    let match = defaultMatch();
    let touchedSquareId = 'e2';
    let result = touchedSquareExists(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if touched squares does not exist', () => {
    let match = defaultMatch();
    let touchedSquareId = 'xx';
    let result = touchedSquareExists(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('touchedSquareEmpty', () => {
  it('returns true if the square is unoccupied', () => {
    let match = defaultMatch();
    let touchedSquareId = 'e3';
    let result = touchedSquareEmpty(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the square is occupied', () => {
    let match = defaultMatch();
    let touchedSquareId = 'e2';
    let result = touchedSquareEmpty(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('touchedSquareOccupiedByPlayer', () => { 
  it('returns true if occupied by player', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedSquareId = 'e2';
    let result = touchedSquareOccupiedByPlayer(match, playerNumber, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if occupied by a different player', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let touchedSquareId = 'e2';
    let result = touchedSquareOccupiedByPlayer(match, playerNumber, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('moveValid', () => {
  it('returns true if the piece can move to destination', () => {
    let match = selectedMatch();
    let touchedSquareId = 'e4';
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the move cannot move to destination', () => {
    let match = selectedMatch();
    let touchedSquareId = 'd3';
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('movePossible', () => {
  it('returns true if there is moves possible', () => {
    let match = defaultMatch();
    let touchedSquareId = 'e2';
    let result = movePossible(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if there are no moves', () => {
    let match = defaultMatch();
    let touchedSquareId = 'h1';
    let result = movePossible(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('putsKingInCheck', () => {
  it('returns true if move puts king into check', () => {
    let match = putsKingInCheckMatch();
    let playerNumber = 1;
    let touchedSquareId = 'e2';
    let result = putsKingInCheck(match, playerNumber, touchedSquareId);
    expect(result).toEqual(true);
  });

  it('returns false if moves does not put king in check', () => {
    let match = putsKingInCheckMatch();
    let playerNumber = 1;
    let touchedSquareId = 'd1';
    let result = putsKingInCheck(match, playerNumber, touchedSquareId);
    expect(result).toEqual(false);
  });
});

describe('pawnMovesToLastRank', () => {
  it('returns true if pawn moves to last rank', () => {
    let match = pawnMoveToLastRankMatch();
    let touchedSquareId = 'h8';
    let result = pawnMoveToLastRank(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if not move to last rank', () => {
    let match = selectedMatch();
    let touchedSquareId = 'e3';
    let result = pawnMoveToLastRank(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('touched', () => {
  it('returns the touched square if the id is matches', () => {
    let match = defaultMatch();
    let touchedSquareId = 'e2';
    let expected = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: false } };
    let result = touchedSquare(match, touchedSquareId);
    expect(result).toEqual(expected);
  });

  it('returns undefined if id doesnt match', () => {
    let match = defaultMatch();
    let touchedSquareId = 'xx';
    let result = touchedSquare(match, touchedSquareId);
    expect(result).toBe(undefined);
  });
});

describe('selectedSquare', () => {
  it('returns the selected square if selected', () => {
    let match = selectedMatch();
    let expected = { id: 'e2', x: 4, y: 6, piece: { id: 21, playerNumber: 1, type: 'pawn', hasMoved: false, selected: true } };
    let result = selectedSquare(match);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square selected', () => {
    let match = defaultMatch();
    let result = selectedSquare(match);
    expect(result).toBe(undefined);
  });
});
