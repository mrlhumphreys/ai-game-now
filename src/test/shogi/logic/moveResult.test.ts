import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import winnerMatch from '../fixtures/winnerMatch';
import selectedMatch from '../fixtures/selectedMatch';
import selectedPieceMatch from '../fixtures/selectedPieceMatch';
import putsOuInCheckMatch from '../fixtures/putsOuInCheckMatch';
import moveToPromotionZoneMatch from '../fixtures/moveToPromotionZoneMatch';
import moveToCompulsoryPromotionZoneMatch from '../fixtures/moveToCompulsoryPromotionZoneMatch';
import selectedPieceInHandMatch from '../fixtures/selectedPieceInHandMatch';
import fuhyouDropCausesCheckmateMatch from '../fixtures/fuhyouDropCausesCheckmateMatch';
import pieceInHandMatch from '../fixtures/pieceInHandMatch';
import selectedKeimaInHandMatch from '../fixtures/selectedKeimaInHandMatch';
import keimaDropCausesCheckmateMatch from '../fixtures/keimaDropCausesCheckmateMatch';

import {
  getMoveResult,
  selectedResult,
  dropResult,
  unselectedResult,
  gameOver,
  playersTurn,
  selectedSquareExists,
  selectedPieceInHandExists,
  touchedSquareExists,
  touchedSquareEmpty,
  touchedSquareOccupiedByPlayer,
  selectedSquare,
  selectedPieceInHand,
  squareOccupied,
  preventsLegalMoves,
  putsTwoFuhyouInFile,
  fuhyouCausesCheckmate,
  opponentNumber,
  putsOuInCheck,
  touchedSquare,
  moveValid,
  movePossible,
  pieceCanPromote,
  pieceMustPromote,
  winnerMessage
} from '$lib/shogi/logic/moveResult';

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
    it('returns a selected result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '56';
      let expected = { name: 'MoveValid', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece is selected', () => {
    it('returns a drop result', () => {
      let match = selectedPieceMatch();
      let playerNumber = 1;
      let touchedSquareId = '56';
      let expected = { name: 'DropValid', message: '' };
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when nothing selected', () => {
    it('returns an unselected result', () => {
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
    it('returns a OuInCheck result', () => {
      let match = putsOuInCheckMatch();
      let playerNumber = 1;
      let touchedSquareId = '49';
      let expected = { name: 'OuInCheck', message: 'Move puts ou in check.' };
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

  describe('when a move puts the piece in the compulsory promotion zone', () => {
    it('returns a PieceMovedToCompulsoryPromotionZone result', () => {
      let match = moveToCompulsoryPromotionZoneMatch();
      let playerNumber = 1;
      let touchedSquareId = '51';
      let expected = { name: 'PieceMovedToCompulsoryPromotionZone', message: 'Piece must promote.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when a move puts the piece in promotion zone', () => {
    it('returns a PieceMovedToPromotionZone result', () => {
      let match = moveToPromotionZoneMatch();
      let playerNumber = 1;
      let touchedSquareId = '53';
      let expected = { name: 'PieceMovedToPromotionZone', message: 'Piece can promote.' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when move is valid', () => {
    it('returns a MoveValid result', () => {
      let match = selectedMatch();
      let playerNumber = 1;
      let touchedSquareId = '56';
      let expected = { name: 'MoveValid', message: '' };
      let result = selectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });
});

describe('dropResult', () => {
  describe('when square is occupied', () => {
    it('returns a SquareOccupied result', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '57';
      let expected = { name: 'SquareOccupied', message: 'Piece must be dropped on an empty square.' };
      let result = dropResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece cannot move from square', () => {
    it('returns a NoLegalMoves result', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '11';
      let expected = { name: 'NoLegalMoves', message: 'Piece cannot move if placed on that square.' };
      let result = dropResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when fuhyou already exists in file', () => {
    it('returns a TwoFuhyouInFile result', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '24';
      let expected = { name: 'TwoFuhyouInFile', message: 'Cannot place two fuhyou in the same file.' };
      let result = dropResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when fuhyou causes checkmate', () => {
    it('returns a FuhyouCausesCheckmate result', () => {
      let match = fuhyouDropCausesCheckmateMatch();
      let playerNumber = 1;
      let touchedSquareId = '52';
      let expected = { name: 'FuhyouCausesCheckmate', message: 'Fuhyou cannot cause checkmate when dropped.' };
      let result = dropResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when drop is valid', () => {
    it('returns a DropValid result', () => {
      let match = selectedPieceInHandMatch();
      let playerNumber = 1;
      let touchedSquareId = '17';
      let expected = { name: 'DropValid', message: '' };
      let result = dropResult(match, playerNumber, touchedSquareId);
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
      let touchedSquareId = '53';
      let expected = { name: 'PieceOwnershipMismatch', message: 'Piece is owned by opponent.' };
      let result = unselectedResult(match, playerNumber, touchedSquareId);
      expect(result).toEqual(expected);
    });
  });

  describe('when piece on square cannot move', () => {
    it('returns a MoveImpossible result', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = '29';
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

describe('selectedPieceInHandExists', () => {
  it('returns true if piece is selected', () => {
    let match = selectedPieceInHandMatch();
    let result = selectedPieceInHandExists(match);
    expect(result).toBe(true);
  });

  it('returns false if no piece is selected', () => {
    let match = pieceInHandMatch();
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
    let expected = { id: '57', x: 4, y: 6, piece: { id: 25, playerNumber: 1, type: 'fuhyou', selected: true } };
    let result = selectedSquare(match);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square selected', () => {
    let match = defaultMatch();
    let result = selectedSquare(match);
    expect(result).toBe(undefined);
  });
});

describe('selectedPieceInHand', () => {
  it('returns the selected piece if selected', () => {
    let match = selectedPieceInHandMatch();
    let expected = { id: 17, playerNumber: 1, type: 'fuhyou', selected: true };
    let result = selectedPieceInHand(match);
    expect(result).toEqual(expected);
  });

  it('returns undefined if no square selected', () => {
    let match = defaultMatch();
    let result = selectedPieceInHand(match);
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

describe('preventsLegalMoves', () => {
  it('returns true if piece on square has no moves', () => {
     let match = selectedPieceInHandMatch();
     let touchedSquareId = '11';
     let result = preventsLegalMoves(match, touchedSquareId);
     expect(result).toBe(true);
  });

  it('returns false if piece on square has moves', () => {
     let match = selectedPieceInHandMatch();
     let touchedSquareId = '12';
     let result = preventsLegalMoves(match, touchedSquareId);
     expect(result).toBe(false);
  });

  it('returns false if no piece selected', () => {
     let match = pieceInHandMatch();
     let touchedSquareId = '12';
     let result = preventsLegalMoves(match, touchedSquareId);
     expect(result).toBe(false);
  });

  it('returns false if square does not exist', () => {
     let match = selectedPieceInHandMatch();
     let touchedSquareId = 'xx';
     let result = preventsLegalMoves(match, touchedSquareId);
     expect(result).toBe(false);
  });
});

describe('putsTwoFuhyouInFile', () => {
  it('returns true if drop puts two fuhyou in the same file', () => {
    let match = selectedPieceInHandMatch();
    let touchedSquareId = '26';
    let playerNumber = 1;
    let result = putsTwoFuhyouInFile(match, touchedSquareId, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if drop puts one fuhyou in the file', () => {
    let match = selectedPieceInHandMatch();
    let touchedSquareId = '16';
    let playerNumber = 1;
    let result = putsTwoFuhyouInFile(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if drop is not fuhyou', () => {
    let match = selectedKeimaInHandMatch();
    let touchedSquareId = '26';
    let playerNumber = 1;
    let result = putsTwoFuhyouInFile(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if no piece selected', () => {
    let match = defaultMatch();
    let touchedSquareId = '26';
    let playerNumber = 1;
    let result = putsTwoFuhyouInFile(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if square does not exist', () => {
    let match = defaultMatch();
    let touchedSquareId = 'xx';
    let playerNumber = 1;
    let result = putsTwoFuhyouInFile(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });
});

describe('fuhyouCausesCheckmate', () => {
  it('returns true if fuhyou drop causes checkmate', () => {
    let match = fuhyouDropCausesCheckmateMatch();
    let touchedSquareId = '52';
    let playerNumber = 1;
    let result = fuhyouCausesCheckmate(match, touchedSquareId, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if non-fuhyou drop causes checkmate', () => {
    let match = keimaDropCausesCheckmateMatch();
    let touchedSquareId = '43';
    let playerNumber = 1;
    let result = fuhyouCausesCheckmate(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if fuhyou does drop not cause checkmate', () => {
    let match = selectedPieceInHandMatch();
    let touchedSquareId = '56';
    let playerNumber = 1;
    let result = fuhyouCausesCheckmate(match, touchedSquareId, playerNumber);
    expect(result).toBe(false);
  });

  it('returns false if piece not selected', () => {
    let match = defaultMatch();
    let touchedSquareId = '57';
    let playerNumber = 1;
    let result = fuhyouCausesCheckmate(match, touchedSquareId, playerNumber);
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

describe('putsOuInCheck', () => {
  it('returns true if move puts ou in check', () => {
    let match = putsOuInCheckMatch();
    let playerNumber = 1;
    let touchedSquareId = '49';
    let result = putsOuInCheck(match, playerNumber, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if move does not put ou in check', () => {
    let match = selectedMatch();
    let playerNumber = 1;
    let touchedSquareId = '56';
    let result = putsOuInCheck(match, playerNumber, touchedSquareId);
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
    let touchedSquareId = '56';
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

describe('pieceCanPromote', () => {
  it('returns true if the piece can promote at the destination', () => {
    let match = moveToPromotionZoneMatch();
    let touchedSquareId = '53';
    let result = pieceCanPromote(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the piece cannot promote at the destination', () => {
    let match = selectedMatch();
    let touchedSquareId = '56';
    let result = pieceCanPromote(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('pieceMustPromote', () => {
  it('returns true if the piece must promote at the destination', () => {
    let match = moveToCompulsoryPromotionZoneMatch();
    let touchedSquareId = '51';
    let result = pieceMustPromote(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if the piece can optionally promote at the destionation', () => {
    let match = moveToPromotionZoneMatch();
    let touchedSquareId = '53';
    let result = pieceMustPromote(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('winnerMessage', () => {
  it('must return a message with the next players name', () => {
    let match = winnerMatch();
    expect(winnerMessage(match)).toEqual('Player wins.');
  });
});

