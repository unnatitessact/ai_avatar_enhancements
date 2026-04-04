import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SANS =
  "'Montserrat', 'Avenir Next', 'Segoe UI', system-ui, sans-serif";

const NAME_DELAY = 0;
const DESIGNATION_DELAY = 12;
const HEADER_DELAY = 0;

export type SpeakerNameBarsProps = {
  /** Top-centered label (e.g. "MEET YOUR SPEAKER"). Empty hides. */
  meetHeader: string;
  speakerName: string;
  speakerDesignation: string;
  /** Extra frames before the name bar starts sliding in. */
  startDelayFrames?: number;
  style?: React.CSSProperties;
};

const slideFromLeft = (
  frame: number,
  fps: number,
  delayFrames: number,
): { opacity: number; translateX: number } => {
  const f = Math.max(0, frame - delayFrames);
  const t = spring({
    fps,
    frame: f,
    config: { damping: 22, stiffness: 115, mass: 0.9 },
  });
  return {
    opacity: interpolate(t, [0, 1], [0, 1]),
    translateX: interpolate(t, [0, 1], [-160, 0]),
  };
};

const headerFade = (
  frame: number,
  fps: number,
  delayFrames: number,
): { opacity: number; translateY: number } => {
  const f = Math.max(0, frame - delayFrames);
  const t = spring({
    fps,
    frame: f,
    config: { damping: 20, stiffness: 130 },
  });
  return {
    opacity: interpolate(t, [0, 1], [0, 1]),
    translateY: interpolate(t, [0, 1], [-10, 0]),
  };
};

/**
 * Top “meet your speaker” label plus two stacked white lower-third bars (name + designation),
 * sliding in from the left with a short stagger.
 */
export const SpeakerNameBars: React.FC<SpeakerNameBarsProps> = ({
  meetHeader,
  speakerName,
  speakerDesignation,
  startDelayFrames = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const base = startDelayFrames;
  const nameMotion = slideFromLeft(
    frame,
    fps,
    base + NAME_DELAY,
  );
  const designationMotion = slideFromLeft(
    frame,
    fps,
    base + DESIGNATION_DELAY,
  );
  const headerMotion = headerFade(frame, fps, base + HEADER_DELAY);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        ...style,
      }}
    >
      {meetHeader.trim() ? (
        <div
          style={{
            left: 0,
            position: "absolute",
            right: 0,
            textAlign: "center",
            top: "clamp(32px, 5vh, 56px)",
            opacity: headerMotion.opacity,
            transform: `translateY(${headerMotion.translateY}px)`,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontFamily: SANS,
              fontSize: "clamp(13px, 1.5vw, 16px)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {meetHeader}
          </span>
        </div>
      ) : null}

      <div
        style={{
          alignItems: "flex-start",
          bottom: "clamp(28px, 5vh, 56px)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          left: "clamp(24px, 4vw, 48px)",
          position: "absolute",
        }}
      >
        {speakerName.trim() ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
              opacity: nameMotion.opacity,
              padding: "clamp(12px, 1.8vh, 16px) clamp(20px, 3vw, 32px)",
              transform: `translateX(${nameMotion.translateX}px)`,
            }}
          >
            <span
              style={{
                color: "#000000",
                display: "block",
                fontFamily: SANS,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                fontStretch: "condensed",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {speakerName}
            </span>
          </div>
        ) : null}

        {speakerDesignation.trim() ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
              opacity: designationMotion.opacity,
              padding: "clamp(8px, 1.2vh, 12px) clamp(18px, 2.6vw, 28px)",
              transform: `translateX(${designationMotion.translateX}px)`,
            }}
          >
            <span
              style={{
                color: "#000000",
                display: "block",
                fontFamily: SANS,
                fontSize: "clamp(14px, 1.75vw, 18px)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {speakerDesignation}
            </span>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
