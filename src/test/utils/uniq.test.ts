import { describe, it, expect } from 'vitest';
import uniq from '$lib/utils/uniq';

describe('uniq', () => {
  it('must return uniq elements', () => {
    let array = [1, 2, 2, 3];
    let expected = [1, 2, 3];
    let result = uniq(array);
    expect(result).toEqual(expected);
  });
});
