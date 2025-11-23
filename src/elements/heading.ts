import { kebabCase, escapeHtml } from '../core/utils.ts';
import { processBold } from './bold.ts';
import { processItalic } from './italic.ts';
import { processStrikethrough } from './strikethrough.ts';
import { processUnderline } from './underline.ts';
import { processHighlight } from './highlight.ts';
import { processColor } from './color.ts';
import { processInlineCode } from './inlinecode.ts';
import { Anchor } from '../core/interfaces.ts';

/**
 * Processes heading elements (# ## ### etc.)
 */
export const processHeadings = (text: string): { processed: string; anchors: Anchor[] } => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  const allAnchors: Anchor[] = [];
  const anchorStack: Anchor[][] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for alignment prefixes before headings
    let alignment = '';
    let headingLine = trimmed;

    if (trimmed.startsWith('-:- ')) {
      alignment = 'text-align: center;';
      headingLine = trimmed.substring(4);
    } else if (trimmed.startsWith(':-- ')) {
      alignment = 'text-align: left;';
      headingLine = trimmed.substring(4);
    } else if (trimmed.startsWith('--: ')) {
      alignment = 'text-align: right;';
      headingLine = trimmed.substring(4);
    } else if (trimmed.startsWith('::: ')) {
      alignment = 'text-align: justify;text-justify: inter-word;';
      headingLine = trimmed.substring(4);
    }

    const match = headingLine.match(/^(#{1,6})\s+(.+)$/);

    if (match) {
      const level = match[1].length;
      let title = match[2].trim();

      // Process inline formatting within the title
      title = processInlineCode(title);
      title = processColor(title);
      title = processHighlight(title);
      title = processBold(title);
      title = processItalic(title);
      title = processStrikethrough(title);
      title = processUnderline(title);

      // Generate ID from the original text (before formatting) for kebabCase
      const originalTitle = match[2].trim();
      const id = kebabCase(originalTitle);

      // Create anchor
      const anchor: Anchor = {
        hash: id,
        name: originalTitle, // Use original text for anchor name
        level: level as 1 | 2 | 3 | 4 | 5 | 6,
        children: []
      };

      // Build hierarchical structure
      // Pop anchors from stack that are at the same or higher level
      while (anchorStack.length > 0 && anchorStack[anchorStack.length - 1][0].level >= level) {
        anchorStack.pop();
      }

      // Add to parent if exists
      if (anchorStack.length > 0) {
        const parentLevel = anchorStack[anchorStack.length - 1];
        parentLevel[parentLevel.length - 1].children.push(anchor);
      } else {
        // Top level anchor
        allAnchors.push(anchor);
      }

      // Push current level to stack
      anchorStack.push([anchor]);

      // Create HTML
      const tag = `h${level}`;
      const style = alignment ? ` style="${alignment}"` : '';
      const html = `<${tag} id="${id}" class="jt-yxtus"${style}>${title}</${tag}>`;
      processedLines.push(html);
    } else {
      processedLines.push(line);
    }
  }

  return {
    processed: processedLines.join('\n'),
    anchors: allAnchors
  };
};