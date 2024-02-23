import type Die from '$lib/backgammon/interfaces/Die';
import {
  use as dieUse,
  roll as dieRoll
} from '$lib/backgammon/logic/die';

export const unused = function(dice: Array<Die>): Array<Die> {
  return dice.filter((d) => {
    return !d.used;
  });
};

export const findByNumber = function(dice: Array<Die>, number: number): Die | undefined {
  return dice.find((d) => {
    return d.number === number;
  });
};

export const highestUnused = function(dice: Array<Die>): number {
  let numbers = dice.map((d) => {
    if (!d.used && d.number !== null) {
      return d.number;
    } else {
      return 0;
    }
  }).filter((n) => {
    return n !== 0;
  });
  return Math.max.apply(null, numbers);
};

export const filterByNumber = function(dice: Array<Die>, number: number): Array<Die> {
  return dice.filter((d) => {
    return d.number === number;
  });
};

export const filterGreaterThanOrEqualToNumber = function(dice: Array<Die>, number: number): Array<Die> {
  return dice.filter((d) => {
    return d.number !== null && d.number >= number;
  });
};

export const filterEqualToNumber = function(dice: Array<Die>, number: number): Array<Die> {
  return dice.filter((d) => {
    return d.number !== null && d.number === number;
  });
};

export const use = function(dice: Array<Die>, number: number): boolean {
  let die = dice.find((d) => {
    return !d.used && (d.number === number);
  });
  if (die !== undefined) {
    dieUse(die); 
    return true;
  } else {
    return false;
  }
};

export const roll = function(dice: Array<Die>, allowDoubles: boolean = true): boolean {
  dice.forEach((d) => { dieRoll(d); });

  if (dice[0] !== undefined && dice[1] !== undefined) {
    if (dice[0].number === dice[1].number) {
      if (allowDoubles) {
        let dupDice = dice.map((d) => {
          return { id: d.id + 2, number: d.number, used: false };
        });
        dice = dice.concat(dupDice);
      } else {
        // roll until we don't have doubles
        roll(dice, allowDoubles);
      }
    }
    return true;
  } else {
    return false;
  }
};
