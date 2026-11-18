import { random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Falling snow over the whole frame. Flakes are placed with Remotion's seeded `random()`, so every render
 * matches; bigger flakes fall faster, and each sways gently. In a still, frame 0 is a frozen snowfall.
 */
export const Snow = ({
  count = 90,
  speed = 1,
  seed = "kfx-snow",
  opacity = 0.85,
}: {
  readonly count?: number;
  /** Fall speed multiplier. */
  readonly speed?: number;
  readonly seed?: string;
  readonly opacity?: number;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {Array.from({ length: count }, (_, i) => {
        const size = random(`${seed}-size-${i}`);
        const r = 2.5 + size * 7;
        const fall = (1.2 + size * 3.2) * speed;
        const span = height + 40;
        const y = ((random(`${seed}-y-${i}`) * span + frame * fall) % span) - 20;
        const sway =
          Math.sin(frame / (22 + random(`${seed}-w-${i}`) * 20) + i) *
          (6 + size * 12);
        const x = random(`${seed}-x-${i}`) * width + sway;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="#ffffff"
            opacity={opacity * (0.35 + size * 0.65)}
          />
        );
      })}
    </svg>
  );
};
