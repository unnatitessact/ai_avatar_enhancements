export interface Enhancement {
  enhancementId: string;
  /** Seconds from composition start */
  inTime: number;
  /** Seconds from composition start */
  outTime: number;
  props?: Record<string, unknown>;
}