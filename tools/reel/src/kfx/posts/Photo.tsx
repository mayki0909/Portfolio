import type { CSSProperties } from "react";
import { Img } from "remotion";

/**
 * A landscape website photo shown at `height` px tall, starting `cropX` source pixels in from its left edge,
 * with a gradient into `fadeTo` along its bottom so text can sit underneath.
 */
export const CroppedPhoto = ({
  src,
  sourceWidth,
  sourceHeight,
  cropX,
  height,
  fadeTo,
  fadeFrom = 0.55,
  topShade = 0,
  style,
}: {
  readonly src: string;
  readonly sourceWidth: number;
  readonly sourceHeight: number;
  /** Source pixels hidden off the left edge. */
  readonly cropX: number;
  readonly height: number;
  /** Background colour the photo fades into. */
  readonly fadeTo: string;
  /** Where the fade starts, 0–1 down the photo. */
  readonly fadeFrom?: number;
  /** Darkening at the very top, 0–1. */
  readonly topShade?: number;
  readonly style?: CSSProperties;
}) => {
  const scale = height / sourceHeight;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      <Img
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: -cropX * scale,
          width: sourceWidth * scale,
          height,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,${topShade}) 0%, rgba(0,0,0,0) 20%, transparent ${fadeFrom * 100}%, ${fadeTo} 100%)`,
        }}
      />
    </div>
  );
};
