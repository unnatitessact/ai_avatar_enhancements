import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { QuoteOverlay } from "../enhancements/QuoteOverlay";
import { PreviewBackground } from "./PreviewBackground";

export const QuoteOverlayPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <QuoteOverlay
      quote="Clarity beats cleverness every time your audience is deciding whether to stay."
      attribution="Pat Smith"
    />
  </AbsoluteFill>
);
