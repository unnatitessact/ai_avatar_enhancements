import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type QuoteOverlayProps = {
  quote: string;
  attribution?: string;
  /** Where the quote block sits vertically inside the frame. */
  verticalAlign?: "center" | "bottom";
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const QuoteOverlay: FC<QuoteOverlayProps> = ({
  quote,
  attribution,
  verticalAlign = "center",
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const pad = Math.round(Math.max(32, width * 0.045));
  const quoteSize = Math.round(Math.max(32, Math.min(62, width * 0.046)));
  const attrSize = Math.round(quoteSize * 0.42);

  const introEnd = 20;
  const opacity = interpolate(frame, [0, introEnd], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, introEnd + 8], [0.97, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: verticalAlign === "bottom" ? "flex-end" : "center",
        padding: pad,
        fontFamily: fontStack,
        marginBottom: Math.round(pad * 0.15),
        background:
          "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)",
        opacity,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: Math.min(width * 0.9, 880),
          transform: `scale(${scale})`,
        }}
      >
        <blockquote
          style={{
            margin: 0,
            padding: `${Math.round(pad * 0.9)}px ${Math.round(pad * 1.1)}px`,
            position: "relative",
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: Math.round(pad * 0.5),
              top: Math.round(quoteSize * 0.15),
              fontSize: Math.round(quoteSize * 2.2),
              lineHeight: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "rgba(255,255,255,0.16)",
              userSelect: "none",
            }}
          >
            “
          </span>
          <p
            style={{
              margin: 0,
              paddingLeft: Math.round(quoteSize * 0.9),
              fontSize: quoteSize,
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.42,
              color: "#f1f5f9",
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
            }}
          >
            {quote}
          </p>
          {attribution ? (
            <footer
              style={{
                marginTop: Math.round(quoteSize * 0.45),
                paddingLeft: Math.round(quoteSize * 0.9),
                fontSize: attrSize,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(203,213,225,0.95)",
              }}
            >
              — {attribution}
            </footer>
          ) : null}
        </blockquote>
      </div>
    </AbsoluteFill>
  );
};
