import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type HeadlineFadeProps = {
  title: string;
  /** Color of the decorative line under the title. Default blue. */
  accentColor?: string;
  /** Frames for opacity fade-in. Default 20. */
  fadeInFrames?: number;
};

const sans =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const defaultFade = 20;
const defaultAccent = "#2563eb";

export const HeadlineFade: FC<HeadlineFadeProps> = ({
  title,
  accentColor = defaultAccent,
  fadeInFrames = defaultFade,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  if (!title.trim()) {
    return null;
  }

  const padX = Math.round(Math.max(24, width * 0.06));
  const padY = Math.round(Math.max(28, height * 0.06));
  const titleSize = Math.round(Math.max(80, Math.min(44, width * 0.038)));
  const ruleWidth = Math.round(Math.min(320, width * 0.42));
  const ruleGap = Math.round(titleSize * 0.85);

  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: Math.min(width * 0.92, 920),
          opacity,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: sans,
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.25,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            marginTop: ruleGap,
            width: ruleWidth,
            height: 3,
            borderRadius: 1,
            backgroundColor: accentColor,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
