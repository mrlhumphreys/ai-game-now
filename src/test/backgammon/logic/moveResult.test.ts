import { describe, it, expect } from 'vitest';

import defaultMatch from '../fixtures/defaultMatch';
import blockedMatch from '../fixtures/blockedMatch';
import blockedFromBarMatch from '../fixtures/blockedFromBarMatch';
import moveFromBarMatch from '../fixtures/moveFromBarMatch';
import wrongDirectionMatch from '../fixtures/wrongDirectionMatch';
import moveCompleteMatch from '../fixtures/moveCompleteMatch';
import moveIncompleteMatch from '../fixtures/moveIncompleteMatch';
import piecesHomeCannotBearOffMatch from '../fixtures/piecesHomeCannotBearOffMatch';
import completeMatch from '../fixtures/completeMatch';
import firstMoveMatch from '../fixtures/firstMoveMatch';
import moveUnselectedMatch from '../fixtures/moveUnselectedMatch';
import bearingOffMatch from '../fixtures/bearingOffMatch';
import bearingOffDiceEqualMatch from '../fixtures/bearingOffDiceEqualMatch';
import bearingOffDiceGreaterThanMatch from '../fixtures/bearingOffDiceGreaterThanMatch';
import bearingOffDiceLessThanMatch from '../fixtures/bearingOffDiceLessThanMatch';
import bearingOffBackPointDiceLessThanMatch from '../fixtures/bearingOffBackPointDiceLessThanMatch';
import bearingOffBackPointDiceGreaterThanMatch from '../fixtures/bearingOffBackPointDiceGreaterThanMatch';
import bearingOffNonBackPointDiceEqualMatch from '../fixtures/bearingOffNonBackPointDiceEqualMatch';
import bearingOffNonBackPointDiceNotEqualMatch from '../fixtures/bearingOffNonBackPointDiceNotEqualMatch';
import playerOneSelectedBarMatch from '../fixtures/playerOneSelectedBarMatch';
import playerOneSelectedPointMatch from '../fixtures/playerOneSelectedPointMatch';
import playerTwoSelectedBarMatch from '../fixtures/playerTwoSelectedBarMatch';
import playerTwoSelectedPointMatch from '../fixtures/playerTwoSelectedPointMatch';
import winnerMatch from '../fixtures/winnerMatch';
import somePiecesOffBoardMatch from '../fixtures/somePiecesOffBoardMatch';
import moveListIncompleteMatch from '../fixtures/moveListIncompleteMatch';
import moveListIncompleteFromBarMatch from '../fixtures/moveListIncompleteFromBarMatch';
import moveListIncompleteToOffBoardMatch from '../fixtures/moveListIncompleteToOffBoardMatch';
import noDestinationsMatch from '../fixtures/noDestinationsMatch';
import piecesOffBoardEqualNumberOfMovesMatch from '../fixtures/piecesOffBoardEqualNumberOfMovesMatch';
import bearingOffPiecesNotHomeMatch from '../fixtures/bearingOffPiecesNotHomeMatch';
import bearingOffDiceMismatchMatch from '../fixtures/bearingOffDiceMismatchMatch';
import bearingOffCompleteMoveMatch from '../fixtures/bearingOffCompleteMoveMatch';
import bearingOffAllPiecesOffBoardMatch from '../fixtures/bearingOffAllPiecesOffBoardMatch';
import bearingOffIncompleteMoveMatch from '../fixtures/bearingOffIncompleteMoveMatch';
import fromPointDiceRollMismatchMatch from '../fixtures/fromPointDiceRollMismatchMatch';

import {
  getMoveResult,
  selectedResult,
  unselectedResult,
  winner,
  playersTurn,
  rollPhase,
  pointSelected,
  dieNumber,
  details,
  complete,
  allPiecesOffBoard,
  completeMoveList,
  touchedEmpty,
  touchedOwnedByOpponent,
  barHasPieces,
  noDestinations,
  somePiecesAreNotHome,
  cannotBearOff,
  diceRollMismatch,
  toBlocked,
  wrongDirection,
  distance,
  fromInt,
  toInt,
  bearOff,
  selectedPoint,
  touchedPoint,
  numberOfPiecesOnBoard,
  numberOfMoves,
  barHasNoPiecesOwnedByPlayer
} from '$lib/backgammon/logic/moveResult';

describe('getMoveResult', () => {
  describe('when there is a winner', () => {
    it('returns a game over result', () => {
      let match = winnerMatch(); 
      let playerNumber = 1;
      let touchedId = 1;
      let result = getMoveResult(match, playerNumber, touchedId);
      let expected = { name: 'GameOver', message: 'Game is over.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when it is not players turn', () => {
    it('returns a NotPlayersTurn result', () => {
      let match = defaultMatch(); 
      let playerNumber = 2;
      let touchedId = 1;
      let result = getMoveResult(match, playerNumber, touchedId);
      let expected = { name: 'NotPlayersTurn', message: 'It is not your turn.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when it is roll phase', () => {
    it('returns a RollPhase result', () => {
      let match = defaultMatch(); 
      let playerNumber = 1;
      let touchedId = 1;
      let result = getMoveResult(match, playerNumber, touchedId);
      let expected = { name: 'RollPhase', message: 'Pieces cannot move until the dice are rolled.' };
      expect(result).toEqual(expected);
    });
  });

  describe('when a point is selected', () => {
    it('returns a selected result', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let result = getMoveResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveComplete', message: '' };
      expect(result).toEqual(expected);
    });
  });

  describe('when a point is not selected', () => {
    it('returns an unselected result', () => {
      let match = moveUnselectedMatch();
      let playerNumber = 1;
      let touchedId = 1;
      let result = getMoveResult(match, playerNumber, touchedId);
      let expected = { name: 'MovePossible', message: '' };
      expect(result).toEqual(expected);
    });
  });
});

describe('selectedResult', () => {
  describe('when touched point is off board', () => {
    it('returns a PiecesNotHome result if some pieces are not home', () => {
      let match = bearingOffPiecesNotHomeMatch();
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'PiecesNotHome', message: 'Cannot bear off while pieces are not home.' };
      expect(result).toEqual(expected);
    });

    it('returns a DiceMismatch result if the dice do not match the moves', () => {
      let match = bearingOffDiceMismatchMatch();
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
      expect(result).toEqual(expected);
    });

    it('returns a MoveComplete result if there are no more moves to be made', () => {
      let match = bearingOffCompleteMoveMatch();
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveComplete', message: '' };
      expect(result).toEqual(expected);
    });

    it('returns a MoveComplete result if all the pieces are off board', () => {
      let match = bearingOffAllPiecesOffBoardMatch();
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveComplete', message: '' };
      expect(result).toEqual(expected);
    });

    it('returns a MoveIncomplete result if there are still moves to be made', () => {
      let match = bearingOffIncompleteMoveMatch();
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveIncomplete', message: '' };
      expect(result).toEqual(expected);
    });
  });

  describe('when touched point is point', () => {
    it('returns a DiceRollMismatch result if the dice do not match the moves', () => {
      let match = fromPointDiceRollMismatchMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
      expect(result).toEqual(expected);
    });

    it('returns an OpponentBlock result if the opponent is blocking the move', () => {
      let match = blockedMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'OpponentBlock', message: 'An opponent is blocking that point.' };
      expect(result).toEqual(expected);
    });

    it('returns an WrongDirection result if the piece attempts to move backwards', () => {
      let match = wrongDirectionMatch();
      let playerNumber = 1;
      let touchedId = 9;
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'WrongDirection', message: 'A piece cannot move backwards.' };
      expect(result).toEqual(expected);
    });

    it('returns a MoveComplete result if there are no more moves to be made', () => {
      let match = moveCompleteMatch();
      let playerNumber = 1;
      let touchedId = 4;
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveComplete', message: '' };
      expect(result).toEqual(expected);
    });

    it('returns a MoveIncomplete result if there are more moves to be made', () => {
      let match = moveIncompleteMatch();
      let playerNumber = 1;
      let touchedId = 5;
      let result = selectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MoveIncomplete', message: '' };
      expect(result).toEqual(expected);
    });
  });
});

describe('unselectedResult', () => {
  describe('when touched point is bar', () => {
    it('returns NoPieces result if no pieces on bar are owned by player', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedId = 'bar';
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'NoPieces', message: 'There are no pieces on the bar.' };
      expect(result).toEqual(expected);
    });

    it('returns Blocked result if those pieces cannot move', () => {
      let match = blockedFromBarMatch();
      let playerNumber = 1;
      let touchedId = 'bar';
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'Blocked', message: 'Those pieces cannot move.' };
      expect(result).toEqual(expected);
    });

    it('returns MovePossible result if the piecs can move', () => {
      let match = moveFromBarMatch();
      let playerNumber = 1;
      let touchedId = 'bar';
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MovePossible', message: '' };
      expect(result).toEqual(expected);
    });
  });

  describe('when touched point is point', () => {
    it('returns EmptyPoint result if the point is empty', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedId = 2;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'EmptyPoint', message: 'That point is empty.' };
      expect(result).toEqual(expected);
    });

    it('returns PointOwnershipMismatch result if the point belongs to the opponent', () => {
      let match = defaultMatch();
      let playerNumber = 1;
      let touchedId = 6;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'PointOwnershipMismatch', message: 'That point is not yours.' };
      expect(result).toEqual(expected);
    });

    it('returns PiecesOnBar result if there are pieces on the bar', () => {
      let match = moveFromBarMatch();
      let playerNumber = 1;
      let touchedId = 12;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'PiecesOnBar', message: 'There are still pieces on the bar.' };
      expect(result).toEqual(expected);
    });

    it('returns Blocked result if there are no destinations and some pieces are not home', () => {
      let match = blockedMatch();
      let playerNumber = 1;
      let touchedId = 1;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'Blocked', message: 'Those pieces cannot move.' };
      expect(result).toEqual(expected);
    });

    it('returns Blocked result if there are no destinations and cannot bear off', () => {
      let match = piecesHomeCannotBearOffMatch();
      let playerNumber = 1;
      let touchedId = 19;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'Blocked', message: 'Those pieces cannot move.' };
      expect(result).toEqual(expected);
    });

    it('returns a MovePossible result if the pieces can move', () => {
      let match = moveUnselectedMatch();
      let playerNumber = 1;
      let touchedId = 1;
      let result = unselectedResult(match, playerNumber, touchedId);
      let expected = { name: 'MovePossible', message: '' };
      expect(result).toEqual(expected);
    });
  });
});

describe('winner', () => {
  it('returns true if there is a winner', () => {
    let match = winnerMatch();
    let result = winner(match);
    expect(result).toBe(true);
  });

  it('returns false if there is no winner', () => {
    let match = defaultMatch();
    let result = winner(match);
    expect(result).toBe(false);
  });
});

describe('playersTurn', () => {
  it('returns true if it is the players turn', () => {
    let match = defaultMatch();
    let result = playersTurn(match, 1);
    expect(result).toBe(true);
  });

  it('returns false if it is not the players turn', () => {
    let match = defaultMatch();
    let result = playersTurn(match, 2);
    expect(result).toBe(false);
  });
});

describe('rollPhase', () => {
  it('returns true if the phase is roll', () => {
    let match = defaultMatch();
    let result = rollPhase(match);
    expect(result).toBe(true);
  });

  it('returns false if the phase is move', () => {
    let match = moveIncompleteMatch();
    let result = rollPhase(match);
    expect(result).toBe(false);
  });
});

describe('pointSelected', () => {
  it('returns true if point is selected', () => {
    let match = playerOneSelectedPointMatch();
    let result = pointSelected(match);
    expect(result).toBe(true);
  });

  it('returns false if point is not selected', () => {
    let match = defaultMatch();
    let result = pointSelected(match);
    expect(result).toBe(false);
  });
});

describe('dieNumber', () => {
  it('returns the distance if there is a die that matches the distance between points', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 7;
    let result = dieNumber(match, playerNumber, touchedId);
    expect(result).toEqual(4);
  });

  it('returns the highest unused die number if there is no dice that matches the distance', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 4;
    let result = dieNumber(match, playerNumber, touchedId);
    expect(result).toEqual(4);
  });
});

describe('details', () => {
  it('returns a move with the selected and touched ids', () => {
    let match = playerOneSelectedPointMatch();
    let touchedId = 7;
    let result = details(match, touchedId);
    let expected = { fromId: 3, toId: 7 };
    expect(result).toEqual(expected);
  });
});

describe('complete', () => {
  it('returns true if selected point and touched point are present and number of moves equals number of dice', () => {
    let match = completeMatch();
    let touchedId = 'off_board';
    let result = complete(match, touchedId);
    expect(result).toBe(true);
  });

  it('returns false if number of moves does not equal number of dice', () => {
    let match = firstMoveMatch();
    let touchedId = 4;
    let result = complete(match, touchedId);
    expect(result).toBe(false);
  });

  it('returns false if touched point is invalid', () => {
    let match = playerOneSelectedPointMatch();
    let touchedId = 25;
    let result = complete(match, touchedId);
    expect(result).toBe(false);
  });

  it('returns false if no point selected', () => {
    let match = defaultMatch();
    let touchedId = 1;
    let result = complete(match, touchedId);
    expect(result).toBe(false);
  });
});

describe('allPiecesOffBoard', () => {
  it('must return true if the number of pieces on board equals the number of moves', () => {
    let match = piecesOffBoardEqualNumberOfMovesMatch();
    let playerNumber = 1;
    let result = allPiecesOffBoard(match, playerNumber);
    expect(result).toBe(true);
  });

  it('must return false if the number of pieces on board does not equal the number of moves', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = allPiecesOffBoard(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('completeMoveList', () => {
  it('returns the move list with the current move', () => {
    let match = moveListIncompleteMatch();
    let touchedId = 5 
    let expected = [
      { fromId: 1, toId: 4 },
      { fromId: 1, toId: 5 }
    ];
    let result = completeMoveList(match, touchedId);
    expect(result).toEqual(expected);
  });

  it('returns the move list with the current move from bar', () => {
    let match = moveListIncompleteFromBarMatch();
    let touchedId = 4 
    let expected = [
      { fromId: 'bar', toId: 3 },
      { fromId: 'bar', toId: 4 }
    ];
    let result = completeMoveList(match, touchedId);
    expect(result).toEqual(expected);
  });

  it('returns the move list with the current move to off board', () => {
    let match = moveListIncompleteToOffBoardMatch();
    let touchedId = 'off_board' 
    let expected = [
      { fromId: 22, toId: 'off_board' },
      { fromId: 23, toId: 'off_board' }
    ];
    let result = completeMoveList(match, touchedId);
    expect(result).toEqual(expected);
  });
});

describe('barHasNoPiecesOwnedByPlayer', () => {
  it('returns true if touched point has no pieces owned by player', () => {
    let match = playerTwoSelectedBarMatch();
    let playerNumber = 1;
    let result = barHasNoPiecesOwnedByPlayer(match, playerNumber);
    expect(result).toBe(true);
  });

  it('returns false if touched point has pieces owned by player', () => {
    let match = playerOneSelectedBarMatch();
    let playerNumber = 1;
    let result = barHasNoPiecesOwnedByPlayer(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('touchedEmpty', () => {
  it('returns true if the touched point is empty', () => {
    let match = defaultMatch();
    let touchedId = 2;
    let result = touchedEmpty(match, touchedId);
    expect(result).toBe(true);
  });

  it('returns false if the touched point is not empty', () => {
    let match = defaultMatch();
    let touchedId = 1;
    let result = touchedEmpty(match, touchedId);
    expect(result).toBe(false);

  });
});

describe('touchedOwnedByOpponent', () => {
  it('returns true if the touched point is owned by opponent', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedId = 6;
    let result = touchedOwnedByOpponent(match, playerNumber, touchedId);
    expect(result).toBe(true);
  });

  it('returns false if the touched point is not owned by opponent', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedId = 1;
    let result = touchedOwnedByOpponent(match, playerNumber, touchedId);
    expect(result).toBe(false);
  });
});

describe('barHasPieces', () => {
  it('returns true if it has pieces owned by player', () => {
    let match = playerOneSelectedBarMatch();     
    let playerNumber = 1;
    let result = barHasPieces(match, playerNumber);
    expect(result).toBe(true);
  });
  
  it('returns false if it does not have pieces owned by player', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = barHasPieces(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('noDestinations', () => {
  it('returns true if there are no destinations from touched point', () => {
    let match = noDestinationsMatch();
    let playerNumber = 1;
    let touchedId = 1;
    let result = noDestinations(match, playerNumber, touchedId);
    expect(result).toBe(true);
  });

  it('returns false if there are destinations from touched point', () => {
    let match = firstMoveMatch();
    let playerNumber = 1;
    let touchedId = 1;
    let result = noDestinations(match, playerNumber, touchedId);
    expect(result).toBe(false);
  });
});

describe('somePiecesAreNotHome', () => {
  it('returns true if some pieces are not home', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let result = somePiecesAreNotHome(match, playerNumber);
    expect(result).toBe(true);
  });
  
  it('returns false if all pieces are home', () => {
    let match = bearingOffDiceEqualMatch();
    let playerNumber = 1;
    let result = somePiecesAreNotHome(match, playerNumber);
    expect(result).toBe(false);
  });
});

describe('cannotBearOff', () => {
  describe('when attempting to bear off back point', () => {
    it('returns true if there are no dice greater than or equal to distance', () => {
      let match = bearingOffBackPointDiceLessThanMatch();
      let playerNumber = 1;
      let touchedId = 22;
      let result = cannotBearOff(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if there are dice greater than or equal to distance', () => {
      let match = bearingOffBackPointDiceGreaterThanMatch();
      let playerNumber = 1;
      let touchedId = 22;
      let result = cannotBearOff(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });
  });

  describe('when attempting to bear off non back point', () => {
    it('returns true if there are no dice equal to distance', () => {
      let match = bearingOffNonBackPointDiceNotEqualMatch();
      let playerNumber = 1;
      let touchedId = 22;
      let result = cannotBearOff(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if there are dice equal to distance', () => {
      let match = bearingOffNonBackPointDiceEqualMatch();
      let playerNumber = 1;
      let touchedId = 22;
      let result = cannotBearOff(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });
  });
});

describe('diceRollMismatch', () => {
  describe('when bearing off', () => {
    it('returns true if the dice roll is less than the distance', () => {
      let match = bearingOffDiceLessThanMatch();
      let playerNumber = 1;
      let touchedId = 'off_board'; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if the dice roll is equal to the distance', () => {
      let match = bearingOffDiceEqualMatch();
      let playerNumber = 1;
      let touchedId = 'off_board'; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });

    it('returns false if the dice roll is greater than the distance', () => {
      let match = bearingOffDiceGreaterThanMatch();
      let playerNumber = 1;
      let touchedId = 'off_board'; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });
  });

  describe('when not bearing off', () => {
    it('returns true if the dice roll is less than the distance', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let touchedId = 8; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if the dice roll is equal to the distance', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let touchedId = 7; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });

    it('returns true if the dice roll is greater than the distance', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let touchedId = 5; 
      let result = diceRollMismatch(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });
  });
});

describe('toBlocked', () => {
  it('returns true if owned by opponent and blocked', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 6; 
    let result = toBlocked(match, playerNumber, touchedId);
    expect(result).toBe(true);
  });

  it('returns false if owned by opponent and not blocked', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 7; 
    let result = toBlocked(match, playerNumber, touchedId);
    expect(result).toBe(false);
  });

  it('returns false if owned by player and blocked', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 12; 
    let result = toBlocked(match, playerNumber, touchedId);
    expect(result).toBe(false);
  });

  it('returns false if owned by player and not blocked', () => {
    let match = playerOneSelectedPointMatch();
    let playerNumber = 1;
    let touchedId = 9; 
    let result = toBlocked(match, playerNumber, touchedId);
    expect(result).toBe(false);
  });
});

describe('wrongDirection', () => {
  it('returns true if from is invalid', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedId = 1; 
    let result = wrongDirection(match, playerNumber, touchedId);
    expect(result).toBe(true);
  });

  describe('when player one', () => {
    it('returns true if from is bigger than or equal to to', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let touchedId = 1; 
      let result = wrongDirection(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if from is smaller than to', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let touchedId = 6; 
      let result = wrongDirection(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });
  });

  describe('when player two', () => {
    it('returns true if from is smaller than or equal to to', () => {
      let match = playerTwoSelectedPointMatch();
      let playerNumber = 2;
      let touchedId = 24; 
      let result = wrongDirection(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });

    it('returns false if from is bigger than to', () => {
      let match = playerTwoSelectedPointMatch();
      let playerNumber = 2;
      let touchedId = 19; 
      let result = wrongDirection(match, playerNumber, touchedId);
      expect(result).toBe(false);
    });
  });

  describe('default', () => {
    it('returns true', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 3;
      let touchedId = 1; 
      let result = wrongDirection(match, playerNumber, touchedId);
      expect(result).toBe(true);
    });
  });
});

describe('distance', () => {
  it('returns the absolute distance between from and to', () => {
    let match = playerTwoSelectedPointMatch();
    let playerNumber = 2;
    let touchedId = 19;
    let result = distance(match, playerNumber, touchedId);
    expect(result).toEqual(3);
  });

  it('returns undefined if from is invalid', () => {
    let match = defaultMatch();
    let playerNumber = 1;
    let touchedId = 5;
    let result = distance(match, playerNumber, touchedId);
    expect(result).toBe(undefined);
  });

  it('returns undefined if player is invalid', () => {
    let match = playerTwoSelectedPointMatch();
    let playerNumber = 3;
    let touchedId = 6;
    let result = distance(match, playerNumber, touchedId);
    expect(result).toBe(undefined);
  });
});

describe('fromInt', () => {
  describe('when player 1', () => {
    it('returns 0 if bar selected', () => {
      let match = playerOneSelectedBarMatch();
      let playerNumber = 1;
      let result = fromInt(match, playerNumber);
      expect(result).toEqual(0);
    });

    it('returns number if point selected', () => {
      let match = playerOneSelectedPointMatch();
      let playerNumber = 1;
      let result = fromInt(match, playerNumber);
      expect(result).toEqual(3);
    });
  });

  describe('when player 2', () => {
    it('returns 25 if bar selected', () => {
      let match = playerTwoSelectedBarMatch();
      let playerNumber = 2;
      let result = fromInt(match, playerNumber);
      expect(result).toEqual(25);
    });

    it('returns number if point selected', () => {
      let match = playerTwoSelectedPointMatch();
      let playerNumber = 2;
      let result = fromInt(match, playerNumber);
      expect(result).toEqual(22);
    });
  });

  describe('default', () => {
    it('returns undefined', () => {
      let match = playerOneSelectedBarMatch();
      let playerNumber = 3;
      let result = fromInt(match, playerNumber);
      expect(result).toBe(undefined);
    });
  });
});

describe('bearOff', () => {
  it('returns true if off board', () => {
    expect(bearOff('off_board')).toBe(true);
  });

  it('returns false if bar', () => {
    expect(bearOff('bar')).toBe(false);
  });

  it('returns false if number', () => {
    expect(bearOff(1)).toBe(false);
  });
});

describe('selectedPoint', () => {
  it('returns the selected point if there is one', () => {
    let match = playerOneSelectedPointMatch();
    let result = selectedPoint(match);
    let expected = {
      number: 3,
      pieces: [
        {id: 1, player_number: 1},
        {id: 2, player_number: 1},
      ],
      selected: true 
    };
    expect(result).toEqual(expected);
  });

  it('returns the selected bar if there is one', () => {
    let match = playerOneSelectedBarMatch();
    let result = selectedPoint(match);
    let expected = {
      pieces: [{id: 1, player_number: 1}],
      selected: true 
    };
    expect(result).toEqual(expected);
  });

  it('returns undefined if there is none seleected', () => {
    let match = defaultMatch();
    let result = selectedPoint(match);
    expect(result).toBe(undefined);
  });
});

describe('touchedPoint', () => {
  it('returns bar if bar specified', () => {
    let match = defaultMatch();
    let result = touchedPoint(match, 'bar');
    let expected = { pieces: [], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns off board if off board specified', () => {
    let match = defaultMatch();
    let result = touchedPoint(match, 'off_board');
    let expected = { pieces: [], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns point if point found', () => {
    let match = defaultMatch();
    let result = touchedPoint(match, 10);
    let expected = { number: 10, pieces: [], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns undefined if point not found', () => {
    let match = defaultMatch();
    let result = touchedPoint(match, 25);
    expect(result).toBe(undefined);
  });
});

describe('toInt', () => {
  describe('when player 1', () => {
    it('returns 25 if off board', () => {
      let playerNumber = 1;
      let touchedId = 'off_board';
      let result = toInt(playerNumber, touchedId);
      expect(result).toEqual(25);
    });

    it('returns the touched point number if not off board', () => {
      let playerNumber = 1;
      let touchedId = 10;
      let result = toInt(playerNumber, touchedId);
      expect(result).toEqual(10);
    });
  });

  describe('when player 2', () => {
    it('returns 0 if off board', () => {
      let playerNumber = 2;
      let touchedId = 'off_board';
      let result = toInt(playerNumber, touchedId);
      expect(result).toEqual(0);
    });

    it('returns the touched point number if not off board', () => {
      let playerNumber = 2;
      let touchedId = 10;
      let result = toInt(playerNumber, touchedId);
      expect(result).toEqual(10);
    });
  });

  describe('default', () => {
    it('returns undefined', () => {
      let playerNumber = 3;
      let touchedId = 10;
      let result = toInt(playerNumber, touchedId);
      expect(result).toBe(undefined);
    });
  });
});

describe('numberOfMoves', () => {
  it('returns 1 + the nubmer of moves in the movelist', () => {
    let gameState = moveListIncompleteMatch();
    let result = numberOfMoves(gameState); 
    expect(result).toEqual(2);
  });
});

describe('numberOfPiecesOnBoard', () => {
  it('returns 15 - the number of pieces on board', () => {
    let gameState = somePiecesOffBoardMatch();
    let result = numberOfPiecesOnBoard(gameState, 1);
    expect(result).toEqual(10);
  });
});
