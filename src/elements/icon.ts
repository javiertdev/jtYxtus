/**
 * Processes icon elements (;icon;)
 */
export const processIcons = (text: string): string => {
  // Match ;icon; pattern
  return text.replace(/;([^;]+);/g, (match: string, iconName: string) => {
    // Check if it's a Google Material icon (prefixed with g-)
    if (iconName.startsWith('g-')) {
      const materialIcon = iconName.substring(2); // Remove 'g-' prefix
      return `<i class="jt-yxtus material-symbols-outlined">${materialIcon}</i>`;
    } else {
      // Regular icon
      return `<i class="jt-yxtus ico-${iconName}"></i>`;
    }
  });
};