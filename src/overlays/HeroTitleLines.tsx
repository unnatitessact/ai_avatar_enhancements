import { AbsoluteFill } from "remotion";

const SERIF_ITALIC =
  "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, serif";

export type HeroTitleLinesProps = {
  /** Main stacked titles, top to bottom. */
  lines: string[];
  /** Vertical space between lines in pixels. */
  gap?: number;
  /** CSS font-size (e.g. clamp or px). */
  fontSize?: string;
  color?: string;
  /** Merged onto the root layer (e.g. `zIndex`). */
  style?: React.CSSProperties;
};

/**
 * Centered stack of italic serif hero lines (e.g. topic titles).
 * Does not include lower-third or transcript captions.
 */
export const HeroTitleLines: React.FC<HeroTitleLinesProps> = ({
  lines,
  gap = 20,
  fontSize = "clamp(32px, 4.2vw, 52px)",
  color = "#ffffff",
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pointerEvents: "none",
        textAlign: "center",
        ...style,
      }}
    >
      <div
        style={{
          color,
          display: "flex",
          flexDirection: "column",
          fontFamily: SERIF_ITALIC,
          fontSize,
          fontStyle: "italic",
          fontWeight: 400,
          gap,
          lineHeight: 1.15,
          maxWidth: "min(920px, 88vw)",
        }}
      >
        {lines.map((line, index) => (
          <span key={`${index}-${line}`}>{line}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
