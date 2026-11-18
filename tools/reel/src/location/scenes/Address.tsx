import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { brand, geist, manrope } from "../../brand";
import mapScreenshot from "../assets/koroska-cesta-4.png";
import { clamp, dropHeight, Pin, rise, touchdown } from "../shared";

const MAP_WIDTH = 888;
const MAP_HEIGHT = 900;

/** Google Maps screenshot of Koroška cesta 4 and its size in px. */
const MAP_SIZE = { width: 1264, height: 1072 } as const;
/** Centre of the red Google marker's head in the screenshot; the crimson pin lands on it. */
const MARKER = { x: 694.5, y: 626 } as const;
/** Smallest scale that fills the card with the marker centred (the marker sits 446 px above the bottom edge), plus a margin. */
const MAP_SCALE = 1.04;
const PIN_SIZE = 128;
const PIN_DROP = 12;
const ADDRESS_LANDS = 44;

/** A ring that spreads out from the pin and fades, like a location ping. */
const Ripple = ({ start }: { readonly start: number }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + 30], [0, 1], clamp);

  if (frame < start) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: MAP_WIDTH / 2 - PIN_SIZE / 2,
        top: MAP_HEIGHT / 2 - PIN_SIZE / 2,
        width: PIN_SIZE,
        height: PIN_SIZE,
        borderRadius: PIN_SIZE / 2,
        border: `6px solid ${brand.primary}`,
        opacity: 0.5 * (1 - progress),
        scale: String(1 + progress * 2.6),
      }}
    />
  );
};

/** The Google map of Koroška cesta 4 slowly pushes in, the pin drops onto the address and the address rises in below. */
export const Address = () => {
  const frame = useCurrentFrame();
  const height = dropHeight(frame, PIN_DROP, 300);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        padding: "0 96px 220px",
        gap: 72,
      }}
    >
      <Interactive.Div
        name="Map"
        style={{
          position: "relative",
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          borderRadius: 48,
          overflow: "hidden",
          backgroundColor: brand.surface,
          ...rise(frame, 0, 60),
        }}
      >
        <Img
          src={mapScreenshot}
          style={{
            position: "absolute",
            left: MAP_WIDTH / 2 - MARKER.x * MAP_SCALE,
            top: MAP_HEIGHT / 2 - MARKER.y * MAP_SCALE,
            width: MAP_SIZE.width * MAP_SCALE,
            height: MAP_SIZE.height * MAP_SCALE,
            // The card centre is the marker, so the push-in stays on it.
            scale: interpolate(frame, [0, 105], [1, 1.15], {
              ...clamp,
              output: "perceptual-scale",
            }),
          }}
        />
        <Ripple start={touchdown(PIN_DROP)} />
        <Ripple start={touchdown(PIN_DROP) + 12} />
        <div
          style={{
            position: "absolute",
            left: MAP_WIDTH / 2 - PIN_SIZE / 2,
            top: MAP_HEIGHT / 2 - PIN_SIZE / 2,
            translate: `0px ${-height}px`,
            opacity: interpolate(
              frame,
              [PIN_DROP, PIN_DROP + 4],
              [0, 1],
              clamp,
            ),
          }}
        >
          <Pin size={PIN_SIZE} />
        </div>
      </Interactive.Div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Interactive.Div
          name="Street"
          style={{
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 112,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: brand.ink,
            ...rise(frame, ADDRESS_LANDS - 18, 70),
          }}
        >
          Koroška cesta 4
        </Interactive.Div>
        <Interactive.Div
          name="City"
          style={{
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 52,
            lineHeight: 1.3,
            color: brand.body,
            ...rise(frame, ADDRESS_LANDS - 12, 60),
          }}
        >
          4000 Kranj
        </Interactive.Div>
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Pin whoosh"
          src="https://remotion.media/whoosh.wav"
          from={PIN_DROP}
          durationInFrames={6}
          volume={0.4}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Pin lands"
          src="https://remotion.media/mouse-click.wav"
          from={touchdown(PIN_DROP)}
          durationInFrames={12}
        />
        <Audio
          name="Address ding"
          src="https://remotion.media/ding.wav"
          from={ADDRESS_LANDS}
          volume={0.3}
        />
      </Track>
    </AbsoluteFill>
  );
};
