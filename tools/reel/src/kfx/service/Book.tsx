import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  spring,
  Track,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, ease, inter, kfx } from "../brand";
import { rise } from "../motion";
import { CalendarFoldIcon, PhoneIcon } from "../icons";

/** `CONTACTS.phone` in krgofix/apps/webshop/constants.ts. */
const PHONE = "+386 70 646 482";

const BUTTON_IN = 14;
/** A finger taps the button: it presses in and a ripple spreads from the tap. */
const TAP = 46;
const OR_CALL = 62;
/** After the tap, a ring pulses out of the button every PULSE_EVERY frames, to keep the eye on it. */
const PULSE_START = 80;
const PULSE_EVERY = 40;
/** The phone icon wiggles like it's ringing. */
const RING = 92;

/** Rotation of the phone icon: two quick shakes, then still. */
const ringAngle = (frame: number) => {
  const t = frame - RING;
  if (t < 0 || t > 20) {
    return 0;
  }
  return Math.sin((t / 20) * Math.PI * 6) * 14 * (1 - t / 20);
};

/** Call to action: the site's "Rezerviraj termin" button gets tapped, and the phone number for those who'd rather call. */
export const Book = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - BUTTON_IN,
    fps,
    config: { damping: 13, stiffness: 160, mass: 0.7 },
  });
  const press = interpolate(frame, [TAP - 3, TAP, TAP + 7], [1, 0.94, 1], {
    ...clamp,
    easing: ease,
  });
  const ripple = interpolate(frame, [TAP, TAP + 18], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const pulse =
    frame < PULSE_START ? 0 : ((frame - PULSE_START) % PULSE_EVERY) / 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.white,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingBottom: 140,
        fontFamily: inter,
        scale: interpolate(frame, [0, 150], [1, 1.03], {
          ...clamp,
          output: "perceptual-scale",
        }),
      }}
    >
      {["Prijavite se", "na termin."].map((line, index) => (
        <Interactive.Div
          key={line}
          name={`Title line ${index + 1}`}
          style={{
            fontWeight: 600,
            fontSize: 112,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: index === 1 ? kfx.primary : kfx.ink,
            ...rise(frame, index * 5, 70, 20),
          }}
        >
          {line}
        </Interactive.Div>
      ))}

      <div style={{ position: "relative", marginTop: 88 }}>
        {pulse > 0 && pulse < 1 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              border: `4px solid ${kfx.primary}`,
              opacity: 0.5 * (1 - pulse),
              scale: 1 + pulse * 0.18,
            }}
          />
        ) : null}
        <Interactive.Div
          name="Button"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "40px 64px",
            borderRadius: 24,
            backgroundColor: kfx.primary,
            color: kfx.primaryForeground,
            fontWeight: 500,
            fontSize: 54,
            boxShadow: "0px 18px 40px rgba(175, 26, 68, 0.28)",
            opacity: interpolate(
              frame,
              [BUTTON_IN, BUTTON_IN + 6],
              [0, 1],
              clamp,
            ),
            scale: interpolate(pop, [0, 1], [0.7, 1]) * press,
          }}
        >
          <CalendarFoldIcon size={56} color={kfx.primaryForeground} />
          Rezerviraj termin
          {frame >= TAP ? (
            <div
              style={{
                position: "absolute",
                left: "62%",
                top: "56%",
                width: 900,
                height: 900,
                marginLeft: -450,
                marginTop: -450,
                borderRadius: 450,
                backgroundColor: kfx.white,
                opacity: 0.35 * (1 - ripple),
                scale: ripple,
              }}
            />
          ) : null}
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Or call"
        style={{
          marginTop: 72,
          fontWeight: 500,
          fontSize: 38,
          color: kfx.muted,
          ...rise(frame, OR_CALL, 40),
        }}
      >
        ali pokličite
      </Interactive.Div>
      <Interactive.Div
        name="Phone"
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontWeight: 600,
          fontSize: 64,
          letterSpacing: "-0.02em",
          color: kfx.ink,
          ...rise(frame, OR_CALL + 6, 40),
        }}
      >
        <div style={{ rotate: `${ringAngle(frame)}deg` }}>
          <PhoneIcon size={52} color={kfx.primary} />
        </div>
        {PHONE}
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Clicks">
        <Audio
          name="Tap click"
          src="https://remotion.media/mouse-click.wav"
          from={TAP - 1}
          durationInFrames={10}
        />
      </Track>
    </AbsoluteFill>
  );
};
