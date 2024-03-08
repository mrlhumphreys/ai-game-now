import { describe, it, expect } from 'vitest';
import {
  sort,
  findByNumber,
  ownedByPlayer,
  backPointForPlayer,
  somePiecesNotHome,
  cannotBearOff,
  selected,
  destinations,
  destination,
  deselect,
  select
} from '$lib/backgammon/logic/pointSet';

describe('sort', () => {
  it('sorts the points by number', () => {
    let points = [
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false },
      { number: 1, pieces: [], selected: false }
    ];
    let expected = [
      { number: 1, pieces: [], selected: false },
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false }
    ];
    let result = sort(points);
    expect(result).toEqual(expected);
  });
});

describe('findByNumber', () => {
  it('returns the point matching the number', () => {
    let points = [
      { number: 1, pieces: [], selected: false },
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false }
    ];
    let result = findByNumber(points, 2);
    let expected = { number: 2, pieces: [], selected: false };
    expect(result).toEqual(expected);
  });
});

describe('ownedByPlayer', () => {
  it('must return points owned by player', () => {
    let points = [
      { number: 1, pieces: [], selected: false },
      { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 3, pieces: [ { id: 2, playerNumber: 2 } ], selected: false }
    ];
    let result = ownedByPlayer(points, 1);
    let expected = [ { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false } ];
    expect(result).toEqual(expected);
  });
});

describe('backPointForPlayer', () => {
  describe('when player 1', () => {
    it('must return the first point owned by player', () => {
      let points = [
        { number: 1, pieces: [ { id: 2, playerNumber: 2 } ], selected: false },
        { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
        { number: 3, pieces: [ ], selected: false },
        { number: 22, pieces: [ ], selected: false },
        { number: 23, pieces: [ { id: 3, playerNumber: 1 } ], selected: false },
        { number: 24, pieces: [ ], selected: false }
      ];
      let result = backPointForPlayer(points, 1);
      let expected = { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false };
      expect(result).toEqual(expected);
    });
  });

  describe('when player 2', () => {
    it('must return the last point owned by player', () => {
      let points = [
        { number: 1, pieces: [ { id: 2, playerNumber: 2 } ], selected: false },
        { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
        { number: 3, pieces: [ ], selected: false },
        { number: 22, pieces: [ { id: 4, playerNumber: 2 } ], selected: false },
        { number: 23, pieces: [ { id: 3, playerNumber: 1 } ], selected: false },
        { number: 24, pieces: [ ], selected: false }
      ];
      let result = backPointForPlayer(points, 2);
      let expected = { number: 22, pieces: [ { id: 4, playerNumber: 2 } ], selected: false };
      expect(result).toEqual(expected);
    });
  });

  describe('default', () => {
    it('must return undefined', () => {
      let points = [
        { number: 1, pieces: [ { id: 2, playerNumber: 2 } ], selected: false },
        { number: 2, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
        { number: 3, pieces: [ ], selected: false },
        { number: 22, pieces: [ { id: 4, playerNumber: 2 } ], selected: false },
        { number: 23, pieces: [ { id: 3, playerNumber: 1 } ], selected: false },
        { number: 24, pieces: [ ], selected: false }
      ];
      let result = backPointForPlayer(points, 3);
      expect(result).toBe(undefined);
    });
  });
});

describe('somePiecesNotHome', () => {
  it('must return true if some pieces are not home', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 22, pieces: [ ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let result = somePiecesNotHome(points, 1);
    expect(result).toBe(true);
  });
  
  it('must return false if some pieces are home', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let result = somePiecesNotHome(points, 1);
    expect(result).toBe(false);
  });
});

describe('cannotBearOff', () => {
  it('must return true if dice cannot be used to bear off', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ { id: 2, playerNumber: 1 } ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let dice = [
      { id: 1, number: 2, used: false },
      { id: 2, number: 1, used: false }
    ];
    let result = cannotBearOff(points, 1, dice);
    expect(result).toBe(true);
  });
  
  it('must return false if dice can be used to bear off', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let dice = [
      { id: 1, number: 4, used: false },
      { id: 2, number: 3, used: false }
    ];
    let result = cannotBearOff(points, 1, dice);
    expect(result).toBe(false);
  });
});

describe('selected', () => {
  it('returns the point if selected', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: true },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let result = selected(points);
    let expected = { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: true };
    expect(result).toEqual(expected);
  });

  it('returns undefined if no point selected', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    let result = selected(points);
    expect(result).toBe(undefined);
  });
});

describe('destinations', () => {
  it('returns all the points that could be reached from point', () => {
    let points = [
      { number: 1, pieces: [], selected: false },
      { number: 2, pieces: [], selected: false },
      { number: 3, pieces: [], selected: false },
      { number: 4, pieces: [], selected: false },
      { number: 5, pieces: [], selected: false },
      { number: 6, pieces: [], selected: false }
    ];
    let from = { number: 1, pieces: [], selected: false };
    let dice = [
      { id: 1, number: 1, used: false },
      { id: 2, number: 2, used: true }
    ];
    let playerNumber = 1;
    let result = destinations(points, from, dice, playerNumber);
    let expected = [
      { number: 2, pieces: [], selected: false }
    ];
    expect(result).toEqual(expected);
  });
});

describe('destination', () => {
  describe('when player 1', () => {
    it('must return point forwards from 0 if bar', () => {
      let points = [
        { number: 1, pieces: [], selected: false },
        { number: 2, pieces: [], selected: false },
        { number: 3, pieces: [], selected: false },
        { number: 4, pieces: [], selected: false },
        { number: 5, pieces: [], selected: false },
        { number: 6, pieces: [], selected: false }
      ];
      let from = { name: 'bar', pieces: [], selected: false };
      let die = { id: 1, number: 3, used: false };
      let playerNumber = 1;
      let result = destination(points, from, die, playerNumber);
      let expected = { number: 3, pieces: [], selected: false };
      expect(result).toEqual(expected);
    });

    it('must return point forwards from point number if point', () => {
      let points = [
        { number: 1, pieces: [], selected: false },
        { number: 2, pieces: [], selected: false },
        { number: 3, pieces: [], selected: false },
        { number: 4, pieces: [], selected: false },
        { number: 5, pieces: [], selected: false },
        { number: 6, pieces: [], selected: false }
      ];
      let from = { number: 2, pieces: [], selected: false };
      let die = { id: 1, number: 3, used: false };
      let playerNumber = 1;
      let result = destination(points, from, die, playerNumber);
      let expected = { number: 5, pieces: [], selected: false };
      expect(result).toEqual(expected);
    });
  });

  describe('when player 2', () => {
    it('must return point backwards from 25 if bar', () => {
      let points = [
        { number: 19, pieces: [], selected: false },
        { number: 20, pieces: [], selected: false },
        { number: 21, pieces: [], selected: false },
        { number: 22, pieces: [], selected: false },
        { number: 23, pieces: [], selected: false },
        { number: 24, pieces: [], selected: false }
      ];
      let from = { name: 'bar', pieces: [], selected: false };
      let die = { id: 1, number: 3, used: false };
      let playerNumber = 2;
      let result = destination(points, from, die, playerNumber);
      let expected = { number: 22, pieces: [], selected: false };
      expect(result).toEqual(expected);
    });

    it('must return point backwards from point number if point', () => { 
      let points = [
        { number: 19, pieces: [], selected: false },
        { number: 20, pieces: [], selected: false },
        { number: 21, pieces: [], selected: false },
        { number: 22, pieces: [], selected: false },
        { number: 23, pieces: [], selected: false },
        { number: 24, pieces: [], selected: false }
      ];
      let from = { number: 23, pieces: [], selected: false };
      let die = { id: 1, number: 3, used: false };
      let playerNumber = 2;
      let result = destination(points, from, die, playerNumber);
      let expected = { number: 20, pieces: [], selected: false };
      expect(result).toEqual(expected);
    });
  });

  describe('default', () => {
    it('returns undefined', () => {
      let points = [
        { number: 19, pieces: [], selected: false },
        { number: 20, pieces: [], selected: false },
        { number: 21, pieces: [], selected: false },
        { number: 22, pieces: [], selected: false },
        { number: 23, pieces: [], selected: false },
        { number: 24, pieces: [], selected: false }
      ];
      let from = { number: 23, pieces: [], selected: false };
      let die = { id: 1, number: 3, used: false };
      let playerNumber = 3;
      let result = destination(points, from, die, playerNumber);
      let expected = undefined;
      expect(result).toBe(expected);
    });
  });
});

describe('select', () => {
  it('selects the specified point', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: false },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    select(points, 22);
    let point = points.find((p) => {
      return p.number === 22;
    });
    if (point !== undefined) {
      expect(point.selected).toBe(true);
    } else {
      expect(point).not.toBe(undefined);
    }
    
  });
});

describe('deselect', () => {
  it('deselects the selected point', () => {
    let points = [
      { number: 1, pieces: [ ], selected: false },
      { number: 2, pieces: [ ], selected: false },
      { number: 3, pieces: [ ], selected: false },
      { number: 22, pieces: [ { id: 1, playerNumber: 1 } ], selected: true },
      { number: 23, pieces: [ ], selected: false },
      { number: 24, pieces: [ ], selected: false }
    ];
    deselect(points);
    points.forEach((p) => {
      expect(p.selected).toBe(false);
    });
  });
});
