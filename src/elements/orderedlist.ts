import { escapeHtml } from '../core/utils.ts';
import { processInlineCode } from './inlinecode.ts';
import { processColor } from './color.ts';
import { processHighlight } from './highlight.ts';
import { processBold } from './bold.ts';
import { processItalic } from './italic.ts';
import { processStrikethrough } from './strikethrough.ts';
import { processUnderline } from './underline.ts';
import { processLinks } from './link.ts';
import { processImages } from './image.ts';

/**
 * Processes ordered list elements 1. item\n2. item
 */
export const processOrderedLists = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line starts an ordered list item (number followed by dot and space)
    const match = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (match) {
      if (!inList) {
        // Start a new list
        inList = true;
        listItems = [];
      }

      // Extract and process the item content with inline formatting
      let itemContent = match[2];
      itemContent = processImages(itemContent);
      itemContent = processLinks(itemContent);
      itemContent = processInlineCode(itemContent);
      itemContent = processColor(itemContent);
      itemContent = processHighlight(itemContent);
      itemContent = processBold(itemContent);
      itemContent = processItalic(itemContent);
      itemContent = processStrikethrough(itemContent);
      itemContent = processUnderline(itemContent);

      listItems.push(`<li class="jt-yxtus">${itemContent}</li>`);
    } else {
      // End of list or non-list line
      if (inList) {
        // Close the previous list
        const html = `<ol class="jt-yxtus">${listItems.join('\n')}</ol>`;
        const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
        processedLines.push(singleLineHtml);
        inList = false;
        listItems = [];
      }

      // Add the current line
      processedLines.push(line);
    }
  }

  // Close any remaining list
  if (inList) {
    const html = `<ol class="jt-yxtus">${listItems.join('\n')}</ol>`;
    const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
    processedLines.push(singleLineHtml);
  }

  return processedLines.join('\n');
};