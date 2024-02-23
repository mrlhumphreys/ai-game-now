import { describe, it, expect } from 'vitest';
import defaultGameState from '../fixtures/defaultGameState';
import playerTwoGameState from '../fixtures/playerTwoGameState';
import moveGameState from '../fixtures/moveGameState';
import blotGameState from '../fixtures/blotGameState';
import moveBarGameState from '../fixtures/moveBarGameState';
import selectedPointGameState from '../fixtures/selectedPointGameState';
import selectedBarGameState from '../fixtures/selectedBarGameState';
import noDestinationsFromBarGameState from '../fixtures/noDestinationsFromBarGameState';
import hasDestinationsFromBarGameState from '../fixtures/hasDestinationsFromBarGameState';
import noDestinationsSomePiecesNotHomeGameState from '../fixtures/noDestinationsSomePiecesNotHomeGameState';
import noDestinationsAllPiecesHomeCannotBearOffGameState from '../fixtures/noDestinationsAllPiecesHomeCannotBearOffGameState';
import noDestinationsAllPiecesHomeCanBearOffGameState from '../fixtures/noDestinationsAllPiecesHomeCanBearOffGameState';
import allPiecesOffBoardGameState from '../fixtures/allPiecesOffBoardGameState';
import playerOneWinnerGameState from '../fixtures/playerOneWinnerGameState';
import playerTwoWinnerGameState from '../fixtures/playerTwoWinnerGameState';

import {
  selectedPoint,
  findPoint,
  noMovesForPlayer,
  allPiecesOffBoard,
  playersTurn,
  rollPhase,
  movePhase,
  winner,
  select,
  selectBar,
  selectPoint,
  deselect,
  move,
  roll,
  useDie,
  passTurn,
  stepPhase,
  clearDice
} from '$lib/backgammon/logic/gameState';

describe('selectedPoint', () => {
  it('returns the selected point if a point is selected', () => {
    let gameState = selectedPointGameState();
    let result = selectedPoint(gameState);
    let expected = { number: 1, pieces: [{id: 1, player_number: 1}, {id: 2, player_number: 1}], selected: true };
    expect(result).toEqual(expected);
  });

  it('returns the selected bar if the bar is selected', () => {
    let gameState = selectedBarGameState();
    let result = selectedPoint(gameState);
    let expected = { pieces: [ {id: 1, player_number: 1}, { id: 3, player_number: 2 } ], selected: true };
    expect(result).toEqual(expected);
  });

  it('returns undefined if nothing is selected', () => {
    let gameState = defaultGameState();
    let result = selectedPoint(gameState);
    expect(result).toBe(undefined);
  });
});

describe('findPoint', () => {
  it('returns the bar if bar specified', () => {
    let gameState = defaultGameState();
    let result = findPoint(gameState, 'bar');
    let expected = { pieces: [], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns off board if off board specified', () => {
    let gameState = defaultGameState();
    let result = findPoint(gameState, 'off_board');
    let expected = { pieces: [], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns the point if number', () => {
    let gameState = defaultGameState();
    let result = findPoint(gameState, 1);
    let expected = { number: 1, pieces: [{id: 1, player_number: 1}, {id: 2, player_number: 1}], selected: false };
    expect(result).toEqual(expected);
  });

  it('returns undefined if point not found', () => {
    let gameState = defaultGameState();
    let result = findPoint(gameState, 25);
    expect(result).toBe(undefined);
  });
});

describe('noMovesForPlayer', () => {
  describe('when bar has pieces owned by player', () => {
    it('must return true there are no destinations from bar', () => {
      let gameState = noDestinationsFromBarGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(true);
    });

    it('must returns false there are destinations from bar', () => {
      let gameState = hasDestinationsFromBarGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(false);
    });
  });

  describe('when bar has no pieces owned by player', () => {
    it('must return true if there are no destinations and some pieces are not home', () => {
      let gameState = noDestinationsSomePiecesNotHomeGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(true);
    });

    it('must return true if there are no destinations and some pieces are home and pieces cannot bear off', () => {
      let gameState = noDestinationsAllPiecesHomeCannotBearOffGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(true);
    });

    it('must return false if there are no destinations and some pieces are home and pieces can bear off', () => {
      let gameState = noDestinationsAllPiecesHomeCanBearOffGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(false);
    });

    it('must return false if there are destinations', () => {
      let gameState = moveGameState();
      let result = noMovesForPlayer(gameState, 1);
      expect(result).toBe(false);
    });
  });
});

describe('allPiecesOffBoard', () => {
  it('must return true if all 15 pieces are off board', () => {
    let gameState = allPiecesOffBoardGameState();
    let result = allPiecesOffBoard(gameState);
    expect(result).toBe(true);
  });

  it('must return false if less than 15 pieces are off board', () => {
    let gameState = defaultGameState();
    let result = allPiecesOffBoard(gameState);
    expect(result).toBe(false);
  });
});

describe('playersTurn', () => {
  it('must return true if the player number matches the current player number', () => {
    let gameState = defaultGameState();
    let result = playersTurn(gameState, 1);
    expect(result).toBe(true);
  });

  it('must return false if the player number does not match the current player number', () => {
    let gameState = defaultGameState();
    let result = playersTurn(gameState, 2);
    expect(result).toBe(false);
  });
});

describe('rollPhase', () => {
  it('must return true if in roll phase', () => {
    let gameState = defaultGameState();
    let result = rollPhase(gameState);
    expect(result).toBe(true);
  });

  it('must return false if in move phase', () => {
    let gameState = moveGameState();
    let result = rollPhase(gameState);
    expect(result).toBe(false);
  });
});

describe('movePhase', () => {
  it('must return true if in move phase', () => {
    let gameState = moveGameState();
    let result = movePhase(gameState);
    expect(result).toBe(true);
  });

  it('must return false if in roll phase', () => {
    let gameState = defaultGameState();
    let result = movePhase(gameState);
    expect(result).toBe(false);
  });
});

describe('winner', () => {
  it('must return 1 if all of players 1 pieces are off board', () => {
    let gameState = playerOneWinnerGameState();
    let result = winner(gameState);
    expect(result).toEqual(1);
  });

  it('must return 2 if all of player 2 pieces are off board', () => {
    let gameState = playerTwoWinnerGameState();
    let result = winner(gameState);
    expect(result).toEqual(2);
  });

  it('must return null if none of the players pieces are all of board', () => {
    let gameState = defaultGameState();
    let result = winner(gameState);
    expect(result).toBe(null);
  });
});

describe('select', () => {
  it('selects the bar if bar passed', () => {
    let gameState = moveBarGameState();
    select(gameState, 'bar');
    expect(gameState.bar.selected).toBe(true);
  });

  it('selects the point if a number passed', () => {
    let gameState = defaultGameState();
    select(gameState, 1);
    let point = gameState.points.find((p) => {
      return p.number === 1;
    });
    if (point !== undefined) {
      expect(point.selected).toBe(true);
    } else {
      expect(point).not.toBe(undefined);
    }
  });
});

describe('selectBar', () => {
  it('selects the bar', () => {
    let gameState = moveBarGameState();  
    selectBar(gameState);
    expect(gameState.bar.selected).toBe(true);
  });
});

describe('selectPoint', () => {
  it('selects the point', () => {
    let gameState = defaultGameState();
    selectPoint(gameState, 1);
    let point = gameState.points.find((p) => {
      return p.number === 1;
    });
    if (point !== undefined) {
      expect(point.selected).toBe(true);
    } else {
      expect(point).not.toBe(undefined);
    }
  });
});

describe('deselect', () => {
  it('deselect points', () => {
    let gameState = selectedPointGameState();
    deselect(gameState);
    let point = gameState.points.find((p) => {
      return p.number === 1;
    });
    if (point !== undefined) {
      expect(point.selected).toBe(false);
    } else {
      expect(point).not.toBe(undefined);
    }
  });

  it('deselects bar', () => {
    let gameState = selectedBarGameState();
    deselect(gameState);
    expect(gameState.bar.selected).toBe(false);
  });
});

describe('move', () => {
  describe('moving to a non blot', () => {
    it('moves the piece', () => {
      let gameState = selectedPointGameState();
      let fromId = 1;
      let toId = 4; 
      let playerNumber = 1;

      move(gameState, fromId, toId, playerNumber); 

      let fromPoint = gameState.points.find((p) => {
        return p.number === fromId;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.pieces.length).toEqual(1);   
      } else {
        expect(fromPoint).not.toBe(undefined);
      }

      let toPoint = gameState.points.find((p) => {
        return p.number === toId;
      });

      if (toPoint !== undefined) {
        expect(toPoint.pieces.length).toEqual(1);   
      } else {
        expect(toPoint).not.toBe(undefined);
      }
    });
  });

  describe('moving to a blot', () => {
    it('moves the piece and moves the blot to the bar', () => {
      let gameState = blotGameState();
      let fromId = 1;
      let toId = 4; 
      let playerNumber = 1;

      move(gameState, fromId, toId, playerNumber); 

      let fromPoint = gameState.points.find((p) => {
        return p.number === fromId;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.pieces.length).toEqual(1);   
      } else {
        expect(fromPoint).not.toBe(undefined);
      }

      let toPoint = gameState.points.find((p) => {
        return p.number === toId;
      });
      if (toPoint !== undefined) {
        expect(toPoint.pieces.length).toEqual(1);   
      } else {
        expect(toPoint).not.toBe(undefined);
      }

      expect(gameState.bar.pieces.length).toEqual(1);
    });
  });

  describe('move from bar', () => {
    it('moves the piece from bar onto a point on the board', () => {
      let gameState = selectedBarGameState();
      let fromId = 'bar';
      let toId = 3; 
      let playerNumber = 1;

      move(gameState, fromId, toId, playerNumber); 

      let fromPoint = gameState.bar;
      expect(fromPoint.pieces.length).toEqual(1);

      let toPoint = gameState.points.find((p) => {
        return p.number === toId;
      });

      if (toPoint !== undefined) {
        expect(toPoint.pieces.length).toEqual(1);   
        toPoint.pieces.forEach((p) => {
          expect(p.player_number).toEqual(playerNumber);
        });
      } else {
        expect(toPoint).not.toBe(undefined);
      }
    });
  });

  describe('from or to are not valid', () => {
    it('does not move the piece', () => {
      let gameState = selectedPointGameState();
      let fromId = 1;
      let toId = 25; 
      let playerNumber = 1;

      move(gameState, fromId, toId, playerNumber); 

      let fromPoint = gameState.points.find((p) => {
        return p.number === fromId;
      });
      if (fromPoint !== undefined) {
        expect(fromPoint.pieces.length).toEqual(2);   
      } else {
        expect(fromPoint).not.toBe(undefined);
      }
    });
  });
});

describe('roll', () => {
  it('rolls the dice', () => {
    let gameState = defaultGameState();
    roll(gameState);
    gameState.dice.forEach((d) => {
      expect(d.number).toBeGreaterThanOrEqual(1);
      expect(d.number).toBeLessThanOrEqual(6);
    });
  });
});

describe('useDie', () => {
  it('uses the die if the number matches', () => {
    let gameState = moveGameState();
    useDie(gameState, 4);
    let expected = [
      { id: 0, number: 3, used: false },
      { id: 1, number: 4, used: true }
    ]
    expect(gameState.dice).toEqual(expected);
  });
  
  it('uses the highest die if the number does not match', () => {
    let gameState = moveGameState();
    useDie(gameState, 5);
    let expected = [
      { id: 0, number: 3, used: false },
      { id: 1, number: 4, used: true }
    ]
    expect(gameState.dice).toEqual(expected);
  });
});

describe('passTurn', () => {
  it('sets the player number to 1 if the number is 2', () => {
    let gameState = defaultGameState();
    passTurn(gameState);    
    expect(gameState.current_player_number).toEqual(2);
  });

  it('sets the player number to 2 if the number is 1', () => {
    let gameState = playerTwoGameState();
    passTurn(gameState);    
    expect(gameState.current_player_number).toEqual(1);
  });
});

describe('stepPhase', () => {
  it('sets the phase to move if the phase is roll', () => {
    let gameState = defaultGameState(); 
    stepPhase(gameState);
    expect(gameState.current_phase).toEqual('move');
  });

  it('sets the phase to roll if the phase is move', () => {
    let gameState = moveGameState();
    stepPhase(gameState);
    expect(gameState.current_phase).toEqual('roll');
  });
});

describe('clearDice', () => {
  it('clears the dice', () => {
     let gameState = moveGameState(); 
     clearDice(gameState);
     let expected = [
       { id: 0, number: null, used: false },
       { id: 1, number: null, used: false }
     ];
     expect(gameState.dice).toEqual(expected);
  });
});
