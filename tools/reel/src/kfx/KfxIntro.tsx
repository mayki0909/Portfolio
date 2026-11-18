import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  spring,
  Track,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, ease, expoOut, inter, kfx } from "./brand";
import { BLACK, CRIMSON, kf, LOGO_VIEWBOX, xBlade, xLock } from "./logoPaths";
import { LOGO_HEIGHT, LOGO_WIDTH, RidingLogo, Spark } from "./ride";

/** The X's long blade slashes in from its top-right corner down to the tail. */
const BLADE = [11, 17] as const;
/** The other half of the X springs in from the right and locks into the blade. */
const LOCK_START = 14;
const LOCK_DISTANCE = 110;
const LOCK_SPRING = { damping: 14, stiffness: 220, mass: 0.6 } as const;
/** The frame the two halves of the X meet (the spring passes 0.95 four frames in): click, pulse and spark. */
const LOCK = LOCK_START + 4;
const TAGLINE = 46;

/** Reveals the blade like a cut: a straight edge sweeps from its top-right corner down to the tail. */
const BladeReveal = ({ id }: { readonly id: string }) => {
  const frame = useCurrentFrame();
  // Direction of the blade, from its top-right corner (482.5, 0.2) to the tip of the tail (263.4, 118.7).
  const dx = 263.435 - 482.489;
  const dy = 118.69 - 0.154;
  const length = Math.hypot(dx, dy);
  const d = { x: dx / length, y: dy / length };
  const n = { x: -d.y, y: d.x };
  // Every point of the blade projects onto d between -425 and -175.
  const s = interpolate(frame, BLADE, [-430, -170], {
    ...clamp,
    easing: expoOut,
  });
  const c = { x: d.x * s, y: d.y * s };
  const far = 1000;
  const points = [
    [c.x + n.x * far, c.y + n.y * far],
    [c.x - n.x * far, c.y - n.y * far],
    [c.x - n.x * far - d.x * far, c.y - n.y * far - d.y * far],
    [c.x + n.x * far - d.x * far, c.y + n.y * far - d.y * far],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <clipPath id={id}>
      <polygon points={points} />
    </clipPath>
  );
};

/**
 * 3 s logo sting (1080×1920) to open KFX reels and other videos.
 * KF rides in from the left and brakes into place, the X's blade slashes in and its other half locks into it,
 * then "Servis e-skirojev in e-koles" rises in.
 */
export const KfxIntro = ({
  tagline = "Servis e-skirojev in e-koles",
}: {
  /** Line under the logo; null leaves it out (KfxRenameReel sets its own text there). */
  readonly tagline?: string | null;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lock = spring({
    frame: frame - LOCK_START,
    fps,
    config: LOCK_SPRING,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.white,
        justifyContent: "center",
        alignItems: "center",
        gap: 76,
        paddingBottom: 140,
      }}
    >
      <Interactive.Div
        name="Lockup"
        style={{
          scale: interpolate(
            frame,
            [LOCK, LOCK + 4, LOCK + 12, 90],
            [1, 1.04, 1, 1.03],
            { ...clamp, output: "perceptual-scale" },
          ),
        }}
      >
        <svg
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
          overflow="visible"
          style={{ display: "block" }}
        >
          <defs>
            <BladeReveal id="kfx-intro-blade" />
          </defs>
          <RidingLogo>
            <path d={kf} fill={CRIMSON} />
          </RidingLogo>
          <path d={xBlade} fill={BLACK} clipPath="url(#kfx-intro-blade)" />
          <path
            d={xLock}
            fill={BLACK}
            opacity={interpolate(
              frame,
              [LOCK_START, LOCK_START + 3],
              [0, 1],
              clamp,
            )}
            transform={`translate(${(1 - lock) * LOCK_DISTANCE} 0)`}
          />
          <Spark at={LOCK} />
        </svg>
      </Interactive.Div>

      {tagline === null ? null : (
        <Interactive.Div
          name="Tagline"
          style={{
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 48,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: kfx.body,
            opacity: interpolate(frame, [TAGLINE, TAGLINE + 16], [0, 1], {
              ...clamp,
              easing: ease,
            }),
            translate: interpolate(
              frame,
              [TAGLINE, TAGLINE + 16],
              ["0px 40px", "0px 0px"],
              { ...clamp, easing: ease },
            ),
          }}
        >
          {tagline}
        </Interactive.Div>
      )}

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Ride whoosh"
          src="https://remotion.media/whoosh.wav"
          durationInFrames={8}
          volume={0.5}
        />
        <Audio
          name="Blade whoosh"
          src="https://remotion.media/whoosh.wav"
          from={BLADE[0] - 1}
          durationInFrames={6}
          volume={0.6}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Lock click"
          src="https://remotion.media/mouse-click.wav"
          from={LOCK}
          durationInFrames={12}
        />
      </Track>
    </AbsoluteFill>
  );
};
