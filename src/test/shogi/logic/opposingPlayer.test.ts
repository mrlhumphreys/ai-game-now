import { describe, it, expect } from 'vitest';
import opposingPlayer from '$lib/shogi/logic/opposingPlayer';

describe('opposingPlayer', () => {
  it('returns 1 if 2', () => {
    let result = opposingPlayer(2);
    expect(result).toEqual(1);
  });

  it('returns 2 if 1', () => {
    let result = opposingPlayer(1);
    expect(result).toEqual(2);
  });
});
