/**
 * Processes text alignment elements (-:- :-- --:)
 */
export const processAlignment = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];

  for (const line of lines) {
    let processedLine = line;

    // Process alignment prefixes at the start of lines
    if (processedLine.startsWith('-:- ')) {
      // Center alignment
      const content = processedLine.substring(4);
      if (content.match(/^<h[1-6][^>]*>.*<\/h[1-6]>$/)) {
        // Apply alignment to existing heading
        processedLine = content.replace(/^<h([1-6])([^>]*)>(.*)<\/h[1-6]>$/, '<h$1$2 style="text-align: center;">$3</h$1>');
      } else {
        processedLine = `<p class="jt-yxtus" style="text-align: center;">${content}</p>`;
      }
    } else if (processedLine.startsWith(':-- ')) {
      // Left alignment (explicit)
      const content = processedLine.substring(4);
      if (content.match(/^<h[1-6][^>]*>.*<\/h[1-6]>$/)) {
        // Apply alignment to existing heading
        processedLine = content.replace(/^<h([1-6])([^>]*)>(.*)<\/h[1-6]>$/, '<h$1$2 style="text-align: left;">$3</h$1>');
      } else {
        processedLine = `<p class="jt-yxtus" style="text-align: left;">${content}</p>`;
      }
    } else if (processedLine.startsWith('--: ')) {
      // Right alignment
      const content = processedLine.substring(4);
      if (content.match(/^<h[1-6][^>]*>.*<\/h[1-6]>$/)) {
        // Apply alignment to existing heading
        processedLine = content.replace(/^<h([1-6])([^>]*)>(.*)<\/h[1-6]>$/, '<h$1$2 style="text-align: right;">$3</h$1>');
      } else {
        processedLine = `<p class="jt-yxtus" style="text-align: right;">${content}</p>`;
      }
    } else if (processedLine.startsWith('::: ')) {
      // Justified alignment
      const content = processedLine.substring(4);
      if (content.match(/^<h[1-6][^>]*>.*<\/h[1-6]>$/)) {
        // Apply alignment to existing heading
        processedLine = content.replace(/^<h([1-6])([^>]*)>(.*)<\/h[1-6]>$/, '<h$1$2 style="text-align: justify;text-justify: inter-word;">$3</h$1>');
      } else {
        processedLine = `<p class="jt-yxtus" style="text-align: justify;text-justify: inter-word;">${content}</p>`;
      }
    }

    processedLines.push(processedLine);
  }

  return processedLines.join('\n');
};