import type { CSSProperties, FC, ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ProcessChecklistIconId =
  | "graduation"
  | "clipboard"
  | "edit"
  | "envelope";

export type ProcessChecklistItem = {
  label: string;
  icon: ProcessChecklistIconId;
};

export type ProcessChecklistProps = {
  title?: string;
  /** When empty or omitted, {@link DEFAULT_PROCESS_CHECKLIST_ITEMS} is used. */
  items?: ProcessChecklistItem[];
  /** Frames between each row’s animation start (after the header). Default 14. */
  staggerFrames?: number;
  /** Frames for each row’s fade / slide. Default 14. */
  fadeFrames?: number;
};

const BG = "#0a2558";
const ACCENT = "#7fb3d5";
const TEXT = "#ffffff";

const sans =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const defaultStagger = 14;
const defaultFade = 14;
const headerFadeFrames = 12;

export const DEFAULT_PROCESS_CHECKLIST_ITEMS: ProcessChecklistItem[] = [
  { label: "University Shortlisting", icon: "graduation" },
  { label: "Test Prep", icon: "clipboard" },
  { label: "SOP Reviews", icon: "edit" },
  { label: "Visa Guidance", icon: "envelope" },
];

const ICON_CYCLE: ProcessChecklistIconId[] = [
  "graduation",
  "clipboard",
  "edit",
  "envelope",
];

/** Normalizes JSON `items` from enhancement props. */
export function parseProcessChecklistItems(
  raw: unknown,
): ProcessChecklistItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_PROCESS_CHECKLIST_ITEMS;
  }
  const parsed: ProcessChecklistItem[] = [];
  for (let i = 0; i < raw.length; i++) {
    const row = raw[i];
    if (typeof row === "string") {
      const label = row.trim();
      if (label) {
        parsed.push({
          label,
          icon: ICON_CYCLE[i % ICON_CYCLE.length]!,
        });
      }
      continue;
    }
    if (row && typeof row === "object" && "label" in row) {
      const o = row as Record<string, unknown>;
      const label = String(o.label ?? "").trim();
      if (!label) continue;
      const iconRaw = String(o.icon ?? "");
      const icon: ProcessChecklistIconId = ICON_CYCLE.includes(
        iconRaw as ProcessChecklistIconId,
      )
        ? (iconRaw as ProcessChecklistIconId)
        : ICON_CYCLE[i % ICON_CYCLE.length]!;
      parsed.push({ label, icon });
    }
  }
  return parsed.length > 0 ? parsed : DEFAULT_PROCESS_CHECKLIST_ITEMS;
}

function ChecklistIcon({
  id,
  color,
  size,
}: {
  id: ProcessChecklistIconId;
  color: string;
  size: number;
}): ReactNode {
  const s = { stroke: color, fill: "none", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "graduation":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M2 9l10-4 10 4-10 4-10-4z" />
          <path {...s} d="M6 11.5V16c0 1 4 3 8 0v-4.5" />
        </svg>
      );
    case "clipboard":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M9 4h6a1 1 0 011 1v2H8V5a1 1 0 011-1z" />
          <rect {...s} x={5} y={5} width={14} height={16} rx={2} />
          <path {...s} d="M9 12l2 2 4-4" />
        </svg>
      );
    case "edit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M6 3h9l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
          <path {...s} d="M8 11h8M8 15h6M8 7h4" />
          <path {...s} d="M15 3v4h4" />
        </svg>
      );
    case "envelope":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect {...s} x={3} y={6} width={18} height={12} rx={2} />
          <path {...s} d="M3 8l9 6 9-6" />
        </svg>
      );
    default:
      return null;
  }
}

export const ProcessChecklist: FC<ProcessChecklistProps> = ({
  title = "OUR PROCESS",
  items,
  staggerFrames = defaultStagger,
  fadeFrames = defaultFade,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const list =
    items && items.length > 0 ? items : DEFAULT_PROCESS_CHECKLIST_ITEMS;

  const padX = Math.round(Math.max(40, width * 0.07));
  const padY = Math.round(Math.max(48, height * 0.06));
  const titleSize = Math.round(Math.max(34, Math.min(48, width * 0.043)));
  const labelSize = Math.round(Math.max(36, Math.min(56, width * 0.05)));
  const iconBox = Math.round(Math.max(54, width * 0.062));
  const iconSvg = Math.round(iconBox * 0.48);
  const rowGap = Math.round(labelSize * 0.78);
  const lineX = Math.round(iconBox / 2) - 1;

  const headerOpacity = interpolate(
    frame,
    [0, headerFadeFrames],
    [0, 1],
    { extrapolateRight: "clamp" },
  );
  const headerSlide = interpolate(
    frame,
    [0, headerFadeFrames + 4],
    [-10, 0],
    { extrapolateRight: "clamp" },
  );

  const itemStart = (index: number) =>
    headerFadeFrames + 4 + index * staggerFrames;

  const rowMotion = (index: number) => {
    const start = itemStart(index);
    const opacity = interpolate(frame, [start, start + fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const tx = interpolate(frame, [start, start + fadeFrames + 2], [18, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { opacity, transform: `translateX(${tx}px)` };
  };

  const lineCenterY = Math.round(iconBox / 2);
  const connectorHeight =
    list.length > 1 ? (list.length - 1) * (iconBox + rowGap) : 0;

  const titleStyle: CSSProperties = {
    margin: 0,
    width: "100%",
    fontFamily: sans,
    fontSize: titleSize,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: ACCENT,
    textTransform: "uppercase",
    textAlign: "center",
    opacity: headerOpacity,
    transform: `translateX(${headerSlide}px)`,
  };

  const contentMaxWidth = Math.min(width - padX * 2, 980);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: contentMaxWidth,
        }}
      >
        <h2 style={titleStyle}>{title}</h2>

        <div
          style={{
            position: "relative",
            marginTop: Math.round(titleSize * 0.95),
            width: "100%",
          }}
        >
        {connectorHeight > 0 ? (
          <div
            style={{
              position: "absolute",
              left: lineX,
              top: lineCenterY,
              width: 3,
              height: connectorHeight,
              borderRadius: 2,
              backgroundColor: ACCENT,
              opacity: 0.55,
            }}
          />
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: rowGap,
          }}
        >
          {list.map((item, index) => {
            const m = rowMotion(index);
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: Math.round(labelSize * 0.55),
                  opacity: m.opacity,
                  transform: m.transform,
                }}
              >
                <div
                  style={{
                    width: iconBox,
                    height: iconBox,
                    borderRadius: 10,
                    backgroundColor: "rgba(127, 179, 213, 0.22)",
                    border: `1px solid rgba(127, 179, 213, 0.45)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <ChecklistIcon id={item.icon} color={ACCENT} size={iconSvg} />
                </div>
                <span
                  style={{
                    fontSize: labelSize,
                    fontWeight: 700,
                    color: TEXT,
                    lineHeight: 1.25,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
