import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { clamp, ease, expoOut, inter, kfx, LOGO_SLANT } from "./brand";
import { ZapIcon } from "./icons";
import type { KfxOutroProps } from "./KfxOutro";
import {
  BASELINE,
  BLACK,
  CRIMSON,
  kf,
  LOGO_VIEWBOX,
  xBlade,
  xLock,
} from "./logoPaths";
import { rise } from "./motion";
import { LOGO_HEIGHT, LOGO_WIDTH } from "./ride";

const LOGO_PATHS = [
  { d: kf, fill: CRIMSON },
  { d: xBlade, fill: BLACK },
  { d: xLock, fill: BLACK },
] as const;

/** The empty logo is drawn as a thin outline first, like an empty battery. */
const OUTLINE = [0, 16] as const;
/** Then it charges in ten steps, one every STEP_EVERY frames, each with a tick. */
const CHARGE_START = 14;
const STEPS = 10;
const STEP_EVERY = 4;
const STEP_FRAMES = 3;
/** Fully charged: ding, the logo pulses and the outline goes. */
const FULL = CHARGE_START + STEPS * STEP_EVERY;
/** The percentage flips up and the domain takes its place. */
const SWAP = FULL + 8;
const SERVICES = SWAP + 8;

/** Charge level 0–1: rises one tenth per step, snapping into each step like a battery bar. */
const chargeAt = (frame: number) => {
  let level = 0;
  for (let step = 0; step < STEPS; step++) {
    const start = CHARGE_START + step * STEP_EVERY;
    level += interpolate(frame, [start, start + STEP_FRAMES], [0, 1 / STEPS], {
      ...clamp,
      easing: expoOut,
    });
  }
  return level;
};

/**
 * Clip for the charged part of the logo: everything left of a front that leans like the letters, so the fill
 * runs along the logo's slant. `level` 0 sits just left of the K, 1 just right of the X.
 */
const chargeClip = (level: number) => {
  const front = interpolate(level, [0, 1], [-70, 530]);
  const top = -20;
  const bottom = LOGO_VIEWBOX.height + 20;
  return [
    [-700, top],
    [front + LOGO_SLANT * (BASELINE - top), top],
    [front + LOGO_SLANT * (BASELINE - bottom), bottom],
    [-700, bottom],
  ]
    .map((point) => point.join(","))
    .join(" ");
};

/**
 * 3.5 s logo sting (1080×1920) to close KFX videos: the logo charges like a battery.
 * Its outline is drawn, it fills with its colours in ten ticks while a counter runs to 100 %, then the counter
 * flips up into the domain and the services follow.
 */
export const KfxOutroCharge = ({ domain }: KfxOutroProps) => {
  const frame = useCurrentFrame();
  const level = chargeAt(frame);
  const percent = Math.round(level * 100);
  const full = frame >= FULL;
  const outline = interpolate(frame, OUTLINE, [0, 1], {
    ...clamp,
    easing: ease,
  });
  const swap = interpolate(frame, [SWAP, SWAP + 12], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.white,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 140,
        fontFamily: inter,
        scale: interpolate(frame, [FULL, 105], [1, 1.03], {
          ...clamp,
          output: "perceptual-scale",
        }),
      }}
    >
      <Interactive.Div
        name="Logo"
        style={{
          scale: interpolate(frame, [FULL, FULL + 4, FULL + 14], [1, 1.05, 1], {
            ...clamp,
            output: "perceptual-scale",
          }),
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
            <clipPath id="kfx-charge">
              <polygon points={chargeClip(level)} />
            </clipPath>
          </defs>
          {/*
            The empty battery: the logo's outline, drawn on, and its letters tinted light grey like empty cells.
            Both go once it's full.
          */}
          <g
            opacity={
              interpolate(
                frame,
                [OUTLINE[1] - 6, OUTLINE[1] + 2],
                [0, 1],
                clamp,
              ) * interpolate(frame, [FULL, FULL + 8], [1, 0], clamp)
            }
          >
            {LOGO_PATHS.map((path) => (
              <path key={path.d} d={path.d} fill="#f2f2f3" />
            ))}
          </g>
          <g
            opacity={interpolate(frame, [FULL, FULL + 8], [1, 0], clamp)}
            fill="none"
            stroke="#bdbdbd"
            strokeWidth={1.6}
            strokeLinejoin="round"
          >
            {LOGO_PATHS.map((path) => (
              <path
                key={path.d}
                d={path.d}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - outline}
              />
            ))}
          </g>
          <g clipPath="url(#kfx-charge)">
            {LOGO_PATHS.map((path) => (
              <path key={path.d} d={path.d} fill={path.fill} />
            ))}
          </g>
        </svg>
      </Interactive.Div>

      {/* The counter and the domain share one slot: the counter flips up and out as the domain rises in. */}
      <div
        style={{
          position: "relative",
          marginTop: 110,
          width: 1080,
          height: 150,
          overflow: "hidden",
        }}
      >
        <Interactive.Div
          name="Counter"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            fontWeight: 800,
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
            color: full ? kfx.primary : kfx.ink,
            opacity: interpolate(frame, [4, 12], [0, 1], clamp) * (1 - swap),
            translate: `0px ${swap * -150}px`,
          }}
        >
          <div
            style={{
              scale: interpolate(
                frame,
                [FULL, FULL + 4, FULL + 12],
                [1, 1.3, 1],
                { ...clamp, output: "perceptual-scale" },
              ),
            }}
          >
            <ZapIcon size={104} color={kfx.primary} />
          </div>
          {percent}%
        </Interactive.Div>
        <Interactive.Div
          name="Domain"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 140,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: kfx.ink,
            opacity: swap,
            translate: `0px ${(1 - swap) * 150}px`,
          }}
        >
          {domain}
        </Interactive.Div>
      </div>

      {["Servis · Rezervni deli · Najem", "E-skiroji in E-kolesa"].map(
        (line, index) => (
          <Interactive.Div
            key={line}
            name={line}
            style={{
              marginTop: index === 0 ? 36 : 8,
              fontWeight: 500,
              fontSize: 44,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              color: kfx.body,
              ...rise(frame, SERVICES + index * 5, 40),
            }}
          >
            {line}
          </Interactive.Div>
        ),
      )}

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Ticks">
        {Array.from({ length: STEPS }, (_, step) => (
          <Audio
            key={step}
            name={`Tick ${step + 1}`}
            src="https://remotion.media/mouse-click.wav"
            from={CHARGE_START + step * STEP_EVERY}
            durationInFrames={STEP_EVERY - 1}
            volume={0.2 + (step / STEPS) * 0.25}
          />
        ))}
      </Track>
      <Track name="Ding">
        <Audio
          name="Full ding"
          src="https://remotion.media/ding.wav"
          from={FULL}
          volume={0.55}
        />
      </Track>
      <Track name="Whooshes">
        <Audio
          name="Swap whoosh"
          src="https://remotion.media/whoosh.wav"
          from={SWAP - 1}
          durationInFrames={8}
          volume={0.35}
        />
      </Track>
    </AbsoluteFill>
  );
};
