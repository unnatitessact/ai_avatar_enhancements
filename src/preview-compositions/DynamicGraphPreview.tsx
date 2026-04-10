import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { DynamicGraph } from "../enhancements/DynamicGraph";
import { PreviewBackground } from "./PreviewBackground";

export const DynamicGraphPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <DynamicGraph
      title="Weekly active users"
      values={[1200, 1450, 1380, 1620, 1890, 2100, 1980, 2340]}
      labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]}
      lineColor="#38bdf8"
      accentColor="rgba(56, 189, 248, 0.5)"
    />
  </AbsoluteFill>
);
