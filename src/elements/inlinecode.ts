/**
 * Processes inline code formatting (`code`)
 */
export const processInlineCode = (text: string): string => {
  // Use a more sophisticated regex to handle backticks properly
  return text.replace(/`([^`\n]+)`/g, (match: string, content: string) => {
    // Don't escape content for code - preserve special characters
    return `<code class="jt-yxtus jt-yxtus-code">${content}</code>`;
  });
};