import { AbsoluteFill, Audio, useVideoConfig, Video } from "remotion";
import { TranscriptCaptions } from "./TranscriptCaptions";
import type { TranscriptVariant } from "./transcriptTypes";
import type { PlanCompositionProps } from "./plan/compositionInput.types";
import { PlanOverlayLayer } from "./plan/PlanOverlayLayer";
import { parseOverlayPlanWithDefault } from "./plan/parseOverlayPlan";

export type { PlanCompositionProps } from "./plan/compositionInput.types";

export const PlanComposition: React.FC<PlanCompositionProps> = ({
  accentColor,
  audioUrl,
  outputVideoUrl,
  overlayPlanJson,
  storyboardJson: _storyboardJson,
  wordLevelTranscriptSource,
}) => {
  const { fps } = useVideoConfig();
  const plan = parseOverlayPlanWithDefault(overlayPlanJson);

  // Reserved for future: multi-clip cuts / per-segment video from `storyboardJson`.
  void _storyboardJson;

  if (!plan) {
    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          backgroundColor: "#0a1628",
          color: "#fff",
          fontFamily: "system-ui",
          fontSize: 24,
          justifyContent: "center",
        }}
      >
        Invalid overlay plan JSON
      </AbsoluteFill>
    );
  }

  const variant = plan.captions.enabled
    ? plan.captions.variant
    : ("minimal" as TranscriptVariant);

  return (
    <AbsoluteFill
      style={{
        background: outputVideoUrl ? "#071224" : "#071224",
        color: "white",
        fontFamily: "'Avenir Next', 'Trebuchet MS', sans-serif",
        overflow: "hidden",
      }}
    >
      {outputVideoUrl ? (
        <AbsoluteFill style={{ zIndex: 0 }}>
          <Video className="remotion-bg-video" src={outputVideoUrl} />
        </AbsoluteFill>
      ) : null}
      {outputVideoUrl ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 18, 36, 0.45) 0%, rgba(7, 18, 36, 0.65) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ) : null}
      {audioUrl && !outputVideoUrl ? <Audio src={audioUrl} /> : null}

      <PlanOverlayLayer fps={fps} plan={plan} />

      {plan.captions.enabled ? (
        <TranscriptCaptions
          accentColor={accentColor}
          transcriptSource={wordLevelTranscriptSource}
          variant={variant}
        />
      ) : null}
    </AbsoluteFill>
  );
};
