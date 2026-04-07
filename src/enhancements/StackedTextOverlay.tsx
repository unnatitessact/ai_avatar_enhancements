import type { CSSProperties, FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type StackedTextOverlayProps = {
  lines: string[];
  /** Frames between each line’s animation start. Default 12. */
  staggerFrames?: number;
  /** Frames for each line’s fade / reveal. Default 14. */
  fadeFrames?: number;
};

const serifItalic =
  "Georgia, 'Palatino Linotype', 'Book Antiqua', Palatino, 'Times New Roman', serif";

const defaultStagger = 12;
const defaultFade = 14;

export const StackedTextOverlay: FC<StackedTextOverlayProps> = ({
  lines,
  staggerFrames = defaultStagger,
  fadeFrames = defaultFade,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const visibleLines = lines.map((l) => String(l)).filter((l) => l.length > 0);

  const pad = Math.round(Math.max(32, width * 0.055));
  const line1Size = Math.round(Math.max(32, Math.min(56, width * 0.05)));
  const restSize = Math.round(line1Size * 0.88);
  const lineGap = Math.round(line1Size * 0.38);

  const hFirst = Math.round(line1Size * 1.28);
  const hRest = Math.round(restSize * 1.28);

  const bgFadeEnd = 10;
  const bgOpacity = interpolate(frame, [0, bgFadeEnd], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lineStart = (index: number) => index * staggerFrames;

  const lineMotion = (
    start: number,
    fullHeight: number,
  ): { opacity: number; maxHeight: number; lift: number } => {
    const opacity = interpolate(frame, [start, start + fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const maxHeight = interpolate(
      frame,
      [start, start + fadeFrames],
      [0, fullHeight],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const lift = interpolate(
      frame,
      [start, start + fadeFrames + 5],
      [8, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    return { opacity, maxHeight, lift };
  };

  const textStyle = (fontSize: number): CSSProperties => ({
    margin: 0,
    fontSize,
    fontWeight: 400,
    fontStyle: "italic",
    fontFamily: serifItalic,
    lineHeight: 1.22,
    color: "#ffffff",
    textAlign: "center",
    textShadow:
      "0 2px 14px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.35)",
    maxWidth: "92%",
  });

  if (visibleLines.length === 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: pad,
        paddingBottom: Math.round(pad * 1.15),
        pointerEvents: "none",
        marginBottom: Math.round(pad * 0.15),
        background:
          "radial-gradient(ellipse 95% 85% at 50% 100%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 100%)",
        opacity: bgOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {visibleLines.map((text, index) => {
          const isFirst = index === 0;
          const fontSize = isFirst ? line1Size : restSize;
          const fullH = isFirst ? hFirst : hRest;
          const start = lineStart(index);
          const m = lineMotion(start, fullH);
          const marginTop =
            index === 0
              ? 0
              : interpolate(
                  frame,
                  [start, start + fadeFrames],
                  [0, lineGap],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                );

          return (
            <div
              key={index}
              style={{
                marginTop,
                overflow: "hidden",
                maxHeight: m.maxHeight,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  ...textStyle(fontSize),
                  opacity: m.opacity,
                  transform: `translateY(${m.lift}px)`,
                }}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
