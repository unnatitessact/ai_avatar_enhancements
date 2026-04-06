import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type BannerStripProps = {
  text: string;
  label?: string;
  /** Edge to pin the strip; default `bottom`. */
  position?: "top" | "bottom";
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const BannerStrip: FC<BannerStripProps> = ({
  text,
  label,
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const padY = Math.round(Math.max(14, width * 0.018));
  const padX = Math.round(Math.max(20, width * 0.04));
  const labelSize = Math.round(Math.max(11, width * 0.018));
  const textSize = Math.round(Math.max(22, Math.min(40, width * 0.034)));

  const introEnd = 14;
  const opacity = interpolate(frame, [0, introEnd], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slidePx = interpolate(frame, [0, introEnd + 5], [52, 0], {
    extrapolateRight: "clamp",
  });

  const isTop = position === "top";

  return (
    <AbsoluteFill
      style={{
        fontFamily: fontStack,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: isTop ? "flex-start" : "flex-end",
        background: isTop
          ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 45%)"
          : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)",
        opacity,
      }}
    >
      <div
        style={{
          width: "100%",
          transform: `translateY(${isTop ? -slidePx : slidePx}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            borderTop: isTop ? "none" : "1px solid rgba(255,255,255,0.12)",
            borderBottom: isTop ? "1px solid rgba(255,255,255,0.12)" : "none",
            background:
              "linear-gradient(90deg, rgba(30,58,138,0.95) 0%, rgba(67,56,202,0.92) 48%, rgba(79,70,229,0.88) 100%)",
            boxShadow: isTop
              ? "0 14px 40px rgba(0,0,0,0.35)"
              : "0 -12px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              padding: `${padY}px ${padX}px`,
              display: "flex",
              flexDirection: label ? "column" : "row",
              gap: label ? Math.round(textSize * 0.2) : 0,
              alignItems: label ? "flex-start" : "center",
              justifyContent: "center",
              textAlign: label ? "left" : "center",
            }}
          >
            {label ? (
              <span
                style={{
                  fontSize: labelSize,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(224,231,255,0.92)",
                }}
              >
                {label}
              </span>
            ) : null}
            <span
              style={{
                fontSize: textSize,
                fontWeight: 600,
                lineHeight: 1.25,
                color: "#f8fafc",
                textShadow: "0 1px 12px rgba(0,0,0,0.35)",
                maxWidth: "92%",
              }}
            >
              {text}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
