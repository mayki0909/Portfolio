import { Audio } from "@remotion/media";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { brand, geist, glide, manrope } from "../brand";
import { clamp, rise } from "../location/shared";
import { Phone, PHONE } from "../refurbished/Phone";
import {
  BRAND_TAP,
  CrackedScreen,
  DAY_TAP,
  DetailsScreen,
  DEVICE_TAP,
  DeviceScreen,
  DONE_FROM,
  DoneContent,
  HANDOVER_TAP,
  MODEL_TAP,
  ModelScreen,
  OptionsScreen,
  Page,
  PART_TAP,
  REPAIR_TAP,
  RepairsScreen,
} from "./SiteScreens";

const RED = brand.primary;
const ease = { ...clamp, easing: glide };
const PHONE_LEFT = (1080 - PHONE.width) / 2;
const STEP_START = 96;

/** The five steps of the repair booking, each with its length and the frame its tap completes it. */
const STEPS = [
  {
    title: "Katera naprava?",
    line: "Telefon, tablica, računalnik, ura ali konzola.",
    frames: 75,
    doneAt: DEVICE_TAP + 2,
  },
  {
    title: "Model",
    line: "Izbereš znamko in model.",
    frames: 90,
    doneAt: MODEL_TAP + 2,
  },
  {
    title: "Kaj je narobe?",
    line: "Takoj vidiš informativno ceno.",
    frames: 90,
    doneAt: REPAIR_TAP + 2,
  },
  {
    title: "Izbereš možnosti",
    line: "Del, hitrost in način oddaje.",
    frames: 150,
    doneAt: HANDOVER_TAP + 2,
  },
  {
    title: "Izbereš dan",
    line: "Vpišeš podatke in izbereš dan.",
    frames: 120,
    doneAt: DONE_FROM,
  },
] as const;

const STARTS = STEPS.map(
  (_, i) =>
    STEP_START + STEPS.slice(0, i).reduce((sum, s) => sum + s.frames, 0),
);
const SAME_DAY = STEP_START + STEPS.reduce((sum, s) => sum + s.frames, 0);
/** Frame within the same-day scene when the clock closes its circle. */
const CLOCK_DONE = 50;
export const REPAIR_FLOW_DURATION = SAME_DAY + 120;

const stepAt = (frame: number) => {
  let index = 0;
  STARTS.forEach((start, i) => {
    if (frame >= start) index = i;
  });
  return index;
};

const Headline = ({
  children,
  size,
  style,
}: {
  readonly children: ReactNode;
  readonly size: number;
  readonly style?: CSSProperties;
}) => (
  <div
    style={{
      fontFamily: manrope,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: "-0.04em",
      color: brand.ink,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

/** A clock whose crimson ring closes, for "še isti dan". */
const Clock = ({ t }: { readonly t: number }) => {
  const progress = interpolate(t, [10, CLOCK_DONE], [0, 1], ease);
  const r = 92;
  const length = 2 * Math.PI * r;
  return (
    <svg
      width="230"
      height="230"
      viewBox="0 0 230 230"
      style={{
        position: "absolute",
        left: PHONE.width - 150,
        top: 90,
        scale: String(interpolate(t, [4, 14], [0.6, 1], ease)),
        opacity: interpolate(t, [4, 10], [0, 1], clamp),
        filter: "drop-shadow(0 18px 30px rgba(10,10,10,0.18))",
      }}
    >
      <circle cx="115" cy="115" r="112" fill="#fff" />
      <circle
        cx="115"
        cy="115"
        r={r}
        fill="none"
        stroke="#f0e3e7"
        strokeWidth="16"
      />
      <circle
        cx="115"
        cy="115"
        r={r}
        fill="none"
        stroke={RED}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - progress)}
        transform="rotate(-90 115 115)"
      />
      <g stroke={brand.ink} strokeWidth="10" strokeLinecap="round">
        <path
          d="M115 115 V68"
          transform={`rotate(${progress * 360} 115 115)`}
        />
        <path
          d="M115 115 H148"
          transform={`rotate(${progress * 30} 115 115)`}
        />
      </g>
      <circle cx="115" cy="115" r="9" fill={brand.ink} />
    </svg>
  );
};

export const RepairFlow = () => {
  const frame = useCurrentFrame();
  const stepping = frame >= STEP_START && frame < SAME_DAY;
  const sameDay = frame >= SAME_DAY;
  const step = stepAt(frame);
  const t = frame - STARTS[step];
  const st = frame - SAME_DAY;
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  const top = interpolate(
    frame,
    [8, 40, 80, 100, SAME_DAY, SAME_DAY + 20],
    [1960, 780, 780, 500, 500, 620],
    ease,
  );
  const scale = interpolate(
    frame,
    [SAME_DAY, SAME_DAY + 20],
    [1.15, 0.95],
    ease,
  );

  const labelIn = interpolate(t, [0, 10], [0, 1], ease);
  const labelOut = last
    ? interpolate(frame, [SAME_DAY, SAME_DAY + 8], [1, 0], clamp)
    : interpolate(t, [current.frames - 8, current.frames - 1], [1, 0], clamp);
  const counterOpacity = Math.min(
    interpolate(frame, [STEP_START - 6, STEP_START + 4], [0, 1], clamp),
    interpolate(frame, [SAME_DAY, SAME_DAY + 8], [1, 0], clamp),
  );

  let screen: ReactNode;
  if (sameDay) {
    screen = (
      <Page active={5}>
        <DoneContent />
      </Page>
    );
  } else if (!stepping) {
    screen = (
      <>
        <DeviceScreen t={0} />
        <AbsoluteFill
          style={{ opacity: interpolate(frame, [70, 86], [1, 0], clamp) }}
        >
          <CrackedScreen />
        </AbsoluteFill>
      </>
    );
  } else if (step === 0) screen = <DeviceScreen t={t} />;
  else if (step === 1) screen = <ModelScreen t={t} />;
  else if (step === 2) screen = <RepairsScreen t={t} />;
  else if (step === 3) screen = <OptionsScreen t={t} />;
  else screen = <DetailsScreen t={t} />;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      {/* Hook. */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 96,
          right: 96,
          opacity: interpolate(frame, [80, 92], [1, 0], clamp),
          translate: `0px ${interpolate(frame, [80, 92], [0, -60], ease)}px`,
        }}
      >
        <Headline size={124} style={{ color: RED }}>
          <Interactive.Div name="Hook question" style={rise(frame, 2, 70, 18)}>
            Razbit ekran?
          </Interactive.Div>
        </Headline>
        <Headline size={72} style={{ marginTop: 26 }}>
          <Interactive.Div name="Hook line 1" style={rise(frame, 26, 50, 18)}>
            Popravilo rezerviraš
          </Interactive.Div>
          <Interactive.Div name="Hook line 2" style={rise(frame, 32, 50, 18)}>
            v nekaj klikih.
          </Interactive.Div>
        </Headline>
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
        <div style={{ fontSize: 40, fontWeight: 500, color: brand.muted }}>
          {step + 1}/{STEPS.length}
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {STEPS.map((item, i) => (
            <div
              key={item.title}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor:
                  frame >= STARTS[i] + item.doneAt ? RED : "#e5e5e5",
              }}
            />
          ))}
        </div>
      </div>

      {/* The step's name and line. */}
      {stepping || (sameDay && st < 10) ? (
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
          <Headline size={86}>
            <Interactive.Div name="Step name">{current.title}</Interactive.Div>
          </Headline>
          <Interactive.Div
            name="Step line"
            style={{
              marginTop: 18,
              fontFamily: geist,
              fontSize: 40,
              lineHeight: 1.3,
              color: brand.body,
            }}
          >
            {current.line}
          </Interactive.Div>
        </div>
      ) : null}

      {/* Same day: the site's own promise. */}
      {sameDay ? (
        <div style={{ position: "absolute", top: 190, left: 96, right: 96 }}>
          <Headline size={96}>
            <Interactive.Div
              name="Same day line 1"
              style={rise(frame, SAME_DAY + 6, 60, 18)}
            >
              Večino telefonov
            </Interactive.Div>
            <Interactive.Div
              name="Same day line 2"
              style={rise(frame, SAME_DAY + 12, 60, 18)}
            >
              popravimo
            </Interactive.Div>
            <Interactive.Div
              name="Same day accent"
              style={{ color: RED, ...rise(frame, SAME_DAY + 18, 60, 18) }}
            >
              še isti dan.
            </Interactive.Div>
          </Headline>
        </div>
      ) : null}

      {/* The phone. */}
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
        <Phone>{screen}</Phone>
        {sameDay ? <Clock t={st} /> : null}
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
          name="Cracks clear"
          src="https://remotion.media/whoosh.wav"
          from={72}
          durationInFrames={8}
          volume={0.3}
        />
        <Audio
          name="To same day"
          src="https://remotion.media/whoosh.wav"
          from={SAME_DAY}
          durationInFrames={8}
          volume={0.3}
        />
      </Track>
      <Track name="Taps">
        {[
          { name: "Device", at: STARTS[0] + DEVICE_TAP },
          { name: "Brand", at: STARTS[1] + BRAND_TAP },
          { name: "Model", at: STARTS[1] + MODEL_TAP },
          { name: "Repair", at: STARTS[2] + REPAIR_TAP },
          { name: "Part", at: STARTS[3] + PART_TAP },
          { name: "Hand-over", at: STARTS[3] + HANDOVER_TAP },
          { name: "Day", at: STARTS[4] + DAY_TAP },
        ].map((tap) => (
          <Audio
            key={tap.name}
            name={tap.name}
            src="https://remotion.media/mouse-click.wav"
            from={tap.at}
            durationInFrames={12}
          />
        ))}
      </Track>
      <Track name="Dings">
        <Audio
          name="Price"
          src="https://remotion.media/ding.wav"
          from={STARTS[2] + REPAIR_TAP + 6}
          volume={0.25}
        />
        <Audio
          name="Booked"
          src="https://remotion.media/ding.wav"
          from={STARTS[4] + DONE_FROM}
          volume={0.25}
        />
        <Audio
          name="Same day"
          src="https://remotion.media/ding.wav"
          from={SAME_DAY + CLOCK_DONE}
          volume={0.3}
        />
      </Track>
    </AbsoluteFill>
  );
};
