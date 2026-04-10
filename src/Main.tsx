import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { renderEnhancement } from "./registry";
import type { Enhancement } from "./types/enhancements";

export type MainCompositionProps = {
  videoUrl: string;
  enhancements: Enhancement[];
  videoDetails: {
    width: number;
    height: number;
    duration: number;
  }
};

function enhancementToSequenceTiming(
  enhancement: Enhancement,
  fps: number,
): { from: number; durationInFrames: number } | null {
  const span = enhancement.outTime - enhancement.inTime;
  if (!Number.isFinite(span) || span <= 0) {
    return null;
  }
  const from = Math.max(0, Math.round(enhancement.inTime * fps));
  const durationInFrames = Math.max(1, Math.round(span * fps));
  return { from, durationInFrames };
}

const EnhancementItem: React.FC<{ enhancement: Enhancement }> = ({
  enhancement,
}) =>
  renderEnhancement(enhancement.enhancementId, enhancement.props ?? {});

export const MainComposition: React.FC<MainCompositionProps> = ({
  videoUrl,
  enhancements,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Video
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
     
      {enhancements.map((enhancement, index) => {
        const timing = enhancementToSequenceTiming(enhancement, fps);
        if (!timing) {
          return null;
        }
        const { from, durationInFrames } = timing;
        return (
          <Sequence
            key={`${enhancement.enhancementId}-${index}`}
            from={from}
            durationInFrames={durationInFrames}
            layout="none"
          >
            <EnhancementItem enhancement={enhancement} />
          </Sequence>
        );
      })}

    
    </AbsoluteFill>
  );
};
