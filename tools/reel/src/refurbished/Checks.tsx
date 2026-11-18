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
import { brand, geist, glide, manrope } from "../brand";
import { clamp, rise } from "../location/shared";
import { Phone, PHONE } from "./Phone";
import { SCREENS } from "./screens";

/**
 * The ten checks, as approved in the script. They are claims to customers:
 * keep them to what the shop really does.
 */
const CHECKS = [
  { name: "Zaklepanje", line: "Ni blokiran ali zaklenjen na tuj račun." },
  { name: "Baterija", line: "Izmerimo zdravje baterije in ga zapišemo." },
  { name: "Zaslon", line: "Preverimo piksle in dotik po celem zaslonu." },
  { name: "Kamere", line: "Spredaj, zadaj in bliskavica." },
  { name: "Zvok", line: "Zvočnik in mikrofon." },
  { name: "Polnjenje", line: "Priključek in polnjenje." },
  { name: "Tipke in odklep", line: "Tipke, Face ID ali prstni odtis." },
  { name: "Omrežje", line: "Signal, Wi-Fi in Bluetooth." },
  {
    name: "Izbris podatkov",
    line: "Podatki prejšnjega lastnika so izbrisani.",
  },
  { name: "Čiščenje in ocena", line: "Očistimo ga in jasno označimo stanje." },
] as const;

/** The website's promise for refurbished phones (components/home/revivo-section.tsx). */
const PROMISES = [
  "Strokovno pregledan",
  "Z garancijo",
  "Jasno označeno stanje",
] as const;

/** Timeline, in frames at 30 fps: the hook, ten 2.2 s checks, then the promises. */
const STEP_START = 96;
const STEP = 66;
/** Frame within a step when its check mark lands (and the click plays). */
const DONE = 44;
const RESULT = STEP_START + CHECKS.length * STEP;
export const CHECKS_DURATION = RESULT + 84;

const ease = { ...clamp, easing: glide };
const PHONE_LEFT = (1080 - PHONE.width) / 2;

const stepAt = (frame: number) =>
  Math.min(
    CHECKS.length - 1,
    Math.max(0, Math.floor((frame - STEP_START) / STEP)),
  );

/** Green check mark that lands on the phone when a check is done. */
const Stamp = ({ t, fps }: { readonly t: number; readonly fps: number }) => {
  const pop = spring({
    frame: t - DONE,
    fps,
    config: { damping: 11, stiffness: 190, mass: 0.6 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: PHONE.width - 96,
        top: PHONE.height - 190,
        width: 132,
        height: 132,
        borderRadius: 66,
        backgroundColor: brand.live,
        boxShadow: "0 18px 36px rgba(34,197,94,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: String(pop),
        opacity: interpolate(t, [DONE, DONE + 1, 58, 64], [0, 1, 1, 0], clamp),
      }}
    >
      <svg width="70" height="70" viewBox="0 0 70 70">
        <path
          d="M14 36 l14 14 l28 -30"
          fill="none"
          stroke="#fff"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/** Charging cable for check 6: slides up into the port, leaves with the step. */
const Cable = ({ t }: { readonly t: number }) => (
  <div
    style={{
      position: "absolute",
      left: PHONE.width / 2 - 26,
      top: PHONE.height - 8,
      translate: `0px ${interpolate(t, [2, 16], [260, 0], ease)}px`,
      opacity: interpolate(t, [2, 6, 58, 64], [0, 1, 1, 0], clamp),
    }}
  >
    <div
      style={{
        width: 52,
        height: 84,
        borderRadius: 12,
        backgroundColor: "#f1f1f1",
        border: "3px solid #d6d6d6",
        boxSizing: "border-box",
      }}
    />
    <div
      style={{
        width: 22,
        height: 420,
        margin: "0 auto",
        backgroundColor: "#ececec",
        borderLeft: "3px solid #d6d6d6",
        borderRight: "3px solid #d6d6d6",
        boxSizing: "border-box",
      }}
    />
  </div>
);

/**
 * The grade tag for check 10: swings in from the phone's top-right corner and stays to the end.
 * Hung inside the corner so it still fits the frame with the phone at 1.15×.
 */
const GradeTag = ({ t, fps }: { readonly t: number; readonly fps: number }) => {
  const swing = spring({
    frame: t - 24,
    fps,
    config: { damping: 7, stiffness: 110, mass: 0.8 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: PHONE.width - 160,
        top: 112,
        transformOrigin: "0px 0px",
        rotate: `${interpolate(swing, [0, 1], [-75, 0])}deg`,
        opacity: interpolate(t, [24, 27], [0, 1], clamp),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: 96,
          backgroundColor: brand.muted,
          borderRadius: 2,
          transformOrigin: "2px 0px",
          rotate: "-38deg",
        }}
      />
      <Interactive.Div
        name="Grade tag"
        style={{
          position: "absolute",
          left: 52,
          top: 66,
          width: 300,
          boxSizing: "border-box",
          padding: "18px 26px 20px 52px",
          borderRadius: 22,
          border: `4px solid ${brand.primary}`,
          backgroundColor: brand.white,
          boxShadow: "0 18px 36px rgba(10,10,10,0.14)",
          fontFamily: geist,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 22,
            width: 18,
            height: 18,
            borderRadius: 9,
            border: `3px solid ${brand.muted}`,
          }}
        />
        <div style={{ fontSize: 28, color: brand.muted }}>Stanje</div>
        <div
          style={{
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: brand.primary,
          }}
        >
          odlično
        </div>
      </Interactive.Div>
    </div>
  );
};

export const Checks = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = stepAt(frame);
  const stepFrom = STEP_START + step * STEP;
  const t = frame - stepFrom;
  const checking = frame >= STEP_START;
  const Screen = SCREENS[step];
  const check = CHECKS[step];
  const lastStep = step === CHECKS.length - 1;

  /* Phone: rises under the hook, moves up for the checks, shrinks for the promises. */
  const top = interpolate(
    frame,
    [8, 40, 80, 100, RESULT, RESULT + 20],
    [1960, 780, 780, 500, 500, 300],
    ease,
  );
  /* 1.15× fills the frame during the checks; the drawn sizes stay in phone pixels. */
  const scale = interpolate(frame, [RESULT, RESULT + 20], [1.15, 0.78], ease);

  /* Labels fade in with each step and out before the next; the last stays until the promises. */
  const labelIn = interpolate(t, [0, 10], [0, 1], ease);
  const labelOut = lastStep
    ? interpolate(frame, [RESULT, RESULT + 10], [1, 0], clamp)
    : interpolate(t, [56, 64], [1, 0], clamp);
  const counterOpacity = Math.min(
    interpolate(frame, [STEP_START - 6, STEP_START + 4], [0, 1], clamp),
    interpolate(frame, [RESULT, RESULT + 10], [1, 0], clamp),
  );

  const glow =
    step === 6 && checking
      ? {
          volumeUp: interpolate(t, [4, 8, 12, 16], [0, 1, 1, 0], clamp),
          volumeDown: interpolate(t, [12, 16, 20, 24], [0, 1, 1, 0], clamp),
          power: interpolate(t, [20, 24, 28, 32], [0, 1, 1, 0], clamp),
        }
      : {};

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      {/* Hook. */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 96,
          right: 96,
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 108,
          lineHeight: 1.06,
          letterSpacing: "-0.04em",
          color: brand.ink,
          opacity: interpolate(frame, [80, 92], [1, 0], clamp),
          translate: `0px ${interpolate(frame, [80, 92], [0, -60], ease)}px`,
        }}
      >
        <Interactive.Div name="Hook line 1" style={rise(frame, 2, 70, 20)}>
          Kaj preverimo,
        </Interactive.Div>
        <Interactive.Div name="Hook line 2" style={rise(frame, 8, 70, 20)}>
          preden prodamo
        </Interactive.Div>
        <Interactive.Div
          name="Hook accent 1"
          style={{ color: brand.primary, ...rise(frame, 14, 70, 20) }}
        >
          obnovljen
        </Interactive.Div>
        <Interactive.Div
          name="Hook accent 2"
          style={{ color: brand.primary, ...rise(frame, 20, 70, 20) }}
        >
          telefon?
        </Interactive.Div>
      </div>

      {/* Counter and progress dots. */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 96,
          right: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: counterOpacity,
          fontFamily: geist,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: brand.muted,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {step + 1}/{CHECKS.length}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {CHECKS.map((item, i) => (
            <div
              key={item.name}
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor:
                  frame >= STEP_START + i * STEP + DONE
                    ? brand.primary
                    : "#e5e5e5",
              }}
            />
          ))}
        </div>
      </div>

      {/* The check's name and line. */}
      {checking ? (
        <div
          style={{
            position: "absolute",
            top: 236,
            left: 96,
            right: 96,
            opacity: Math.min(labelIn, labelOut),
            translate: `0px ${(1 - labelIn) * 40}px`,
          }}
        >
          <Interactive.Div
            name="Check name"
            style={{
              fontFamily: manrope,
              fontWeight: 800,
              fontSize: 92,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: brand.ink,
              whiteSpace: "nowrap",
            }}
          >
            {check.name}
          </Interactive.Div>
          <Interactive.Div
            name="Check line"
            style={{
              marginTop: 18,
              fontFamily: geist,
              fontSize: 40,
              lineHeight: 1.3,
              color: brand.body,
            }}
          >
            {check.line}
          </Interactive.Div>
        </div>
      ) : null}

      {/* The phone, with what the scene draws around it. */}
      <div
        style={{
          position: "absolute",
          left: PHONE_LEFT,
          top,
          width: PHONE.width,
          height: PHONE.height,
          scale: String(scale),
          transformOrigin: "50% 0%",
        }}
      >
        {checking && step === 5 ? <Cable t={t} /> : null}
        <Phone glow={glow}>
          {checking ? (
            <AbsoluteFill
              style={{
                opacity: step === 0 ? 1 : interpolate(t, [0, 6], [0, 1], clamp),
              }}
            >
              <Screen t={t} />
            </AbsoluteFill>
          ) : null}
        </Phone>
        {checking && lastStep ? <GradeTag t={t} fps={fps} /> : null}
        {checking ? <Stamp t={t} fps={fps} /> : null}
      </div>

      {/* The three promises. */}
      <div
        style={{
          position: "absolute",
          top: 1060,
          left: 150,
          right: 96,
          display: "flex",
          flexDirection: "column",
          gap: 34,
        }}
      >
        {PROMISES.map((promise, i) => (
          <Interactive.Div
            key={promise}
            name={promise}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              fontFamily: manrope,
              fontWeight: 800,
              fontSize: 62,
              letterSpacing: "-0.03em",
              color: brand.ink,
              ...rise(frame, RESULT + 18 + i * 6, 50, 18),
            }}
          >
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              style={{ flex: "none" }}
            >
              <circle cx="34" cy="34" r="34" fill={brand.primary} />
              <path
                d="M19 35 l10 10 l20 -22"
                fill="none"
                stroke="#fff"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {promise}
          </Interactive.Div>
        ))}
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Hook whoosh"
          src="https://remotion.media/whoosh.wav"
          from={6}
          durationInFrames={8}
          volume={0.45}
        />
        <Audio
          name="To the checks"
          src="https://remotion.media/whoosh.wav"
          from={82}
          durationInFrames={8}
          volume={0.3}
        />
        <Audio
          name="To the promises"
          src="https://remotion.media/whoosh.wav"
          from={RESULT}
          durationInFrames={8}
          volume={0.3}
        />
      </Track>
      <Track name="Clicks">
        {CHECKS.map((item, i) => (
          <Audio
            key={item.name}
            name={`${item.name} done`}
            src="https://remotion.media/mouse-click.wav"
            from={STEP_START + i * STEP + DONE}
            durationInFrames={12}
          />
        ))}
        <Audio
          name="Promises ding"
          src="https://remotion.media/ding.wav"
          from={RESULT + 34}
          volume={0.3}
        />
      </Track>
    </AbsoluteFill>
  );
};
