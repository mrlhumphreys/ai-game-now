import { describe, it, expect } from 'vitest';
import {
  unused,
  findByNumber,
  highestUnused,
  filterByNumber,
  filterGreaterThanOrEqualToNumber,
  filterEqualToNumber,
  use,
  roll
} from '$lib/backgammon/logic/diceSet';

describe('unused', () => {
  it('must return unused dice', () => {
    let dice = [ { id: 1, number: 1, used: false }, { id: 2, number: 2, used: true } ];
    let result = unused(dice);
    let expected = [ { id: 1, number: 1, used: false } ];
    expect(result).toEqual(expected);
  });
});

describe('findByNumber', () => {
  it('must return a die matching that number', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    let result = findByNumber(dice, 4);
    let expected = { id: 2, number: 4, used: false };
    expect(result).toEqual(expected);
  });
});

describe('highestUnused', () => {
  it('must return the number of the highest unused die', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    let result = highestUnused(dice);
    expect(result).toEqual(4);
  });
});

describe('filterByNumber', () => {
  it('must return all dice with the matching number', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    let result = filterByNumber(dice, 3);
    let expected = [ { id: 1, number: 3, used: false } ];
    expect(result).toEqual(expected);
  });
});

describe('filterGreaterThanOrEqualToNumber', () => {
  it('must return all dice greater than or equal to the matching number', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    let result = filterGreaterThanOrEqualToNumber(dice, 3);
    let expected = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    expect(result).toEqual(expected);
  });
});

describe('filterEqualToNumber', () => {
  it('must return all dice equal to the matching number', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    let result = filterEqualToNumber(dice, 3);
    let expected = [ { id: 1, number: 3, used: false } ];
    expect(result).toEqual(expected);
  });
});

describe('use', () => {
  it('must mark the die matching the number as used', () => {
    let dice = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: false } ];
    use(dice, 4);
    let expected = [ { id: 1, number: 3, used: false }, { id: 2, number: 4, used: true } ];
    expect(dice).toEqual(expected);
  });
});

describe('roll', () => {
  it('must set random numbers for the dice', () => {
    let dice = [ { id: 1, number: null, used: false }, { id: 2, number: null, used: false } ];
    roll(dice);
    dice.forEach((d) => {
      expect(d.number).toBeGreaterThanOrEqual(1);
      expect(d.number).toBeLessThanOrEqual(6);
    });
  });
});
