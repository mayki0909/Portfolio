import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { brand, geist, manrope } from "../brand";

/** Pulsing dot, the site's "Trenutno odprto" badge dot scaled to video size. */
const LiveDot = () => {
  const frame = useCurrentFrame();
  const pulse = (frame % 30) / 30;

  return (
    <span style={{ position: "relative", width: 22, height: 22 }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 11,
          backgroundColor: brand.live,
          opacity: 0.45 * (1 - pulse),
          scale: String(1 + pulse * 1.6),
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 11,
          backgroundColor: brand.live,
        }}
      />
    </span>
  );
};

export const Announce = () => {
  const frame = useCurrentFrame();

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
        name="Live badge"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          alignSelf: "flex-start",
          padding: "20px 28px",
          borderRadius: 22,
          border: "3px solid rgba(34,197,94,0.2)",
          backgroundColor: "rgba(34,197,94,0.2)",
          fontFamily: geist,
          fontSize: 40,
          lineHeight: 1.2,
          color: "#525252",
          opacity: interpolate(frame, [8, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [8, 28], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      >
        <LiveDot />
        Zdaj na spletu
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
          name="Headline line 1"
          style={{
            opacity: interpolate(frame, [14, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [14, 36], ["0px 80px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Nova spletna
        </Interactive.Div>
        <Interactive.Div
          name="Headline line 2"
          style={{
            opacity: interpolate(frame, [20, 42], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [20, 42], ["0px 80px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          stran je
        </Interactive.Div>
        <Interactive.Div
          name="Headline accent"
          style={{
            color: "#af1a44",
            opacity: interpolate(frame, [26, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [26, 48], ["0px 80px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          zaživela.
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
