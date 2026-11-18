import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Track, useCurrentFrame } from "remotion";
import { brand, geist, manrope } from "./brand";
import { rise } from "./location/shared";

/** Waits for the slide-in transition. */
const START = 10;

/**
 * Closing card before `LogoOutro`: a badge and a three-line headline whose last line is the
 * accent, in the layout of the launch reel's "Zdaj na spletu" scene.
 */
export const EndCard = ({
  badge,
  lines,
  accent,
  color = brand.primary,
}: {
  readonly badge: string;
  readonly lines: readonly [string, string];
  readonly accent: string;
  /** Crimson by default; buyback uses the site's green Refix colour. */
  readonly color?: string;
}) => {
  const frame = useCurrentFrame();
  const tint = color === brand.primary ? "175,26,68" : "48,107,52";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        padding: "0 96px 220px",
        gap: 56,
      }}
    >
      <Interactive.Div
        name="Badge"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          alignSelf: "flex-start",
          padding: "20px 28px",
          borderRadius: 22,
          border: `3px solid rgba(${tint},0.2)`,
          backgroundColor: `rgba(${tint},0.08)`,
          fontFamily: geist,
          fontSize: 40,
          lineHeight: 1.2,
          color,
          ...rise(frame, START, 60),
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: color,
          }}
        />
        {badge}
      </Interactive.Div>

      <div
        style={{
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 132,
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          color: brand.ink,
        }}
      >
        <Interactive.Div
          name="End line 1"
          style={rise(frame, START + 6, 80, 22)}
        >
          {lines[0]}
        </Interactive.Div>
        <Interactive.Div
          name="End line 2"
          style={rise(frame, START + 12, 80, 22)}
        >
          {lines[1]}
        </Interactive.Div>
        <Interactive.Div
          name="End accent"
          style={{ color, ...rise(frame, START + 18, 80, 22) }}
        >
          {accent}
        </Interactive.Div>
      </div>

      {/* CC0 sound effect from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="End whoosh"
          src="https://remotion.media/whoosh.wav"
          from={START}
          durationInFrames={8}
          volume={0.4}
        />
      </Track>
    </AbsoluteFill>
  );
};
