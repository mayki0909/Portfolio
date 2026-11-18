import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  staticFile,
  Track,
  useCurrentFrame,
} from "remotion";
import { brand, geist, manrope } from "../../brand";
import { clamp, dropHeight, Pin, rise, touchdown } from "../shared";

const PIN_SIZE = 168;
const DROP_FROM = 420;
/** Waits for the slide-in transition, so the drop is seen. */
const START = 10;

/** Hook: the pin drops onto the page, then "Nova lokacija" and the headline rise in. */
export const NewHome = () => {
  const frame = useCurrentFrame();
  const height = dropHeight(frame, START, DROP_FROM);
  const lift = height / DROP_FROM;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        padding: "0 96px 220px",
        gap: 64,
      }}
    >
      <Interactive.Div
        name="Pin"
        style={{
          position: "relative",
          alignSelf: "flex-start",
          width: PIN_SIZE,
          height: PIN_SIZE + 30,
        }}
      >
        {/* Contact shadow: grows and darkens as the pin comes down. */}
        <div
          style={{
            position: "absolute",
            left: PIN_SIZE * 0.15,
            top: PIN_SIZE + 6,
            width: PIN_SIZE * 0.7,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.16)",
            opacity: 1 - lift,
            scale: String(0.5 + 0.5 * (1 - lift)),
          }}
        />
        <div
          style={{
            translate: `0px ${-height}px`,
            opacity: interpolate(frame, [START, START + 4], [0, 1], clamp),
          }}
        >
          <Pin size={PIN_SIZE} />
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Badge"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          alignSelf: "flex-start",
          padding: "20px 28px",
          borderRadius: 22,
          border: "3px solid rgba(175,26,68,0.2)",
          backgroundColor: "rgba(175,26,68,0.08)",
          fontFamily: geist,
          fontSize: 40,
          lineHeight: 1.2,
          color: brand.body,
          ...rise(frame, START + 8, 60),
        }}
      >
        <Img
          src={staticFile("home/icon-pin-sm.svg")}
          style={{ width: 40, height: 40 }}
        />
        Nova lokacija
      </Interactive.Div>

      <div
        style={{
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 116,
          lineHeight: 1.08,
          letterSpacing: "-0.04em",
          color: brand.ink,
        }}
      >
        <Interactive.Div
          name="Headline line 1"
          style={rise(frame, START + 14, 80, 22)}
        >
          Kranfix ima
        </Interactive.Div>
        <Interactive.Div
          name="Headline accent 1"
          style={{ color: brand.primary, ...rise(frame, START + 20, 80, 22) }}
        >
          novo lokacijo
        </Interactive.Div>
        <Interactive.Div
          name="Headline accent 2"
          style={{ color: brand.primary, ...rise(frame, START + 26, 80, 22) }}
        >
          poslovalnice!
        </Interactive.Div>
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Drop whoosh"
          src="https://remotion.media/whoosh.wav"
          from={START}
          durationInFrames={6}
          volume={0.5}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Pin lands"
          src="https://remotion.media/mouse-click.wav"
          from={touchdown(START)}
          durationInFrames={12}
        />
      </Track>
    </AbsoluteFill>
  );
};
