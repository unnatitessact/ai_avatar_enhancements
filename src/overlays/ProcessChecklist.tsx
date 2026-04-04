import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SANS =
  "'Montserrat', 'Poppins', 'Avenir Next', 'Segoe UI', system-ui, sans-serif";

const BG = "#0b1f3a";
const HEADER_COLOR = "#6ec4ea";
const LINE_COLOR = "rgba(110, 196, 234, 0.45)";
const BOX_BG = "rgba(35, 90, 150, 0.42)";
const ICON_COLOR = "#8ed4f8";

const ICON_BOX = 52;
const ROW_GAP = 18;
const ROW_STAGGER = 10;
/** Frames before the first row starts (after the vertical line has mostly drawn). */
const ROW_START_AFTER_LINE = 36;

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
  header: string;
  items: ProcessChecklistItem[];
  /** Override panel background. */
  backgroundColor?: string;
  style?: React.CSSProperties;
};

const IconGraduation: React.FC = () => (
  <svg
    aria-hidden
    height={26}
    viewBox="0 0 24 24"
    width={26}
    style={{ color: ICON_COLOR }}
  >
    <path
      d="M12 3L2 8l10 5 10-5-10-5zM2 13v6l10 5 10-5v-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
    <path
      d="M6 10.5v5.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.75"
    />
  </svg>
);

const IconClipboard: React.FC = () => (
  <svg
    aria-hidden
    height={26}
    viewBox="0 0 24 24"
    width={26}
    style={{ color: ICON_COLOR }}
  >
    <path
      d="M9 4h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M9 12l2 2 4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
  </svg>
);

const IconEdit: React.FC = () => (
  <svg
    aria-hidden
    height={26}
    viewBox="0 0 24 24"
    width={26}
    style={{ color: ICON_COLOR }}
  >
    <rect
      height="14"
      rx="2"
      width="14"
      x="4"
      y="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M14 10l4 4-7 7H7v-4l7-7z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
  </svg>
);

const IconEnvelope: React.FC = () => (
  <svg
    aria-hidden
    height={26}
    viewBox="0 0 24 24"
    width={26}
    style={{ color: ICON_COLOR }}
  >
    <path
      d="M3 6h18v12H3V6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M3 6l9 6 9-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
  </svg>
);

const icons: Record<ProcessChecklistIconId, React.FC> = {
  graduation: IconGraduation,
  clipboard: IconClipboard,
  edit: IconEdit,
  envelope: IconEnvelope,
};

const rowEnter = (
  frame: number,
  fps: number,
  delayFrames: number,
): { opacity: number; translateX: number } => {
  const f = Math.max(0, frame - delayFrames);
  const t = spring({
    fps,
    frame: f,
    config: { damping: 17, stiffness: 130, mass: 0.85 },
  });
  return {
    opacity: interpolate(t, [0, 1], [0, 1]),
    translateX: interpolate(t, [0, 1], [-18, 0]),
  };
};

/**
 * “Our process” style checklist: vertical line draws down, then rows stagger in from the left.
 */
export const ProcessChecklist: React.FC<ProcessChecklistProps> = ({
  header,
  items,
  backgroundColor = BG,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineT = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 95 },
  });
  const lineScale = interpolate(lineT, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        boxSizing: "border-box",
        padding: "clamp(36px, 5vw, 64px)",
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          maxWidth: 560,
        }}
      >
        <h2
          style={{
            color: HEADER_COLOR,
            fontSize: "clamp(14px, 1.6vw, 18px)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            margin: 0,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          {header}
        </h2>

        <div style={{ position: "relative" }}>
          <div
            style={{
              left: ICON_BOX / 2 - 1,
              pointerEvents: "none",
              position: "absolute",
              top: ICON_BOX / 2,
              width: 2,
              bottom: ICON_BOX / 2,
              transform: `scaleY(${lineScale})`,
              transformOrigin: "top center",
            }}
          >
            <div
              style={{
                backgroundColor: LINE_COLOR,
                borderRadius: 1,
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ROW_GAP,
            }}
          >
            {items.map((item, index) => {
              const Icon = icons[item.icon];
              const delay = ROW_START_AFTER_LINE + index * ROW_STAGGER;
              const { opacity, translateX } = rowEnter(frame, fps, delay);

              return (
                <div
                  key={`${index}-${item.label}`}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: "clamp(16px, 2.4vw, 22px)",
                    opacity,
                    transform: `translateX(${translateX}px)`,
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: BOX_BG,
                      borderRadius: 12,
                      display: "flex",
                      flexShrink: 0,
                      height: ICON_BOX,
                      justifyContent: "center",
                      width: ICON_BOX,
                    }}
                  >
                    <Icon />
                  </div>
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "clamp(16px, 2vw, 20px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
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
