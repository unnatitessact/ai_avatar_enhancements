import { createElement, type ReactNode } from "react";
import { BannerStrip } from "./enhancements/BannerStrip";
import { RibbonBanner } from "./enhancements/RibbonBanner";
import { LowerThird } from "./enhancements/LowerThird";
import { QuoteOverlay } from "./enhancements/QuoteOverlay";
import { TitleCard } from "./enhancements/TitleCard";
import { HeadlineFade } from "./enhancements/HeadlineFade";
import {
  parseBookingCtaHeadlineProps,
  BookingCta,
} from "./enhancements/BookingCta";
import {
  parseProcessChecklistItems,
  ProcessChecklist,
} from "./enhancements/ProcessChecklist";
import { StackedTextOverlay } from "./enhancements/StackedTextOverlay";
import { WordLevelTranscript } from "./enhancements/WordLevelTranscript";
import { DynamicGraph } from "./enhancements/DynamicGraph";
import {
  ComparisonStepColumn,
  parseComparisonStepColumnItems,
} from "./enhancements/ComparisonStepColumn";

function parseDynamicGraphValues(raw: unknown): number[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map((item) => {
      if (typeof item === "number" && Number.isFinite(item)) {
        return item;
      }
      if (item && typeof item === "object" && "value" in item) {
        const n = Number((item as { value: unknown }).value);
        return Number.isFinite(n) ? n : Number.NaN;
      }
      const n = Number(item);
      return Number.isFinite(n) ? n : Number.NaN;
    })
    .filter((n) => Number.isFinite(n));
}

function parseDynamicGraphLabels(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) {
    return undefined;
  }
  const labels = raw.map((l) => String(l ?? ""));
  return labels.length > 0 ? labels : undefined;
}

/** Maps `enhancementId` → component, with JSON `props` normalized per enhancement. */
export type EnhancementRenderer = (
  props: Record<string, unknown>,
) => ReactNode;

export const enhancementRegistry: Record<string, EnhancementRenderer> = {
  TitleCard: (props) =>
    createElement(TitleCard, {
      title: String(props.title ?? ""),
      subtitle:
        props.subtitle !== undefined ? String(props.subtitle) : undefined,
    }),
  LowerThird: (props) =>
    createElement(LowerThird, {
      headline: String(props.headline ?? ""),
      subline:
        props.subline !== undefined ? String(props.subline) : undefined,
    }),
  BannerStrip: (props) =>
    createElement(BannerStrip, {
      text: String(props.text ?? ""),
      label: props.label !== undefined ? String(props.label) : undefined,
      position:
        props.position === "top"
          ? "top"
          : props.position === "bottom"
            ? "bottom"
            : undefined,
    }),
  RibbonBanner: (props) =>
    createElement(RibbonBanner, {
      text: String(props.text ?? ""),
    }),
  QuoteOverlay: (props) =>
    createElement(QuoteOverlay, {
      quote: String(props.quote ?? ""),
      attribution:
        props.attribution !== undefined
          ? String(props.attribution)
          : undefined,
      verticalAlign:
        props.verticalAlign === "bottom" ? "bottom" : undefined,
    }),
  StackedTextOverlay: (props) => {
    const fromArray = Array.isArray(props.lines)
      ? props.lines.map((l) => String(l ?? ""))
      : null;
    const lines =
      fromArray ??
      [props.line1, props.line2, props.line3, props.line4, props.line5]
        .filter((k) => k !== undefined)
        .map((l) => String(l ?? ""));
    const staggerFrames =
      typeof props.staggerFrames === "number" ? props.staggerFrames : undefined;
    const fadeFrames =
      typeof props.fadeFrames === "number" ? props.fadeFrames : undefined;
    return createElement(StackedTextOverlay, {
      lines,
      staggerFrames,
      fadeFrames,
    });
  },
  HeadlineFade: (props) =>
    createElement(HeadlineFade, {
      title: String(props.title ?? ""),
      accentColor:
        props.accentColor !== undefined ? String(props.accentColor) : undefined,
      fadeInFrames:
        typeof props.fadeInFrames === "number" ? props.fadeInFrames : undefined,
    }),
  ProcessChecklist: (props) =>
    createElement(ProcessChecklist, {
      title: props.title !== undefined ? String(props.title) : undefined,
      items: parseProcessChecklistItems(props.items),
      staggerFrames:
        typeof props.staggerFrames === "number"
          ? props.staggerFrames
          : undefined,
      fadeFrames:
        typeof props.fadeFrames === "number" ? props.fadeFrames : undefined,
    }),
  BookingCta: (props) =>
    createElement(BookingCta, {
      headlineLines: parseBookingCtaHeadlineProps(props),
      subtitle:
        props.subtitle !== undefined ? String(props.subtitle) : undefined,
      ctaText:
        props.ctaText !== undefined
          ? String(props.ctaText)
          : props.ctaLabel !== undefined
            ? String(props.ctaLabel)
            : undefined,
      backgroundColor:
        props.backgroundColor !== undefined
          ? String(props.backgroundColor)
          : undefined,
      staggerFrames:
        typeof props.staggerFrames === "number"
          ? props.staggerFrames
          : undefined,
      fadeFrames:
        typeof props.fadeFrames === "number" ? props.fadeFrames : undefined,
    }),
  ComparisonStepColumn: (props) =>
    createElement(ComparisonStepColumn, {
      items: parseComparisonStepColumnItems(props.items),
      staggerFrames:
        typeof props.staggerFrames === "number"
          ? props.staggerFrames
          : undefined,
      fadeFrames:
        typeof props.fadeFrames === "number" ? props.fadeFrames : undefined,
      textColor:
        props.textColor !== undefined ? String(props.textColor) : undefined,
      subtitleColor:
        props.subtitleColor !== undefined
          ? String(props.subtitleColor)
          : undefined,
    }),
  DynamicGraph: (props) =>
    createElement(DynamicGraph, {
      title: props.title !== undefined ? String(props.title) : undefined,
      values: parseDynamicGraphValues(
        props.values ?? props.series ?? props.data,
      ),
      labels: parseDynamicGraphLabels(props.labels),
      lineColor:
        props.lineColor !== undefined ? String(props.lineColor) : undefined,
      accentColor:
        props.accentColor !== undefined
          ? String(props.accentColor)
          : undefined,
      drawFrames:
        typeof props.drawFrames === "number" ? props.drawFrames : undefined,
    }),
  WordLevelTranscript: (props) =>
    createElement(WordLevelTranscript, {
      transcript:
        props.transcript ??
        props.wordLevelTranscript ??
        ("word_level_transcript" in props ? props : undefined),
      combineTokensWithinMilliseconds:
        typeof props.combineTokensWithinMilliseconds === "number"
          ? props.combineTokensWithinMilliseconds
          : undefined,
      timeOffsetSeconds:
        typeof props.timeOffsetSeconds === "number"
          ? props.timeOffsetSeconds
          : undefined,
      accentColor:
        props.accentColor !== undefined ? String(props.accentColor) : undefined,
      textColor:
        props.textColor !== undefined ? String(props.textColor) : undefined,
      inactiveTextColor:
        props.inactiveTextColor !== undefined
          ? String(props.inactiveTextColor)
          : undefined,
      position:
        props.position === "center"
          ? "center"
          : props.position === "bottom"
            ? "bottom"
            : undefined,
    }),
};

export function renderEnhancement(
  enhancementId: string,
  props: Record<string, unknown>,
): ReactNode {
  const render = enhancementRegistry[enhancementId];
  return render ? render(props) : null;
}
