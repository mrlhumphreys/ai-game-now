import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import unmoveableMatch from '../fixtures/unmoveableMatch';
import winnerMatch from '../fixtures/winnerMatch';
import selectedMatch from '../fixtures/selectedMatch';
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
  selectedSquare,
  squareOccupied,
  opponentNumber,
  putsKingInCheck,
  touchedSquare,
  moveValid,
  movePossible,
  winnerMessage
} from '$lib/xiangqi/logic/moveResult';

describe('getMoveResult', () => {
  describe('when game is over', () => {
    it('returns a GameOver result', () => {
      let match = winnerMatch();
      let playerNumber = 1;
      let touchedSquareId = '53';
      let expected = { name: 'GameOver', message: 'Game is over.' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch();
      let playerNumber = 2;
      let touchedSquareId = '53';
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when square is selected', () => {
    it('returns a selected category result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
      let expected = { name: 'MoveValid', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when nothing selected', () => {
    it('returns an unselected category result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = '57';
      let expected = { name: 'MovePossible', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });
});

describe('selectedResult', () => {
  describe('when a move puts ou in check', () => {
    it('returns a KingInCheck result', () => {
      let match = putsKingInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '59';
      let expected = { name: 'KingInCheck', message: 'Move puts king in check.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when a move is invalid', () => {
    it('returns a MoveInvalid result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '55';
      let expected = { name: 'MoveInvalid', message: 'Piece cannot move.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when move is valid', () => {
    it('returns a MoveValid result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '38';
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
      let touchedSquareId = '56';
      let expected = { name: 'EmptySquare', message: 'Square is empty.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when square is occupied by other player', () => {
    it('returns a PieceOwnershipMismatch result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = '54';
      let expected = { name: 'PieceOwnershipMismatch', message: 'Piece is owned by opponent.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece on square cannot move', () => {
    it('returns a MoveImpossible result', () => {
      let match = unmoveableMatch();
      let playerNumber = 1;
      let touchedSquareId = '57';
      let expected = { name: 'MoveImpossible', message: 'Piece cannot move.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece on square can move', () => {
    it('returns a MovePossible result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = '57';
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

describe('selectedSquareExists', () => {
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
    let touchedSquareId = '57';
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
    let touchedSquareId = '56';
    let result = touchedSquareEmpty(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the square is occupied', () => {
    let match = defaultMatch();
    let touchedSquareId = '57';
    let result = touchedSquareEmpty(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('touchedSquareOccupiedByPlayer', () => {
  it('returns true if occupied by player', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedSquareId = '57';
    let result = touchedSquareOccupiedByPlayer(match, playerNumber, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if occupied by a different player', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let touchedSquareId = '57';
    let result = touchedSquareOccupiedByPlayer(match, playerNumber, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('selectedSquare', () => {
  it('returns the selected square if selected', () => {
    let match = selectedMatch();
    let expected = { id: '28', x: 7, y: 7, piece: { id: 23, playerNumber: 1, type: 'cannon' as const, selected: true } };
    let result = selectedSquare(match);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square selected', () => {
    let match = defaultMatch();
    let result = selectedSquare(match);
    expect(result).toBe(undefined);
  });
});

describe('squareOccupied', () => {
  it('returns true if square is occupied', () => {
     let match = defaultMatch();
     let result = squareOccupied(match, '57');
     expect(result).toBe(true);
  });

  it('returns false if square is unoccupied', () => {
     let match = defaultMatch();
     let result = squareOccupied(match, '56');
     expect(result).toBe(false);
  });

  it('returns false if square does not exist', () => {
     let match = defaultMatch();
     let result = squareOccupied(match, 'xx');
     expect(result).toBe(false);
  });
});

describe('opponentNumber', () => {
  it('returns 1 if player number is 2', () => {
    let result = opponentNumber(2);
    expect(result).toBe(1);
  });

  it('returns 2 if player number is 1', () => {
    let result = opponentNumber(1);
    expect(result).toBe(2);
  });
});

describe('putsKingInCheck', () => {
  it('returns true if move puts king in check', () => {
    let match = putsKingInCheckMatch();
    let playerNumber = 1;
    let touchedSquareId = '59';
    let result = putsKingInCheck(match, playerNumber, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if move does not put king in check', () => {
    let match = selectedMatch();
    let playerNumber = 1;
    let touchedSquareId = '410';
    let result = putsKingInCheck(match, playerNumber, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('touchedSquare', () => {
  it('returns the specified square if found', () => {
    let match = defaultMatch();
    let touchedSquareId = '56';
    let expected = { id: '56', x: 4, y: 5, piece: null };
    let result = touchedSquare(match, touchedSquareId);
    expect(result).toEqual(expected);
  });

  it('returns undefined if the square is not found', () => {
    let match = defaultMatch();
    let touchedSquareId = 'xx';
    let result = touchedSquare(match, touchedSquareId);
    expect(result).toBe(undefined);
  });
});

describe('moveValid', () => {
  it('returns true if the piece can move to destination', () => {
    let match = selectedMatch();
    let touchedSquareId = '38';
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the piece cannot move to destination', () => {
    let match = selectedMatch();
    let touchedSquareId = '55';
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('movePossible', () => {
  it('returns true if piece has a destination', () => {
    let match = defaultMatch();
    let touchedSquareId = '57';
    let result = movePossible(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if piece has no destination', () => {
    let match = defaultMatch();
    let touchedSquareId = '29';
    let result = movePossible(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('winnerMessage', () => {
  it('must return a message with the next players name', () => {
    let match = winnerMatch();
    expect(winnerMessage(match)).toEqual('Player wins.');
  });
});

