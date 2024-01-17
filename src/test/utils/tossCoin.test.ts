import { describe, it, expect } from 'vitest';
import tossCoin from '$lib/utils/tossCoin';

describe('toss Coin', () => {
  it('must return 0 or 1', () => {
    let result = tossCoin();
    let expected = result === 0 || result === 1;
    expect(expected).toBe(true);
  });
});
