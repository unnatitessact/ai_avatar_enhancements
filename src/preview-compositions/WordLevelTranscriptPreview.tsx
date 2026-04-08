import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import sampleTranscript from "../../sample_word_level_transcript.json";
import { WordLevelTranscript } from "../enhancements/WordLevelTranscript";
import { PreviewBackground } from "./PreviewBackground";

export const WordLevelTranscriptPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <WordLevelTranscript
      transcript={sampleTranscript}
      combineTokensWithinMilliseconds={1150}
      accentColor="#facc15"
      position="bottom"
    />
  </AbsoluteFill>
);
