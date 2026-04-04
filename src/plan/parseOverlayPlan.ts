import builtinPlan from "./builtinPlan.json";
import type { OverlayPlan, TimedOverlayId } from "./overlayPlan.types";

export const DEFAULT_PLAN_JSON_STRING = JSON.stringify(builtinPlan);

const TIMED_IDS = new Set<TimedOverlayId>([
  "hero_title_lines",
  "center_title_with_underline",
  "floating_promo_cta",
  "process_checklist",
  "speaker_name_bars",
]);

export function parseOverlayPlanJson(raw: string): OverlayPlan | null {
  if (!raw.trim()) {
    return null;
  }

  try {
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") {
      return null;
    }

    const o = data as Record<string, unknown>;
    if (o.schemaVersion !== "1") {
      return null;
    }

    if (typeof o.totalDurationMs !== "number" || o.totalDurationMs <= 0) {
      return null;
    }

    if (!Array.isArray(o.segments)) {
      return null;
    }

    const segments = o.segments.filter((s) => {
      if (!s || typeof s !== "object") {
        return false;
      }
      const seg = s as Record<string, unknown>;
      return (
        typeof seg.id === "string" &&
        typeof seg.overlayId === "string" &&
        TIMED_IDS.has(seg.overlayId as TimedOverlayId) &&
        typeof seg.startMs === "number" &&
        typeof seg.endMs === "number" &&
        seg.endMs > seg.startMs &&
        seg.props !== null &&
        typeof seg.props === "object"
      );
    }) as OverlayPlan["segments"];

    const cap = o.captions as Record<string, unknown> | undefined;
    const allowed = new Set([
      "tiktok",
      "karaoke",
      "lowerThird",
      "minimal",
    ]);
    const captions =
      cap &&
      typeof cap.enabled === "boolean" &&
      typeof cap.variant === "string" &&
      allowed.has(cap.variant)
        ? {
            enabled: cap.enabled,
            variant: cap.variant as OverlayPlan["captions"]["variant"],
          }
        : { enabled: true, variant: "minimal" as const };

    return {
      schemaVersion: "1",
      totalDurationMs: o.totalDurationMs,
      segments,
      captions,
      rationale: typeof o.rationale === "string" ? o.rationale : undefined,
    };
  } catch {
    return null;
  }
}

export function parseOverlayPlanWithDefault(raw: string): OverlayPlan | null {
  return parseOverlayPlanJson(raw.trim() ? raw : DEFAULT_PLAN_JSON_STRING);
}

export function getPlanDurationMsOr(
  raw: string,
  fallbackMs: number,
): number {
  const plan = parseOverlayPlanWithDefault(raw);
  return plan?.totalDurationMs ?? fallbackMs;
}
