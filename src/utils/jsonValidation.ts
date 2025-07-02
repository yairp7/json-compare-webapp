export interface JsonValidationResult {
  isValid: boolean;
  error?: string;
  errorLine?: number;
  errorColumn?: number;
}

export function validateJson(jsonString: string): JsonValidationResult {
  if (!jsonString.trim()) {
    return { isValid: true };
  }

  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      const message = error.message;

      // Extract line and column from error message
      const lineMatch = message.match(/position (\d+)/);
      const position = lineMatch ? parseInt(lineMatch[1]) : 0;

      let line = 1;
      let column = 1;

      if (position > 0) {
        let currentPos = 0;
        const lines = jsonString.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const lineLength = lines[i].length + 1; // +1 for newline
          if (currentPos + lineLength >= position) {
            line = i + 1;
            column = position - currentPos;
            break;
          }
          currentPos += lineLength;
        }
      }

      return {
        isValid: false,
        error: message,
        errorLine: line,
        errorColumn: column
      };
    }

    return {
      isValid: false,
      error: 'Invalid JSON format'
    };
  }
}

export function formatJson(jsonString: string): string {
  if (!jsonString.trim()) {
    return '';
  }

  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString; // Return original if invalid
  }
} 