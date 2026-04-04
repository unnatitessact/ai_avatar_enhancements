import { Sequence } from "remotion";
import { CenterTitleWithUnderline } from "../overlays/CenterTitleWithUnderline";
import { FloatingPromoCta } from "../overlays/FloatingPromoCta";
import { HeroTitleLines } from "../overlays/HeroTitleLines";
import type { ProcessChecklistItem } from "../overlays/ProcessChecklist";
import { ProcessChecklist } from "../overlays/ProcessChecklist";
import { SpeakerNameBars } from "../overlays/SpeakerNameBars";
import type { OverlayPlan } from "./overlayPlan.types";
import { zIndexForOverlay } from "./segmentZIndex";

type PlanOverlayLayerProps = {
  plan: OverlayPlan;
  fps: number;
};

export const PlanOverlayLayer: React.FC<PlanOverlayLayerProps> = ({
  plan,
  fps,
}) => {
  const sorted = [...plan.segments].sort((a, b) => a.startMs - b.startMs);

  return (
    <>
      {sorted.map((seg) => {
        const from = Math.max(0, Math.floor((seg.startMs / 1000) * fps));
        const endFrame = Math.ceil((seg.endMs / 1000) * fps);
        const durationInFrames = Math.max(1, endFrame - from);
        const z = zIndexForOverlay(seg.overlayId);
        const p = seg.props;

        switch (seg.overlayId) {
          case "hero_title_lines":
            return (
              <Sequence
                key={seg.id}
                from={from}
                durationInFrames={durationInFrames}
              >
                <HeroTitleLines
                  lines={(p.heroLines as string[]) ?? []}
                  style={{ zIndex: z }}
                />
              </Sequence>
            );
          case "center_title_with_underline":
            return (
              <Sequence
                key={seg.id}
                from={from}
                durationInFrames={durationInFrames}
              >
                <CenterTitleWithUnderline
                  line1={String(p.centerTitleLine1 ?? "")}
                  line2={String(p.centerTitleLine2 ?? "")}
                  style={{ zIndex: z }}
                />
              </Sequence>
            );
          case "floating_promo_cta":
            return (
              <Sequence
                key={seg.id}
                from={from}
                durationInFrames={durationInFrames}
              >
                <FloatingPromoCta
                  backgroundColor={String(p.promoCtaBackgroundColor ?? "#0066cc")}
                  buttonLabel={String(p.promoCtaButtonLabel ?? "")}
                  subtitle={String(p.promoCtaSubtitle ?? "")}
                  titleLines={(p.promoCtaTitleLines as string[]) ?? []}
                  style={{ zIndex: z }}
                />
              </Sequence>
            );
          case "process_checklist":
            return (
              <Sequence
                key={seg.id}
                from={from}
                durationInFrames={durationInFrames}
              >
                <ProcessChecklist
                  header={String(p.processChecklistHeader ?? "")}
                  items={
                    (p.processChecklistItems as ProcessChecklistItem[]) ?? []
                  }
                  style={{ zIndex: z }}
                />
              </Sequence>
            );
          case "speaker_name_bars":
            return (
              <Sequence
                key={seg.id}
                from={from}
                durationInFrames={durationInFrames}
              >
                <SpeakerNameBars
                  meetHeader={String(p.meetYourSpeakerHeader ?? "")}
                  speakerDesignation={String(p.speakerDesignationBar ?? "")}
                  speakerName={String(p.speakerNameBar ?? "")}
                  style={{ zIndex: z }}
                />
              </Sequence>
            );
          default:
            return null;
        }
      })}
    </>
  );
};
