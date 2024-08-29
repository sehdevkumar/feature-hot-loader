import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { jsonToZodSchema } from './schema';

describe('jsonToZodSchema', () => {
  it('should handle strings', () => {
    const schema = jsonToZodSchema('example');
    expect(schema.parse('example')).toBe('example');
    expect(() => schema.parse(123)).toThrow();
  });

  it('should handle numbers', () => {
    const schema = jsonToZodSchema(123);
    expect(schema.parse(123)).toBe(123);
    expect(() => schema.parse('example')).toThrow();
  });

  it('should handle booleans', () => {
    const schema = jsonToZodSchema(true);
    expect(schema.parse(true)).toBe(true);
    expect(() => schema.parse(123)).toThrow();
  });

  it('should handle arrays', () => {
    const schema = jsonToZodSchema([1, 2, 3]);
    expect(schema.parse([1, 2, 3])).toEqual([1, 2, 3]);
    expect(() => schema.parse([1, '2', 3])).toThrow();
  });

  it('should handle objects', () => {
    const schema = jsonToZodSchema({ name: 'John', age: 30 });
    expect(schema.parse({ name: 'John', age: 30 })).toEqual({ name: 'John', age: 30 });
    expect(() => schema.parse({ name: 'John', age: '30' })).toThrow();
  });

  it('should handle nested objects', () => {
    const schema = jsonToZodSchema({ user: { name: 'John', age: 30 }, active: true });
    expect(schema.parse({ user: { name: 'John', age: 30 }, active: true })).toEqual({ user: { name: 'John', age: 30 }, active: true });
    expect(() => schema.parse({ user: { name: 'John', age: '30' }, active: true })).toThrow();
  });

  it('should handle fallback case', () => {
    const schema = jsonToZodSchema(null);
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse('string')).toThrow();
  });
});
