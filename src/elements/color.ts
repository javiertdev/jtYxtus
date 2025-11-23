import { escapeHtml } from '../core/utils.ts';

/**
 * Processes color text formatting (!{color}(text))
 */
export const processColor = (text: string): string => {
  return text.replace(/!\{([^}]+)\}\(([^)]+)\)/g, (match: string, color: string, content: string) => {
    const escaped = escapeHtml(content);
    // Use !important to override any CSS
    return `<span class="jt-yxtus" style="color:${color}!important">${escaped}</span>`;
  });
};