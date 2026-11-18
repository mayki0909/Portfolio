import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, dmSans, dolium, ease, expoOut } from "./brand";
import {
  barrel,
  dolium as doliumLine,
  LOGO_FILL,
  LOGO_VIEWBOX,
  savne,
  steamWisps,
} from "./logoPaths";

const LOGO_WIDTH = 900;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;
/** Logo units the barrel travels from the centre of the frame to its place in the lockup. */
const MARK_OFFSET =
  LOGO_VIEWBOX.width / 2 - (barrel.box.x + barrel.box.width / 2);

/** Frames over which the barrel slides from the centre into the lockup. */
const SLIDE = [30, 50] as const;
/** "Savne" rises once the barrel has nearly cleared it, then "Dolium". */
const WORDMARK = 44;

type Box = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/** One wisp of steam: revealed from the barrel upwards, then it keeps drifting gently. */
const Wisp = ({
  index,
  box,
  paths,
  start,
}: {
  readonly index: number;
  readonly box: Box;
  readonly paths: readonly string[];
  readonly start: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = interpolate(frame, [start, start + 18], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const seconds = Math.max(0, frame - start) / fps;
  const sway = Math.sin(seconds * Math.PI * 1.2 + index * 1.7) * 0.45;
  const id = `dolium-wisp-${index}`;

  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect
            x={box.x - 2}
            y={box.y - 2 + (box.height + 4) * (1 - grow)}
            width={box.width + 4}
            height={(box.height + 4) * grow}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g opacity={grow} transform={`translate(${sway} ${(1 - grow) * 3})`}>
          {paths.map((d) => (
            <path key={d} d={d} fill={LOGO_FILL} />
          ))}
        </g>
      </g>
    </>
  );
};

/** A wordmark line rising out of a mask in its own box. */
const WordLine = ({
  id,
  box,
  paths,
  start,
}: {
  readonly id: string;
  readonly box: Box;
  readonly paths: readonly string[];
  readonly start: number;
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + 22], [0, 1], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect
            x={box.x - 2}
            y={box.y - 2}
            width={box.width + 4}
            height={box.height + 4}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`translate(0 ${(1 - progress) * (box.height + 4)})`}>
          {paths.map((d) => (
            <path key={d} d={d} fill={LOGO_FILL} />
          ))}
        </g>
      </g>
    </>
  );
};

/**
 * 3 s logo sting (1080×1920) for Savne Dolium.
 * The barrel settles in the centre and starts to steam, then slides aside as "Savne Dolium" rises in.
 */
export const DoliumIntro = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 20], [0, 1], {
    ...clamp,
    easing: expoOut,
  });
  const slide = interpolate(frame, SLIDE, [MARK_OFFSET, 0], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: dolium.white,
        justifyContent: "center",
        alignItems: "center",
        gap: 84,
        paddingBottom: 140,
      }}
    >
      <Interactive.Div
        name="Lockup"
        style={{
          scale: interpolate(frame, [SLIDE[0], 90], [1, 1.03], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      >
        <svg
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
          overflow="visible"
          style={{ display: "block" }}
        >
          <g transform={`translate(${slide} 0)`}>
            <g opacity={enter} transform={`translate(0 ${(1 - enter) * 12})`}>
              {barrel.paths.map((d) => (
                <path key={d} d={d} fill={LOGO_FILL} />
              ))}
            </g>
            {steamWisps.map((wisp, index) => (
              <Wisp
                key={wisp.box.x}
                index={index}
                box={wisp.box}
                paths={wisp.paths}
                start={12 + index * 4}
              />
            ))}
          </g>
          <WordLine
            id="dolium-savne"
            box={savne.box}
            paths={savne.paths}
            start={WORDMARK}
          />
          <WordLine
            id="dolium-dolium"
            box={doliumLine.box}
            paths={doliumLine.paths}
            start={WORDMARK + 6}
          />
        </svg>
      </Interactive.Div>

      <Interactive.Div
        name="Tagline"
        style={{
          fontFamily: dmSans,
          fontWeight: 400,
          fontSize: 46,
          lineHeight: 1.3,
          color: dolium.neutral30,
          opacity: interpolate(frame, [62, 78], [0, 1], {
            ...clamp,
            easing: ease,
          }),
          translate: interpolate(frame, [62, 78], ["0px 40px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        Zunanje finske savne in lesene kadi
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Barrel whoosh"
          src="https://remotion.media/whoosh.wav"
          durationInFrames={6}
          volume={0.4}
        />
        <Audio
          name="Wordmark whoosh"
          src="https://remotion.media/whoosh.wav"
          from={WORDMARK - 2}
          durationInFrames={6}
          volume={0.5}
        />
      </Track>
    </AbsoluteFill>
  );
};
