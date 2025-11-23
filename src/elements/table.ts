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
 * Processes table elements with alignment support
 */
export const processTables = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let alignments: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line looks like a table row (starts with | and has multiple cells)
    if (line.trim().startsWith('|') && (line.match(/\|/g) || []).length >= 2) {
      // Split by | but keep empty cells
      const parts = line.split('|');
      // Remove first and last empty parts if they exist (from leading/trailing |)
      const cells = parts.slice(1, -1).map(cell => cell.trim());

      if (!inTable) {
        // Start of table
        inTable = true;
        tableRows = [cells];
      } else if (tableRows.length === 1) {
        // This should be the separator row
        alignments = parseAlignments(cells);
        tableRows.push(cells); // Keep the separator for reference
      } else {
        // Regular data row
        tableRows.push(cells);
      }
    } else {
      // End of table or non-table line
      if (inTable) {
        // Process the complete table
        const html = generateTableHtml(tableRows, alignments);
        const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
        processedLines.push(singleLineHtml);
        inTable = false;
        tableRows = [];
        alignments = [];
      }

      // Add the current line
      processedLines.push(lines[i]);
    }
  }

  // Handle table at end of text
  if (inTable) {
    const html = generateTableHtml(tableRows, alignments);
    const singleLineHtml = html.replace(/\n/g, '§§§NEWLINE§§§');
    processedLines.push(singleLineHtml);
  }

  return processedLines.join('\n');
};

/**
 * Parse alignment indicators from separator row
 */
function parseAlignments(separatorCells: string[]): string[] {
  return separatorCells.map(cell => {
    const trimmed = cell.trim();
    if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
    if (trimmed.startsWith(':') && !trimmed.endsWith(':')) return 'left';
    if (!trimmed.startsWith(':') && trimmed.endsWith(':')) return 'right';
    return 'left'; // default
  });
}

/**
 * Generate HTML for the table
 */
function generateTableHtml(rows: string[][], alignments: string[]): string {
  if (rows.length < 2) return ''; // Need at least header + separator

  const headerRow = rows[0];
  const dataRows = rows.slice(2); // Skip header and separator

  let html = '\n<table class="jt-yxtus">';

  // Header
  html += '<thead><tr>';
  headerRow.forEach((cell, index) => {
    const processedCell = processCellContent(cell);
    const alignment = alignments[index];
    const style = alignment && alignment !== 'left' ? ` style="text-align: ${alignment};"` : '';
    html += `<th${style}>${processedCell}</th>`;
  });
  html += '</tr></thead>';

  // Body
  if (dataRows.length > 0) {
    html += '<tbody>';
    dataRows.forEach(row => {
      html += '<tr>';
      row.forEach((cell, index) => {
        const processedCell = processCellContent(cell);
        const alignment = alignments[index];
        const style = alignment && alignment !== 'left' ? ` style="text-align: ${alignment};"` : '';
        html += `<td${style}>${processedCell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody>';
  }

  html += '</table>';
  return html;
}

/**
 * Process inline formatting within table cells
 */
function processCellContent(content: string): string {
  let processed = content;

  // Apply inline formatting in the correct order
  processed = processImages(processed);
  processed = processLinks(processed);
  processed = processInlineCode(processed);
  processed = processColor(processed);
  processed = processHighlight(processed);
  processed = processBold(processed);
  processed = processItalic(processed);
  processed = processStrikethrough(processed);
  processed = processUnderline(processed);

  return processed;
}