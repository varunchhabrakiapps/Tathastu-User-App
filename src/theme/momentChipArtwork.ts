import type { ComponentProps } from 'react';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import type { MomentCategoryId } from '@/domain/momentCategory';
import { hexToRgba, mixHex } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type GlyphName = ComponentProps<typeof FontAwesome>['name'];

export type MomentChipArtwork = {
  /** Large background wash behind copy. */
  watermark: GlyphName;
  watermarkSize: number;
  watermarkColor: string;
  watermarkOpacity: number;
  /** Small inline glyph beside headline. */
  accent: GlyphName;
  accentSize: number;
  accentColor: string;
};

const r = paletteHex.ritual;
const w = paletteHex.warm;
/** Situationship — soft rose heart, intentionally “Gen-Z soft” without neon. */
const ROSE_HEART = '#E11D48';

/**
 * Mood → visual language — watermarks stay low-contrast; accents carry readable color.
 */
const ART: Record<MomentCategoryId, MomentChipArtwork> = {
  situationship: {
    watermark: 'heart',
    watermarkSize: 76,
    watermarkColor: ROSE_HEART,
    watermarkOpacity: 0.11,
    accent: 'heart',
    accentSize: 15,
    accentColor: ROSE_HEART,
  },
  newChapter: {
    watermark: 'rocket',
    watermarkSize: 72,
    watermarkColor: r.primary.light,
    watermarkOpacity: 0.1,
    accent: 'rocket',
    accentSize: 14,
    accentColor: r.primary.light,
  },
  squad: {
    watermark: 'users',
    watermarkSize: 70,
    watermarkColor: paletteHex.accent.light,
    watermarkOpacity: 0.1,
    accent: 'users',
    accentSize: 14,
    accentColor: paletteHex.accent.light,
  },
  glowUp: {
    watermark: 'magic',
    watermarkSize: 72,
    watermarkColor: w.dark,
    watermarkOpacity: 0.12,
    accent: 'star',
    accentSize: 14,
    accentColor: w.saffron,
  },
  vibes: {
    watermark: 'bolt',
    watermarkSize: 74,
    watermarkColor: r.primary.light,
    watermarkOpacity: 0.1,
    accent: 'bolt',
    accentSize: 15,
    accentColor: r.primary.light,
  },
  lovedOnes: {
    watermark: 'tree',
    watermarkSize: 72,
    watermarkColor: w.deep,
    watermarkOpacity: 0.11,
    accent: 'tree',
    accentSize: 14,
    accentColor: w.deep,
  },
};

/** Dark mode — gently lift watermark / accent off canvas without changing hue family. */
const ART_DARK: Record<MomentCategoryId, Partial<MomentChipArtwork>> = {
  situationship: {
    watermarkColor: '#FB7185',
    accentColor: '#FDA4AF',
  },
  newChapter: {
    watermarkColor: r.primary.dark,
    accentColor: r.primary.dark,
  },
  squad: {
    watermarkColor: paletteHex.accent.dark,
    accentColor: paletteHex.accent.dark,
  },
  glowUp: {
    watermarkColor: w['on-dark'],
    accentColor: w.gold,
  },
  vibes: {
    watermarkColor: r.primary.dark,
    accentColor: r.primary.dark,
  },
  lovedOnes: {
    watermarkColor: w.muted,
    accentColor: w['on-dark'],
  },
};

export function getMomentChipArtwork(
  id: MomentCategoryId,
  scheme: 'light' | 'dark',
): MomentChipArtwork {
  const base = ART[id];
  if (scheme === 'dark') {
    const patch = ART_DARK[id];
    return { ...base, ...patch };
  }
  return base;
}

/** Per-moment card shell — tinted paper in light mode, moody hue in dark (not flat white slabs). */
type MomentChipChrome = {
  fill: string;
  border: string;
};

function momentChipChromeRecord(): Record<MomentCategoryId, { light: MomentChipChrome; dark: MomentChipChrome }> {
  /** Dark shells sit near `ritual.surface` dark — same value band, rotated hue */
  const d = paletteHex.ritual.surface.dark;

  return {
    situationship: {
      light: {
        fill: '#FFF1F2',
        border: hexToRgba(ROSE_HEART, 0.2),
      },
      dark: {
        fill: mixHex(d, '#3D2429', 0.72),
        border: hexToRgba('#FB7185', 0.42),
      },
    },
    newChapter: {
      light: {
        fill: '#FFF4ED',
        border: hexToRgba('#FB923C', 0.22),
      },
      dark: {
        fill: mixHex(d, '#3E2E21', 0.7),
        border: hexToRgba(r.primary.dark, 0.38),
      },
    },
    squad: {
      light: {
        fill: '#F0FDFA',
        border: hexToRgba('#14B8A6', 0.2),
      },
      dark: {
        fill: mixHex(d, '#1F2E2C', 0.72),
        border: hexToRgba('#2DD4BF', 0.35),
      },
    },
    glowUp: {
      light: {
        fill: '#FFFBEB',
        border: hexToRgba('#F59E0B', 0.22),
      },
      dark: {
        fill: mixHex(d, '#3A3020', 0.7),
        border: hexToRgba('#FBBF24', 0.36),
      },
    },
    vibes: {
      light: {
        fill: '#F5F3FF',
        border: hexToRgba('#7C73E6', 0.2),
      },
      dark: {
        fill: mixHex(d, '#2E2938', 0.72),
        border: hexToRgba('#A78BFA', 0.36),
      },
    },
    lovedOnes: {
      light: {
        /** Warm linen — grounded next to blush / pastel neighbors */
        fill: '#FAF8F5',
        border: hexToRgba('#A78B74', 0.24),
      },
      dark: {
        fill: mixHex(d, '#362E29', 0.7),
        border: hexToRgba('#C4A484', 0.38),
      },
    },
  };
}

const CHROME = momentChipChromeRecord();

export function getMomentChipChrome(id: MomentCategoryId, scheme: 'light' | 'dark'): MomentChipChrome {
  return CHROME[id][scheme];
}
