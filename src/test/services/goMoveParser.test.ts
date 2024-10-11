import { describe, it, expect } from 'vitest';
import goMoveParser from '$lib/services/goMoveParser';

describe('goMoveParser', () => {
  it('returns a move object with the pointId', () => {
    let result = goMoveParser('qc');
    let expected = { pointId: 55 };
    expect(result).toEqual(expected);
  });
});
