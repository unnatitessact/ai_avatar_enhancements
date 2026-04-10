import { Composition, Folder } from "remotion";
import {
  BannerStripPreview,
  BookingCtaPreview,
  HeadlineFadePreview,
  LowerThirdPreview,
  ProcessChecklistPreview,
  QuoteOverlayPreview,
  RibbonBannerPreview,
  TitleCardPreview,
  StackedTextOverlayPreview,
  WordLevelTranscriptPreview,
  DynamicGraphPreview,
} from "./preview-compositions";
import { MainComposition, type MainCompositionProps } from "./Main";

const previewFps = 30;
const previewSize = { width: 1080, height: 1920 } as const;
const previewDurationInFrames = 120;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={MainComposition}
        durationInFrames={100}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={
          {
            videoUrl:
              "https://media-uploads-tessact.s3.ap-south-1.amazonaws.com/30b76c0d-7061-430a-b99f-e2e4f95497db/68b8c89b-7866-4938-885c-9ff1f56cd2f6/68b8c89b-7866-4938-885c-9ff1f56cd2f6.mov",
            enhancements: [],
            videoDetails: {
              width: 1080,
              height: 1920,
              duration: 28,
            },
          } satisfies MainCompositionProps
        }
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.videoDetails.duration * 30),
        })}
      />
      <Folder name="Preview">
        <Composition
          id="PreviewTitleCard"
          component={TitleCardPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewLowerThird"
          component={LowerThirdPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewBannerStrip"
          component={BannerStripPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewRibbonBanner"
          component={RibbonBannerPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewQuoteOverlay"
          component={QuoteOverlayPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewStackedTextOverlay"
          component={StackedTextOverlayPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewHeadlineFade"
          component={HeadlineFadePreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewProcessChecklist"
          component={ProcessChecklistPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewBookingCta"
          component={BookingCtaPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewWordLevelTranscript"
          component={WordLevelTranscriptPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
        <Composition
          id="PreviewDynamicGraph"
          component={DynamicGraphPreview}
          durationInFrames={previewDurationInFrames}
          fps={previewFps}
          {...previewSize}
        />
      </Folder>
    </>
  );
};
