import { processBold } from './bold.ts';
import { processItalic } from './italic.ts';
import { processStrikethrough } from './strikethrough.ts';
import { processUnderline } from './underline.ts';
import { processHighlight } from './highlight.ts';
import { processColor } from './color.ts';
import { processInlineCode } from './inlinecode.ts';
import { processLinks } from './link.ts';
import { processImages } from './image.ts';
import { processTaskLists } from './tasklist.ts';
import { processIcons } from './icon.ts';

/**
 * Processes blockquote elements (> text)
 */
export const processBlockquotes = (text: string): string => {
   const lines = text.split('\n');
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('>')) {
      // Collect all consecutive blockquote lines
      const blockquoteLines: string[] = [];
      let j = i;

      while (j < lines.length && lines[j].trim().startsWith('>')) {
        blockquoteLines.push(lines[j]);
        j++;
      }

      // Process the blockquote block
      const html = processBlockquoteBlock(blockquoteLines);
      processedLines.push(html);

      // Skip processed lines
      i = j - 1;
    } else {
      processedLines.push(line);
    }
  }

  return processedLines.join('\n');
};

/**
 * Process a blockquote block
 */
function processBlockquoteBlock(lines: string[]): string {
  // Check for special blockquote types BEFORE removing > markers
  const firstLineRaw = lines[0];
  const contentPart = removeLeadingGreaterThans(firstLineRaw);
  const specialMatch = contentPart.match(/^\s*\[([^\]]+)\@([^\]]+)\]/);

  if (specialMatch) {
    const type = specialMatch[1].replace(/^!/, '').toLowerCase();
    const title = specialMatch[2];

    // Process title with inline formatting (no wrapping)
    let processedTitle = title;
    processedTitle = processImages(processedTitle);
    processedTitle = processIcons(processedTitle);
    processedTitle = processLinks(processedTitle);
    processedTitle = processInlineCode(processedTitle);
    processedTitle = processColor(processedTitle);
    processedTitle = processHighlight(processedTitle);
    processedTitle = processBold(processedTitle);
    processedTitle = processItalic(processedTitle);
    processedTitle = processStrikethrough(processedTitle);
    processedTitle = processUnderline(processedTitle);

    // Remove special marker and process all lines
    const processedLines = lines.map(line => {
      const content = removeLeadingGreaterThans(line);
      if (line === firstLineRaw) {
        // Skip the first line as it's the title
        return '';
      }
      return content;
    });

    // Process remaining content
    const contentJoined = processedLines.filter(line => line.trim() !== '').join('\n');
    const processedContent = processBlockquoteContent([contentJoined]);

    return `<blockquote class="jt-yxtus ${type}"><div class="jt-yxtus blockquote-title">${processedTitle}</div><br/>${processedContent}</blockquote>`;
  }

  // Remove > markers from all lines for regular processing
  const contentLines = lines.map(line => removeLeadingGreaterThans(line));

  // Handle regular blockquotes with potential nesting
  let result = '';
  let currentLevel = 1;

  for (const line of lines) {
    const level = countLeadingGreaterThans(line);
    const content = removeLeadingGreaterThans(line);

    if (level > currentLevel) {
      // Start nested blockquote
      let processedContent = content;
      processedContent = processImages(processedContent);
      processedContent = processIcons(processedContent);
      processedContent = processLinks(processedContent);
      processedContent = processInlineCode(processedContent);
      processedContent = processColor(processedContent);
      processedContent = processHighlight(processedContent);
      processedContent = processBold(processedContent);
      processedContent = processItalic(processedContent);
      processedContent = processStrikethrough(processedContent);
      processedContent = processUnderline(processedContent);
      result += `<blockquote class="jt-yxtus"><p class="jt-yxtus">${processedContent}</p>`;
      currentLevel = level;
    } else if (level < currentLevel) {
      // Close nested blockquote(s)
      while (currentLevel > level) {
        result += '</blockquote>';
        currentLevel--;
      }
      if (result) result += '<br/>';
      result += content;
    } else {
      // Same level
      if (result) result += '<br/>';
      result += content;
    }
  }

  // Close remaining blockquotes
  while (currentLevel > 1) {
    result += '</blockquote>';
    currentLevel--;
  }

  // Process inline formatting
  result = processBlockquoteContent([result]);

  return `<blockquote class="jt-yxtus">${result}</blockquote>`;
}

/**
 * Count the number of leading > characters
 */
function countLeadingGreaterThans(line: string): number {
  let count = 0;
  for (const char of line) {
    if (char === '>') count++;
    else if (char === ' ') continue; // Allow spaces
    else break;
  }
  return count;
}

/**
 * Remove leading > characters from a line
 */
function removeLeadingGreaterThans(line: string): string {
  return line.replace(/^>+\s*/, '');
}


/**
 * Process content within blockquotes
 */
function processBlockquoteContent(lines: string[]): string {
  // The input lines contain the joined content with <br/> separators
  // We need to split them back to individual lines for block processing
  const input = lines[0];
  const contentLines = input.split('<br/>');
  const contentWithBlocks = contentLines.join('\n');
  let processedBlocks = contentWithBlocks;

  // Process lists (block elements that need newlines)
  processedBlocks = processTaskLists(processedBlocks);

  // Now process each line: wrap text lines in <p>, keep block elements as is
  const blockLines = processedBlocks.split('\n');
  const processedLines: string[] = [];

  for (const line of blockLines) {
    // Process inline elements for all lines
    let processed = line;

    // Process inline elements in order
    processed = processImages(processed);
    processed = processIcons(processed);
    processed = processLinks(processed);
    processed = processInlineCode(processed);
    processed = processColor(processed);
    processed = processHighlight(processed);
    processed = processBold(processed);
    processed = processItalic(processed);
    processed = processStrikethrough(processed);
    processed = processUnderline(processed);

    processedLines.push(processed);
  }

  // Wrap text lines in <p>, keep block elements as is
  const wrappedLines = processedLines.map(line => {
    if (line.includes('<blockquote')) {
      // Special handling for lines with nested blockquotes
      const parts = line.split(/(<blockquote[^>]*>.*?<\/blockquote>)/);
      const processedParts = parts.map(part => {
        if (part.startsWith('<blockquote')) {
          return part;
        } else if (part.trim()) {
          return `<p class="jt-yxtus">${part}</p>`;
        } else {
          return '';
        }
      }).filter(p => p);
      return processedParts.join('');
    } else if (line.trim().match(/^<(ul|ol|blockquote|h[1-6]|table|div)/i)) {
      return line; // Block element
    } else {
      return `<p class="jt-yxtus">${line}</p>`;
    }
  });

  // Join with <br/> for multi-line content
  return wrappedLines.join('<br/>');
}