import { createElement, type ReactNode } from "react";
import { BannerStrip } from "./enhancements/BannerStrip";
import { LowerThird } from "./enhancements/LowerThird";
import { QuoteOverlay } from "./enhancements/QuoteOverlay";
import { TitleCard } from "./enhancements/TitleCard";

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
  QuoteOverlay: (props) =>
    createElement(QuoteOverlay, {
      quote: String(props.quote ?? ""),
      attribution:
        props.attribution !== undefined
          ? String(props.attribution)
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
