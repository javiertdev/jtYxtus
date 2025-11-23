import { escapeHtml } from '../core/utils.ts';

/**
 * Processes paragraphs by wrapping lines that don't match other elements
 */
export const processParagraphs = (text: string): string => {
  // Split by lines and process each line
  const lines = text.split('\n');
  const processedLines: string[] = [];

  let insideCode = false;
  for (const line of lines) {
    // Skip empty lines
    if (line.trim() === '') {
      processedLines.push(line);
      continue;
    }

    // Track if we are inside <code> tags to avoid processing code content
    if (line.includes('<code')) insideCode = true;
    if (line.includes('</code>')) insideCode = false;
    if (insideCode) {
      processedLines.push(line);
      continue;
    }

    // Skip lines that start with block element markers (these should be processed by their respective processors)
    const trimmed = line.trim();
    if (
      trimmed.startsWith('#') || // headings
      trimmed.startsWith('```') || // code blocks
      trimmed.startsWith('>') || // blockquotes
      trimmed.startsWith('-') || // lists, hr, alignment
      trimmed.startsWith('|') || // tables
      trimmed.match(/^\d+\./) || // ordered lists
      trimmed.startsWith('![') || // images/media
      trimmed.startsWith('[') || // links/buttons
      trimmed.startsWith('{') || // abbreviations
      trimmed.startsWith(';') || // icons
      trimmed.startsWith('<!--') || // comments
      trimmed.startsWith('---') // hr
    ) {
      processedLines.push(line);
      continue;
    }

    // Skip lines that contain block-level elements (div, code blocks, etc.)
    if (line.includes('<div') || line.includes('<ul') || line.includes('<ol') ||
        line.includes('<blockquote') || line.includes('<table') || line.includes('<hr') ||
        line.includes('<video') || line.includes('<audio') || line.includes('<iframe') ||
        line.includes('<p class="jt-yxtus" style="text-align:') || line.match(/<h[1-6][^>]*>.*<\/h[1-6]>/)) {
      processedLines.push(line);
      continue;
    }

    // Skip lines that contain only standalone elements (like images, links, etc.)
    if (line.match(/^<img[^>]*>$/) || line.match(/^<a[^>]*>.*<\/a>$/) ||
        line.match(/^<video[^>]*>.*<\/video>$/) || line.match(/^<audio[^>]*>.*<\/audio>$/) ||
        line.match(/^<iframe[^>]*><\/iframe>$/) || line.match(/^<code[^>]*>.*<\/code>$/)) {
      processedLines.push(line);
      continue;
    }

    // Wrap remaining lines in paragraph tags
    // Since other processors run before this, HTML tags may already be present
    processedLines.push(`<p class="jt-yxtus">${line}</p>`);
  }

  return processedLines.join('\n');
};