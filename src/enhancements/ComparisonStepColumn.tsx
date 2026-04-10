import type { FC } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ComparisonStepColumnItem = {
  title: string;
  subtitle?: string;
};

export type ComparisonStepColumnProps = {
  /** When empty or omitted, {@link DEFAULT_COMPARISON_STEP_ITEMS} is used. */
  items?: ComparisonStepColumnItem[];
  /** Frames between each row’s animation start. Default 12. */
  staggerFrames?: number;
  /** Frames for each row’s fade / slide. Default 14. */
  fadeFrames?: number;
  /** Main label color. Default dark green. */
  textColor?: string;
  /** Optional subtitle color (slightly muted). */
  subtitleColor?: string;
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

const BG_TOP = "#0f3d2c";
const BG_BOTTOM = "#1a5f42";
const DEFAULT_TEXT = "#0d3d28";
const DEFAULT_SUBTITLE = "rgba(13, 61, 40, 0.72)";

const defaultStagger = 12;
const defaultFade = 14;
const lineRevealFrames = 10;

export const DEFAULT_COMPARISON_STEP_ITEMS: ComparisonStepColumnItem[] = [
  { title: "On-road" },
  { title: "Efficiency" },
  { title: "Cost per km" },
  { title: "Usage", subtitle: "(5 years)" },
  { title: "Running Cost" },
  { title: "Maintenance", subtitle: "(5 years)" },
  { title: "Total Cost", subtitle: "(5 years)" },
];

/** Normalizes JSON `items` from enhancement props. */
export function parseComparisonStepColumnItems(
  raw: unknown,
): ComparisonStepColumnItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_COMPARISON_STEP_ITEMS;
  }
  const parsed: ComparisonStepColumnItem[] = [];
  for (const row of raw) {
    if (typeof row === "string") {
      const title = row.trim();
      if (title) parsed.push({ title });
      continue;
    }
    if (row && typeof row === "object" && "title" in row) {
      const o = row as Record<string, unknown>;
      const title = String(o.title ?? "").trim();
      if (!title) continue;
      const subtitleRaw = o.subtitle;
      const subtitle =
        subtitleRaw !== undefined && subtitleRaw !== null
          ? String(subtitleRaw).trim()
          : undefined;
      parsed.push({ title, subtitle: subtitle || undefined });
    }
  }
  return parsed.length > 0 ? parsed : DEFAULT_COMPARISON_STEP_ITEMS;
}

export const ComparisonStepColumn: FC<ComparisonStepColumnProps> = ({
  items,
  staggerFrames = defaultStagger,
  fadeFrames = defaultFade,
  textColor = DEFAULT_TEXT,
  subtitleColor = DEFAULT_SUBTITLE,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const list =
    items && items.length > 0 ? items : DEFAULT_COMPARISON_STEP_ITEMS;

  const padX = Math.round(Math.max(32, width * 0.06));
  const padY = Math.round(Math.max(40, height * 0.05));
  const titleSize = Math.round(Math.max(28, Math.min(52, width * 0.044)));
  const subtitleSize = Math.round(Math.max(17, titleSize * 0.58));
  const rowGap = Math.round(Math.max(64, titleSize * 0.78));
  const boxPadX = Math.round(Math.max(32, width * 0.055));
  const boxPadY = Math.round(Math.max(22, titleSize * 0.68));
  const borderRadius = Math.round(Math.max(14, width * 0.016));
  const lineWidth = Math.max(2, Math.round(width * 0.0025));

  const lineOpacity = interpolate(frame, [0, lineRevealFrames], [0, 0.95], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const itemStart = (index: number) => lineRevealFrames + index * staggerFrames;

  const rowMotion = (index: number) => {
    const start = itemStart(index);
    const opacity = interpolate(frame, [start, start + fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const ty = interpolate(frame, [start, start + fadeFrames + 2], [18, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const scale = interpolate(frame, [start, start + fadeFrames], [0.96, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return {
      opacity,
      transform: `translateY(${ty}px) scale(${scale})`,
    };
  };

  return (
    <AbsoluteFill
      style={{
        fontFamily: fontStack,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
        background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOTTOM} 100%)`,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: rowGap,
          maxWidth: Math.min(width - padX * 2, 640),
          width: "100%",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: lineWidth,
            marginLeft: -lineWidth / 2,
            borderRadius: lineWidth,
            backgroundColor: "#ffffff",
            opacity: lineOpacity,
            zIndex: 0,
          }}
        />
        {list.map((item, index) => {
          const m = rowMotion(index);
          return (
            <div
              key={`${item.title}-${index}`}
              style={{
                position: "relative",
                zIndex: 1,
                opacity: m.opacity,
                transform: m.transform,
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  padding: `${boxPadY}px ${boxPadX}px`,
                  backgroundColor: "#ffffff",
                  borderRadius,
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: titleSize,
                    fontWeight: 700,
                    color: textColor,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </div>
                {item.subtitle ? (
                  <div
                    style={{
                      marginTop: Math.round(subtitleSize * 0.35),
                      fontSize: subtitleSize,
                      fontWeight: 600,
                      color: subtitleColor,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.subtitle}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
