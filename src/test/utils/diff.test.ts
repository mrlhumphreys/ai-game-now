import { describe, it, expect } from 'vitest';
import diff from '$lib/utils/diff';

describe('diff', () => {
  it('returns an arrray with elements in a that are not in b', () => {
    let a = [1, 2, 3, 4, 5];
    let b = [4, 5];
    let expected = [1, 2, 3];
    let result = diff(a, b);
    expect(result).toEqual(expected);
  });
});
