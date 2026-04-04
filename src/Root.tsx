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
import { remotionDemoVideo } from "../videos";

const defaultProps = {
  accentColor: "#F6C453",
  audioUrl: remotionDemoVideo.output_video_url
    ? null
    : remotionDemoVideo.audio_url,
  kicker: "Word To Work",
  outputVideoUrl: remotionDemoVideo.output_video_url,
  speaker: "Strategy Transcript",
  title: "Turn Spoken Ideas Into Shared Action",
  transcriptSource: remotionDemoVideo.transcription_file_url,
  transcriptVariant: "minimal",
} satisfies WordToWorkTranscriptProps;

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
    </>
  );
};
