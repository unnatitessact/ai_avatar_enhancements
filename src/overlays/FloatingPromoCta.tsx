import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SANS =
  "'Montserrat', 'Poppins', 'Avenir Next', 'Segoe UI', system-ui, sans-serif";

/** Frames to wait after the last headline motion starts before the button enters. */
const HEADLINE_TO_BUTTON_GAP = 28;

export type FloatingPromoCtaProps = {
  /** Main headline lines (shown in all caps). */
  titleLines: string[];
  /** Smaller line below the title. */
  subtitle: string;
  /** Pill button label (e.g. URL). Empty string hides the button. */
  buttonLabel: string;
  backgroundColor?: string;
  /** Frames to wait before the first line starts moving. */
  startDelayFrames?: number;
  /** Stagger between each title line. */
  staggerFrames?: number;
  style?: React.CSSProperties;
};

const getFloatInFromTop = (
  frame: number,
  fps: number,
  delayFrames: number,
): { opacity: number; translateY: number } => {
  const f = Math.max(0, frame - delayFrames);
  const t = spring({
    fps,
    frame: f,
    config: { damping: 18, stiffness: 140, mass: 0.85 },
  });
  return {
    opacity: interpolate(t, [0, 1], [0, 1]),
    translateY: interpolate(t, [0, 1], [-52, 0]),
  };
};

const getFloatInFromBottom = (
  frame: number,
  fps: number,
  delayFrames: number,
): { opacity: number; translateY: number } => {
  const f = Math.max(0, frame - delayFrames);
  const t = spring({
    fps,
    frame: f,
    config: { damping: 19, stiffness: 120, mass: 0.9 },
  });
  return {
    opacity: interpolate(t, [0, 1], [0, 1]),
    translateY: interpolate(t, [0, 1], [72, 0]),
  };
};

/**
 * Solid promo: uppercase headline floats from top (staggered), optional subtitle from top,
 * then a pill button rises from the bottom.
 */
export const FloatingPromoCta: React.FC<FloatingPromoCtaProps> = ({
  titleLines,
  subtitle,
  buttonLabel,
  backgroundColor = "#0066cc",
  startDelayFrames = 0,
  staggerFrames = 6,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subtitleDelay =
    startDelayFrames + titleLines.length * staggerFrames + staggerFrames;
  const subtitleMotion = getFloatInFromTop(frame, fps, subtitleDelay);

  const lastTitleLineDelay =
    titleLines.length > 0
      ? startDelayFrames + (titleLines.length - 1) * staggerFrames
      : startDelayFrames;

  const buttonDelayAfterHeadlineOnly =
    lastTitleLineDelay + HEADLINE_TO_BUTTON_GAP;
  const buttonDelayAfterSubtitle =
    subtitleDelay + HEADLINE_TO_BUTTON_GAP;

  const buttonDelay = subtitle.trim()
    ? buttonDelayAfterSubtitle
    : buttonDelayAfterHeadlineOnly;

  const buttonMotion = getFloatInFromBottom(frame, fps, buttonDelay);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(20px, 5vw, 48px)",
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "-4vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "0.12em",
          }}
        >
          {titleLines.map((line, index) => {
            const delay = startDelayFrames + index * staggerFrames;
            const { opacity, translateY } = getFloatInFromTop(
              frame,
              fps,
              delay,
            );

            return (
              <span
                key={`${index}-${line}`}
                style={{
                  color: "#ffffff",
                  display: "block",
                  fontFamily: SANS,
                  fontSize: "clamp(28px, 4.2vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  lineHeight: 1.08,
                  opacity,
                  textTransform: "uppercase",
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {line}
              </span>
            );
          })}
        </div>

        {subtitle.trim() ? (
          <span
            style={{
              color: "rgba(255, 255, 255, 0.95)",
              fontFamily: SANS,
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.4,
              marginTop: "clamp(16px, 2.4vh, 28px)",
              maxWidth: "min(640px, 90vw)",
              opacity: subtitleMotion.opacity,
              textAlign: "center",
              transform: `translateY(${subtitleMotion.translateY}px)`,
            }}
          >
            {subtitle}
          </span>
        ) : null}

        {buttonLabel.trim() ? (
          <div
            style={{
              marginTop: "clamp(22px, 3.2vh, 36px)",
              opacity: buttonMotion.opacity,
              transform: `translateY(${buttonMotion.translateY}px)`,
            }}
          >
            <span
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 999,
                boxShadow: "0 10px 28px rgba(0, 0, 0, 0.18)",
                color: backgroundColor,
                display: "inline-block",
                fontFamily: SANS,
                fontSize: "clamp(14px, 1.85vw, 18px)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                padding: "clamp(12px, 1.8vh, 16px) clamp(22px, 3.5vw, 36px)",
              }}
            >
              {buttonLabel}
            </span>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
