export const transcriptVariants = [
  "tiktok",
  "karaoke",
  "lowerThird",
  "minimal",
] as const;

export type TranscriptVariant = (typeof transcriptVariants)[number];
