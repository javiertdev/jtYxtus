/**
 * Processes abbreviations ({abbr} with *[abbr]: definition)
 */
export const processAbbreviations = (text: string): string => {
  // First, extract all abbreviation definitions from the end of the text
  const lines = text.split('\n');
  const contentLines: string[] = [];
  const definitions: { [key: string]: string } = {};

  // Process lines in reverse to find definitions at the end
  let i = lines.length - 1;
  let inDefinitions = false;

  while (i >= 0) {
    const line = lines[i].trim();

    // Check if this is an abbreviation definition
    const defMatch = line.match(/^\*\[([^\]]+)\]:\s*(.+)$/);
    if (defMatch) {
      definitions[defMatch[1]] = defMatch[2];
      inDefinitions = true;
    } else if (line === '' && inDefinitions) {
      // Empty line within definitions section, continue
    } else {
      // Non-definition line, stop processing definitions
      break;
    }
    i--;
  }

  // Remove definition lines from content
  const definitionStartIndex = i + 1;
  const processedLines = lines.slice(0, definitionStartIndex);

  // Join content back
  const content = processedLines.join('\n');

  // Replace abbreviation references with HTML
  let result = content;
  for (const [abbr, definition] of Object.entries(definitions)) {
    // Escape special regex characters in abbreviation
    const escapedAbbr = abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\{${escapedAbbr}\\}`, 'g');
    result = result.replace(pattern, `<abbr title="${definition}" class="jt-yxtus">${abbr}</abbr>`);
  }

  return result;
};