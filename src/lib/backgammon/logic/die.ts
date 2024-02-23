import type Die from '$lib/backgammon/interfaces/Die';

export const use = function(die: Die): boolean {
  die.used = true;
  return true;
};

export const roll = function(die: Die): boolean {
  die.number = Math.ceil(Math.random()*6);
  return true;
};
