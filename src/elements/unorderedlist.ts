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
 * Processes unordered list elements - item\n- item
 */
export const processUnorderedLists = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line starts a list item
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        // Start a new list
        inList = true;
        listItems = [];
      }

      // Extract and process the item content (remove the '- ')
      let itemContent = trimmed.substring(2);
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
        const html = `<ul class="jt-yxtus">${listItems.join('\n')}</ul>`;
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
    const html = `<ul class="jt-yxtus">${listItems.join('\n')}</ul>`;
    const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
    processedLines.push(singleLineHtml);
  }

  return processedLines.join('\n');
};