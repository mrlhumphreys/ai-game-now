import { describe, it, expect } from 'vitest';
import {
  blocked,
  blot,
  empty,
  ownedBy,
  ownedByOpponent,
  enemyBlot,
  home,
  distanceFromOffBoard,
  getPlayerNumber,
  select,
  deselect,
  pop,
  push
} from '$lib/backgammon/logic/point';

describe('blocked', () => {
  it('must return true if the number of pieces is 2 or more', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 }, { id: 2, playerNumber: 1 } ], selected: false };
    expect(blocked(point)).toBe(true);
  });

  it('must return false if the number of pieces is 1 or less', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(blocked(point)).toBe(false);
  });
});

describe('blot', () => {
  it('must return true if the number of pieces is 1', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(blot(point)).toBe(true);  
  });

  it('must return false if the number of pieces is not 1', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 }, { id: 2, playerNumber: 1 } ], selected: false };
    expect(blot(point)).toBe(false);  
  });
});

describe('empty', () => {
  it('must return true if the number of pieces is 0', () => {
    let point = { number: 1, pieces: [ ], selected: false };
    expect(empty(point)).toBe(true);  
  });

  it('must return false if the number of pieces is not 0', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(empty(point)).toBe(false);  
  });
});

describe('ownedBy', () => {
  it('must return true if a piece is owned by the player', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(ownedBy(point, 1)).toBe(true);  
  });

  it('must return false if a piece is owned by the opponent', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(ownedBy(point, 2)).toBe(false);  
  });

  it('must return false if there are no pieces', () => {
    let point = { number: 1, pieces: [ ], selected: false };
    expect(ownedBy(point, 1)).toBe(false);  
  });
});

describe('ownedByOpponent', () => {
  it('must return true if a piece is owned by the opponent', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(ownedByOpponent(point, 2)).toBe(true);  
  });

  it('must return false if a piece is not owned by the opponent', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(ownedByOpponent(point, 1)).toBe(false);  
  });

  it('must return false if there are no pieces', () => {
    let point = { number: 1, pieces: [ ], selected: false };
    expect(ownedByOpponent(point, 1)).toBe(false);  
  });
});

describe('enemyBlot', () => {
  it('must return true if it is a blot owned by the opponent', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 2 } ], selected: false };
    expect(enemyBlot(point, 1)).toBe(true);  
  });

  it('must return false if it is not a blot owned by the opponent', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 2 }, { id: 1, playerNumber: 2 } ], selected: false };
    expect(enemyBlot(point, 1)).toBe(false);  
  });

  it('must return false if it is a blot owned by the player', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(enemyBlot(point, 1)).toBe(false);  
  });

  it('must return false if it is not a blot owned by the player', () => {
    let point = { number: 1, pieces: [ { id: 1, playerNumber: 1 }, { id: 1, playerNumber: 1 } ], selected: false };
    expect(enemyBlot(point, 1)).toBe(false);  
  });
});

describe('home', () => {
  it('must return true if player 1 and number between 19 and 24', () => {
    let point = { number: 21, pieces: [ ], selected: false };
    let playerNumber = 1;
    expect(home(point, playerNumber)).toBe(true);
  });

  it('must return false if player 1 and number less than 19', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    let playerNumber = 1;
    expect(home(point, playerNumber)).toBe(false);
  });

  it('must return true if player 2 and number between 1 and 6', () => {
    let point = { number: 3, pieces: [ ], selected: false };
    let playerNumber = 2;
    expect(home(point, playerNumber)).toBe(true);
  });

  it('must return false if player 2 and number greater than 6', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    let playerNumber = 2;
    expect(home(point, playerNumber)).toBe(false);
  });
});

describe('distanceFromOffBoard', () => {
  it('must return a number less 25 if player 1', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    let playerNumber = 1;
    expect(distanceFromOffBoard(point, playerNumber)).toEqual(15);
  });

  it('must return the point number if player 2', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    let playerNumber = 2;
    expect(distanceFromOffBoard(point, playerNumber)).toEqual(10);
  });
});

describe('getPlayerNumber', () => {
  it('must return a pieces player number if it has pieces', () => {
    let point = { number: 10, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
    expect(getPlayerNumber(point)).toEqual(1);
  });

  it('must return null if there are no pieces', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    expect(getPlayerNumber(point)).toBe(null);
  });
});

describe('select', () => {
  it('marks the point as selected', () => {
    let point = { number: 10, pieces: [ ], selected: false };
    select(point);
    expect(point.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('unmarks the point as selected', () => {
    let point = { number: 10, pieces: [ ], selected: true };
    deselect(point);
    expect(point.selected).toBe(false);
  });
});

describe('pop', () => {
  it('removes a piece and returns it if there are pieces', () => {
    let point = { number: 10, pieces: [ { id: 1, playerNumber: 1 } ], selected: true };
    let poppedPiece = pop(point);
    expect(point.pieces).toEqual([]);
    expect(poppedPiece).toEqual({ id: 1, playerNumber: 1 });
  });

  it('returns undefined if there are no pieces', () => {
    let point = { number: 10, pieces: [ ], selected: true };
    let poppedPiece = pop(point);
    expect(point.pieces).toEqual([]);
    expect(poppedPiece).toBe(undefined);
  });
});

describe('push', () => {
  it('adds a piece', () => {
    let point = { number: 10, pieces: [ ], selected: true };
    let piece = { id: 1, playerNumber: 1 };
    push(point, piece);
    expect(point.pieces).toEqual([piece]);
  });
});
