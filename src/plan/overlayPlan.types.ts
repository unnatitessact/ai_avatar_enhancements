import type { TranscriptVariant } from "../transcriptTypes";

/** Timed overlay instances from an external plan (not for transcript_captions — use `captions`). */
export type TimedOverlayId =
  | "hero_title_lines"
  | "center_title_with_underline"
  | "floating_promo_cta"
  | "process_checklist"
  | "speaker_name_bars";

export type OverlayPlanSegment = {
  id: string;
  overlayId: TimedOverlayId;
  startMs: number;
  endMs: number;
  /** Keys match `WordToWorkTranscriptProps` for that overlay (see registry). */
  props: Record<string, unknown>;
};

export type OverlayPlan = {
  schemaVersion: "1";
  /** Total timeline length; should cover storyboard + transcript. */
  totalDurationMs: number;
  segments: OverlayPlanSegment[];
  captions: {
    enabled: boolean;
    variant: TranscriptVariant;
  };
  /** Optional note from the model. */
  rationale?: string;
};
