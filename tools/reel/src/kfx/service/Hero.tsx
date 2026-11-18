import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Track, useCurrentFrame } from "remotion";
import { inter, kfx } from "../brand";
import { MechanicPhoto } from "../MechanicPhoto";
import { rise } from "../motion";
import { ClockIcon, ShieldIcon } from "../icons";

/** The service page's hero title (app/servis/page.tsx), one word group per line. */
const TITLE = ["SERVIS", "E-SKIROJEV", "IN E-KOLES"] as const;

/** From the service page's info bar (components/servis/servis-info-bar.tsx). */
const PERKS = [
  { Icon: ClockIcon, text: "Večina popravil v 24–48 urah" },
  { Icon: ShieldIcon, text: "12 mesecev garancije na delo" },
] as const;
const PERK_START = 34;
const PERK_STAGGER = 7;

/** Opening scene, after the service page's hero: the mechanic at work and what KFX promises. */
export const Hero = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: kfx.footer }}>
      <MechanicPhoto />

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 360,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontFamily: inter,
        }}
      >
        <Interactive.Div
          name="Label"
          style={{
            marginBottom: 32,
            padding: "12px 22px",
            borderRadius: 12,
            backgroundColor: kfx.primary,
            color: kfx.white,
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: "0.04em",
            ...rise(frame, 4, 30),
          }}
        >
          CERTIFICIRAN SERVIS
        </Interactive.Div>

        {TITLE.map((line, index) => (
          <Interactive.Div
            key={line}
            name={`Title line ${index + 1}`}
            style={{
              fontWeight: 600,
              fontSize: 112,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: kfx.primaryForeground,
              ...rise(frame, 8 + index * 5, 70, 20),
            }}
          >
            {line}
          </Interactive.Div>
        ))}

        <Interactive.Div
          name="Experience"
          style={{
            marginTop: 28,
            marginBottom: 40,
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.3,
            color: kfx.footerMuted,
            ...rise(frame, 24, 40),
          }}
        >
          V Kranju od leta 2019.
        </Interactive.Div>

        {PERKS.map(({ Icon, text }, index) => (
          <Interactive.Div
            key={text}
            name={text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: index === 0 ? 0 : 18,
              fontWeight: 500,
              fontSize: 38,
              color: kfx.primaryForeground,
              ...rise(frame, PERK_START + index * PERK_STAGGER, 40),
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                backgroundColor: kfx.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={40} color={kfx.primaryForeground} />
            </div>
            {text}
          </Interactive.Div>
        ))}
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        {PERKS.map(({ text }, index) => (
          <Audio
            key={text}
            name={`${text} click`}
            src="https://remotion.media/mouse-click.wav"
            from={PERK_START + index * PERK_STAGGER + 2}
            // Shorter than the stagger: items in a Track must not overlap in Studio.
            durationInFrames={PERK_STAGGER - 1}
            volume={0.3}
          />
        ))}
      </Track>
    </AbsoluteFill>
  );
};
