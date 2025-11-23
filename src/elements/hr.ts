/**
 * Processes horizontal rule elements (---, ---o---, etc.)
 */
export const processHr = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for HR patterns (3 or more dashes/hyphens)
    if (/^[-]{3,}$/.test(trimmed)) {
      const dashCount = (trimmed.match(/-/g) || []).length;

      // Determine HR variant based on dash count
      let variant = 'line-1'; // default for 3 dashes
      if (dashCount >= 8) variant = 'line-6';
      else if (dashCount >= 7) variant = 'line-5';
      else if (dashCount >= 6) variant = 'line-4';
      else if (dashCount >= 5) variant = 'line-3';
      else if (dashCount >= 4) variant = 'line-2';

      processedLines.push(`<hr class="jt-yxtus ${variant}">`);
    } else {
      processedLines.push(line);
    }
  }

  return processedLines.join('\n');
};