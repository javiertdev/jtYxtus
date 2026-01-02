import iconCopy from '../icons/copy.js';

/**
 * Processes code block elements ```[n]language\ncode\n```
 */
export const processCodeBlocks = (text: string): string => {
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockStart = '';
  let language = '';
  let highlightLines: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inCodeBlock) {
      const match = line.match(/^(`{3,10})(.*)$/);
      if (match) {
        inCodeBlock = true;
        codeBlockStart = match[1];
        language = match[2].trim();
        highlightLines = [];
        const highlightMatch = language.match(/^\[([^\]]+)\]/);
        if (highlightMatch) {
          const linesStr = highlightMatch[1];
          highlightLines = linesStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          language = language.slice(highlightMatch[0].length).trim();
        }
        codeBlockLines = [];
        continue;
      }
      processedLines.push(line);
    } else {
      if (line.startsWith(codeBlockStart)) {
        const codeContent = codeBlockLines.join('\n');
        const dataCode = codeContent.replace(/\n/g, '§§§CODEBLOCK_DATA_NEWLINE§§§');
        const langAttr = language ? ` lang="${language}"` : '';
        const lines = codeContent.split('\n');
        const lineHtml = lines.map((line, index) => `<div class="line${highlightLines.includes(index + 1) ? ' highlight' : ''}"><span class="line-number">${index + 1}</span><span class="code-line">${line}</span></div>`).join('');
        const html = `<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute('data-code'));">${iconCopy}</button><pre class="jt-yxtus jt-yxtus-code"${langAttr} data-code="${dataCode}">${lineHtml}</pre></div>`;
        const singleLineHtml = html.replace(/\n/g, '§§§CODEBLOCK߸NEWLINE§§§');
        processedLines.push(singleLineHtml);

        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockStart = '';
        highlightLines = [];
        language = '';
      } else {
        codeBlockLines.push(line);
      }
    }
  }

  // Handle unclosed code block
  if (inCodeBlock) {
    const codeContent = codeBlockLines.join('\n');
    const dataCode = codeContent.replace(/\n/g, '§§§CODEBLOCK_DATA_NEWLINE§§§');
    const langAttr = language ? ` lang="${language}"` : '';
    const lines = codeContent.split('\n');
    const lineHtml = lines.map((line, index) => `<div class="line${highlightLines.includes(index + 1) ? ' highlight' : ''}"><span class="line-number">${index + 1}</span><span class="code-line">${line}</span></div>`).join('');
    const html = `<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute('data-code'));">${iconCopy}</button><pre class="jt-yxtus jt-yxtus-code"${langAttr} data-code="${dataCode}">${lineHtml}</pre></div>`;
    const singleLineHtml = html.replace(/\n/g, '§§§CODEBLOCK߸NEWLINE§§§');
    processedLines.push(singleLineHtml);
  }

  return processedLines.join('\n');
};