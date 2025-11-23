import { escapeHtml } from '../core/utils.ts';

/**
 * Processes highlight text formatting (==text==)
 */
export const processHighlight = (text: string): string => {
  return text.replace(/==([^=\n]+)==/g, (match: string, content: string) => {
    const escaped = escapeHtml(content);
    return `<mark class="jt-yxtus">${escaped}</mark>`;
  });
};