import { escapeHtml } from '../core/utils.ts';

/**
 * Processes bold text formatting (*text*)
 */
export const processBold = (text: string): string => {
  return text.replace(/\*([^*\n]+)\*/g, (match: string, content: string) => {
    const escaped = escapeHtml(content);
    return `<strong class="jt-yxtus">${escaped}</strong>`;
  });
};