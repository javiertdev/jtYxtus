/**
 * Represents a hierarchical anchor for navigation (TOC)
 */
export interface Anchor {
  hash: string;
  name: string;
  level: number; // Heading level (1-6)
  children: Anchor[];
}

/**
 * Result of document processing including anchors
 */
export interface DocumentResult {
  output: string;
  anchors: Anchor[];
}

/**
 * Configuration for media elements (video, audio)
 */
export interface MediaConfig {
  autoplay: boolean;
  mute: boolean;
  controls: boolean;
}

/**
 * Configuration for YouTube embeds
 */
export interface YouTubeConfig {
  autoplay: boolean;
  mute: boolean;
  size: string; // format: "widthxheight"
}

/**
 * Configuration for iframe elements
 */
export interface IframeConfig {
  size: string; // format: "widthxheight"
}

/**
 * Configuration for button elements
 */
export interface ButtonConfig {
  action: string;
  filename?: string;
}