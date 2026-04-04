import type { TimedOverlayId } from "./overlayPlan.types";

/** Must stay aligned with static composition stacking. */
export const zIndexForOverlay = (id: TimedOverlayId): number => {
  switch (id) {
    case "hero_title_lines":
    case "center_title_with_underline":
      return 2;
    case "process_checklist":
      return 2;
    case "floating_promo_cta":
      return 3;
    case "speaker_name_bars":
      return 5;
    default:
      return 2;
  }
};
