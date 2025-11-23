import { escapeHtml } from '../core/utils.ts';

/**
 * Processes strikethrough text formatting (~text~)
 */
export const processStrikethrough = (text: string): string => {
  return text.replace(/~([^~\n]+)~/g, (match: string, content: string) => {
    const escaped = escapeHtml(content);
    return `<del class="jt-yxtus">${escaped}</del>`;
  });
};