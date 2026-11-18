import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { brand, geist, glide, manrope } from "../brand";
import { Logo } from "../Logo";

/** footer-city.png is 1658×949; its skyline sits in the bottom 60%. */
const CITY_WIDTH = 1700;
const CITY_HEIGHT = (CITY_WIDTH * 949) / 1658;

const Arrow = () => {
  const frame = useCurrentFrame();
  // The site's hover nudge (`.home-arrow`), played once the button has landed.
  const nudge = interpolate(frame, [44, 56, 68], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: glide,
  });

  return (
    <Img
      src={staticFile("home/icon-arrow-light.svg")}
      style={{ width: 44, height: 44, translate: `${nudge * 9}px 0px` }}
    />
  );
};

export const Outro = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      <Img
        src={staticFile("home/footer-city.png")}
        style={{
          position: "absolute",
          left: (1080 - CITY_WIDTH) / 2,
          bottom: -40,
          width: CITY_WIDTH,
          height: CITY_HEIGHT,
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [0, 90], ["0px 80px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 430,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Outro logo"
          style={{
            opacity: interpolate(frame, [0, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0, 22], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          <Logo height={150} />
        </Interactive.Div>

        <Interactive.Div
          name="Outro domain"
          style={{
            marginTop: 36,
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            opacity: interpolate(frame, [6, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [6, 28], ["0px 70px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          kranfix.si
        </Interactive.Div>

        <Interactive.Div
          name="Outro services"
          style={{
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.3,
            color: "#525252",
            opacity: interpolate(frame, [12, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [12, 34], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Popravila · Nakup · Odkup · Dodatki
        </Interactive.Div>

        <Interactive.Div
          name="Outro button"
          style={{
            marginTop: 12,
            height: 120,
            padding: "0 64px",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            gap: 20,
            backgroundColor: "#af1a44",
            color: "#fafafa",
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 46,
            opacity: interpolate(frame, [18, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [18, 40], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Obiščite nas
          <Arrow />
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
