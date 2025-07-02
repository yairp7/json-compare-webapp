export interface DeepCompareOptions {
  excludedFields?: string[];
}

export interface DeepCompareResult {
  isEqual: boolean;
  differences: string[];
  excludedFields: string[];
}

export function deepCompare(
  obj1: unknown,
  obj2: unknown,
  options: DeepCompareOptions = {},
  path: string = ''
): string[] {
  const { excludedFields = [] } = options;
  const differences: string[] = [];

  if (obj1 === null && obj2 === null) return differences;

  if (obj1 === null || obj2 === null) {
    differences.push(`${path}: Null mismatch - ${obj1} vs ${obj2}`);
    return differences;
  }

  if (typeof obj1 !== typeof obj2) {
    differences.push(`${path}: Type mismatch - ${typeof obj1} vs ${typeof obj2}`);
    return differences;
  }

  if (typeof obj1 !== 'object') {
    if (obj1 !== obj2) {
      differences.push(`${path}: Value mismatch - ${obj1} vs ${obj2}`);
    }
    return differences;
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    differences.push(`${path}: Array/Object mismatch`);
    return differences;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      differences.push(`${path}: Array length mismatch - ${obj1.length} vs ${obj2.length}`);
    }
    const maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      const newPath = path ? `${path}[${i}]` : `[${i}]`;
      differences.push(...deepCompare(obj1[i], obj2[i], { excludedFields }, newPath));
    }
  } else if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
    const keys1 = Object.keys(obj1 as Record<string, unknown>);
    const keys2 = Object.keys(obj2 as Record<string, unknown>);
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      if (excludedFields.includes(key)) {
        continue;
      }
      const newPath = path ? `${path}.${key}` : key;
      const obj1Record = obj1 as Record<string, unknown>;
      const obj2Record = obj2 as Record<string, unknown>;
      if (!(key in obj1Record)) {
        differences.push(`${newPath}: Missing in first object`);
      } else if (!(key in obj2Record)) {
        differences.push(`${newPath}: Missing in second object`);
      } else {
        differences.push(...deepCompare(obj1Record[key], obj2Record[key], { excludedFields }, newPath));
      }
    }
  }

  return differences;
}

export function compareJson(
  json1: string,
  json2: string,
  excludedFields: string[] = []
): DeepCompareResult {
  const parsedJson1 = JSON.parse(json1);
  const parsedJson2 = JSON.parse(json2);
  const differences = deepCompare(parsedJson1, parsedJson2, { excludedFields });
  return {
    isEqual: differences.length === 0,
    differences,
    excludedFields,
  };
} 