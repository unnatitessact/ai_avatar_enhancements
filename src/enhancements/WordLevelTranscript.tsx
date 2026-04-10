import type { CSSProperties, FC } from "react";
import { useMemo } from "react";
import type { Caption, TikTokPage } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type WordLevelTranscriptEntry = {
  start: number;
  end: number;
  text: string;
  type?: string | null;
  logprob?: number | null;
};

export type WordLevelTranscriptInput =
  | WordLevelTranscriptEntry[]
  | { word_level_transcript?: WordLevelTranscriptEntry[] | null }
  | null
  | undefined;

export type WordLevelTranscriptProps = {
  transcript?: WordLevelTranscriptInput;
  /** Word grouping window for each caption page. Lower = more word-by-word. */
  combineTokensWithinMilliseconds?: number;
  /** Shift transcript timings when the provided data is absolute to the full video. */
  timeOffsetSeconds?: number;
  accentColor?: string;
  textColor?: string;
  inactiveTextColor?: string;
  position?: "bottom" | "center";
};

const sans =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const defaultCombineTokensWithinMilliseconds = 1200;

const isWordLevelTranscriptEntry = (
  value: unknown,
): value is WordLevelTranscriptEntry =>
  !!value && typeof value === "object" && "start" in value && "end" in value;

const parseTranscriptEntries = (
  input: WordLevelTranscriptInput,
): WordLevelTranscriptEntry[] => {
  const source = Array.isArray(input)
    ? input
    : input && typeof input === "object" && "word_level_transcript" in input
      ? input.word_level_transcript
      : null;

  if (!Array.isArray(source)) {
    return [];
  }

  return source.filter(isWordLevelTranscriptEntry).map((entry) => ({
    start: Number(entry.start),
    end: Number(entry.end),
    text: String(entry.text ?? ""),
    type: entry.type ?? null,
    logprob: typeof entry.logprob === "number" ? entry.logprob : null,
  }));
};

const normalizeToCaptions = (
  transcript: WordLevelTranscriptInput,
  timeOffsetSeconds: number,
): Caption[] => {
  const entries = parseTranscriptEntries(transcript);
  const captions: Caption[] = [];
  const offsetMs = Math.round(timeOffsetSeconds * 1000);
  let pendingWhitespace = "";

  for (const entry of entries) {
    const text = String(entry.text ?? "");
    const isSpacingToken =
      entry.type === "spacing" || text.trim().length === 0;

    if (isSpacingToken) {
      pendingWhitespace += text;
      continue;
    }

    const startMs = Math.round(entry.start * 1000) - offsetMs;
    const endMs = Math.round(entry.end * 1000) - offsetMs;

    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= 0) {
      pendingWhitespace = "";
      continue;
    }

    captions.push({
      text: `${pendingWhitespace}${text}`,
      startMs: Math.max(0, startMs),
      endMs: Math.max(1, endMs),
      timestampMs: null,
      confidence: null,
    });
    pendingWhitespace = "";
  }

  return captions.filter((caption) => caption.endMs > caption.startMs);
};

const pageStyle = (
  width: number,
  position: "bottom" | "center",
): CSSProperties => {
  const sidePadding = Math.round(Math.max(36, width * 0.07));
  const bottomInset = Math.round(Math.max(80, sidePadding * 2.2));

  if (position === "center") {
    return {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: sidePadding,
      pointerEvents: "none",
      boxSizing: "border-box",
    };
  }

  return {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    paddingTop: sidePadding,
    paddingBottom: bottomInset,
    pointerEvents: "none",
    boxSizing: "border-box",
  };
};

const TranscriptPage: FC<{
  page: TikTokPage;
  accentColor: string;
  textColor: string;
  inactiveTextColor: string;
  position: "bottom" | "center";
}> = ({
  page,
  accentColor,
  textColor,
  inactiveTextColor,
  position,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const currentTimeMs = page.startMs + (frame / fps) * 1000;

  const enterOpacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const enterTranslateY = interpolate(frame, [0, 8], [14, 0], {
    extrapolateRight: "clamp",
  });

  const fontSize = Math.round(Math.max(44, Math.min(86, width * 0.067)));
  const lineHeight = 1.18;

  return (
    <AbsoluteFill style={pageStyle(width, position)}>
      <div
        style={{
          maxWidth: Math.min(width * 0.82, 860),
          padding: `${Math.round(fontSize * 0.28)}px ${Math.round(fontSize * 0.38)}px`,
          borderRadius: Math.round(fontSize * 0.34),
             opacity: enterOpacity,
          transform: `translateY(${enterTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontSize,
            fontWeight: 800,
            lineHeight,
            letterSpacing: "-0.02em",
            textAlign: "center",
            whiteSpace: "pre-wrap",
            color: textColor,
            textWrap: "balance",
          }}
        >
          {page.tokens.map((token, index) => {
            const isActive =
              token.fromMs <= currentTimeMs && token.toMs > currentTimeMs;

            return (
              <span
                key={`${token.fromMs}-${index}`}
                style={{
                  color: isActive ? accentColor : inactiveTextColor,
                  textShadow: isActive
                    ? `0 0 22px ${accentColor}55`
                    : "0 2px 12px rgba(0,0,0,0.38)",
                }}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const WordLevelTranscript: FC<WordLevelTranscriptProps> = ({
  transcript,
  combineTokensWithinMilliseconds = defaultCombineTokensWithinMilliseconds,
  timeOffsetSeconds = 0,
  accentColor = "#facc15",
  textColor = "#ffffff",
  inactiveTextColor = "rgba(255,255,255,0.72)",
  position = "bottom",
}) => {
  const { fps } = useVideoConfig();

  const pages = useMemo(() => {
    const captions = normalizeToCaptions(transcript, timeOffsetSeconds);
    if (captions.length === 0) {
      return [];
    }
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds,
    }).pages;
  }, [combineTokensWithinMilliseconds, timeOffsetSeconds, transcript]);

  if (pages.length === 0) {
    return null;
  }

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const from = Math.max(0, Math.round((page.startMs / 1000) * fps));
        const durationInFrames = Math.max(
          1,
          Math.round((page.durationMs / 1000) * fps),
        );

        return (
          <Sequence
            key={`${page.startMs}-${index}`}
            from={from}
            durationInFrames={durationInFrames}
            layout="none"
          >
            <TranscriptPage
              page={page}
              accentColor={accentColor}
              textColor={textColor}
              inactiveTextColor={inactiveTextColor}
              position={position}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
