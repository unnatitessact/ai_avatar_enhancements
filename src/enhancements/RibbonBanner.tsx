import type { FC } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type RibbonBannerProps = {
  text: string;
};

const PINK_BOTTOM = "#f2b1bc";
const PINK_TOP = "#f9c7cf";

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const RibbonBanner: FC<RibbonBannerProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const boxIntroFrames = Math.max(12, Math.round(0.55 * fps));
  const lineExtendFrames = Math.max(10, Math.round(0.45 * fps));
  const lineStartFrame = boxIntroFrames;

  const boxOpacity = interpolate(frame, [0, boxIntroFrames], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const boxTranslateY = interpolate(
    frame,
    [0, boxIntroFrames],
    [Math.round(Math.max(24, height * 0.035)), 0],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  const lineProgress = interpolate(
    frame,
    [lineStartFrame, lineStartFrame + lineExtendFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  const padY = Math.round(Math.max(12, width * 0.014));
  const padX = Math.round(Math.max(28, width * 0.06));
  const fontSize = Math.round(Math.max(18, Math.min(36, width * 0.028)));
  const lineThickness = Math.max(1, Math.round(width * 0.001));

  return (
    <AbsoluteFill
      style={{
        fontFamily: fontStack,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: Math.round(padY * 4.5),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "96%",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              height: lineThickness,
              width: `${lineProgress * 100}%`,
              backgroundColor: PINK_BOTTOM,
            }}
          />
        </div>
        <div
          style={{
            opacity: boxOpacity,
            transform: `translateY(${boxTranslateY}px)`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: `${padY}px ${padX}px`,
              background: `linear-gradient(to top, ${PINK_BOTTOM}, ${PINK_TOP})`,
              border: "1px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize,
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </span>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              height: lineThickness,
              width: `${lineProgress * 100}%`,
              backgroundColor: PINK_BOTTOM,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
