import { useEffect, useState } from "react";
import type { Caption, TikTokPage } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import {
  KaraokeCaptionPage,
  LowerThirdCaptionPage,
  MinimalCaptionPage,
  TikTokCaptionPage,
} from "./TranscriptCaptionPages";
import {
  alignmentJsonToCaptions,
  type TranscriptAlignmentFile,
} from "./lib/transcriptAlignment";
import type { TranscriptVariant } from "./transcriptTypes";

const DEFAULT_PAGE_WINDOW_MS = 1300;

export type TranscriptCaptionsProps = {
  accentColor: string;
  /** Milliseconds to combine tokens into one on-screen page. */
  combineTokensWithinMilliseconds?: number;
  transcriptSource: string;
  variant: TranscriptVariant;
};

const isRemoteUrl = (value: string) => /^https?:\/\//i.test(value.trim());

const variantToPage: Record<
  TranscriptVariant,
  React.FC<{ accentColor: string; page: TikTokPage }>
> = {
  tiktok: TikTokCaptionPage,
  karaoke: KaraokeCaptionPage,
  lowerThird: LowerThirdCaptionPage,
  minimal: MinimalCaptionPage,
};

export const TranscriptCaptions: React.FC<TranscriptCaptionsProps> = ({
  accentColor,
  combineTokensWithinMilliseconds = DEFAULT_PAGE_WINDOW_MS,
  transcriptSource,
  variant,
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { fps, durationInFrames } = useVideoConfig();
  const { cancelRender, continueRender, delayRender } = useDelayRender();
  const [handle] = useState(() =>
    delayRender("Loading transcript alignment"),
  );

  useEffect(() => {
    let isMounted = true;
    const url = isRemoteUrl(transcriptSource)
      ? transcriptSource.trim()
      : staticFile(transcriptSource.replace(/^\//, ""));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load transcript from ${transcriptSource}`);
        }

        return response.json() as Promise<TranscriptAlignmentFile>;
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        const next = alignmentJsonToCaptions(data);
        if (next.length === 0) {
          throw new Error(
            "Transcript file has no word_level_transcript words",
          );
        }

        setCaptions(next);
        continueRender(handle);
      })
      .catch((error: unknown) => {
        const captionError =
          error instanceof Error ? error : new Error("Unknown transcript error");

        cancelRender(captionError);
      });

    return () => {
      isMounted = false;
    };
  }, [cancelRender, continueRender, handle, transcriptSource]);

  if (!captions) {
    return null;
  }

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: combineTokensWithinMilliseconds,
  });

  const CaptionPage = variantToPage[variant];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 2 }}>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.floor((page.startMs / 1000) * fps);
        const idealEndFrame = Math.ceil(
          ((page.startMs + page.durationMs) / 1000) * fps,
        );
        const nextStartFrame = nextPage
          ? Math.floor((nextPage.startMs / 1000) * fps)
          : durationInFrames;
        const endFrame = Math.min(
          nextStartFrame,
          idealEndFrame,
          durationInFrames,
        );
        const pageDuration = Math.max(1, endFrame - startFrame);

        return (
          <Sequence
            key={page.startMs}
            from={startFrame}
            durationInFrames={pageDuration}
          >
            <CaptionPage accentColor={accentColor} page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
