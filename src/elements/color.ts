import { escapeHtml } from '../core/utils.ts';

/**
 * Processes color text formatting (!{color}(text))
 */
export const processColor = (text: string): string => {
  return text.replace(/!\{([^}]+)\}\(([^)]+)\)/g, (match: string, color: string, content: string) => {
    const escaped = escapeHtml(content);
    // Sanitize color to prevent CSS injection
    const sanitizedColor = color.replace(/["';]/g, '');
    // Use !important to override any CSS
    return `<span class="jt-yxtus" style="color:${sanitizedColor}!important">${escaped}</span>`;
  });
};