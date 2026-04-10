import type { FC } from "react";
import { useId } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type DynamicGraphProps = {
  title?: string;
  /** Bar heights; scaled so the largest value uses the full plot height. */
  values: number[];
  /** Optional x-axis labels (one per bar; extras ignored, missing padded). */
  labels?: string[];
  /** Bar fill (kept as `lineColor` for backward compatibility with JSON props). */
  lineColor?: string;
  accentColor?: string;
  /** Frames for each bar’s grow animation (after its stagger). */
  drawFrames?: number;
};

const fontStack =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

export const DynamicGraph: FC<DynamicGraphProps> = ({
  title,
  values,
  labels,
  lineColor = "#f59e0b",
  accentColor = "rgba(245, 158, 11, 0.22)",
  drawFrames = 22,
}) => {
  const gradId = useId().replace(/:/g, "");
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const edge = Math.round(Math.max(24, width * 0.045));
  const titleSize = Math.round(Math.max(22, Math.min(36, width * 0.032)));
  const labelSize = Math.round(Math.max(14, width * 0.022));

  const cardW = width - 2 * edge;
  const cardH = height - 2 * edge;
  const titleBlockH = title
    ? Math.round(edge * 0.65) + titleSize + 8
    : 0;

  const introEnd = 14;
  const opacity = interpolate(frame, [0, introEnd], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame, [0, introEnd + 8], [24, 0], {
    extrapolateRight: "clamp",
  });

  const svgW = cardW;
  const svgH = Math.max(120, cardH - titleBlockH);

  const plotPadX = Math.round(Math.max(14, cardW * 0.02));
  const plotPadTop = 12;
  const plotPadBottom = labelSize + 22;
  const plotLeft = plotPadX;
  const plotRight = plotPadX;
  const plotTop = plotPadTop;
  const plotW = svgW - plotLeft - plotRight;
  const plotH = svgH - plotTop - plotPadBottom;

  const series =
    values.length > 0
      ? values
      : [12, 18, 15, 28, 22, 35, 31, 40, 38, 48];

  const maxVal = Math.max(...series, 1e-9);
  const n = series.length;
  const slotW = plotW / n;
  const gapRatio = 0.28;
  const barW = Math.max(4, slotW * (1 - gapRatio));
  const barX = (i: number) =>
    plotLeft + i * slotW + (slotW - barW) / 2;

  const baselineY = plotTop + plotH;
  const stagger = Math.max(2, Math.round(36 / Math.max(n, 1)));
  const growFrames = Math.max(10, drawFrames);

  const xLabels: string[] = [];
  for (let i = 0; i < series.length; i++) {
    xLabels.push(labels?.[i] ?? String(i + 1));
  }

  const barRx = Math.min(8, barW * 0.2);

  return (
    <AbsoluteFill
      style={{
        fontFamily: fontStack,
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${slide}px)`,
          padding: edge,
        }}
      >
        <div
          style={{
            position: "relative",
            width: cardW,
            height: cardH,
            borderRadius: 16,
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.78) 100%)",
            border: "1px solid rgba(148,163,184,0.2)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          {title ? (
            <div
              style={{
                padding: `${Math.round(edge * 0.65)}px ${Math.round(edge * 0.75)}px 0`,
                fontSize: titleSize,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#f8fafc",
                textShadow: "0 2px 12px rgba(0,0,0,0.45)",
              }}
            >
              {title}
            </div>
          ) : null}

          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${svgW} ${svgH}`}
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={lineColor}
                  stopOpacity={0.72}
                />
              </linearGradient>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = plotTop + plotH * (1 - t);
              return (
                <line
                  key={t}
                  x1={plotLeft}
                  y1={y}
                  x2={plotLeft + plotW}
                  y2={y}
                  stroke="rgba(148,163,184,0.12)"
                  strokeWidth={1}
                />
              );
            })}

            <line
              x1={plotLeft}
              y1={baselineY}
              x2={plotLeft + plotW}
              y2={baselineY}
              stroke="rgba(148,163,184,0.35)"
              strokeWidth={1.5}
            />

            {series.map((v, i) => {
              const targetH = (v / maxVal) * plotH;
              const start = introEnd + i * stagger;
              const grow = interpolate(
                frame,
                [start, start + growFrames],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                },
              );
              const h = targetH * grow;
              const x = barX(i);
              const y = baselineY - h;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={barW}
                  height={Math.max(0, h)}
                  rx={barRx}
                  ry={barRx}
                  fill={`url(#${gradId})`}
                />
              );
            })}

            {xLabels.map((lab, i) => {
              const cx = barX(i) + barW / 2;
              return (
                <text
                  key={i}
                  x={cx}
                  y={plotTop + plotH + labelSize + 4}
                  textAnchor="middle"
                  fill="rgba(226,232,240,0.75)"
                  fontSize={labelSize}
                  fontWeight={500}
                >
                  {lab}
                </text>
              );
            })}
          </svg>

          <div
            style={{
              position: "absolute",
              bottom: Math.round(edge * 0.35),
              right: Math.round(edge * 0.75),
              fontSize: Math.round(labelSize * 0.95),
              fontWeight: 600,
              color: accentColor,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Live
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
