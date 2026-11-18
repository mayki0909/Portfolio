import type { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, ease, expoOut, LOGO_SLANT } from "./brand";
import { BASELINE, CRIMSON, LOGO_VIEWBOX, X_CORNER } from "./logoPaths";

/**
 * The KFX stings' "ride in": something comes in from the left at speed, leaning forward with crimson speed
 * lines behind it, and brakes into place with a slight overshoot. Shared by KfxIntro and KfxOutroRide.
 */

/** Logo width in the stings; leaves room for the spark off the X's top-right corner. */
export const LOGO_WIDTH = 820;
export const LOGO_HEIGHT =
  (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;
/** Pixels per logo unit. */
export const UNIT = LOGO_WIDTH / LOGO_VIEWBOX.width;

const RIDE_SPRING = { damping: 15, stiffness: 110, mass: 0.9 } as const;

const progressAt = (frame: number, fps: number) =>
  spring({ frame, fps, config: RIDE_SPRING });

/** Largest per-frame step of the ride, so speed can be expressed as 0–1. */
const peakStep = (fps: number) => {
  let peak = 0;
  for (let f = 1; f < fps * 2; f++) {
    peak = Math.max(peak, progressAt(f, fps) - progressAt(f - 1, fps));
  }
  return peak;
};

/**
 * Where a ride that starts at `start` is, `distance` units left of its place, and how fast it's going:
 * `speed` is 1 at its fastest and dips below 0 as it brakes past its mark.
 */
export const useRide = (start: number, distance: number) => {
  const frame = useCurrentFrame() - start;
  const { fps } = useVideoConfig();
  const progress = progressAt(frame, fps);
  const speed = (progress - progressAt(frame - 1, fps)) / peakStep(fps);
  return {
    x: -distance * (1 - progress),
    speed,
    // Leans forward at speed and rocks back a touch as it brakes past its mark.
    lean: interpolate(speed, [-0.3, 0, 1], [-4, 0, 16], clamp),
    trail: Math.max(0, speed),
  };
};

/** Speed lines behind the logo, in logo units: height, full length, thickness, opacity. */
const TRAILS = [
  { y: 10, length: 260, width: 4, opacity: 0.9 },
  { y: 25, length: 170, width: 2.5, opacity: 0.45 },
  { y: 41, length: 330, width: 5, opacity: 1 },
  { y: 57, length: 200, width: 3, opacity: 0.55 },
  { y: 72, length: 290, width: 4, opacity: 0.8 },
  { y: 88, length: 150, width: 2.5, opacity: 0.4 },
] as const;

/** Distance from the logo's left edge (the K's slanted stem) at height y, so trails start just behind it. */
const kLeft = (y: number) => LOGO_SLANT * (BASELINE - y);

/**
 * Rides its children (logo paths, in logo units) in from 560 units left, from frame `start`.
 * Must sit inside an SVG with the logo's viewBox.
 */
export const RidingLogo = ({
  start = 0,
  children,
}: {
  readonly start?: number;
  readonly children: ReactNode;
}) => {
  const { x, lean, trail } = useRide(start, 560);

  return (
    <g
      transform={`translate(${x} 0) translate(0 ${BASELINE}) skewX(${-lean}) translate(0 ${-BASELINE})`}
    >
      {TRAILS.map((line) => {
        const end = kLeft(line.y) - 10;
        return (
          <line
            key={line.y}
            x1={end - line.length * trail}
            y1={line.y}
            x2={end}
            y2={line.y}
            stroke={CRIMSON}
            strokeWidth={line.width}
            strokeLinecap="round"
            opacity={line.opacity * Math.min(1, trail * 3)}
          />
        );
      })}
      {children}
    </g>
  );
};

/** Three short strokes off the X's top-right corner at frame `at`, as in the Kranfix stings. */
export const Spark = ({ at }: { readonly at: number }) => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [at + 1, at + 9], [0, 1], {
    ...clamp,
    easing: expoOut,
  });
  const tail = interpolate(frame, [at + 5, at + 15], [0, 1], {
    ...clamp,
    easing: ease,
  });

  if (frame < at + 1 || frame > at + 15) {
    return null;
  }

  return (
    <g transform={`translate(${X_CORNER.x + 4} ${X_CORNER.y - 4})`}>
      {[18, 45, 72].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const from = 13 + tail * 45;
        const to = 13 + head * 45;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * from}
            y1={-Math.sin(rad) * from}
            x2={Math.cos(rad) * to}
            y2={-Math.sin(rad) * to}
            stroke={CRIMSON}
            strokeWidth={10 / UNIT}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};
