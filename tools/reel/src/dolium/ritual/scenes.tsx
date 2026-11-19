import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import garden from "../assets/posts/barrel-garden.jpg";
import interior from "../assets/posts/custom-interior.jpg";
import lake from "../assets/sauna-lake.jpg";
import view from "../assets/posts/window-lake.jpg";
import { clamp, dmSans, dmSerif, dolium, ease, expoOut } from "../brand";
import {
  barrel,
  dolium as doliumLine,
  LOGO_VIEWBOX,
  savne,
} from "../logoPaths";

/** Daylight scenes. The last one holds long enough for the line, then the logo. */
export const VRT_FRAMES = 110;
export const VIEW_FRAMES = 96;
export const WOOD_FRAMES = 96;
export const CLOSE_FRAMES = 124;

const LINE_BOTTOM = 320;

/**
 * A photograph, full frame, drifting. `focus` is where the frame looks,
 * as a share of the photo's width, from the start of the scene to the end.
 */
const Plate = ({
  src,
  focus,
  focusY = 46,
  zoom = 1.08,
  rise = 1.04,
}: {
  readonly src: string;
  readonly focus: readonly [number, number];
  /** Where the frame looks vertically, as a share of the photo's height. */
  readonly focusY?: number;
  /** Starting scale. Above 1 crops a landscape photo top and bottom. */
  readonly zoom?: number;
  readonly rise?: number;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const x = focus[0] + (focus[1] - focus[0]) * t;

  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `${x}% ${focusY}%`,
        transform: `scale(${interpolate(t, [0, 1], [zoom, rise])})`,
        transformOrigin: `${x}% ${focusY}%`,
        filter: "contrast(1.04) saturate(1.06)",
      }}
    />
  );
};

/** A short darkening at the bottom so a light line can sit on a bright photograph. */
const Floor = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "linear-gradient(to top, rgba(28, 18, 12, 0.62) 0%, rgba(28, 18, 12, 0.16) 26%, rgba(28, 18, 12, 0) 48%)",
    }}
  />
);

/** One line, large, at the lower left. Not a numbered caption. */
const Line = ({
  text,
  start = 10,
  end,
}: {
  readonly text: string;
  readonly start?: number;
  readonly end?: number;
}) => {
  const frame = useCurrentFrame();
  const inOpacity = interpolate(frame, [start, start + 14], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const outOpacity =
    end === undefined
      ? 1
      : interpolate(frame, [end, end + 12], [1, 0], { ...clamp, easing: ease });
  const rise = interpolate(frame, [start, start + 18], [36, 0], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 84,
        right: 140,
        bottom: LINE_BOTTOM,
        transform: `translateY(${rise}px)`,
        opacity: inOpacity * outOpacity,
        fontFamily: dmSerif,
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 104,
        lineHeight: 0.98,
        color: "#F6F1EA",
        textShadow: "0 12px 40px rgba(20, 10, 6, 0.45)",
      }}
    >
      {text}
    </div>
  );
};

/** 1 · The barrel in a garden, in daylight. */
export const Vrt = () => (
  <AbsoluteFill style={{ backgroundColor: "#c5d6e4" }}>
    <Plate src={garden} focus={[24, 36]} focusY={28} zoom={1.32} rise={1.4} />
    <Floor />
    <Line text="Na vrtu." />
  </AbsoluteFill>
);

/** 2 · The arched window onto the trees. */
export const Razgled = () => (
  <AbsoluteFill style={{ backgroundColor: "#8ea37a" }}>
    <Plate src={view} focus={[42, 56]} rise={1.12} />
    <Floor />
    <Line text="Z razgledom." />
  </AbsoluteFill>
);

/** 3 · The wood inside. Cropped clear of the bench engraving on the right. */
export const Les = () => (
  <AbsoluteFill style={{ backgroundColor: "#c4a574" }}>
    <Plate src={interior} focus={[34, 48]} focusY={42} rise={1.1} />
    <Floor />
    <Line text="Iz lesa." />
  </AbsoluteFill>
);

const LOGO_WIDTH = 460;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;

/**
 * 4 · The barrel by the lake stays bright. The line leaves, and a small logo
 * sits where the line was. This is not the dimmed outro card.
 */
export const Vecer = () => {
  const frame = useCurrentFrame();
  const logo = interpolate(frame, [62, 78], [0, 1], { ...clamp, easing: ease });
  const tracking = interpolate(frame, [74, 100], [0.62, 0.38], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#8fb4d4" }}>
      <Plate src={lake} focus={[62, 74]} rise={1.06} />
      <Floor />
      <Line text="Za vsak večer." end={54} />
      <div
        style={{
          position: "absolute",
          left: 84,
          bottom: 280,
          opacity: logo,
          transform: `translateY(${(1 - logo) * 16}px)`,
        }}
      >
        <svg
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
        >
          {[...barrel.paths, ...savne.paths, ...doliumLine.paths].map((d) => (
            <path key={d} d={d} fill={dolium.primaryLight} />
          ))}
        </svg>
        <div
          style={{
            marginTop: 28,
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 28,
            letterSpacing: `${tracking}em`,
            paddingLeft: `${tracking}em`,
            textTransform: "uppercase",
            color: dolium.primaryLight,
          }}
        >
          savne-dolium.si
        </div>
      </div>
    </AbsoluteFill>
  );
};
