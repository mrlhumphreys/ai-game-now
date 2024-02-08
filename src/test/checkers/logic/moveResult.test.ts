import { describe, it, expect } from 'vitest';

import type Square from '$lib/checkers/interfaces/Square';

import defaultMatch from '../fixtures/defaultMatch';
import resignedMatch from '../fixtures/resignedMatch';
import selectedMatch from '../fixtures/selectedMatch';
import winnerMatch from '../fixtures/winnerMatch';
import firstLegIncompleteMatch from '../fixtures/firstLegIncompleteMatch';
import firstLegCompleteMatch from '../fixtures/firstLegCompleteMatch';

import { 
  getMoveResult,
  gameOver,
  notPlayersTurn,
  isSquareSelected,
  getTouchedSquare,
  movePossible,
  moveValid,
  notPlayersPiece,
  emptySquare,
  moveComplete,
  getFrom,
  getTos,
  getLegs,
  getLastLeg,
  moveType,
  jumpType,
  lastLegEnd,
  defaultMessage,
  nextTurnMessage,
  winnerMessage
} from '$lib/checkers/logic/moveResult';

describe('getMoveResult', () => {
  it('must return game over result if game is over', () => {
    let match = winnerMatch();
    let playerNumber = 1;
    let touchedSquareId = 11;
    let result = getMoveResult(match, playerNumber, touchedSquareId);
    let expected = { name: 'GameOver', message: 'Game is over.' };
    expect(result).toEqual(expected);
  });

  it('must return not players turn result if it is not the players turn', () => {
    let match = defaultMatch();
    let playerNumber = 2;
    let touchedSquareId = 11;
    let result = getMoveResult(match, playerNumber, touchedSquareId);
    let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    expect(result).toEqual(expected);
  });

  describe('given a selected square', () => {
    describe('and the move is valid', () => {
      it('must return a move complete result if the move is complete', () => {
        let match = selectedMatch();
        let playerNumber = 1;
        let touchedSquareId = 15;
        let result = getMoveResult(match, playerNumber, touchedSquareId);
        let expected = { name: 'MoveComplete', message: 'Computer to move.' };
        expect(result).toEqual(expected);
      });

      it('must return a move incomplete result if the move is incomplete', () => {
        let match = firstLegIncompleteMatch();
        let playerNumber = 1;
        let touchedSquareId = 14;
        let result = getMoveResult(match, playerNumber, touchedSquareId);
        let expected = { name: 'MoveIncomplete', message: 'Piece can still jump.' };
        expect(result).toEqual(expected);
      });
    });

    describe('and the move is invalid', () => {
      it('must return a move invalid result', () => {
        let match = selectedMatch();
        let playerNumber = 1;
        let touchedSquareId = 23;
        let result = getMoveResult(match, playerNumber, touchedSquareId);
        let expected = { name: 'MoveInvalid', message: 'Move is invalid.' };
        expect(result).toEqual(expected);
      });
    });
  });

  describe('given no selected square', () => {
    it('must return an empty square result if the touched square is empty', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 15;
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      let expected = { name: 'EmptySquare', message: 'That square is empty.' };
      expect(result).toEqual(expected);
    });

    it('must return a not players piece result if the touched square has a piece not owned by the player', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 21;
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      let expected = { name: 'NotPlayersPiece', message: 'That piece is not yours.' };
      expect(result).toEqual(expected);
    });

    it('must return a move possible result if the piece can move', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 11;
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      let expected = { name: 'MovePossible', message: '' };
      expect(result).toEqual(expected);
    });

    it('must return a move impossible result if the piece cannot move', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedSquareId = 6;
      let result = getMoveResult(match, playerNumber, touchedSquareId);
      let expected = { name: 'MoveImpossible', message: 'That piece cannot move.' };
      expect(result).toEqual(expected);
    });
  });
});

describe('gameOver', () => {
  it('must return true if someone has resigned', () => {
    let match = resignedMatch();
    expect(gameOver(match)).toBe(true);
  });

  it('must return true if there is a winner', () => {
    let match = winnerMatch();
    expect(gameOver(match)).toBe(true);
  });

  it('must return false if there is no winner', () => {
    let match = defaultMatch();
    expect(gameOver(match)).toBe(false);
  });
});

describe('notPlayersTurn', () => {
  it('must return true if it is not the players turn', () => {
    let match = defaultMatch();
    expect(notPlayersTurn(match, 2)).toBe(true);
  });

  it('must return false if it is the players turn', () => {
    let match = defaultMatch();
    expect(notPlayersTurn(match, 1)).toBe(false);
  });
});

describe('isSquareSelected', () => {
  it('must return true if square is selected', () => {
    let match = selectedMatch();
    expect(isSquareSelected(match)).toBe(true);
  });

  it('must return false if square is not selected', () => {
    let match = defaultMatch();
    expect(isSquareSelected(match)).toBe(false);
  });
});

describe('getTouchedSquare', () => {
  it('must return the square matching the touchedSquareId', () => {
    let match = defaultMatch();
    let expected = { id: 11, x: 2, y: 5, marked: false, piece: { id: 10, king: false, player_number: 1, selected: false }};
    expect(getTouchedSquare(match, 11)).toEqual(expected);
  });
});

describe('movePossible', () => {
  it('must return true if square is selectable', () => {
    let match = defaultMatch();
    expect(movePossible(match, 11)).toBe(true);
  });

  it('must return false if square is not selectable', () => {
    let match = defaultMatch();
    expect(movePossible(match, 1)).toBe(false);
  });
});

describe('notPlayersPiece', () => {
  it('must return true if its not players piece', () => {
    let match = defaultMatch();
    expect(notPlayersPiece(match, 1, 11)).toBe(false); 
  });

  it('must return false if it is the players piece', () => {
    let match = defaultMatch();
    expect(notPlayersPiece(match, 1, 21)).toBe(true); 
  });
});

describe('emptySquare', () => {
  it('must return true if the square is empty', () => {
    let match = defaultMatch();
    expect(emptySquare(match, 15)).toBe(true);
  });

  it('must return false if the square is not empty', () => {
    let match = defaultMatch();
    expect(emptySquare(match, 11)).toBe(false);
  });
});

describe('moveComplete', () => {
  it('returns true if move type', () => {
    let match = selectedMatch();
    let touchedSquareId = 15;
    let result = moveComplete(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns true if jump type on the last leg', () => {
    let match = firstLegCompleteMatch();
    let touchedSquareId = 23;
    let result = moveComplete(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('returns false if jump type with more legs', () => {
    let match = firstLegIncompleteMatch();
    let touchedSquareId = 14;
    let result = moveComplete(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('moveValid', () => {
  it('must return true if move is valid', () => {
    let match = firstLegCompleteMatch();
    let touchedSquareId = 23;
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(true);
  });

  it('must return false if move is not valid', () => {
    let match = firstLegCompleteMatch();
    let touchedSquareId = 32;
    let result = moveValid(match, touchedSquareId);
    expect(result).toBe(false);
  });
});

describe('getFrom', () => {
  it('returns the square matching the current move from id', () => {
    let match = firstLegIncompleteMatch();
    let result = getFrom(match);
    if (result !== undefined) {
      expect(result.id).toEqual(7);
    } else {
      expect(result).not.toBe(undefined);
    }
  });
});

describe('getTos', () => {
  it('returns the squares matches the current move tos id', () => {
    // 7 14 23
    let match = firstLegCompleteMatch();
    let result = getTos(match)[0];
    if (result !== undefined) {
      expect(result.id).toEqual(14);
    } else {
      expect(result).not.toBe(undefined);
    }
  });
});

describe('lastLegEnd', () => {
  it('returns false if it can continue to jump', () => {
    let match = firstLegIncompleteMatch();
    let piece = { id: 6, king: false, player_number: 1, selected: true };
    let lastSquare = { id: 14, x: 5, y: 4, marked: true, piece: null };
    let toSquares: Array<Square> = [];
    let result = lastLegEnd(match, piece, lastSquare, toSquares);
    expect(result).toBe(false);
  });

  it('returns true if it can no longer jump', () => {
    let match = firstLegCompleteMatch();
    let piece = { id: 6, king: false, player_number: 1, selected: true };
    let lastSquare = { id: 23, x: 3, y: 2, marked: false, piece: null };
    let toSquares = [ { id: 14, x: 5, y: 4, marked: true, piece: null } ];
    let result = lastLegEnd(match, piece, lastSquare, toSquares);
    expect(result).toBe(true);
  });
});

describe('getLegs', () => {
  it('joins fromSquare, toSquares and touchedSquare', () => {
    let fromSquare = { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} };
    let toSquares = [ { id: 14, x: 5, y: 4, marked: true, piece: null } ];
    let touchedSquare = { id: 23, x: 3, y: 2, marked: false, piece: null };
    let expected = [
      fromSquare,
      toSquares[0],
      touchedSquare
    ];
    let result = getLegs(fromSquare, toSquares, touchedSquare);
    expect(result).toEqual(expected);
  });
});

describe('lastLeg', () => {
  it('must return the last 2 elements of legs', () => {
    let legs = [
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} },
      { id: 14, x: 5, y: 4, marked: true, piece: null },
      { id: 23, x: 3, y: 2, marked: false, piece: null }
    ];
    let expected = [
      { id: 14, x: 5, y: 4, marked: true, piece: null },
      { id: 23, x: 3, y: 2, marked: false, piece: null }
    ];
    let result = getLastLeg(legs);
    expect(result).toEqual(expected);
  });
});

describe('moveType', () => {
  it('must return true if the distance is 1', () => {
    let leg = [
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} },
      { id: 11, x: 2, y: 5, marked: false, piece: null }
    ];
    expect(moveType(leg)).toBe(true);
  });

  it('must return false if the distinace is 2', () => {
    let leg = [
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} },
      { id: 14, x: 5, y: 4, marked: true, piece: null }
    ];
    expect(moveType(leg)).toBe(false);
  });
});

describe('jumpType', () => {
  it('must return true if the distance is 2', () => {
    let leg = [
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} },
      { id: 14, x: 5, y: 4, marked: true, piece: null }
    ];
    expect(jumpType(leg)).toBe(true);
  });

  it('must return false if the distance is 1', () => {
    let leg = [
      { id: 7, x: 3, y: 6, marked: false, piece: { id: 6, king: false, player_number: 1, selected: true} },
      { id: 11, x: 2, y: 5, marked: false, piece: null }
    ];
    expect(jumpType(leg)).toBe(false);
  });
});

describe('defaultMessage', () => {
  it('must return winner message if there is a winner', () => {
    let match = winnerMatch();
    expect(defaultMessage(match)).toEqual('Player wins.');
  });

  it('must return next tern message if there is no winner', () => {
    let match = defaultMatch();
    expect(defaultMessage(match)).toEqual('Computer to move.');
  });
});

describe('nextTurnMessage', () => {
  it('must return a message with the next players name', () => {
    let match = defaultMatch();
    expect(nextTurnMessage(match)).toEqual('Computer to move.');
  });
});

describe('winnerMessage', () => {
  it('must return a message with the next players name', () => {
    let match = winnerMatch();
    expect(winnerMessage(match)).toEqual('Player wins.');
  });
});


