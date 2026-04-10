import type { CSSProperties, FC } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ComparisonSplitProps = {
  leftTitle?: string;
  rightTitle?: string;
  leftPoints?: string[];
  rightPoints?: string[];
  /** Frames to grow the center divider. Default 12. */
  dividerFrames?: number;
  /** Frames between each comparison row. Default 14. */
  staggerFrames?: number;
  /** Frames per row fade / slide. Default 12. */
  fadeFrames?: number;
  backgroundColor?: string;
  dividerColor?: string;
  leftAccentColor?: string;
  rightAccentColor?: string;
  textColor?: string;
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

const defaultDivider = 12;
const defaultStagger = 14;
const defaultFade = 12;

export const DEFAULT_LEFT_TITLE = "Traditional";
export const DEFAULT_RIGHT_TITLE = "Electric";
export const DEFAULT_LEFT_POINTS = [
  "Higher fuel cost",
  "More maintenance",
  "Emissions on every trip",
];
export const DEFAULT_RIGHT_POINTS = [
  "Lower per-km energy cost",
  "Fewer moving parts",
  "Zero tailpipe emissions",
];

/** Parses a JSON list of strings (or objects with `text` / `label`). */
export function parseComparisonPointList(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const s = item.trim();
      if (s) out.push(s);
      continue;
    }
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const s = String(o.text ?? o.label ?? o.point ?? "").trim();
      if (s) out.push(s);
    }
  }
  return out;
}

export const ComparisonSplit: FC<ComparisonSplitProps> = ({
  leftTitle = DEFAULT_LEFT_TITLE,
  rightTitle = DEFAULT_RIGHT_TITLE,
  leftPoints,
  rightPoints,
  dividerFrames = defaultDivider,
  staggerFrames = defaultStagger,
  fadeFrames = defaultFade,
  backgroundColor = "#101014",
  dividerColor = "rgba(255, 255, 255, 0.85)",
  leftAccentColor = "#6eb8ff",
  rightAccentColor = "#7ee0a8",
  textColor = "#f2f2f5",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  let left = leftPoints ?? [];
  let right = rightPoints ?? [];
  if (left.length === 0 && right.length === 0) {
    left = DEFAULT_LEFT_POINTS;
    right = DEFAULT_RIGHT_POINTS;
  }
  const maxRows = Math.max(left.length, right.length, 1);

  const padX = Math.round(Math.max(28, width * 0.055));
  const padY = Math.round(Math.max(36, height * 0.045));
  const titleSize = Math.round(Math.max(64, Math.min(44, width * 0.039)));
  const pointSize = Math.round(Math.max(36, Math.min(64, width * 0.044)));
  const rowGap = Math.round(Math.max(20, pointSize * 1.05));
  const headerGap = Math.round(Math.max(28, titleSize * 1.1));
  const lineW = Math.max(2, Math.round(width * 0.003));
  const gutter = Math.round(Math.max(20, width * 0.028));
  const bulletSize = Math.round(Math.max(8, pointSize * 0.28));

  const dividerScale = interpolate(
    frame,
    [0, dividerFrames],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const rowStart = (row: number) => dividerFrames + 6 + row * staggerFrames;

  const rowMotion = (row: number, side: "left" | "right") => {
    const start = rowStart(row);
    const fromX = side === "left" ? -18 : 18;
    const opacity = interpolate(frame, [start, start + fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const tx = interpolate(
      frame,
      [start, start + fadeFrames + 2],
      [fromX, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      },
    );
    return { opacity, transform: `translateX(${tx}px)` };
  };

  const headerMotion = (side: "left" | "right") => {
    const start = dividerFrames;
    const fromX = side === "left" ? -14 : 14;
    const opacity = interpolate(
      frame,
      [start, start + fadeFrames + 4],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      },
    );
    const tx = interpolate(
      frame,
      [start, start + fadeFrames + 6],
      [fromX, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      },
    );
    return { opacity, transform: `translateX(${tx}px)` };
  };

  const titleStyle = (accent: string): CSSProperties => ({
    fontFamily: fontStack,
    fontSize: titleSize,
    fontWeight: 700,
    color: accent,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.2,
  });

  const pointRowStyle = (
    accent: string,
    align: "left" | "right",
  ): CSSProperties => ({
    fontFamily: fontStack,
    fontSize: pointSize,
    fontWeight: 500,
    color: textColor,
    lineHeight: 1.35,
    display: "flex",
    flexDirection: align === "left" ? "row" : "row-reverse",
    alignItems: "flex-start",
    gap: Math.round(pointSize * 0.45),
    textAlign: align === "left" ? "left" : "right",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: Math.min(width - padX * 2, 960),
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minHeight: Math.min(height * 0.42, 720),
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: lineW,
            marginLeft: -lineW / 2,
            borderRadius: lineW,
            backgroundColor: dividerColor,
            transformOrigin: "center top",
            transform: `scaleY(${dividerScale})`,
            zIndex: 1,
          }}
        />

        <div
          style={{
            flex: 1,
            paddingRight: gutter,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            zIndex: 2,
          }}
        >
          <div
            style={{
              ...headerMotion("left"),
              marginBottom: headerGap,
              width: "100%",
              textAlign: "right",
            }}
          >
            <div style={titleStyle(leftAccentColor)}>{leftTitle}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: rowGap,
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            {Array.from({ length: maxRows }, (_, i) => {
              const text = left[i];
              const m = rowMotion(i, "left");
              if (!text) {
                return (
                  <div
                    key={`l-${i}`}
                    style={{ minHeight: pointSize * 1.35, width: "100%" }}
                  />
                );
              }
              return (
                <div key={`l-${i}`} style={{ ...m, width: "100%" }}>
                  <div style={pointRowStyle(leftAccentColor, "left")}>
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: bulletSize,
                        height: bulletSize,
                        marginTop: Math.round(pointSize * 0.38),
                        borderRadius: "50%",
                        backgroundColor: leftAccentColor,
                      }}
                    />
                    <span>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            paddingLeft: gutter,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            zIndex: 2,
          }}
        >
          <div
            style={{
              ...headerMotion("right"),
              marginBottom: headerGap,
              width: "100%",
              textAlign: "left",
            }}
          >
            <div style={titleStyle(rightAccentColor)}>{rightTitle}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: rowGap,
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            {Array.from({ length: maxRows }, (_, i) => {
              const text = right[i];
              const m = rowMotion(i, "right");
              if (!text) {
                return (
                  <div
                    key={`r-${i}`}
                    style={{ minHeight: pointSize * 1.35, width: "100%" }}
                  />
                );
              }
              return (
                <div key={`r-${i}`} style={{ ...m, width: "100%" }}>
                  <div style={pointRowStyle(rightAccentColor, "left")}>
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: bulletSize,
                        height: bulletSize,
                        marginTop: Math.round(pointSize * 0.38),
                        borderRadius: "50%",
                        backgroundColor: rightAccentColor,
                      }}
                    />
                    <span>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
