/**
 * External inputs for {@link PlanComposition} (plan-driven render).
 * All JSON payloads are strings for Remotion Studio / CLI compatibility.
 */

/** One storyboard row as in `data.json` (fields optional where pipelines vary). */
export type StoryboardSegment = {
  id: string;
  image_prompt?: string;
  video_prompt?: string;
  image_url?: string;
  video_url?: string;
  pose?: string;
  duration?: number;
  order?: number;
  type_of_segment?: string;
  bucket_number?: number;
  start_time: number;
  end_time: number;
  text_content?: string;
  sentences?: Array<{
    id: number;
    start: number;
    end: number;
    text: string;
    duration: number;
  }>;
};

export type PlanCompositionProps = {
  /** Accent for caption highlights. */
  accentColor: string;
  /** Optional separate audio when no muxed audio on `outputVideoUrl`. */
  audioUrl: string | null;
  /**
   * Optional aspect ratio `W:H` (e.g. `16:9`, `9:16`).
   * If set, one of `width` or `height` may be `0` to derive the other (see `resolveCompositionDimensions`).
   */
  aspectRatio: string;
  /** Stringified JSON: which overlay components to show, when, and props (`OverlayPlan`). */
  overlayPlanJson: string;
  /** Main composite or avatar video URL. */
  outputVideoUrl: string | null;
  /** Stringified JSON array of storyboard segments (see `StoryboardSegment`). */
  storyboardJson: string;
  /**
   * Word-level transcript alignment: remote `https://` URL or public folder path
   * (e.g. `file.json`) — same contract as `TranscriptCaptions`.
   */
  wordLevelTranscriptSource: string;
  /**
   * Canvas width in pixels. Use `0` with `aspectRatio` + `height` to derive width.
   * @default 1280
   */
  width: number;
  /**
   * Canvas height in pixels. Use `0` with `aspectRatio` + `width` to derive height.
   * @default 720
   */
  height: number;
};
