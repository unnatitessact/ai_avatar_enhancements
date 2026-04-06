import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { TitleCard } from "../enhancements/TitleCard";
import { PreviewBackground } from "./PreviewBackground";

export const TitleCardPreview: FC = () => (
  <AbsoluteFill>
    <PreviewBackground />
    <TitleCard
      title="Owning a Cafe: From Comfort to Regulars"
      subtitle="Creating the right vibe, experience, and approach"
    />
  </AbsoluteFill>
);
