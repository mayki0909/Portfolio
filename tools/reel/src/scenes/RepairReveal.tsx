import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { brand, glide, manrope } from "../brand";

/**
 * service-screen(-fixed).png are 1024×1536 with the handset on white.
 * Cracked handset: x 157–867, y 54–1478. Fixed handset: x 152–871, y 21–1475.
 */
const PHOTO_HEIGHT = 1240;
const PHOTO_WIDTH = (PHOTO_HEIGHT * 1024) / 1536;
const PHOTO_TOP = 640;
/** Scale and offset that lay the fixed handset exactly over the cracked one. */
const FIXED_SCALE = 1424 / 1454;
const FIXED_LEFT = ((512 - FIXED_SCALE * 511.5) / 1024) * 100;
const FIXED_TOP = ((54 - FIXED_SCALE * 21) / 1536) * 100;
/** The scan line spans the handset, not the photo's white margin (percent of the photo). */
const HANDSET_WIDTH = PHOTO_WIDTH * (710 / 1024);
const HANDSET_TOP = (54 / 1536) * 100;
const HANDSET_BOTTOM = (1478 / 1536) * 100;

const ScanLine = () => {
  const frame = useCurrentFrame();
  const edge = interpolate(frame, [20, 52], [HANDSET_TOP, HANDSET_BOTTOM], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: glide,
  });
  const revealed = frame < 20 ? 0 : frame >= 52 ? 100 : edge;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 ${100 - revealed}% 0)`,
        }}
      >
        <Img
          src={staticFile("home/service-screen-fixed.png")}
          style={{
            position: "absolute",
            left: `${FIXED_LEFT}%`,
            top: `${FIXED_TOP}%`,
            width: `${FIXED_SCALE * 100}%`,
            height: `${FIXED_SCALE * 100}%`,
            filter: "brightness(1.012)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: `${edge}%`,
          left: (PHOTO_WIDTH - HANDSET_WIDTH) / 2,
          width: HANDSET_WIDTH,
          height: 8,
          marginTop: -4,
          borderRadius: 4,
          backgroundColor: brand.primary,
          boxShadow: `0 0 36px 8px rgba(175,26,68,0.55)`,
          opacity: interpolate(frame, [16, 22, 48, 54], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </>
  );
};

export const RepairReveal = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 96,
          right: 96,
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: 112,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: brand.ink,
        }}
      >
        <Interactive.Div
          name="Repair title line 1"
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [0, 20], ["0px 70px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          Popravilo
        </Interactive.Div>
        <Interactive.Div
          name="Repair title line 2"
          style={{
            color: "#af1a44",
            opacity: interpolate(frame, [6, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [6, 26], ["0px 70px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          rezervirate
        </Interactive.Div>
        <Interactive.Div
          name="Repair title line 3"
          style={{
            opacity: interpolate(frame, [12, 32], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            translate: interpolate(frame, [12, 32], ["0px 70px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          v nekaj klikih.
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Repair photo"
        style={{
          position: "absolute",
          top: PHOTO_TOP,
          left: (1080 - PHOTO_WIDTH) / 2,
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          scale: interpolate(frame, [0, 75], [1.06, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <Img
          src={staticFile("home/service-screen.png")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: "brightness(1.012)",
          }}
        />
        <ScanLine />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
