import { describe, it, expect, vi } from 'vitest';
import checkersMoveParser from '$lib/services/checkersMoveParser';

describe('a standard move', () => {
  it('must parse out the details', () => {
    let move = "11-15";
    let state = {};
    let result = checkersMoveParser(move, state);
    let expected = [11, 15];
    expect(result).toEqual(expected);
  });
});
