import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type LowerThirdProps = {
  headline: string;
  subline?: string;
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const LowerThird: FC<LowerThirdProps> = ({ headline, subline }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const edge = Math.round(Math.max(24, width * 0.035));
  const headlineSize = Math.round(Math.max(26, Math.min(44, width * 0.038)));
  const sublineSize = Math.round(headlineSize * 0.48);

  const introEnd = 16;
  const opacity = interpolate(frame, [0, introEnd], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame, [0, introEnd + 6], [-28, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: fontStack,
        pointerEvents: "none",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 38%, transparent 72%)",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: edge,
          right: edge,
          bottom: Math.round(height * 0.08),
          transform: `translateX(${slide}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            maxWidth: "92%",
            padding: `${Math.round(edge * 0.55)}px ${Math.round(edge * 0.9)}px`,
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.72) 78%, rgba(15,23,42,0) 100%)",
            borderLeft: "4px solid #f59e0b",
            boxShadow:
              "0 18px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          
          <div
            style={{
              margin: 0,
              fontSize: headlineSize,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#f8fafc",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            {headline}
          </div>
          {subline ? (
            <div
              style={{
                marginTop: Math.round(headlineSize * 0.28),
                fontSize: sublineSize,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "rgba(226,232,240,0.88)",
              }}
            >
              {subline}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
