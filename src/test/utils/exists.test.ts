import { describe, it, expect } from 'vitest';
import exists from '$lib/utils/exists';

describe('undefined', () => {
	it('returns false', () => {
		expect(exists(undefined)).toBe(false);
	});
});

describe('null', () => {
  it('returns false', () => {
    expect(exists(null)).toBe(false);
  });
});

describe('number', () => {
  it('returns true', () => {
    expect(exists(1)).toBe(true);
  });
});

describe('string', () => {
  it('returns true', () => {
    expect(exists('str')).toBe(true);
  });
});

describe('object', () => {
  it('returns true', () => {
    expect(exists({ 'a': 'b' })).toBe(true);
  });
});
