import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../enhancements/LowerThird";
import { PreviewBackground } from "./PreviewBackground";

export const LowerThirdPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <LowerThird
      headline="Alex Rivera"
      subline="Head of Product · Northwind"
    />
  </AbsoluteFill>
);
