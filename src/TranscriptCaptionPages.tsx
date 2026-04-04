import type { TikTokPage } from "@remotion/captions";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT = "'Avenir Next', 'Trebuchet MS', sans-serif";

export type CaptionPageBaseProps = {
  accentColor: string;
  page: TikTokPage;
};

const useCaptionTimeMs = (page: TikTokPage) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return page.startMs + (frame / fps) * 1000;
};

export const TikTokCaptionPage: React.FC<CaptionPageBaseProps> = ({
  accentColor,
  page,
}) => {
  const currentTimeMs = useCaptionTimeMs(page);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: { damping: 18, mass: 0.8, stiffness: 140 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        padding: "0 clamp(24px, 5vw, 56px) clamp(48px, 8vh, 88px)",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          backdropFilter: "blur(18px)",
          background:
            "linear-gradient(145deg, rgba(11, 22, 51, 0.88), rgba(17, 49, 87, 0.82))",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 36,
          boxShadow: "0 28px 80px rgba(5, 12, 30, 0.32)",
          maxWidth: "min(1060px, 92vw)",
          padding: "clamp(20px, 3vw, 28px) clamp(24px, 3vw, 34px)",
          transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px) scale(${interpolate(enter, [0, 1], [0.97, 1])})`,
        }}
      >
        <div
          style={{
            color: "#F4F7FB",
            fontFamily: FONT,
            fontSize: "clamp(36px, 4.2vw, 52px)",
            fontWeight: 750,
            letterSpacing: -1.4,
            lineHeight: 1.12,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {page.tokens.map((token) => {
            const isActive =
              token.fromMs <= currentTimeMs && token.toMs > currentTimeMs;

            return (
              <span
                key={token.fromMs}
                style={{
                  backgroundColor: isActive ? accentColor : "transparent",
                  borderRadius: 14,
                  boxShadow: isActive
                    ? `0 12px 30px ${accentColor}44`
                    : "none",
                  color: isActive ? "#10213D" : "#F4F7FB",
                  padding: isActive ? "0 10px 4px" : "0",
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

export const KaraokeCaptionPage: React.FC<CaptionPageBaseProps> = ({
  accentColor,
  page,
}) => {
  const currentTimeMs = useCaptionTimeMs(page);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "clamp(56px, 10vh, 120px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.12em 0.28em",
          justifyContent: "center",
          maxWidth: "min(920px, 90vw)",
          textAlign: "center",
        }}
      >
        {page.tokens.map((token) => {
          const isActive =
            token.fromMs <= currentTimeMs && token.toMs > currentTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{
                borderBottom: isActive
                  ? `4px solid ${accentColor}`
                  : "4px solid transparent",
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                fontFamily: FONT,
                fontSize: "clamp(32px, 3.8vw, 48px)",
                fontWeight: 700,
                letterSpacing: -0.5,
                paddingBottom: 4,
                textShadow: isActive
                  ? `0 0 28px ${accentColor}66`
                  : "none",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const LowerThirdCaptionPage: React.FC<CaptionPageBaseProps> = ({
  accentColor,
  page,
}) => {
  const currentTimeMs = useCaptionTimeMs(page);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        padding: "0 0 32px 0",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0.45))",
          borderLeft: `4px solid ${accentColor}`,
          margin: "0 auto",
          maxWidth: "100%",
          padding: "14px 28px 16px 24px",
        }}
      >
        <div
          style={{
            color: accentColor,
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          Transcript
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.95)",
            fontFamily: FONT,
            fontSize: "clamp(22px, 2.4vw, 30px)",
            fontWeight: 600,
            lineHeight: 1.25,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {page.tokens.map((token) => {
            const isActive =
              token.fromMs <= currentTimeMs && token.toMs > currentTimeMs;

            return (
              <span
                key={token.fromMs}
                style={{
                  color: isActive ? accentColor : "rgba(255,255,255,0.88)",
                  fontWeight: isActive ? 700 : 600,
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

export const MinimalCaptionPage: React.FC<CaptionPageBaseProps> = ({
  accentColor,
  page,
}) => {
  const currentTimeMs = useCaptionTimeMs(page);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        padding: "0 clamp(20px, 4vw, 48px) clamp(40px, 7vh, 72px)",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          maxWidth: "min(980px, 94vw)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.92)",
            fontFamily: FONT,
            fontSize: "clamp(28px, 3.2vw, 40px)",
            fontWeight: 500,
            letterSpacing: -0.3,
            lineHeight: 1.35,
            textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {page.tokens.map((token) => {
            const isActive =
              token.fromMs <= currentTimeMs && token.toMs > currentTimeMs;

            return (
              <span
                key={token.fromMs}
                style={{
                  borderBottom: isActive
                    ? `2px solid ${accentColor}`
                    : "2px solid transparent",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                  fontWeight: isActive ? 650 : 500,
                  margin: "0 1px",
                  paddingBottom: 2,
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
