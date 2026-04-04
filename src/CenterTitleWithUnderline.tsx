import { AbsoluteFill } from "remotion";

const SANS_BOLD =
  "'Montserrat', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export type CenterTitleWithUnderlineProps = {
  line1: string;
  line2: string;
  underlineColor?: string;
  /** Thickness of the accent bar in px. */
  underlineHeight?: number;
  /** Bar width as a fraction of the second line’s text width. */
  underlineWidthFraction?: number;
  gapAfterLine2?: number;
  fontSize?: string;
  lineHeight?: number;
  textShadow?: string;
  style?: React.CSSProperties;
};

/**
 * Two-line bold centered title with a short accent underline under the second line.
 */
export const CenterTitleWithUnderline: React.FC<
  CenterTitleWithUnderlineProps
> = ({
  line1,
  line2,
  underlineColor = "#4285F4",
  underlineHeight = 4,
  underlineWidthFraction = 0.45,
  gapAfterLine2 = 10,
  fontSize = "clamp(36px, 5vw, 56px)",
  lineHeight = 1.2,
  textShadow = "0 2px 14px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.35)",
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(20px, 4vw, 48px)",
        pointerEvents: "none",
        textAlign: "center",
        ...style,
      }}
    >
      <div
        style={{
          alignItems: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: SANS_BOLD,
          fontSize,
          fontWeight: 700,
          gap: line1 && line2 ? "0.22em" : 0,
          lineHeight,
          maxWidth: "min(960px, 92vw)",
          textShadow,
        }}
      >
        {line1 ? <span>{line1}</span> : null}
        {line2 ? (
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
              gap: gapAfterLine2,
            }}
          >
            <span>{line2}</span>
            <div
              style={{
                backgroundColor: underlineColor,
                borderRadius: underlineHeight / 2,
                height: underlineHeight,
                width: `${underlineWidthFraction * 100}%`,
              }}
            />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
