import type Stone from '$lib/go/interfaces/Stone';

export const joinChain = function(stone: Stone, other: Stone): boolean {
  stone.chainId = other.chainId;
  return true;
};

