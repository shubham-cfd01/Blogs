import { describe, it, expect } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('returns at least 1 minute for very short text', () => {
    expect(readingTime('hello world')).toBe(1);
  });

  it('scales with word count', () => {
    const text = 'word '.repeat(400);
    expect(readingTime(text, 200)).toBe(2);
  });

  it('handles empty input', () => {
    expect(readingTime('')).toBe(1);
  });
});
