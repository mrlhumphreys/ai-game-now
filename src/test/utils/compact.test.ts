import { describe, it, expect } from 'vitest';
import compact from '$lib/utils/compact';

describe('compact', () => {
  it('returns an arrray without null or undefined', () => {
    let array = [1, undefined, null];
    expect(compact(array)).toEqual([1]);
  });
});
