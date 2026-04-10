import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { ComparisonStepColumn } from "../enhancements/ComparisonStepColumn";

export const ComparisonStepColumnPreview: FC = () => (
  <AbsoluteFill>
    <ComparisonStepColumn />
  </AbsoluteFill>
);
