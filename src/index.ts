import { DocumentResult, Anchor } from './core/interfaces.ts';
import { protectUrls, restoreUrls } from './core/utils.ts';
import { processBold } from './elements/bold.ts';
import { processItalic } from './elements/italic.ts';
import { processStrikethrough } from './elements/strikethrough.ts';
import { processUnderline } from './elements/underline.ts';
import { processHighlight } from './elements/highlight.ts';
import { processColor } from './elements/color.ts';
import { processInlineCode } from './elements/inlinecode.ts';
import { processParagraphs } from './elements/paragraph.ts';
import { processHeadings } from './elements/heading.ts';
import { processLinks } from './elements/link.ts';
import { processImages } from './elements/image.ts';
import { processUnorderedLists } from './elements/unorderedlist.ts';
import { processOrderedLists } from './elements/orderedlist.ts';
import { processTaskLists } from './elements/tasklist.ts';
import { processCodeBlocks } from './elements/codeblock.ts';
import { processVideos } from './elements/video.ts';
import { processAudios } from './elements/audio.ts';
import { processYouTubes } from './elements/youtube.ts';
import { processIframes } from './elements/iframe.ts';
import { processButtons } from './elements/button.ts';
import { processTables } from './elements/table.ts';
import { processHr } from './elements/hr.ts';
import { processBlockquotes } from './elements/blockquote.ts';
import { processAlignment } from './elements/alignment.ts';
import { processIcons } from './elements/icon.ts';
import { processAbbreviations } from './elements/abbreviation.ts';
import { processComments } from './elements/comment.ts';
import { protectHtml, restoreHtml } from './core/utils.ts';

export default class jtYxtus {
  /**
   * Parse text to HTML without generating anchors
   */
  public parse(text: string): string {
    let processed = text;

    // Process code blocks first (content should not be processed by other elements)
    processed = processCodeBlocks(processed);

    // Process block elements
    const headingResult = processHeadings(processed);
    processed = headingResult.processed;

    // Process HR elements
    processed = processHr(processed);

    // Process alignment elements (after headings so they can align headings)
    processed = processAlignment(processed);

    // Process lists (block elements)
    processed = processTaskLists(processed);
    processed = processUnorderedLists(processed);
    processed = processOrderedLists(processed);

    // Process inline elements only on lines that aren't already processed HTML
    const lines = processed.split('\n');
    const processedLines: string[] = [];

    for (const line of lines) {
      if (line.includes('<') && line.includes('>')) {
        // Check if this is an alignment paragraph that needs inline processing
        const alignParagraphMatch = line.match(/^(<p class="jt-yxtus" style="text-align: [^"]+;">)(.*)(<\/p>)$/);
        if (alignParagraphMatch) {
          // Process inline elements within the alignment paragraph
          const [_, openTag, content, closeTag] = alignParagraphMatch;

          // Protect any existing HTML in content
          const { protectedText, htmlBlocks } = protectHtml(content);

          // Process inline elements on protected text
          let workingText = protectedText;
          workingText = processIcons(workingText);
          workingText = processVideos(workingText);
          workingText = processAudios(workingText);
          workingText = processYouTubes(workingText);
          workingText = processIframes(workingText);
          workingText = processButtons(workingText);
          workingText = processImages(workingText);
          workingText = processLinks(workingText);
          workingText = processInlineCode(workingText);
          workingText = processColor(workingText);
          workingText = processHighlight(workingText);
          workingText = processBold(workingText);
          workingText = processItalic(workingText);
          workingText = processStrikethrough(workingText);
          workingText = processUnderline(workingText);

          // Restore HTML
          const processedContent = restoreHtml(workingText, htmlBlocks);
          processedLines.push(`${openTag}${processedContent}${closeTag}`);
        } else {
          // Already processed (like headings, lists), skip inline processing
          processedLines.push(line);
        }
      } else {
        // Process inline elements in order to avoid conflicts
        let processedLine = line;

        // Protect any existing HTML (though there shouldn't be any at this point)
        const { protectedText, htmlBlocks } = protectHtml(processedLine);

        // Process inline elements on protected text
        let workingText = protectedText;
        workingText = processIcons(workingText);
        workingText = processImages(workingText);
        workingText = processLinks(workingText);
        workingText = processInlineCode(workingText);
        workingText = processColor(workingText);
        workingText = processHighlight(workingText);
        workingText = processBold(workingText);
        workingText = processItalic(workingText);
        workingText = processStrikethrough(workingText);
        workingText = processUnderline(workingText);

        // Restore HTML
        processedLine = restoreHtml(workingText, htmlBlocks);
        processedLines.push(processedLine);
      }
    }

    processed = processedLines.join('\n');

    // Process abbreviations (removes definitions and replaces references)
    processed = processAbbreviations(processed);

    // Process paragraphs last (wraps remaining text)
    processed = processParagraphs(processed);

    // Restore newlines in code blocks
    processed = processed.replace(/§§§CODEBLOCK߸NEWLINE§§§/g, '\n');

    // Restore newlines in code block data-code
    processed = processed.replace(/§§§CODEBLOCK_DATA_NEWLINE§§§/g, '\n');

    return processed;
  }

  /**
   * Parse text to HTML with anchor generation for navigation
   */
  public document(text: string): DocumentResult {
    let processed = text;
    const allAnchors: Anchor[] = [];
    let urlBlocks: string[] = [];

    // Process code blocks first (content should not be processed by other elements)
    processed = processCodeBlocks(processed);

    // Process comments (remove them completely)
    processed = processComments(processed);

    // Process comments (remove them completely)
    processed = processComments(processed);

    // Process headings (block elements) and collect anchors
    const headingResult = processHeadings(processed);
    processed = headingResult.processed;
    allAnchors.push(...headingResult.anchors);

    // Process tables (before HR to avoid conflicts with --- separators)
    processed = processTables(processed);

    // Process tables (before HR to avoid conflicts with --- separators)
    processed = processTables(processed);

    // Process HR elements
    processed = processHr(processed);

    // Process alignment elements (after headings so they can align headings)
    processed = processAlignment(processed);

    // Process lists (block elements)
    processed = processTaskLists(processed);
    processed = processUnorderedLists(processed);
    processed = processOrderedLists(processed);

    // Process tables (block elements)
    processed = processTables(processed);

    // Process blockquotes (block elements) - must run before inline processing
    processed = processBlockquotes(processed);

    // Process media elements before URL protection (they need raw URLs)
    const linesForMedia = processed.split('\n');
    const processedLinesForMedia: string[] = [];

    for (const line of linesForMedia) {
      if (line.includes('<') && line.includes('>')) {
        // Already processed HTML, skip
        processedLinesForMedia.push(line);
      } else {
        // Process media elements and buttons
        let workingText = line;
        workingText = processVideos(workingText);
        workingText = processAudios(workingText);
        workingText = processYouTubes(workingText);
        workingText = processIframes(workingText);
        workingText = processButtons(workingText);
        processedLinesForMedia.push(workingText);
      }
    }

    processed = processedLinesForMedia.join('\n');

    // Process inline code before URL protection to handle code containing URLs
    const linesForInlineCode = processed.split('\n');
    const processedLinesForInlineCode: string[] = [];

    for (const line of linesForInlineCode) {
      if (line.includes('<') && line.includes('>')) {
        // Already processed HTML, skip
        processedLinesForInlineCode.push(line);
      } else {
        // Process inline code
        let processedLine = line;

        // Protect any existing HTML (though there shouldn't be any at this point)
        const { protectedText, htmlBlocks } = protectHtml(processedLine);

        // Process inline code on protected text
        let workingText = protectedText;
        workingText = processInlineCode(workingText);

        // Restore HTML
        processedLine = restoreHtml(workingText, htmlBlocks);
        processedLinesForInlineCode.push(processedLine);
      }
    }

    processed = processedLinesForInlineCode.join('\n');

    // Protect URLs before inline processing to prevent interference
    const { protectedText: urlProtected, urlBlocks: protectedUrlBlocks } = protectUrls(processed);
    urlBlocks = protectedUrlBlocks;

    // Process inline elements only on lines that aren't already processed HTML
    const lines = urlProtected.split('\n');
    const processedLines: string[] = [];

    for (const line of lines) {
      if (line.includes('<') && line.includes('>')) {
        // Check if this is an alignment paragraph that needs inline processing
        const alignParagraphMatch = line.match(/^(<p class="jt-yxtus" style="text-align: [^"]+;">)(.*)(<\/p>)$/);
        if (alignParagraphMatch) {
          // Process inline elements within the alignment paragraph
          const [_, openTag, content, closeTag] = alignParagraphMatch;

          // Protect any existing HTML in content
          const { protectedText, htmlBlocks } = protectHtml(content);

          // Process inline elements on protected text
          let workingText = protectedText;
          workingText = processIcons(workingText);
          workingText = processImages(workingText);
          workingText = processLinks(workingText);
          workingText = processInlineCode(workingText);
          workingText = processColor(workingText);
          workingText = processHighlight(workingText);
          workingText = processBold(workingText);
          workingText = processItalic(workingText);
          workingText = processStrikethrough(workingText);
          workingText = processUnderline(workingText);

          // Restore HTML
          const processedContent = restoreHtml(workingText, htmlBlocks);
          processedLines.push(`${openTag}${processedContent}${closeTag}`);
        } else {
          // Already processed (like headings, lists), skip inline processing
          processedLines.push(line);
        }
      } else {
        // Process inline elements in order to avoid conflicts
        let processedLine = line;

        // Protect any existing HTML (though there shouldn't be any at this point)
        const { protectedText, htmlBlocks } = protectHtml(processedLine);

        // Process inline elements on protected text
        let workingText = protectedText;
        workingText = processIcons(workingText);
        workingText = processVideos(workingText);
        workingText = processAudios(workingText);
        workingText = processYouTubes(workingText);
        workingText = processIframes(workingText);
        workingText = processButtons(workingText);
        workingText = processImages(workingText);
        workingText = processLinks(workingText);
        workingText = processInlineCode(workingText);
        workingText = processColor(workingText);
        workingText = processHighlight(workingText);
        workingText = processBold(workingText);
        workingText = processItalic(workingText);
        workingText = processStrikethrough(workingText);
        workingText = processUnderline(workingText);

        // Restore HTML
        processedLine = restoreHtml(workingText, htmlBlocks);
        processedLines.push(processedLine);
      }
    }

    processed = processedLines.join('\n');

    // Process abbreviations (removes definitions and replaces references)
    processed = processAbbreviations(processed);

    // Process paragraphs last (wraps remaining text)
    processed = processParagraphs(processed);

    // Restore newlines in code blocks
    processed = processed.replace(/§§§CODEBLOCK߸NEWLINE§§§/g, '\n');

    // Restore newlines in lists and tables
    processed = processed.replace(/§§§NEWLINE§§§/g, '\n');

    // Restore URLs after all processing
    processed = restoreUrls(processed, urlBlocks);

    // Restore newlines in code block data-code
    processed = processed.replace(/§§§CODEBLOCK_DATA_NEWLINE§§§/g, '\n');

    return { output: processed, anchors: allAnchors };
  }
}