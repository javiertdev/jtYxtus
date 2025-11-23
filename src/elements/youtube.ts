import { extractYouTubeId, parseYouTubeParams, parseSize } from '../core/utils.ts';

/**
 * Processes YouTube embed elements ![yt{autoplay|mute|size}](url)
 */
export const processYouTubes = (text: string): string => {
  // Match ![yt{params}](url) pattern
  return text.replace(/!\[yt(\{[^}]*\})?\]\(([^)]+)\)/g, (match: string, params: string, url: string) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return match; // Return original if can't extract ID
    }

    const config = params ? parseYouTubeParams(params.slice(1, -1)) : { autoplay: false, mute: false, size: '640x480' };
    const dimensions = parseSize(config.size);

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return `<iframe width="${dimensions.width}" height="${dimensions.height}" src="${embedUrl}" title="YouTube Embed from jtYxtus" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share${config.autoplay ? '; autoplay' : ''}" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen${config.mute ? ' muted' : ''} class="jt-yxtus jt-yxtus-yt"></iframe>`;
  });
};