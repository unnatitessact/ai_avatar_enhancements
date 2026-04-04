import type { Caption } from "@remotion/captions";

export type AlignmentWordToken = {
  text: string;
  start: number;
  end: number;
  type: string;
  speaker_id?: string;
};

export type TranscriptAlignmentFile = {
  text?: string;
  language_code?: string;
  word_level_transcript?: AlignmentWordToken[];
  /** Segment-level data — ignored for caption timing; kept for typing. */
  sentence_level_transcript?: unknown;
};

/**
 * Converts API `transcript_alignment.json` into Remotion `Caption[]` using only
 * `word_level_transcript` entries with `type === "word"`.
 */
export const alignmentJsonToCaptions = (
  data: TranscriptAlignmentFile,
): Caption[] => {
  const words =
    data.word_level_transcript?.filter((w) => w.type === "word") ?? [];

  return words.map((w, index) => {
    const startMs = Math.round(w.start * 1000);
    const endMs = Math.round(w.end * 1000);
    const text = index === 0 ? w.text : ` ${w.text}`;
    return {
      text,
      startMs,
      endMs,
      timestampMs: startMs,
      confidence: null,
    };
  });
};

export const getLastCaptionEndMs = (captions: Caption[]): number => {
  if (captions.length === 0) {
    return 0;
  }

  return captions[captions.length - 1].endMs;
};
