import type { ReactNode } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { brand, geist, glide, manrope } from "../brand";
import { clamp } from "../location/shared";
import { Logo } from "../Logo";
import { SCREEN } from "./Phone";

/**
 * The phone's screen for each of the ten checks. Every screen takes `t`, the frame within its
 * step (0–66): its test plays between about 6 and 44, when the check mark lands.
 */
type ScreenProps = { readonly t: number };

const ease = { ...clamp, easing: glide };
const WHITE = "#ffffff";
const DIM = "rgba(255,255,255,0.6)";

const Centered = ({
  children,
  background,
  gap = 36,
}: {
  readonly children: ReactNode;
  readonly background?: string;
  readonly gap?: number;
}) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: "center",
      gap,
      background,
      fontFamily: geist,
      color: WHITE,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Caption = ({
  children,
  color = DIM,
  opacity = 1,
}: {
  readonly children: ReactNode;
  readonly color?: string;
  readonly opacity?: number;
}) => (
  <div style={{ fontSize: 34, fontWeight: 500, color, opacity }}>
    {children}
  </div>
);

/** 1. Lock: the padlock opens, then "IMEI preverjen". */
export const LockScreen = ({ t }: ScreenProps) => {
  const open = interpolate(t, [14, 30], [0, 1], ease);
  return (
    <Centered>
      <svg width="190" height="240" viewBox="0 0 190 240">
        <path
          d="M50 110 V72 a45 45 0 0 1 90 0 V110"
          fill="none"
          stroke={WHITE}
          strokeWidth="18"
          strokeLinecap="round"
          transform={`translate(${open * 44} ${-open * 30})`}
        />
        <rect x="22" y="104" width="146" height="122" rx="26" fill={WHITE} />
        <circle cx="95" cy="156" r="13" fill="#0c0c0f" />
        <rect x="89" y="160" width="12" height="32" rx="6" fill="#0c0c0f" />
      </svg>
      <Caption
        color={brand.live}
        opacity={interpolate(t, [28, 36], [0, 1], clamp)}
      >
        IMEI preverjen
      </Caption>
    </Centered>
  );
};

/** 2. Battery: the health bar fills. No number: it would read as a promise for every phone. */
export const BatteryScreen = ({ t }: ScreenProps) => {
  const fill = interpolate(t, [8, 40], [0, 0.88], ease);
  return (
    <Centered>
      <Caption color={WHITE}>Zdravje baterije</Caption>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 270,
            height: 126,
            padding: 12,
            border: `8px solid ${WHITE}`,
            borderRadius: 28,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: `${fill * 100}%`,
              height: "100%",
              borderRadius: 14,
              backgroundColor: brand.live,
            }}
          />
        </div>
        <div
          style={{
            width: 14,
            height: 46,
            marginLeft: 6,
            borderRadius: "0 8px 8px 0",
            backgroundColor: WHITE,
          }}
        />
      </div>
    </Centered>
  );
};

/** 3. Display: white and black flashes for dead pixels, then a finger trail across a grid. */
export const DisplayScreen = ({ t }: ScreenProps) => {
  if (t < 20) {
    /* One slow white, then black: well under three flashes a second (WCAG 2.3.1). */
    const white = t >= 4 && t < 12;
    return <AbsoluteFill style={{ backgroundColor: white ? WHITE : "#000" }} />;
  }
  const drawn = interpolate(t, [22, 44], [0, 1], ease);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: WHITE,
        backgroundImage:
          "linear-gradient(#e7e5e6 2px, transparent 2px), linear-gradient(90deg, #e7e5e6 2px, transparent 2px)",
        backgroundSize: "51px 54px",
      }}
    >
      <svg width={SCREEN.width} height={SCREEN.height}>
        <path
          d="M64 190 L344 320 L64 450 L344 580 L64 710"
          fill="none"
          stroke={brand.primary}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - drawn}
        />
      </svg>
    </AbsoluteFill>
  );
};

const Bracket = ({
  corner,
  size,
  color,
}: {
  readonly corner: "tl" | "tr" | "bl" | "br";
  readonly size: number;
  readonly color: string;
}) => {
  const top = corner[0] === "t";
  const left = corner[1] === "l";
  return (
    <div
      style={{
        position: "absolute",
        [top ? "top" : "bottom"]: 0,
        [left ? "left" : "right"]: 0,
        width: size,
        height: size,
        [top ? "borderTop" : "borderBottom"]: `7px solid ${color}`,
        [left ? "borderLeft" : "borderRight"]: `7px solid ${color}`,
        [`border${top ? "Top" : "Bottom"}${left ? "Left" : "Right"}Radius`]: 14,
      }}
    />
  );
};

/** 4. Cameras: the focus corners close in, then the flash fires. */
export const CameraScreen = ({ t }: ScreenProps) => {
  const box = interpolate(t, [6, 26], [340, 200], ease);
  const focused = t >= 26;
  const color = focused ? "#facc15" : WHITE;
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 42% 38%, #7d8ea1 0%, #3a4553 45%, #171b21 80%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: (SCREEN.width - box) / 2,
          top: 380 - box / 2,
          width: box,
          height: box,
        }}
      >
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <Bracket key={corner} corner={corner} size={52} color={color} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: "50%",
          translate: "-50% 0",
          width: 96,
          height: 96,
          borderRadius: 48,
          border: `7px solid ${WHITE}`,
          boxSizing: "border-box",
          padding: 7,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 40,
            backgroundColor: WHITE,
          }}
        />
      </div>
      <AbsoluteFill
        style={{
          backgroundColor: WHITE,
          opacity: interpolate(t, [32, 34, 42], [0, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

/** 5. Sound: a waveform plays through speaker and microphone. */
export const SoundScreen = ({ t }: ScreenProps) => {
  const level = interpolate(t, [4, 12, 38, 46], [0, 1, 1, 0.15], clamp);
  return (
    <Centered gap={56}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, height: 240 }}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height:
                24 + 200 * level * Math.abs(Math.sin(t * 0.32 + i * 0.75)),
              borderRadius: 7,
              backgroundColor: i % 5 === 2 ? brand.live : WHITE,
            }}
          />
        ))}
      </div>
      <Caption>Zvočnik · mikrofon</Caption>
    </Centered>
  );
};

/** 6. Charging: the bolt appears once the cable (drawn by the scene) is in. */
export const ChargingScreen = ({ t }: ScreenProps) => {
  const bolt = interpolate(t, [18, 28], [0, 1], { ...clamp, easing: glide });
  return (
    <Centered>
      <svg
        width="150"
        height="230"
        viewBox="0 0 150 230"
        style={{ scale: String(0.6 + 0.4 * bolt), opacity: bolt }}
      >
        <path d="M92 0 L8 132 H70 L52 230 L142 88 H80 Z" fill={brand.live} />
      </svg>
      <Caption opacity={bolt}>Polni se</Caption>
    </Centered>
  );
};

/** 7. Buttons and unlock: the scene lights the buttons; the screen shows face unlock. */
export const UnlockScreen = ({ t }: ScreenProps) => {
  const done = t >= 34;
  const color = done ? brand.live : WHITE;
  const scan = interpolate(t, [24, 34], [0, 1], clamp);
  return (
    <Centered>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <g fill="none" stroke={color} strokeWidth="10" strokeLinecap="round">
          <path d="M20 62 V40 a20 20 0 0 1 20 -20 H62" />
          <path d="M138 20 H160 a20 20 0 0 1 20 20 V62" />
          <path d="M180 138 V160 a20 20 0 0 1 -20 20 H138" />
          <path d="M62 180 H40 a20 20 0 0 1 -20 -20 V138" />
          <path d="M72 78 V92 M128 78 V92 M100 82 V118 H90" />
          <path d="M70 136 Q100 160 130 136" />
        </g>
        <rect
          x="20"
          y={20 + 160 * scan}
          width="160"
          height="6"
          rx="3"
          fill={brand.live}
          opacity={scan > 0 && scan < 1 ? 0.9 : 0}
        />
      </svg>
      <Caption
        color={brand.live}
        opacity={interpolate(t, [34, 40], [0, 1], clamp)}
      >
        Odklenjeno
      </Caption>
    </Centered>
  );
};

/** 8. Network: signal bars, then the Wi-Fi arcs fill. */
export const NetworkScreen = ({ t }: ScreenProps) => {
  const on = (start: number) =>
    interpolate(t, [start, start + 4], [0.22, 1], clamp);
  return (
    <Centered gap={52}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 70 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
          {[34, 62, 90, 118].map((height, i) => (
            <div
              key={height}
              style={{
                width: 28,
                height,
                borderRadius: 7,
                backgroundColor: WHITE,
                opacity: on(6 + i * 4),
              }}
            />
          ))}
        </div>
        <svg width="150" height="118" viewBox="0 0 150 118">
          <g fill="none" stroke={WHITE} strokeWidth="13" strokeLinecap="round">
            <path d="M12 46 a90 90 0 0 1 126 0" opacity={on(30)} />
            <path d="M34 70 a58 58 0 0 1 82 0" opacity={on(26)} />
            <path d="M56 94 a26 26 0 0 1 38 0" opacity={on(22)} />
          </g>
          <circle cx="75" cy="110" r="8" fill={WHITE} opacity={on(22)} />
        </svg>
      </div>
      <Caption>Signal · Wi-Fi · Bluetooth</Caption>
    </Centered>
  );
};

const GREETINGS = [
  { word: "Pozdravljeni", from: 30 },
  { word: "Hello", from: 42 },
  { word: "Ciao", from: 54 },
] as const;

/** 9. Data wipe: a progress ring, then the setup screen a new owner sees. */
export const WipeScreen = ({ t }: ScreenProps) => {
  if (t < 30) {
    const progress = interpolate(t, [2, 28], [0, 1], ease);
    const r = 84;
    const length = 2 * Math.PI * r;
    return (
      <Centered>
        <svg width="210" height="210" viewBox="0 0 210 210">
          <circle
            cx="105"
            cy="105"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="14"
          />
          <circle
            cx="105"
            cy="105"
            r={r}
            fill="none"
            stroke={WHITE}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={length}
            strokeDashoffset={length * (1 - progress)}
            transform="rotate(-90 105 105)"
          />
        </svg>
        <Caption>Brisanje podatkov</Caption>
      </Centered>
    );
  }
  return (
    <AbsoluteFill style={{ backgroundColor: WHITE }}>
      {GREETINGS.map((greeting, i) => {
        const until = GREETINGS[i + 1]?.from ?? 999;
        return (
          <AbsoluteFill
            key={greeting.word}
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontFamily: manrope,
              fontWeight: 600,
              fontSize: 64,
              letterSpacing: "-0.03em",
              color: brand.ink,
              opacity: interpolate(
                t,
                [greeting.from, greeting.from + 4, until - 2, until + 2],
                [0, 1, 1, 0],
                clamp,
              ),
            }}
          >
            {greeting.word}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

/** 10. Clean: the logo appears and a shine sweeps across the crimson wallpaper. The grade tag is drawn by the scene. */
export const CleanScreen = ({ t }: ScreenProps) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(160deg, ${brand.primary} 0%, #5c0d24 55%, #1d0710 100%)`,
    }}
  >
    {/* The light Kranfix logo, centred below the grade tag; it stays through the promises. */}
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(t, [6, 16], [0, 1], clamp),
        translate: `0px ${interpolate(t, [6, 16], [24, 0], ease)}px`,
      }}
    >
      <Logo height={84} tone="onDark" />
    </AbsoluteFill>
    <div
      style={{
        position: "absolute",
        top: -200,
        width: 170,
        height: SCREEN.height + 400,
        rotate: "20deg",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
        left: interpolate(t, [4, 26], [-360, SCREEN.width + 200], ease),
      }}
    />
  </AbsoluteFill>
);

export const SCREENS = [
  LockScreen,
  BatteryScreen,
  DisplayScreen,
  CameraScreen,
  SoundScreen,
  ChargingScreen,
  UnlockScreen,
  NetworkScreen,
  WipeScreen,
  CleanScreen,
] as const;
