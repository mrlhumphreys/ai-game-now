import { describe, it, expect } from 'vitest';
import empty from '$lib/utils/empty';

describe('empty string', () => {
  it('must return true', () => {
    expect(empty('')).toBe(true);
  });
});

describe('non empty string', () => {
  it('must return false', () => {
    expect(empty('player')).toBe(false);
  });
});

describe('undefined', () => {
  it('must return false', () => {
    expect(empty(undefined)).toBe(false);
  });
});

describe('null', () => {
  it('must return false', () => {
    expect(empty(null)).toBe(false);
  });
});
