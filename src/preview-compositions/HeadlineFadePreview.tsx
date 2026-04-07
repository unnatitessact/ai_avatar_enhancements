import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { HeadlineFade } from "../enhancements/HeadlineFade";
import { PreviewBackground } from "./PreviewBackground";

export const HeadlineFadePreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <HeadlineFade title="Dreaming of studying abroad?" />
  </AbsoluteFill>
);
