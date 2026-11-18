import { useId } from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, ease, expoOut } from "./brand";

/**
 * The look shared by DoliumOutro and RitualReel: film grain, soft mist and steam on the `night` background.
 */

/** `night` (#121019) with an alpha, for gradients. */
export const night = (alpha: number) => `rgba(18, 16, 25, ${alpha})`;

/** Fades in while it comes into focus and settles. */
export const focusIn = (
  frame: number,
  start: number,
  blur: number,
  rise: number,
) => ({
  opacity: interpolate(frame, [start, start + 22], [0, 1], {
    ...clamp,
    easing: ease,
  }),
  filter: `blur(${interpolate(frame, [start, start + 30], [blur, 0], {
    ...clamp,
    easing: expoOut,
  })}px)`,
  translate: interpolate(
    frame,
    [start, start + 30],
    [`0px ${rise}px`, "0px 0px"],
    { ...clamp, easing: expoOut },
  ),
});

/** Fine moving film grain over everything. */
export const Grain = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  // Two scenes overlap during a transition, so each needs its own filter id.
  const id = `grain-${useId().replace(/:/g, "")}`;

  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.09 }}>
      <svg width={width} height={height}>
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={frame}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Soft banks of mist rising slowly through the frame. */
const MIST = [
  { x: 120, y: 1700, width: 1100, height: 620, speed: 260, phase: 0 },
  { x: 760, y: 1500, width: 1200, height: 700, speed: 220, phase: 1.9 },
  { x: 380, y: 1150, width: 1000, height: 560, speed: 300, phase: 3.1 },
  { x: 900, y: 900, width: 900, height: 520, speed: 240, phase: 4.4 },
  { x: 60, y: 700, width: 900, height: 500, speed: 200, phase: 5.2 },
] as const;

export const Mist = ({ opacity = 1 }: { readonly opacity?: number }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity }}>
      {MIST.map((bank) => (
        <div
          key={bank.phase}
          style={{
            position: "absolute",
            left: bank.x - bank.width / 2,
            top: bank.y - bank.height / 2,
            width: bank.width,
            height: bank.height,
            backgroundImage:
              "radial-gradient(closest-side, rgba(236, 239, 249, 0.16), rgba(236, 239, 249, 0))",
            opacity: interpolate(frame, [0, 24], [0, 1], clamp),
            translate: `${Math.sin((frame / fps) * 0.9 + bank.phase) * 50}px ${-t * bank.speed}px`,
            scale: 1 + t * 0.25,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/**
 * Puffs of steam rising from a line (x to x + width at height y, in the parent's pixels).
 * Each puff swells as it rises and thins out; `peak` is the opacity at its densest.
 */
export const Steam = ({
  seed,
  x,
  y,
  width,
  count,
  start,
  every,
  life,
  rise,
  size,
  peak,
}: {
  readonly seed: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly count: number;
  /** Frame the first puff appears, and frames between puffs. */
  readonly start: number;
  readonly every: number;
  /** Frames each puff lives, and how far it rises in that time. */
  readonly life: number;
  readonly rise: number;
  readonly size: number;
  readonly peak: number;
}) => {
  const frame = useCurrentFrame();

  return (
    // Plain white over the picture: screen blending all but vanishes over pale stone and sky.
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, index) => {
        const born = start + index * every;
        const age = (frame - born) / life;
        if (age < 0 || age > 1) {
          return null;
        }
        const offset = random(`${seed}-x-${index}`);
        const drift = (random(`${seed}-d-${index}`) - 0.5) * size * 0.6;
        const grow = size * (0.45 + age * 0.9);
        const opacity = interpolate(age, [0, 0.2, 0.55, 1], [0, peak, peak * 0.7, 0], {
          easing: ease,
        });
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x + offset * width - grow / 2 + drift * age,
              top: y - age * rise - grow * 0.35,
              width: grow,
              height: grow * 0.7,
              opacity,
              backgroundImage:
                "radial-gradient(closest-side, rgba(244, 245, 250, 0.9), rgba(244, 245, 250, 0.35) 45%, rgba(244, 245, 250, 0))",
              filter: `blur(${10 + age * 18}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
