import { describe, it, expect } from 'vitest';
import capitalize from '$lib/utils/capitalize';

describe('lower case word', () => {
  it('should return capitalized', () => {
    expect(capitalize('player')).toEqual('Player');
  });
});

