import { escapeHtml } from '../core/utils.ts';

/**
 * Processes link elements [text](url)
 */
export const processLinks = (text: string): string => {
  // Match [text](url) pattern
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match: string, text: string, url: string) => {
    const escapedText = escapeHtml(text);
    const escapedUrl = escapeHtml(url);

    // Check if it's an internal link (starts with #)
    const isInternal = url.startsWith('#');
    const target = isInternal ? '' : ' target="_blank"';

    return `<a href="${escapedUrl}"${target} class="jt-yxtus jt-yxtus-link">${escapedText}</a>`;
  });
};