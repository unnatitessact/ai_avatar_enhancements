import type { PlanCompositionProps } from "./compositionInput.types";

const DEFAULT_W = 1280;
const DEFAULT_H = 720;

/**
 * Computes final width/height for Remotion metadata.
 * - If both `width` and `height` are positive, returns them (rounded).
 * - If `aspectRatio` is `W:H` and exactly one of width/height is positive, derives the other.
 * - Otherwise falls back to 1280×720.
 */
export function resolveCompositionDimensions(
  props: Pick<PlanCompositionProps, "width" | "height" | "aspectRatio">,
): { width: number; height: number } {
  const ar = props.aspectRatio.trim();
  const parts = ar.split(":").map((s) => parseFloat(s.trim()));
  const hasRatio =
    ar.length > 0 &&
    parts.length === 2 &&
    parts.every((n) => Number.isFinite(n) && n > 0);

  const wIn = props.width;
  const hIn = props.height;
  const wPos = Number.isFinite(wIn) && wIn > 0;
  const hPos = Number.isFinite(hIn) && hIn > 0;

  if (wPos && hPos) {
    return { width: Math.round(wIn), height: Math.round(hIn) };
  }

  if (hasRatio) {
    const [rw, rh] = parts;
    if (wPos && !hPos) {
      return {
        width: Math.round(wIn),
        height: Math.round((wIn * rh) / rw),
      };
    }
    if (hPos && !wPos) {
      return {
        width: Math.round((hIn * rw) / rh),
        height: Math.round(hIn),
      };
    }
  }

  if (wPos) {
    return { width: Math.round(wIn), height: DEFAULT_H };
  }
  if (hPos) {
    return { width: DEFAULT_W, height: Math.round(hIn) };
  }

  return { width: DEFAULT_W, height: DEFAULT_H };
}
