import { describe, it, expect } from 'vitest';
import {
  use,
  roll
} from '$lib/backgammon/logic/die';

describe('use', () => {
  it('marks the die as used', () => {
    let die = { id: 1, number: 1, used: false };
    use(die);
    expect(die.used).toBe(true);
  });
});

describe('roll', () => {
  it('sets the number to random number between 1 and 6', () => {
    let die = { id: 1, number: null, used: false };
    roll(die);
    expect(die.number).toBeLessThanOrEqual(6);
    expect(die.number).toBeGreaterThanOrEqual(1);
  });
});
