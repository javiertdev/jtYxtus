import { escapeHtml } from '../core/utils.ts';

/**
 * Processes italic text formatting (/text/)
 */
export const processItalic = (text: string): string => {
  // Split by HTML tags and only process text content
  const parts = text.split(/(<[^>]+>)/);
  const processedParts: string[] = [];

  for (const part of parts) {
    if (part.startsWith('<') && part.endsWith('>')) {
      // HTML tag, leave as is
      processedParts.push(part);
    } else {
      // Text content, process italic
      const processed = part.replace(/\/([^\/\n]+)\//g, (match: string, content: string) => {
        const escaped = escapeHtml(content);
        return `<em class="jt-yxtus">${escaped}</em>`;
      });
      processedParts.push(processed);
    }
  }

  return processedParts.join('');
};