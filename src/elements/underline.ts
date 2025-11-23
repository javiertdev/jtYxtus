import { escapeHtml } from '../core/utils.ts';

/**
 * Processes underline text formatting (_text_)
 */
export const processUnderline = (text: string): string => {
  return text.replace(/_([^_\n]+)_/g, (match: string, content: string) => {
    const escaped = escapeHtml(content);
    return `<u class="jt-yxtus">${escaped}</u>`;
  });
};