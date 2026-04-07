import type { FC } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { StackedTextOverlay } from "../enhancements/StackedTextOverlay";

export const StackedTextOverlayPreview: FC = () => (
  <AbsoluteFill>
    <Img
      src={staticFile("triple-text-preview-bg.png")}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <StackedTextOverlay
      lines={[
        "Mindful Eating",
        "Daily Routines",
        "Living in Tune with Nature",
      ]}
    />
  </AbsoluteFill>
);
