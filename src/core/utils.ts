/**
 * Escapes HTML special characters to prevent XSS
 */
export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, "'");
};

/**
 * Converts text to kebab-case, removing accents and special characters
 */
export const kebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars except spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
};

/**
 * Creates a start placeholder for an element
 */
export const createStartPlaceholder = (element: string, symbol: string, params?: string): string => {
  return `${symbol}${symbol}${symbol}${element}${params ? `{${params}}` : ''}:S${symbol}${symbol}${symbol}`;
};

/**
 * Creates an end placeholder for an element
 */
export const createEndPlaceholder = (element: string, symbol: string): string => {
  return `${symbol}${symbol}${symbol}${element}:E${symbol}${symbol}${symbol}`;
};



/**
 * Extracts YouTube video ID from various URL formats
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^"&?\/\s]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^"&?\/\s]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

/**
 * Parses media parameters string like "1|0|1" into config object
 */
export const parseMediaParams = (params: string): { autoplay: boolean; mute: boolean; controls: boolean } => {
  const parts = params.split('|');
  return {
    autoplay: parts[0] === '1',
    mute: parts[1] === '1',
    controls: parts[2] === '1'
  };
};

/**
 * Parses YouTube parameters string like "1|0|640x480" into config object
 */
export const parseYouTubeParams = (params: string): { autoplay: boolean; mute: boolean; size: string } => {
  const parts = params.split('|');
  return {
    autoplay: parts[0] === '1',
    mute: parts[1] === '1',
    size: parts[2] || '640x480'
  };
};

/**
 * Parses size string like "640x480" into width and height
 */
export const parseSize = (size: string): { width: string; height: string } => {
  if (size === '0x0') {
    return { width: '100%', height: '512' };
  }
  // Sanitize: only allow digits and x
  const sanitized = size.replace(/[^0-9x]/g, '');
  const [width, height] = sanitized.split('x');
  return {
    width: width || '640',
    height: height || '480'
  };
};

/**
 * Protects HTML blocks and placeholders by replacing them with safe markers
 */
export const protectHtml = (text: string): { protectedText: string; htmlBlocks: string[] } => {
  const htmlBlocks: string[] = [];
  let protectedText = text;
  let index = 0;

  // First, protect existing placeholders (URL blocks, etc.)
  protectedText = protectedText.replace(/§§§[^§]+§§§/g, (match) => {
    htmlBlocks.push(match);
    return `§§§HTML߸BLOCK߸${index++}§§§`;
  });

  // Then protect HTML tags
  protectedText = protectedText.replace(/<[^>]+>/g, (match) => {
    htmlBlocks.push(match);
    return `§§§HTML߸BLOCK߸${index++}§§§`;
  });

  return { protectedText, htmlBlocks };
};

/**
 * Restores HTML blocks from placeholders
 */
export const restoreHtml = (text: string, htmlBlocks: string[]): string => {
  let restored = text;
  htmlBlocks.forEach((block, index) => {
    restored = restored.replace(`§§§HTML߸BLOCK߸${index}§§§`, block);
  });
  return restored;
};

/**
 * Protects URLs by replacing them with placeholders
 */
export const protectUrls = (text: string): { protectedText: string; urlBlocks: string[] } => {
  const urlBlocks: string[] = [];
  let protectedText = text;
  let index = 0;

  // Match URLs in various formats
  const urlRegex = /(https?:\/\/[^\s<>"')]+|www\.[^\s<>"')]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s<>"')]*)/g;
  protectedText = protectedText.replace(urlRegex, (match) => {
    urlBlocks.push(match);
    return `§§§URL߸BLOCK߸${index++}§§§`;
  });

  return { protectedText, urlBlocks };
};

/**
 * Restores URLs from placeholders
 */
export const restoreUrls = (text: string, urlBlocks: string[]): string => {
  let restored = text;
  urlBlocks.forEach((block, index) => {
    restored = restored.replace(`§§§URL߸BLOCK߸${index}§§§`, block);
  });
  return restored;
};
