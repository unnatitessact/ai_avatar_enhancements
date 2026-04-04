import { AbsoluteFill, Audio, Video } from "remotion";
import { TranscriptCaptions } from "./TranscriptCaptions";
import type { TranscriptVariant } from "./transcriptTypes";

export type { TranscriptVariant };

const FONT_FAMILY = "'Avenir Next', 'Trebuchet MS', sans-serif";

export type WordToWorkTranscriptProps = {
  accentColor: string;
  audioUrl: string | null;
  kicker: string;
  outputVideoUrl: string | null;
  speaker: string;
  title: string;
  /** Remote `https://` URL or public folder path (e.g. `file.json`). Loaded at runtime; `word_level_transcript` is parsed. */
  transcriptSource: string;
  transcriptVariant: TranscriptVariant;
};

export const WordToWorkTranscript: React.FC<WordToWorkTranscriptProps> = ({
  accentColor,
  audioUrl,
  outputVideoUrl,
  transcriptSource,
  transcriptVariant,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: outputVideoUrl
          ? "#071224"
          : "radial-gradient(circle at top left, #24476D 0%, #10213D 42%, #071224 100%)",
        color: "white",
        fontFamily: FONT_FAMILY,
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
              "linear-gradient(180deg, rgba(7, 18, 36, 0.55) 0%, rgba(7, 18, 36, 0.72) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ) : null}
      {audioUrl && !outputVideoUrl ? <Audio src={audioUrl} /> : null}

      <TranscriptCaptions
        accentColor={accentColor}
        transcriptSource={transcriptSource}
        variant={transcriptVariant}
      />
    </AbsoluteFill>
  );
};
