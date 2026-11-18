import { Audio } from "@remotion/media";
import type { CSSProperties, ReactNode } from "react";
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
import { Phone, PHONE } from "../refurbished/Phone";
import {
  ANSWER_TAP,
  Chrome,
  ConditionScreen,
  DetailsScreen,
  DONE_FROM,
  DoneContent,
  ESTIMATE_COUNTED,
  EstimateScreen,
  GRADE_TAP,
  HANDOVER_TAP,
  ModelScreen,
  QUESTION_FRAMES,
} from "./SiteScreens";

const GREEN = brand.refix;
const ease = { ...clamp, easing: glide };
const PHONE_LEFT = (1080 - PHONE.width) / 2;

const STEP_START = 96;

/** The four steps of kranfix.si/odkup, each with its length and the frame its action completes. */
const STEPS = [
  {
    title: "Izberi model",
    line: "Poišči telefon in kapaciteto.",
    frames: 90,
    doneAt: 60,
  },
  {
    title: "Opiši stanje",
    line: "Štiri vprašanja o delovanju, zaslonu, ohišju in gumbih.",
    frames: 150,
    doneAt: GRADE_TAP + 2,
  },
  {
    title: "Takoj dobiš oceno",
    line: "Informativna ocena vrednosti.",
    frames: 120,
    doneAt: ESTIMATE_COUNTED,
  },
  {
    title: "Prinesi ali pošlji",
    line: "Prineseš ga v servis ali ga pošlješ po pošti.",
    frames: 120,
    doneAt: DONE_FROM,
  },
] as const;

const STARTS = STEPS.map(
  (_, i) =>
    STEP_START + STEPS.slice(0, i).reduce((sum, s) => sum + s.frames, 0),
);
const INSPECT = STEP_START + STEPS.reduce((sum, s) => sum + s.frames, 0);
/** Frame within the inspection when the "Pregledano" stamp lands. */
const STAMP = 58;
export const FLOW_DURATION = INSPECT + 120;

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

/** The magnifying glass of the inspection: crosses the phone diagonally. */
const Magnifier = ({ t }: { readonly t: number }) => {
  const move = interpolate(t, [8, 50], [0, 1], ease);
  return (
    <svg
      width="240"
      height="240"
      viewBox="0 0 240 240"
      style={{
        position: "absolute",
        left: interpolate(move, [0, 1], [-40, 230]),
        top: interpolate(move, [0, 1], [180, 470]),
        opacity: interpolate(t, [6, 12, 52, 58], [0, 1, 1, 0], clamp),
        filter: "drop-shadow(0 16px 24px rgba(10,10,10,0.2))",
      }}
    >
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="rgba(255,255,255,0.18)"
        stroke={GREEN}
        strokeWidth="16"
      />
      <path
        d="M156 156 L222 222"
        stroke={GREEN}
        strokeWidth="26"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** "Pregledano": lands on the phone once the inspection is done. */
const InspectedStamp = ({
  t,
  fps,
}: {
  readonly t: number;
  readonly fps: number;
}) => {
  const land = spring({
    frame: t - STAMP,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.7 },
  });
  return (
    <Interactive.Div
      name="Inspected stamp"
      style={{
        position: "absolute",
        left: PHONE.width / 2 - 190,
        top: 560,
        width: 380,
        padding: "18px 0",
        borderRadius: 24,
        border: `6px solid ${GREEN}`,
        backgroundColor: "rgba(255,255,255,0.94)",
        color: GREEN,
        textAlign: "center",
        fontFamily: manrope,
        fontWeight: 800,
        fontSize: 58,
        letterSpacing: "-0.02em",
        rotate: "-9deg",
        scale: String(interpolate(land, [0, 1], [1.8, 1])),
        opacity: interpolate(t, [STAMP, STAMP + 3], [0, 1], clamp),
        boxShadow: "0 18px 36px rgba(48,107,52,0.25)",
      }}
    >
      Pregledano
    </Interactive.Div>
  );
};

export const Flow = ({ estimate }: { readonly estimate: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepping = frame >= STEP_START && frame < INSPECT;
  const inspecting = frame >= INSPECT;
  const step = stepAt(frame);
  const t = frame - STARTS[step];
  const it = frame - INSPECT;
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  const top = interpolate(frame, [8, 40, 80, 100], [1960, 780, 780, 500], ease);

  const labelIn = interpolate(t, [0, 10], [0, 1], ease);
  const labelOut = last
    ? interpolate(frame, [INSPECT, INSPECT + 8], [1, 0], clamp)
    : interpolate(t, [current.frames - 8, current.frames - 1], [1, 0], clamp);
  const counterOpacity = Math.min(
    interpolate(frame, [STEP_START - 6, STEP_START + 4], [0, 1], clamp),
    interpolate(frame, [INSPECT, INSPECT + 8], [1, 0], clamp),
  );

  let screen: ReactNode = <ModelScreen t={0} />;
  if (stepping || inspecting) {
    if (inspecting) {
      screen = (
        <Chrome active={4}>
          <DoneContent />
        </Chrome>
      );
    } else if (step === 0) screen = <ModelScreen t={t} />;
    else if (step === 1) screen = <ConditionScreen t={t} />;
    else if (step === 2) screen = <EstimateScreen t={t} estimate={estimate} />;
    else screen = <DetailsScreen t={t} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      {/* Hook. */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 96,
          right: 96,
          opacity: interpolate(frame, [80, 92], [1, 0], clamp),
          translate: `0px ${interpolate(frame, [80, 92], [0, -60], ease)}px`,
        }}
      >
        <Headline size={112}>
          <Interactive.Div name="Hook line 1" style={rise(frame, 2, 70, 20)}>
            Koliko je
          </Interactive.Div>
          <Interactive.Div name="Hook line 2" style={rise(frame, 8, 70, 20)}>
            vreden tvoj
          </Interactive.Div>
          <Interactive.Div
            name="Hook accent"
            style={{ color: GREEN, ...rise(frame, 14, 70, 20) }}
          >
            stari telefon?
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
                  frame >= STARTS[i] + item.doneAt ? GREEN : "#e5e5e5",
              }}
            />
          ))}
        </div>
      </div>

      {/* The step's name and line. */}
      {stepping || (inspecting && it < 10) ? (
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

      {/* The inspection. */}
      {inspecting ? (
        <div style={{ position: "absolute", top: 200, left: 96, right: 96 }}>
          <Headline size={76}>
            <Interactive.Div
              name="Inspection line 1"
              style={rise(frame, INSPECT + 6, 60, 18)}
            >
              Končno ceno potrdimo
            </Interactive.Div>
            <Interactive.Div
              name="Inspection accent"
              style={{ color: GREEN, ...rise(frame, INSPECT + 12, 60, 18) }}
            >
              po pregledu.
            </Interactive.Div>
          </Headline>
          <Interactive.Div
            name="Inspection line"
            style={{
              marginTop: 18,
              fontFamily: geist,
              fontSize: 40,
              lineHeight: 1.3,
              color: brand.body,
              ...rise(frame, INSPECT + 18, 40, 18),
            }}
          >
            Na Koroški cesti 4, ko telefon pregledamo.
          </Interactive.Div>
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
          scale: "1.15",
          transformOrigin: "50% 0%",
        }}
      >
        <Phone>{screen}</Phone>
        {inspecting ? (
          <>
            <Magnifier t={it} />
            <InspectedStamp t={it} fps={fps} />
          </>
        ) : null}
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
          name="To the steps"
          src="https://remotion.media/whoosh.wav"
          from={82}
          durationInFrames={8}
          volume={0.3}
        />
        <Audio
          name="To the inspection"
          src="https://remotion.media/whoosh.wav"
          from={INSPECT}
          durationInFrames={8}
          volume={0.3}
        />
      </Track>
      <Track name="Taps">
        <Audio
          name="Pick model"
          src="https://remotion.media/mouse-click.wav"
          from={STARTS[0] + 58}
          durationInFrames={12}
        />
        {[0, 1, 2, 3].map((q) => (
          <Audio
            key={q}
            name={`Answer ${q + 1}`}
            src="https://remotion.media/mouse-click.wav"
            from={STARTS[1] + q * QUESTION_FRAMES + ANSWER_TAP}
            durationInFrames={12}
            volume={0.8}
          />
        ))}
        <Audio
          name="Pick grade"
          src="https://remotion.media/mouse-click.wav"
          from={STARTS[1] + GRADE_TAP}
          durationInFrames={12}
        />
        <Audio
          name="Pick hand-over"
          src="https://remotion.media/mouse-click.wav"
          from={STARTS[3] + HANDOVER_TAP}
          durationInFrames={12}
        />
        <Audio
          name="Stamp"
          src="https://remotion.media/mouse-click.wav"
          from={INSPECT + STAMP}
          durationInFrames={12}
        />
      </Track>
      <Track name="Dings">
        <Audio
          name="Estimate"
          src="https://remotion.media/ding.wav"
          from={STARTS[2] + ESTIMATE_COUNTED}
          volume={0.3}
        />
        <Audio
          name="Done"
          src="https://remotion.media/ding.wav"
          from={STARTS[3] + DONE_FROM}
          volume={0.25}
        />
        <Audio
          name="Inspected"
          src="https://remotion.media/ding.wav"
          from={INSPECT + STAMP + 2}
          volume={0.3}
        />
      </Track>
    </AbsoluteFill>
  );
};
