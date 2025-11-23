/**
 * Processes HTML comments (<!-- comment -->)
 */
export const processComments = (text: string): string => {
  // Remove HTML comments completely
  return text.replace(/<!--[\s\S]*?-->/g, '');
};