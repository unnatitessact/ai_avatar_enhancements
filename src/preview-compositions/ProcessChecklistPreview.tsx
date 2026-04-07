import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { ProcessChecklist } from "../enhancements/ProcessChecklist";

export const ProcessChecklistPreview: FC = () => (
  <AbsoluteFill>
    <ProcessChecklist />
  </AbsoluteFill>
);
