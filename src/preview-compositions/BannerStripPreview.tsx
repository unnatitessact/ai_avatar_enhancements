import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { BannerStrip } from "../enhancements/BannerStrip";
import { PreviewBackground } from "./PreviewBackground";

export const BannerStripPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <BannerStrip
      label="Update"
      text="New episodes drop every Tuesday — subscribe so you do not miss a beat."
      position="bottom"
    />
  </AbsoluteFill>
);
