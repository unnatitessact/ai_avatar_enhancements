import { AbsoluteFill, Audio, Video } from "remotion";
import { CenterTitleWithUnderline } from "./overlays/CenterTitleWithUnderline";
import { FloatingPromoCta } from "./overlays/FloatingPromoCta";
import { HeroTitleLines } from "./overlays/HeroTitleLines";
import { ProcessChecklist } from "./overlays/ProcessChecklist";
import type { ProcessChecklistItem } from "./overlays/ProcessChecklist";
import { SpeakerNameBars } from "./overlays/SpeakerNameBars";
import { TranscriptCaptions } from "./TranscriptCaptions";
import type { TranscriptVariant } from "./transcriptTypes";

export type { ProcessChecklistItem } from "./overlays/ProcessChecklist";
export type { TranscriptVariant } from "./transcriptTypes";

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
  /** Center hero titles (stacked serif lines). Omit or use `[]` to hide. */
  heroLines: string[];
  /** Bold two-line title with accent underline under line 2. Leave both empty to hide. */
  centerTitleLine1: string;
  centerTitleLine2: string;
  /** Solid promo card (headline + subtitle + pill button). Hide by clearing all three content fields. */
  promoCtaBackgroundColor: string;
  promoCtaButtonLabel: string;
  promoCtaSubtitle: string;
  promoCtaTitleLines: string[];
  /** Process steps checklist (left-aligned timeline). Empty `items` hides it. */
  processChecklistHeader: string;
  processChecklistItems: ProcessChecklistItem[];
  /** Top “meet your speaker” line; empty hides. */
  meetYourSpeakerHeader: string;
  /** Lower-left white bar — name. */
  speakerNameBar: string;
  /** Lower-left white bar — role / designation (animates after name). */
  speakerDesignationBar: string;
};

export const WordToWorkTranscript: React.FC<WordToWorkTranscriptProps> = ({
  accentColor,
  audioUrl,
  centerTitleLine1,
  centerTitleLine2,
  heroLines,
  outputVideoUrl,
  promoCtaBackgroundColor,
  promoCtaButtonLabel,
  promoCtaSubtitle,
  promoCtaTitleLines,
  processChecklistHeader,
  processChecklistItems,
  meetYourSpeakerHeader,
  speakerNameBar,
  speakerDesignationBar,
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

      {heroLines.length > 0 ? (
        <HeroTitleLines lines={heroLines} style={{ zIndex: 2 }} />
      ) : null}

      {centerTitleLine1.trim() || centerTitleLine2.trim() ? (
        <CenterTitleWithUnderline
          line1={centerTitleLine1}
          line2={centerTitleLine2}
          style={{ zIndex: 2 }}
        />
      ) : null}

      {promoCtaTitleLines.length > 0 ||
      promoCtaSubtitle.trim() ||
      promoCtaButtonLabel.trim() ? (
        <FloatingPromoCta
          backgroundColor={promoCtaBackgroundColor}
          buttonLabel={promoCtaButtonLabel}
          subtitle={promoCtaSubtitle}
          titleLines={promoCtaTitleLines}
          style={{ zIndex: 3 }}
        />
      ) : null}

      {processChecklistItems.length > 0 ? (
        <ProcessChecklist
          header={processChecklistHeader}
          items={processChecklistItems}
          style={{ zIndex: 2 }}
        />
      ) : null}

      {meetYourSpeakerHeader.trim() ||
      speakerNameBar.trim() ||
      speakerDesignationBar.trim() ? (
        <SpeakerNameBars
          meetHeader={meetYourSpeakerHeader}
          speakerDesignation={speakerDesignationBar}
          speakerName={speakerNameBar}
          style={{ zIndex: 5 }}
        />
      ) : null}

      <TranscriptCaptions
        accentColor={accentColor}
        transcriptSource={transcriptSource}
        variant={transcriptVariant}
      />
    </AbsoluteFill>
  );
};
