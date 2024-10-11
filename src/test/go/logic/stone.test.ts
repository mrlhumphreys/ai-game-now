import { describe, it, expect } from 'vitest';

import {
  joinChain
} from '$lib/go/logic/stone';

describe('joinChain', () => {
  it('updates the stones chainid', () => {
    let stone = { id: 1, playerNumber: 1, chainId: 1 };
    let other = { id: 2, playerNumber: 1, chainId: 2 };
    joinChain(stone, other);
    expect(stone.chainId).toEqual(other.chainId);
  });
});
