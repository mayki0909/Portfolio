import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { clamp, expoOut, inter, kfx } from "../brand";
import {
  CheckIcon,
  ClockIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
} from "../icons";
import { rise } from "../motion";

/**
 * What a KFX service offers, all from kfxservis.si/servis: free diagnostics ("Brezplačna diagnostika je na voljo
 * v našem servisnem centru"), pickup ("Prevzem skiroja na mojem naslovu" on the booking form), the info bar's
 * 24–48 h and 12-month warranty. Update with the site.
 */
const PERKS = [
  { Icon: SearchIcon, text: "Brezplačna diagnostika" },
  { Icon: TruckIcon, text: "Prevzem skiroja na vašem naslovu" },
  { Icon: ClockIcon, text: "Večina popravil v 24–48 urah" },
  { Icon: ShieldIcon, text: "12 mesecev garancije na delo" },
] as const;

const ROW_START = 20;
const ROW_STAGGER = 18;
/** Once every row is in, a tick lands on each, one after another. */
const CHECK_START = ROW_START + (PERKS.length - 1) * ROW_STAGGER + 26;
const CHECK_STAGGER = 6;
const SPRING_LINE = CHECK_START + PERKS.length * CHECK_STAGGER + 10;

const Tick = ({ index }: { readonly index: number }) => {
  const frame = useCurrentFrame();
  const start = CHECK_START + index * CHECK_STAGGER;
  return (
    <div
      style={{
        width: 64,
        height: 64,
        flexShrink: 0,
        marginLeft: "auto",
        borderRadius: 32,
        backgroundColor: kfx.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(frame, [start, start + 4], [0, 1], clamp),
        scale: interpolate(frame, [start, start + 6, start + 12], [0.4, 1.15, 1], {
          ...clamp,
          output: "perceptual-scale",
        }),
      }}
    >
      <CheckIcon
        progress={interpolate(frame, [start + 2, start + 10], [0, 1], {
          ...clamp,
          easing: expoOut,
        })}
        size={38}
        color={kfx.primaryForeground}
        strokeWidth={3.5}
      />
    </div>
  );
};

/** "Servis pri KFX": four promises arrive one by one, get ticked, and "Spomladi bo pripravljen." closes. */
export const Perks = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.section,
        padding: "330px 80px 0",
        fontFamily: inter,
      }}
    >
      <div style={{ marginBottom: 56, paddingLeft: 16 }}>
        {[
          { text: "Servis", color: kfx.ink },
          { text: "pri KFX.", color: kfx.primary },
        ].map((line, index) => (
          <Interactive.Div
            key={line.text}
            name={line.text}
            style={{
              fontWeight: 600,
              fontSize: 120,
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
              color: line.color,
              ...rise(frame, index * 5, 70, 20),
            }}
          >
            {line.text}
          </Interactive.Div>
        ))}
      </div>

      {PERKS.map(({ Icon, text }, index) => (
        <Interactive.Div
          key={text}
          name={text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginTop: index === 0 ? 0 : 22,
            padding: "28px 32px",
            borderRadius: 32,
            border: `2px solid ${kfx.border}`,
            backgroundColor: kfx.white,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
            ...rise(frame, ROW_START + index * ROW_STAGGER, 60, 18),
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              flexShrink: 0,
              borderRadius: 22,
              backgroundColor: kfx.ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={52} color={kfx.primaryForeground} />
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 42,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: kfx.ink,
            }}
          >
            {text}
          </div>
          <Tick index={index} />
        </Interactive.Div>
      ))}

      <Interactive.Div
        name="Spring"
        style={{
          marginTop: 56,
          paddingLeft: 16,
          fontWeight: 600,
          fontSize: 64,
          letterSpacing: "-0.03em",
          color: kfx.ink,
          ...rise(frame, SPRING_LINE, 40, 18),
        }}
      >
        Spomladi bo <span style={{ color: kfx.primary }}>pripravljen.</span>
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        {PERKS.map(({ text }, index) => (
          <Audio
            key={text}
            name={`${text} click`}
            src="https://remotion.media/mouse-click.wav"
            from={ROW_START + index * ROW_STAGGER + 4}
            durationInFrames={10}
            volume={0.35}
          />
        ))}
      </Track>
      <Track name="Ding">
        <Audio
          name="All ticked ding"
          src="https://remotion.media/ding.wav"
          from={CHECK_START + (PERKS.length - 1) * CHECK_STAGGER + 6}
          volume={0.5}
        />
      </Track>
    </AbsoluteFill>
  );
};
