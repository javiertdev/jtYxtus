import { parseMediaParams } from '../core/utils.ts';

/**
 * Processes video elements ![video{autoplay|mute|controls}](url)
 */
export const processVideos = (text: string): string => {
  // Match ![video{params}](url) pattern
  return text.replace(/!\[video(\{[^}]*\})?\]\(([^)]+)\)/g, (match: string, params: string, url: string) => {
    const config = params ? parseMediaParams(params.slice(1, -1)) : { autoplay: false, mute: false, controls: true };

    const autoplay = config.autoplay ? ' autoplay' : '';
    const muted = config.mute ? ' muted' : '';
    const controls = config.controls ? ' controls' : '';

    return `<video src="${url}"${autoplay}${muted}${controls} class="jt-yxtus"></video>`;
  });
};