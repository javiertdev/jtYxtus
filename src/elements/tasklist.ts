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
 * Processes task list elements - [ ] item\n- [x] item
 */
export const processTaskLists = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line starts a task list item
    const match = trimmed.match(/^- \[( |x)\] (.+)$/);
    if (match) {
      if (!inList) {
        // Start a new task list
        inList = true;
        listItems = [];
      }

      // Extract checkbox state and process content
      const checked = match[1] === 'x';
      let itemContent = match[2];

      // Process inline formatting
      itemContent = processImages(itemContent);
      itemContent = processLinks(itemContent);
      itemContent = processInlineCode(itemContent);
      itemContent = processColor(itemContent);
      itemContent = processHighlight(itemContent);
      itemContent = processBold(itemContent);
      itemContent = processItalic(itemContent);
      itemContent = processStrikethrough(itemContent);
      itemContent = processUnderline(itemContent);

      const checkboxHtml = `<input type="checkbox" ${checked ? 'checked ' : ''}disabled class="jt-yxtus">`;
      listItems.push(`<li class="jt-yxtus">${checkboxHtml} ${itemContent}</li>`);
    } else {
      // End of list or non-list line
      if (inList) {
        // Close the previous list
        const html = `<ul class="jt-yxtus task-list">${listItems.join('\n')}</ul>`;
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
    const html = `<ul class="jt-yxtus task-list">${listItems.join('\n')}</ul>`;
    const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
    processedLines.push(singleLineHtml);
  }

  return processedLines.join('\n');
};