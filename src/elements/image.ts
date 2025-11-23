import { escapeHtml } from '../core/utils.ts';

/**
 * Processes image elements ![alt](url)
 */
export const processImages = (text: string): string => {
  // Match ![alt](url) pattern, but exclude media elements (video, audio, yt)
  return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match: string, alt: string, url: string) => {
    // Skip if this is a media element (video, audio, yt)
    if (alt.startsWith('video') || alt.startsWith('audio') || alt.startsWith('yt')) {
      return match; // Return unchanged
    }

    const escapedAlt = escapeHtml(alt);
    const escapedUrl = escapeHtml(url);

    return `<img src="${escapedUrl}" alt="${escapedAlt}" class="jt-yxtus" />`;
  });
};