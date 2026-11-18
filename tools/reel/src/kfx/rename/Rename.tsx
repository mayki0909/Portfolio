import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  Track,
  useCurrentFrame,
} from "remotion";
import { clamp, ease, expoOut, inter, kfx } from "../brand";
import { KfxIntro } from "../KfxIntro";
import { rise } from "../motion";
import { OLD_LOGO_VIEWBOX, oldLogoPaths } from "./oldLogo";

const OLD_WIDTH = 760;
const OLD_HEIGHT =
  (OLD_LOGO_VIEWBOX.height / OLD_LOGO_VIEWBOX.width) * OLD_WIDTH;
/** Where KfxIntro's logo sits without a tagline (its lockup is centred above a 140px bottom padding). */
const LOGO_CENTRE_Y = (1920 - 140) / 2;

/** The old logo pulls back a little, then accelerates off to the right like a scooter pulling away. */
const WINDUP = [12, 22] as const;
const LAUNCH = [22, 40] as const;
/** KfxIntro starts once the old logo is out of frame: KF rides in from the left and the X locks. */
const NEW_LOGO = 40;
const TEXT = NEW_LOGO + 26;
const STRIKE = TEXT + 14;

const oldX = (frame: number) =>
  interpolate(frame, WINDUP, [0, -40], { ...clamp, easing: ease }) +
  interpolate(frame, LAUNCH, [0, 1500], {
    ...clamp,
    easing: Easing.bezier(0.6, 0, 0.9, 0.6),
  });

/** Speed lines behind the old logo, relative to its left edge and vertical centre. */
const TRAILS = [
  { y: -78, length: 420, width: 7, opacity: 0.9 },
  { y: -44, length: 260, width: 4, opacity: 0.45 },
  { y: -8, length: 520, width: 9, opacity: 1 },
  { y: 28, length: 300, width: 5, opacity: 0.55 },
  { y: 62, length: 460, width: 7, opacity: 0.8 },
  { y: 92, length: 220, width: 4, opacity: 0.4 },
] as const;

const OldLogo = () => {
  const frame = useCurrentFrame();
  const x = oldX(frame);
  const speed = x - oldX(frame - 1);
  // Leans back while it winds up, then forward as it speeds away.
  const lean = interpolate(speed, [-6, 0, 140], [-5, 0, 18], clamp);
  const trail = interpolate(speed, [0, 140], [0, 1], clamp);
  const left = (1080 - OLD_WIDTH) / 2 + x;

  if (frame >= NEW_LOGO) {
    return null;
  }

  return (
    <>
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0 }}
      >
        {TRAILS.map((line) => (
          <line
            key={line.y}
            x1={left - 24 - line.length * trail}
            y1={LOGO_CENTRE_Y + line.y}
            x2={left - 24}
            y2={LOGO_CENTRE_Y + line.y}
            stroke={kfx.primary}
            strokeWidth={line.width}
            strokeLinecap="round"
            opacity={line.opacity * Math.min(1, trail * 4)}
          />
        ))}
      </svg>
      <Interactive.Div
        name="Old logo"
        style={{
          position: "absolute",
          left,
          top: LOGO_CENTRE_Y - OLD_HEIGHT / 2,
          transformOrigin: "50% 100%",
          transform: `skewX(${-lean}deg)`,
          scale: interpolate(frame, [0, 12], [1.03, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        <svg
          width={OLD_WIDTH}
          height={OLD_HEIGHT}
          viewBox={`0 0 ${OLD_LOGO_VIEWBOX.width} ${OLD_LOGO_VIEWBOX.height}`}
          style={{ display: "block" }}
        >
          {oldLogoPaths.map((path) => (
            <path key={path.d} d={path.d} fill={path.fill} />
          ))}
        </svg>
      </Interactive.Div>
    </>
  );
};

/**
 * Opening scene: the old Krgofix logo pulls away to the right, KFX rides in from the left (KfxIntro without
 * its tagline), then "Krgofix" is struck through and "je zdaj KFX." follows.
 */
export const Rename = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [STRIKE, STRIKE + 10], [0, 1], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: kfx.white }}>
      <Sequence from={NEW_LOGO} name="KfxIntro">
        <KfxIntro tagline={null} />
      </Sequence>
      <OldLogo />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: LOGO_CENTRE_Y + 170,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: inter,
          fontWeight: 600,
          fontSize: 100,
          lineHeight: 1.12,
          letterSpacing: "-0.035em",
        }}
      >
        <Interactive.Div
          name="Krgofix"
          style={{
            position: "relative",
            color: kfx.muted,
            ...rise(frame, TEXT, 60, 18),
          }}
        >
          Krgofix
          <div
            style={{
              position: "absolute",
              left: -14,
              right: -14,
              top: "54%",
              height: 10,
              marginTop: -5,
              borderRadius: 5,
              backgroundColor: kfx.primary,
              transformOrigin: "0% 50%",
              scale: `${strike} 1`,
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Is now KFX"
          style={{ color: kfx.ink, ...rise(frame, STRIKE + 8, 60, 18) }}
        >
          je zdaj <span style={{ color: kfx.primary }}>KFX</span>.
        </Interactive.Div>
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Old logo whoosh"
          src="https://remotion.media/whoosh.wav"
          from={LAUNCH[0] - 1}
          durationInFrames={10}
          volume={0.6}
        />
        <Audio
          name="Strike whoosh"
          src="https://remotion.media/whoosh.wav"
          from={STRIKE - 1}
          durationInFrames={6}
          volume={0.3}
        />
      </Track>
    </AbsoluteFill>
  );
};
