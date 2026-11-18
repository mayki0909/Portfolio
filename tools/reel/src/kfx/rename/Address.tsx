import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import { clamp, inter, kfx } from "../brand";
import { MapPinIcon } from "../icons";
import { rise } from "../motion";

/**
 * `CONTACTS.address` and `openingHours` in krgofix/apps/webshop/constants.ts, which match the live
 * /poslovalnice page. The rebrand moved the address there from Poštna ulica 3a. Update both if they change.
 */
const STREET = "Drulovka 51";
const CITY = "4000 Kranj";
const HOURS = [
  { days: "Pon–Pet", time: "9:00 – 16:00" },
  { days: "Sob", time: "9:00 – 12:00" },
] as const;

const PIN = 6;
const DROP_FRAMES = 20;
const PIN_SIZE = 190;
/** Easing.bounce first lands at t = 1 / 2.75. */
const TOUCHDOWN = PIN + Math.round(DROP_FRAMES / 2.75);
const ROW_START = 44;
const ROW_STAGGER = 7;

/** The new address: a pin drops in, the street and city rise in, then the opening hours row by row. */
export const Address = () => {
  const frame = useCurrentFrame();
  const drop = interpolate(frame, [PIN, PIN + DROP_FRAMES], [-760, 0], {
    ...clamp,
    easing: Easing.bounce,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.white,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 120,
        fontFamily: inter,
        textAlign: "center",
      }}
    >
      <Interactive.Div
        name="Badge"
        style={{
          padding: "14px 28px",
          borderRadius: 14,
          backgroundColor: kfx.primary,
          color: kfx.white,
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: "0.02em",
          ...rise(frame, 0, 30),
        }}
      >
        Nova lokacija
      </Interactive.Div>

      <div
        style={{ position: "relative", marginTop: 56, height: PIN_SIZE + 24 }}
      >
        {/* Shadow on the ground, growing as the pin comes down. */}
        <div
          style={{
            position: "absolute",
            left: PIN_SIZE / 2 - 70,
            top: PIN_SIZE + 6,
            width: 140,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            opacity: interpolate(frame, [PIN, PIN + 4], [0, 1], clamp),
            scale: interpolate(drop, [-760, 0], [0.3, 1], clamp),
          }}
        />
        <Interactive.Div
          name="Pin"
          style={{
            width: PIN_SIZE,
            height: PIN_SIZE,
            borderRadius: PIN_SIZE / 2,
            backgroundColor: kfx.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [PIN, PIN + 3], [0, 1], clamp),
            translate: `0px ${drop}px`,
          }}
        >
          <MapPinIcon size={96} color={kfx.white} />
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Street"
        style={{
          marginTop: 44,
          fontWeight: 600,
          fontSize: 132,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: kfx.ink,
          ...rise(frame, 24, 60, 18),
        }}
      >
        {STREET}
      </Interactive.Div>
      <Interactive.Div
        name="City"
        style={{
          marginTop: 12,
          fontWeight: 500,
          fontSize: 56,
          color: kfx.muted,
          ...rise(frame, 30, 40),
        }}
      >
        {CITY}
      </Interactive.Div>

      <div style={{ marginTop: 72, width: 760 }}>
        {HOURS.map((row, index) => (
          <Interactive.Div
            key={row.days}
            name={row.days}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "28px 0",
              borderTop: `3px solid ${kfx.border}`,
              ...rise(frame, ROW_START + index * ROW_STAGGER, 40),
            }}
          >
            <span style={{ fontWeight: 500, fontSize: 44, color: kfx.muted }}>
              {row.days}
            </span>
            <span style={{ fontWeight: 600, fontSize: 52, color: kfx.ink }}>
              {row.time}
            </span>
          </Interactive.Div>
        ))}
      </div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        <Audio
          name="Pin click"
          src="https://remotion.media/mouse-click.wav"
          from={TOUCHDOWN}
          durationInFrames={10}
        />
        {HOURS.map((row, index) => (
          <Audio
            key={row.days}
            name={`${row.days} click`}
            src="https://remotion.media/mouse-click.wav"
            from={ROW_START + index * ROW_STAGGER}
            durationInFrames={ROW_STAGGER - 1}
            volume={0.3}
          />
        ))}
      </Track>
    </AbsoluteFill>
  );
};
