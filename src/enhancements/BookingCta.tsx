import type { CSSProperties, FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type BookingCtaProps = {
  /** Main headline, one string per line (all caps in design). */
  headlineLines?: string[];
  subtitle?: string;
  /** CTA pill label (e.g. URL). */
  ctaText?: string;
  /** Primary blue; button label uses the same color. Default `#2563eb`. */
  backgroundColor?: string;
  /** Frames between headline line / subtitle / button starts. Default 12. */
  staggerFrames?: number;
  /** Fade / slide duration per step. Default 14. */
  fadeFrames?: number;
};

const sans =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const defaultStagger = 12;
const defaultFade = 14;

export const DEFAULT_BOOKING_CTA_LINES = [
  "BOOK YOUR FREE",
  "COUNSELING",
  "SESSION TODAY",
];

export const DEFAULT_BOOKING_CTA_SUBTITLE = "Your global journey starts now";
export const DEFAULT_BOOKING_CTA_LABEL = "www.globaljourney.com";

export function parseBookingCtaHeadlineProps(
  props: Record<string, unknown>,
): string[] {
  if (Array.isArray(props.headlineLines) && props.headlineLines.length > 0) {
    return props.headlineLines
      .map((l) => String(l ?? "").trim())
      .filter(Boolean);
  }
  const fromLegacy = [props.line1, props.line2, props.line3]
    .filter((k) => k !== undefined)
    .map((l) => String(l ?? "").trim())
    .filter(Boolean);
  if (fromLegacy.length > 0) {
    return fromLegacy;
  }
  return DEFAULT_BOOKING_CTA_LINES;
}

export const BookingCta: FC<BookingCtaProps> = ({
  headlineLines,
  subtitle = DEFAULT_BOOKING_CTA_SUBTITLE,
  ctaText = DEFAULT_BOOKING_CTA_LABEL,
  backgroundColor = "#2563eb",
  staggerFrames = defaultStagger,
  fadeFrames = defaultFade,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const lines =
    headlineLines && headlineLines.length > 0
      ? headlineLines
      : DEFAULT_BOOKING_CTA_LINES;

  const padX = Math.round(Math.max(36, width * 0.065));
  const padY = Math.round(Math.max(44, height * 0.055));
  const headlineSize = Math.round(Math.max(44, Math.min(70, width * 0.058)));
  const subtitleSize = Math.round(Math.max(26, Math.min(40, width * 0.034)));
  const ctaSize = Math.round(Math.max(24, Math.min(36, width * 0.029)));
  const lineGap = Math.round(headlineSize * 0.14);
  const afterHeadlineGap = Math.round(headlineSize * 0.55);
  const beforeCtaGap = Math.round(subtitleSize * 1.15);

  const lineStart = (index: number) => index * staggerFrames;
  const subtitleStart = lines.length * staggerFrames + 6;
  const ctaStart = subtitleStart + staggerFrames + 8;

  const motion = (start: number) => {
    const opacity = interpolate(frame, [start, start + fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = interpolate(frame, [start, start + fadeFrames + 4], [14, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { opacity, transform: `translateY(${y}px)` };
  };

  const headlineStyle = (start: number): CSSProperties => {
    const m = motion(start);
    return {
      margin: 0,
      fontFamily: sans,
      fontSize: headlineSize,
      fontWeight: 800,
      lineHeight: 1.08,
      letterSpacing: "0.02em",
      color: "#ffffff",
      textAlign: "center",
      textTransform: "uppercase",
      opacity: m.opacity,
      transform: m.transform,
    };
  };

  const subStyle: CSSProperties = (() => {
    const m = motion(subtitleStart);
    return {
      margin: 0,
      marginTop: afterHeadlineGap,
      fontFamily: sans,
      fontSize: subtitleSize,
      fontWeight: 400,
      lineHeight: 1.45,
      color: "rgba(255,255,255,0.95)",
      textAlign: "center",
      maxWidth: Math.min(width * 0.88, 720),
      opacity: m.opacity,
      transform: m.transform,
    };
  })();

  const ctaStyle: CSSProperties = (() => {
    const m = motion(ctaStart);
    return {
      marginTop: beforeCtaGap,
      alignSelf: "center",
      padding: `${Math.round(ctaSize * 0.65)}px ${Math.round(ctaSize * 1.35)}px`,
      fontFamily: sans,
      fontSize: ctaSize,
      fontWeight: 700,
      color: backgroundColor,
      backgroundColor: "#ffffff",
      borderRadius: 9999,
      border: "none",
      boxShadow: "0 14px 36px rgba(0,0,0,0.22)",
      textAlign: "center",
      opacity: m.opacity,
      transform: m.transform,
    };
  })();

  return (
    <AbsoluteFill
      style={{
        fontFamily: sans,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
        backgroundColor,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 95% 70% at 50% 32%, rgba(0,0,0,0.14) 0%, transparent 58%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: Math.min(width - padX * 2, 920),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: lineGap,
          }}
        >
          {lines.map((line, index) => (
            <p key={index} style={headlineStyle(lineStart(index))}>
              {line}
            </p>
          ))}
        </div>

        <p style={subStyle}>{subtitle}</p>

        <div style={ctaStyle} role="presentation">
          {ctaText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
