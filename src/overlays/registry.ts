import registryJson from "./registry.json";

/** Single source of truth for overlay metadata (see `registry.json`). */
export const OVERLAY_REGISTRY = registryJson;

export type OverlayRegistryDocument = typeof registryJson;

export type OverlayEntry = (typeof registryJson.overlays)[number];

export type OverlayId = OverlayEntry["id"];

export type ExclusivityGroup = (typeof registryJson.exclusivityGroups)[number];

/** Composition keys referenced by the registry (must stay aligned with `WordToWorkTranscriptProps`). */
export type OverlayCompositionProp =
  | "accentColor"
  | "centerTitleLine1"
  | "centerTitleLine2"
  | "heroLines"
  | "meetYourSpeakerHeader"
  | "processChecklistHeader"
  | "processChecklistItems"
  | "promoCtaBackgroundColor"
  | "promoCtaButtonLabel"
  | "promoCtaSubtitle"
  | "promoCtaTitleLines"
  | "speakerDesignationBar"
  | "speakerNameBar"
  | "transcriptSource"
  | "transcriptVariant";

export function getOverlayById(id: OverlayId): OverlayEntry | undefined {
  return registryJson.overlays.find((o) => o.id === id);
}

export function listOverlayIds(): OverlayId[] {
  return registryJson.overlays.map((o) => o.id);
}
