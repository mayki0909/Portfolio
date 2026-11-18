import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, glide } from "../brand";
import { SceneTitle } from "./SceneTitle";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CARD_SIZE = 888;
/** refix-mark-lg.svg is 74.14×44.6. */
const MARK_WIDTH = 74.1428 * 2.6;
const MARK_HEIGHT = 44.5986 * 2.6;

/**
 * "Odkup rabljenih telefonov.": the site's buyback photo in a card, with the green Refix mark,
 * as in components/home/buyback-section.tsx.
 */
export const Buyback = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mark = spring({
    frame: frame - 24,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: brand.white }}>
      <SceneTitle
        lines={["Odkup", "rabljenih", "telefonov."]}
        accent={brand.refix}
      />

      <Interactive.Div
        name="Buyback photo"
        style={{
          position: "absolute",
          top: 660,
          left: (1080 - CARD_SIZE) / 2,
          width: CARD_SIZE,
          height: CARD_SIZE,
          borderRadius: 48,
          overflow: "hidden",
          backgroundColor: "#f7f7f7",
          opacity: interpolate(frame, [4, 24], [0, 1], {
            ...clamp,
            easing: glide,
          }),
          translate: interpolate(frame, [4, 24], ["0px 70px", "0px 0px"], {
            ...clamp,
            easing: glide,
          }),
        }}
      >
        <Img
          src={staticFile("home/buyback-phones.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: interpolate(frame, [0, 75], [1.08, 1], {
              ...clamp,
              easing: glide,
              output: "perceptual-scale",
            }),
          }}
        />
        <Img
          src={staticFile("home/refix-mark-lg.svg")}
          style={{
            position: "absolute",
            right: 56,
            bottom: 56,
            width: MARK_WIDTH,
            height: MARK_HEIGHT,
            opacity: interpolate(frame, [24, 30], [0, 1], clamp),
            scale: String(0.6 + 0.4 * mark),
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
