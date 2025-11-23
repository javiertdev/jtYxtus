import { parseMediaParams } from '../core/utils.ts';

/**
 * Processes audio elements ![audio{autoplay|mute|controls}](url)
 */
export const processAudios = (text: string): string => {
  // Match ![audio{params}](url) pattern
  return text.replace(/!\[audio(\{[^}]*\})?\]\(([^)]+)\)/g, (match: string, params: string, url: string) => {
    const config = params ? parseMediaParams(params.slice(1, -1)) : { autoplay: false, mute: false, controls: true };

    const autoplay = config.autoplay ? ' autoplay' : '';
    const muted = config.mute ? ' muted' : '';
    const controls = config.controls ? ' controls' : '';

    return `<audio src="${url}"${autoplay}${muted}${controls} class="jt-yxtus"></audio>`;
  });
};