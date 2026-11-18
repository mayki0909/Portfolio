import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import hero from "../assets/hero.jpg";
import { clamp, inter, kfx } from "../brand";
import { rise } from "../motion";
import { Snow } from "../Snow";

/**
 * The website's hero scooter (1440×800) across the top two thirds of the frame, scooter centred,
 * slowly zooming out while snow falls on it.
 */
const PHOTO_HEIGHT = 1240;
const PHOTO_SCALE = PHOTO_HEIGHT / 800;
/** The scooter's centre in the source is at about x 1060. */
const PHOTO_LEFT = 540 - 1060 * PHOTO_SCALE;

/** When the second thought lands: the scooter rests, the shop doesn't. */
const TURN = 42;

/** Opening: "Skiro pozimi počiva." and then, in crimson, "Pravi čas za servis." */
export const Hook = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: kfx.footer, fontFamily: inter }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: PHOTO_HEIGHT,
          overflow: "hidden",
        }}
      >
        <Interactive.Div
          name="Photo"
          style={{
            position: "absolute",
            top: 0,
            left: PHOTO_LEFT,
            width: 1440 * PHOTO_SCALE,
            height: PHOTO_HEIGHT,
            transformOrigin: `${540 - PHOTO_LEFT}px 60%`,
            scale: interpolate(frame, [0, 105], [1.12, 1], {
              ...clamp,
              output: "perceptual-scale",
            }),
          }}
        >
          <Img src={hero} style={{ width: "100%", height: "100%" }} />
        </Interactive.Div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(180deg, rgba(23,23,23,0.45) 0%, rgba(23,23,23,0) 18%, rgba(23,23,23,0) 55%, ${kfx.footer} 96%)`,
          }}
        />
      </div>

      <Snow count={110} speed={1.1} seed="winter-hook" />

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 380,
        }}
      >
        {["Skiro pozimi", "počiva."].map((line, index) => (
          <Interactive.Div
            key={line}
            name={line}
            style={{
              fontWeight: 600,
              fontSize: 128,
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
              color: kfx.primaryForeground,
              ...rise(frame, 6 + index * 6, 70, 20),
            }}
          >
            {line}
          </Interactive.Div>
        ))}
        <Interactive.Div
          name="Turn"
          style={{
            marginTop: 28,
            fontWeight: 600,
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: kfx.primary,
            ...rise(frame, TURN, 50, 18),
          }}
        >
          Pravi čas za servis.
        </Interactive.Div>
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whoosh">
        <Audio
          name="Turn whoosh"
          src="https://remotion.media/whoosh.wav"
          from={TURN - 4}
          volume={0.35}
        />
      </Track>
    </AbsoluteFill>
  );
};
