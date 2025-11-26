/**
 * Processes button elements [button{action|options}text](url)
 */
export const processButtons = (text: string): string => {
  // Match [button{action|options}text](url) pattern
  return text.replace(/\[button(\{[^}]*\})?([^\]]+)\]\(([^)]+)\)/g, (match: string, params: string, text: string, url: string) => {
    if (!params) {
      // Default button
      return `<a href="${url}" class="jt-yxtus jt-yxtus-button">${text}</a>`;
    }

    const paramContent = params.slice(1, -1); // Remove { }
    const commaIndex = paramContent.indexOf(',');
    let action = paramContent;
    let option = '';

    if (commaIndex !== -1) {
      action = paramContent.substring(0, commaIndex);
      option = paramContent.substring(commaIndex + 1);
    }

    if (action === 'download') {
      const filename = option || '';
      return `<a href="${url}" download="${filename}" class="jt-yxtus jt-yxtus-button">${text}</a>`;
    } else if (action === 'copy') {
      // For copy, the URL contains the text to copy
      const escapedUrl = url.replace(/'/g, "\\'").replace(/\\/g, '\\\\');
      return `<button onclick="navigator.clipboard.writeText('${escapedUrl}')" class="jt-yxtus jt-yxtus-button">${text}</button>`;
    }

    // Fallback
    return `<a href="${url}" class="jt-yxtus jt-yxtus-button">${text}</a>`;
  });
};