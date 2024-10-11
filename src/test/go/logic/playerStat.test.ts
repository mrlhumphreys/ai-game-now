import { describe, it, expect } from 'vitest';

import {
  markAsPassed,
  markAsContinuing,
  addToPrisonerCount
} from '$lib/go/logic/playerStat';

describe('markAsPassed', () => {
  it('sets passed to true', () => {
    let playerStat = { playerNumber: 1, passed: false, prisonerCount: 0 };
    markAsPassed(playerStat);
    expect(playerStat.passed).toBe(true);
  });
});

describe('markAsContinuing', () => {
  it('returns', () => {
    let playerStat = { playerNumber: 1, passed: true, prisonerCount: 0 };
    markAsContinuing(playerStat);
    expect(playerStat.passed).toBe(false);
  });
});

describe('addToPrisonerCount', () => {
  it('returns', () => {
    let playerStat = { playerNumber: 1, passed: true, prisonerCount: 1 };
    addToPrisonerCount(playerStat, 2);
    expect(playerStat.prisonerCount).toEqual(3);
  });
});
