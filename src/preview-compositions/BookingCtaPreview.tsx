import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { BookingCta } from "../enhancements/BookingCta";

export const BookingCtaPreview: FC = () => (
  <AbsoluteFill>
    <BookingCta />
  </AbsoluteFill>
);
