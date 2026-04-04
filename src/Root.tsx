import "./index.css";
import { Composition } from "remotion";
import {
  WordToWorkTranscript,
  type WordToWorkTranscriptProps,
} from "./Composition";
import {
  alignmentJsonToCaptions,
  getLastCaptionEndMs,
  type TranscriptAlignmentFile,
} from "./lib/transcriptAlignment";
import { getPlanDurationMsOr } from "./plan/parseOverlayPlan";
import { resolveCompositionDimensions } from "./plan/resolveCompositionDimensions";
import { PlanComposition } from "./PlanComposition";
import type { PlanCompositionProps } from "./plan/compositionInput.types";
import projectData from "../data.json";
import generatedOverlayPlan from "../public/overlay-plan.json";
import { remotionDemoVideo } from "../videos";

const defaultProps = {
  accentColor: "#F6C453",
  audioUrl: remotionDemoVideo.output_video_url
    ? null
    : remotionDemoVideo.audio_url,
  centerTitleLine1: "",
  centerTitleLine2: "",
  heroLines: [],
  promoCtaBackgroundColor: "#0066cc",
  promoCtaButtonLabel: "",
  promoCtaSubtitle: "",
  promoCtaTitleLines: [] as string[],
  processChecklistHeader: "OUR PROCESS",
  processChecklistItems: [] as WordToWorkTranscriptProps["processChecklistItems"],
  meetYourSpeakerHeader: "MEET YOUR SPEAKER",
  speakerNameBar: "Jeremy Blank",
  speakerDesignationBar: "Director of Global Admissions",
  kicker: "Word To Work",
  outputVideoUrl: remotionDemoVideo.output_video_url,
  speaker: "Strategy Transcript",
  title: "Turn Spoken Ideas Into Shared Action",
  transcriptSource: remotionDemoVideo.transcription_file_url,
  transcriptVariant: "minimal",
} satisfies WordToWorkTranscriptProps;

const planDefaults = {
  accentColor: "#F6C453",
  aspectRatio: "16:9",
  audioUrl: projectData.output_video_url ? null : projectData.audio_url,
  height: 720,
  outputVideoUrl: projectData.output_video_url,
  overlayPlanJson: JSON.stringify(generatedOverlayPlan),
  storyboardJson: JSON.stringify(projectData.storyboards),
  wordLevelTranscriptSource: projectData.transcription_file_url,
  width: 1280,
} satisfies PlanCompositionProps;

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WordToWorkTranscript"
        component={WordToWorkTranscript}
        defaultProps={defaultProps}
        fps={FPS}
        width={1280}
        height={720}
        durationInFrames={600}
        calculateMetadata={async ({ props }) => {
          const src = props.transcriptSource.trim();
          if (!/^https?:\/\//i.test(src)) {
            return {
              durationInFrames: Math.ceil((18460 / 1000) * FPS) + 1,
            };
          }

          const response = await fetch(src);
          if (!response.ok) {
            return {};
          }

          const json = (await response.json()) as TranscriptAlignmentFile;
          const captions = alignmentJsonToCaptions(json);
          const lastMs = getLastCaptionEndMs(captions);

          return {
            durationInFrames: Math.ceil((lastMs / 1000) * FPS) + 1,
          };
        }}
      />

      <Composition
        id="PlanDrivenVideo"
        component={PlanComposition}
        defaultProps={planDefaults}
        fps={FPS}
        width={1280}
        height={720}
        durationInFrames={600}
        calculateMetadata={async ({ props }) => {
          const { width, height } = resolveCompositionDimensions(props);
          const planMs = getPlanDurationMsOr(props.overlayPlanJson, 18460);
          const src = props.wordLevelTranscriptSource.trim();
          if (!/^https?:\/\//i.test(src)) {
            return {
              width,
              height,
              durationInFrames: Math.ceil((planMs / 1000) * FPS) + 1,
            };
          }

          const response = await fetch(src);
          if (!response.ok) {
            return {
              width,
              height,
              durationInFrames: Math.ceil((planMs / 1000) * FPS) + 1,
            };
          }

          const json = (await response.json()) as TranscriptAlignmentFile;
          const captions = alignmentJsonToCaptions(json);
          const lastMs = getLastCaptionEndMs(captions);
          const combined = Math.max(planMs, lastMs);

          return {
            width,
            height,
            durationInFrames: Math.ceil((combined / 1000) * FPS) + 1,
          };
        }}
      />
    </>
  );
};
