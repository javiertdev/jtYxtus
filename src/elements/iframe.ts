import { parseSize } from '../core/utils.ts';

/**
 * Processes iframe elements [iframe{size}](url)
 */
export const processIframes = (text: string): string => {
  // Match [iframe{params}](url) pattern
  return text.replace(/\[iframe(\{[^}]*\})?\]\(([^)]+)\)/g, (match: string, params: string, url: string) => {
    const config = params ? parseSize(params.slice(1, -1)) : { width: '640', height: '480' };

    return `<iframe src="${url}" width="${config.width}" height="${config.height}" frameborder="0" class="jt-yxtus jt-yxtus-iframe"></iframe>`;
  });
};