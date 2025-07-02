import { deepCompare, compareJson, DeepCompareResult } from '../src/utils/jsonCompare';

describe('deepCompare', () => {
  it('should return no differences for equal objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toEqual([]);
  });

  it('should detect value differences', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toContain('b: Value mismatch - 2 vs 3');
  });

  it('should detect missing keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toContain('b: Missing in first object');
  });

  it('should ignore excluded fields', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['b'] });
    expect(diffs).toEqual([]);
  });

  it('should compare arrays', () => {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [1, 2, 4] };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toContain('arr[2]: Value mismatch - 3 vs 4');
  });

  it('should compare nested objects', () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toContain('a.b.c: Value mismatch - 1 vs 2');
  });

  it('should handle nulls', () => {
    const obj1 = { a: null };
    const obj2 = { a: 1 };
    const diffs = deepCompare(obj1, obj2);
    expect(diffs).toContain('a: Null mismatch - null vs 1');
  });
});

describe('deepCompare - Exclude Fields Logic', () => {
  it('should exclude top-level fields', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 999, c: 3 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['b'] });
    expect(diffs).toEqual([]);
  });

  it('should exclude multiple fields', () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4 };
    const obj2 = { a: 1, b: 999, c: 888, d: 4 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['b', 'c'] });
    expect(diffs).toEqual([]);
  });

  it('should exclude nested fields', () => {
    const obj1 = { user: { id: 1, name: 'John', timestamp: '2024-01-01' } };
    const obj2 = { user: { id: 1, name: 'John', timestamp: '2024-01-02' } };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['timestamp'] });
    expect(diffs).toEqual([]);
  });

  it('should exclude fields in nested objects', () => {
    const obj1 = {
      user: {
        profile: {
          id: 1,
          name: 'John',
          lastLogin: '2024-01-01'
        }
      }
    };
    const obj2 = {
      user: {
        profile: {
          id: 1,
          name: 'John',
          lastLogin: '2024-01-02'
        }
      }
    };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['lastLogin'] });
    expect(diffs).toEqual([]);
  });

  it('should exclude fields in arrays', () => {
    const obj1 = {
      users: [
        { id: 1, name: 'John', timestamp: '2024-01-01' },
        { id: 2, name: 'Jane', timestamp: '2024-01-01' }
      ]
    };
    const obj2 = {
      users: [
        { id: 1, name: 'John', timestamp: '2024-01-02' },
        { id: 2, name: 'Jane', timestamp: '2024-01-02' }
      ]
    };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['timestamp'] });
    expect(diffs).toEqual([]);
  });

  it('should exclude fields in mixed nested structures', () => {
    const obj1 = {
      users: [
        {
          id: 1,
          profile: {
            name: 'John',
            lastLogin: '2024-01-01',
            settings: { theme: 'dark', timestamp: '2024-01-01' }
          }
        }
      ],
      metadata: {
        count: 1,
        timestamp: '2024-01-01'
      }
    };
    const obj2 = {
      users: [
        {
          id: 1,
          profile: {
            name: 'John',
            lastLogin: '2024-01-02',
            settings: { theme: 'dark', timestamp: '2024-01-02' }
          }
        }
      ],
      metadata: {
        count: 1,
        timestamp: '2024-01-02'
      }
    };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['timestamp', 'lastLogin'] });
    expect(diffs).toEqual([]);
  });

  it('should still detect differences in non-excluded fields', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 999, c: 3 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['b'] });
    expect(diffs).toEqual([]);

    // But should detect differences in non-excluded fields
    const obj3 = { a: 1, b: 2, c: 3 };
    const obj4 = { a: 999, b: 2, c: 3 };
    const diffs2 = deepCompare(obj3, obj4, { excludedFields: ['b'] });
    expect(diffs2).toContain('a: Value mismatch - 1 vs 999');
  });

  it('should handle case-sensitive field exclusion', () => {
    const obj1 = { Name: 'John', name: 'John', NAME: 'John' };
    const obj2 = { Name: 'Jane', name: 'Jane', NAME: 'Jane' };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['name'] });
    expect(diffs).toContain('Name: Value mismatch - John vs Jane');
    expect(diffs).toContain('NAME: Value mismatch - John vs Jane');
  });

  it('should exclude fields that exist in only one object', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: ['b'] });
    expect(diffs).toEqual([]);
  });

  it('should handle empty excluded fields array', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: [] });
    expect(diffs).toContain('b: Value mismatch - 2 vs 3');
  });

  it('should handle undefined excluded fields', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const diffs = deepCompare(obj1, obj2, { excludedFields: undefined });
    expect(diffs).toContain('b: Value mismatch - 2 vs 3');
  });
});

describe('compareJson', () => {
  it('should return isEqual true for equal JSON', () => {
    const json1 = '{"a":1,"b":2}';
    const json2 = '{"a":1,"b":2}';
    const result: DeepCompareResult = compareJson(json1, json2);
    expect(result.isEqual).toBe(true);
    expect(result.differences).toEqual([]);
  });

  it('should return isEqual false and show differences', () => {
    const json1 = '{"a":1,"b":2}';
    const json2 = '{"a":1,"b":3}';
    const result: DeepCompareResult = compareJson(json1, json2);
    expect(result.isEqual).toBe(false);
    expect(result.differences).toContain('b: Value mismatch - 2 vs 3');
  });

  it('should handle excluded fields', () => {
    const json1 = '{"a":1,"b":2}';
    const json2 = '{"a":1,"b":3}';
    const result: DeepCompareResult = compareJson(json1, json2, ['b']);
    expect(result.isEqual).toBe(true);
    expect(result.differences).toEqual([]);
  });

  it('should throw error for invalid JSON', () => {
    const json1 = '{a:1}'; // invalid JSON
    const json2 = '{"a":1}';
    expect(() => compareJson(json1, json2)).toThrow();
  });
});

describe('compareJson - Exclude Fields Logic', () => {
  it('should exclude fields in JSON comparison', () => {
    const json1 = '{"user":{"id":1,"name":"John","timestamp":"2024-01-01"}}';
    const json2 = '{"user":{"id":1,"name":"John","timestamp":"2024-01-02"}}';
    const result = compareJson(json1, json2, ['timestamp']);
    expect(result.isEqual).toBe(true);
    expect(result.excludedFields).toEqual(['timestamp']);
  });

  it('should handle multiple excluded fields in JSON', () => {
    const json1 = '{"a":1,"b":2,"c":3,"d":4}';
    const json2 = '{"a":1,"b":999,"c":888,"d":4}';
    const result = compareJson(json1, json2, ['b', 'c']);
    expect(result.isEqual).toBe(true);
    expect(result.excludedFields).toEqual(['b', 'c']);
  });

  it('should handle nested excluded fields in JSON', () => {
    const json1 = '{"users":[{"id":1,"profile":{"name":"John","lastLogin":"2024-01-01"}}]}';
    const json2 = '{"users":[{"id":1,"profile":{"name":"John","lastLogin":"2024-01-02"}}]}';
    const result = compareJson(json1, json2, ['lastLogin']);
    expect(result.isEqual).toBe(true);
    expect(result.excludedFields).toEqual(['lastLogin']);
  });

  it('should still detect differences in non-excluded fields', () => {
    const json1 = '{"a":1,"b":2,"c":3}';
    const json2 = '{"a":999,"b":2,"c":3}';
    const result = compareJson(json1, json2, ['b']);
    expect(result.isEqual).toBe(false);
    expect(result.differences).toContain('a: Value mismatch - 1 vs 999');
  });

  it('should handle empty excluded fields array', () => {
    const json1 = '{"a":1,"b":2}';
    const json2 = '{"a":1,"b":3}';
    const result = compareJson(json1, json2, []);
    expect(result.isEqual).toBe(false);
    expect(result.excludedFields).toEqual([]);
  });
}); 