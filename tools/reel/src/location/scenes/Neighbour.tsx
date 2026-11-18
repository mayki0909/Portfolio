import { Audio } from "@remotion/media";
import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { brand, geist, glide, manrope } from "../../brand";
import { Logo } from "../../Logo";
import { clamp, dropHeight, Pin, rise, touchdown } from "../shared";

/** Flat illustration of the Globus building: its rooftop name, two floors of windows, then Kranfix and A1. */
const BUILDING_WIDTH = 888;
const ROOF_SIGN_HEIGHT = 130;
const UPPER_HEIGHT = 300;
const SHOP_HEIGHT = 420;
const SIGN_HEIGHT = 104;
const INSET = 24;
const SHOP_WIDTH = (BUILDING_WIDTH - INSET * 3) / 2;
const SHOP_CENTRES = [
  INSET + SHOP_WIDTH / 2,
  INSET * 2 + SHOP_WIDTH * 1.5,
] as const;

const PIN_SIZE = 120;
/** The pin rests just above the shop signs. */
const PIN_TOP = ROOF_SIGN_HEIGHT + UPPER_HEIGHT - PIN_SIZE - 18;
const PIN_DROP = 10;
const HOP = [40, 56] as const;
const HOP_HEIGHT = 180;

const line = "#d4d4d4";
const pane = "#e5e5e5";

const Shopfront = ({
  sign,
  signColor,
  glass,
  start,
}: {
  readonly sign: ReactNode;
  readonly signColor: string;
  readonly glass: string;
  readonly start: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: SHOP_WIDTH,
        height: SHOP_HEIGHT - INSET,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          height: SIGN_HEIGHT,
          borderRadius: 18,
          backgroundColor: signColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(frame, [start, start + 14], [0, 1], {
            ...clamp,
            easing: glide,
          }),
        }}
      >
        {sign}
      </div>
      <div style={{ flex: 1, display: "flex", gap: 18 }}>
        <div
          style={{
            flex: 1,
            borderRadius: 14,
            border: `4px solid ${line}`,
            backgroundColor: glass,
          }}
        />
        <div
          style={{
            position: "relative",
            width: 112,
            borderRadius: "14px 14px 0 0",
            border: `4px solid ${line}`,
            borderBottom: "none",
            backgroundColor: pane,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              width: 10,
              height: 44,
              borderRadius: 5,
              backgroundColor: brand.muted,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/** The pin drops onto A1 (right), then hops next door onto Kranfix (left): "Takoj zraven A1." */
export const Neighbour = () => {
  const frame = useCurrentFrame();
  const drop = dropHeight(frame, PIN_DROP, 300);
  const hop = interpolate(frame, HOP, [0, 1], clamp);
  const pinX =
    SHOP_CENTRES[1] +
    interpolate(hop, [0, 1], [0, SHOP_CENTRES[0] - SHOP_CENTRES[1]], {
      easing: glide,
    });
  const pinY = PIN_TOP - drop - Math.sin(hop * Math.PI) * HOP_HEIGHT;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        padding: "0 96px 220px",
        gap: 88,
      }}
    >
      <Interactive.Div
        name="Building"
        style={{
          position: "relative",
          width: BUILDING_WIDTH,
          ...rise(frame, 0, 60),
        }}
      >
        {/* The building's name on its roof. */}
        <div
          style={{
            height: ROOF_SIGN_HEIGHT,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 16,
            fontFamily: geist,
            fontWeight: 600,
            fontSize: 88,
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: brand.text,
            opacity: interpolate(frame, [6, 20], [0, 1], {
              ...clamp,
              easing: glide,
            }),
          }}
        >
          Globus
        </div>
        <div
          style={{
            borderRadius: "28px 28px 0 0",
            border: `4px solid ${line}`,
            borderBottom: "none",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            style={{
              height: UPPER_HEIGHT,
              padding: `${INSET * 2}px ${INSET * 2}px ${INSET}px`,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: INSET * 1.5,
            }}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                style={{ borderRadius: 14, backgroundColor: pane }}
              />
            ))}
          </div>
          <div
            style={{
              height: SHOP_HEIGHT,
              padding: `0 ${INSET}px`,
              display: "flex",
              gap: INSET,
            }}
          >
            <Shopfront
              start={8}
              signColor={brand.primary}
              glass="rgba(175,26,68,0.06)"
              sign={<Logo height={56} tone="onDark" />}
            />
            <Shopfront
              start={12}
              signColor={pane}
              glass={brand.surface}
              sign={
                <span
                  style={{
                    fontFamily: geist,
                    fontWeight: 600,
                    fontSize: 56,
                    color: brand.muted,
                  }}
                >
                  A1
                </span>
              }
            />
          </div>
        </div>
        {/* Pavement. */}
        <div
          style={{
            height: 8,
            marginInline: -48,
            borderRadius: 4,
            backgroundColor: line,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: pinX - PIN_SIZE / 2,
            top: pinY,
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
        <Interactive.Div name="Headline line 1" style={rise(frame, 24, 80, 22)}>
          Takoj zraven
        </Interactive.Div>
        <Interactive.Div name="Headline line 2" style={rise(frame, 30, 80, 22)}>
          A1.
        </Interactive.Div>
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        <Audio
          name="Pin lands"
          src="https://remotion.media/mouse-click.wav"
          from={touchdown(PIN_DROP)}
          durationInFrames={12}
          volume={0.7}
        />
        <Audio
          name="Hop lands"
          src="https://remotion.media/mouse-click.wav"
          from={HOP[1]}
          durationInFrames={12}
        />
      </Track>
      <Track name="Whooshes">
        <Audio
          name="Hop whoosh"
          src="https://remotion.media/whoosh.wav"
          from={HOP[0]}
          durationInFrames={6}
          volume={0.4}
        />
      </Track>
    </AbsoluteFill>
  );
};
