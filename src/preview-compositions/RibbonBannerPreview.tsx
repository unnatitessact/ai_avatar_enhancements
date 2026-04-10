import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { RibbonBanner } from "../enhancements/RibbonBanner";
import { PreviewBackground } from "./PreviewBackground";

export const RibbonBannerPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <RibbonBanner text="Product strategy" />
  </AbsoluteFill>
);
