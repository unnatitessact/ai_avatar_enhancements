import type { FC } from "react";
import { AbsoluteFill } from "remotion";

/** Neutral stand-in “scene” behind overlays in preview compositions. */
export const PreviewBackground: FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(168deg, #0c1222 0%, #1a1f35 38%, #2d1f4a 72%, #0f172a 100%)",
    }}
  />
);
