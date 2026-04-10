import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface TitleCardProps {
  title: string;
  subtitle?: string;
}

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const TitleCard: FC<TitleCardProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const pad = Math.round(Math.max(28, width * 0.04));
  const titleSize = Math.round(Math.max(34, Math.min(76, width * 0.054)));
  const subtitleSize = Math.round(titleSize * 0.42);

  const introEnd = 18;
  const opacity = interpolate(frame, [0, introEnd], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lift = interpolate(frame, [0, introEnd + 4], [14, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: pad,
        fontFamily: fontStack,
        background:
          "radial-gradient(ellipse 85% 70% at 50% 45%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 100%)",
        opacity,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: Math.min(width * 0.88, 920),
          transform: `translateY(${lift}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            padding: `${Math.round(pad * 0.85)}px ${Math.round(pad * 1.05)}px`,
            background:
              "linear-gradient(145deg, rgba(18,20,26,0.92) 0%, rgba(10,11,15,0.88) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              borderRadius: "18px 0 0 18px",
              background:
                "linear-gradient(180deg, #5eead4 0%, #2dd4bf 45%, #0d9488 100%)",
              boxShadow: "0 0 24px rgba(45,212,191,0.35)",
            }}
          />
          <div style={{ paddingLeft: 20 }}>
            <h1
              style={{
                margin: 0,
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#f8fafc",
                textShadow: "0 2px 28px rgba(0,0,0,0.45)",
              }}
            >
              {title}
            </h1>
            <div
              style={{
                marginTop: Math.round(titleSize * 0.28),
                width: Math.min(120, width * 0.12),
                height: 3,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, rgba(45,212,191,0.95) 0%, rgba(45,212,191,0.15) 100%)",
              }}
            />
            {subtitle ? (
              <p
                style={{
                  margin: 0,
                  marginTop: Math.round(titleSize * 0.32),
                  fontSize: subtitleSize,
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: "rgba(226,232,240,0.82)",
                  maxWidth: "42em",
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
