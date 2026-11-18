import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  spring,
  Track,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { geist } from "../brand";
import { MARK_VIEWBOX, markPaths, WORD_VIEWBOX, wordPaths } from "./logoPaths";

const LOGO_HEIGHT = 240;
const MARK_WIDTH = (MARK_VIEWBOX.width / MARK_VIEWBOX.height) * LOGO_HEIGHT;
const WORD_WIDTH = (WORD_VIEWBOX.width / WORD_VIEWBOX.height) * LOGO_HEIGHT;
/** Same mark-to-word gap as the webshop's `<Logo>`. */
const GAP = (56 / 256.013) * LOGO_HEIGHT;

/** The logo's own fills (logo-mark-color.svg, logo-word-color.svg). */
const CRIMSON = "#AF1A44";
const BLACK = "#000000";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const expoOut = Easing.bezier(0.16, 1, 0.3, 1);

/** The phone mark: two black halves and the crimson top snap together around the wrench. */
const Mark = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const land = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping: 14, stiffness: 180, mass: 0.7 },
    });
  const fadeIn = (delay: number) =>
    interpolate(frame, [delay, delay + 5], [0, 1], clamp);

  const left = 1 - land(0);
  const right = 1 - land(3);
  const top = 1 - land(8);

  return (
    <svg
      width={MARK_WIDTH}
      height={LOGO_HEIGHT}
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      overflow="visible"
      style={{ display: "block" }}
    >
      <path
        d={markPaths.bottomLeft}
        fill={BLACK}
        opacity={fadeIn(0)}
        transform={`translate(${left * -90} ${left * 200}) rotate(${left * -16} 32 206)`}
      />
      <path
        d={markPaths.bottomRight}
        fill={BLACK}
        opacity={fadeIn(3)}
        transform={`translate(${right * 90} ${right * 200}) rotate(${right * 16} 122 206)`}
      />
      <path
        d={markPaths.top}
        fill={CRIMSON}
        opacity={fadeIn(8)}
        transform={`translate(0 ${top * -230})`}
      />
    </svg>
  );
};

/** Three short strokes off the mark's top-right corner when the pieces lock: "fixed". */
const Spark = () => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [17, 25], [0, 1], { ...clamp, easing: expoOut });
  const tail = interpolate(frame, [21, 31], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  if (frame < 17 || frame > 31) {
    return null;
  }

  return (
    <svg
      width={1}
      height={1}
      overflow="visible"
      style={{ position: "absolute", left: MARK_WIDTH + 6, top: -6 }}
    >
      {[18, 45, 72].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const from = 22 + tail * 78;
        const to = 22 + head * 78;
        return (
          <line
            key={angle}
            x1={Math.cos(rad) * from}
            y1={-Math.sin(rad) * from}
            x2={Math.cos(rad) * to}
            y2={-Math.sin(rad) * to}
            stroke={CRIMSON}
            strokeWidth={10}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

/** KRAN / FIX slide out from behind the mark; the crimson top of the I drops in last. */
const Wordmark = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Follows the "Mark" translate below, so letters only appear to the right of the moving mark.
  const markOffset = interpolate(frame, [22, 42], [252, 0], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const clipX = markOffset * (WORD_VIEWBOX.width / WORD_WIDTH);
  const slideIn = (start: number, distance: number) => {
    const progress = interpolate(frame, [start, start + 18], [0, 1], {
      ...clamp,
      easing: expoOut,
    });
    return {
      opacity: progress,
      transform: `translate(${(1 - progress) * -distance} 0)`,
    };
  };
  const accent = spring({
    frame: frame - 44,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.6 },
  });

  return (
    <svg
      width={WORD_WIDTH}
      height={LOGO_HEIGHT}
      viewBox={`0 0 ${WORD_VIEWBOX.width} ${WORD_VIEWBOX.height}`}
      overflow="visible"
      style={{ display: "block" }}
    >
      <defs>
        {/* Clip only the left edge, so the letters appear from behind the mark. */}
        <clipPath id="intro-word-clip">
          <rect x={clipX} y={-400} width={WORD_VIEWBOX.width + 200} height={1000} />
        </clipPath>
      </defs>
      <g clipPath="url(#intro-word-clip)">
        <path d={wordPaths.kran} fill={CRIMSON} {...slideIn(25, 220)} />
        <path d={wordPaths.f} fill={BLACK} {...slideIn(30, 160)} />
        <path d={wordPaths.iStem} fill={BLACK} {...slideIn(33, 160)} />
        <path d={wordPaths.x} fill={BLACK} {...slideIn(36, 160)} />
        <path
          d={wordPaths.iAccent}
          fill={CRIMSON}
          opacity={interpolate(frame, [44, 47], [0, 1], clamp)}
          transform={`translate(0 ${(1 - accent) * -150})`}
        />
      </g>
    </svg>
  );
};

/**
 * 3 s logo sting (1080×1920) to open reels and other videos.
 * The phone mark is assembled from its pieces, then the wordmark and tagline follow.
 */
export const LogoIntro = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        gap: 76,
        paddingBottom: 140,
      }}
    >
      <Interactive.Div
        name="Lockup"
        style={{
          display: "flex",
          alignItems: "center",
          gap: GAP,
          scale: interpolate(frame, [30, 90], [1, 1.03], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Div
          name="Mark"
          style={{
            position: "relative",
            zIndex: 1,
            translate: interpolate(frame, [22, 42], ["252px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            scale: interpolate(frame, [15, 20, 29], [1, 1.06, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          <Mark />
          <Spark />
        </Interactive.Div>
        <Wordmark />
      </Interactive.Div>

      <Interactive.Div
        name="Tagline"
        style={{
          fontFamily: geist,
          fontWeight: 500,
          fontSize: 48,
          lineHeight: 1.3,
          color: "#525252",
          opacity: interpolate(frame, [50, 66], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [50, 66], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      >
        Popravilo telefonov v Kranju
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Pieces whoosh"
          src="https://remotion.media/whoosh.wav"
          durationInFrames={6}
          volume={0.5}
        />
        <Audio
          name="Wordmark whoosh"
          src="https://remotion.media/whoosh.wav"
          from={26}
          durationInFrames={6}
          volume={0.6}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Snap click"
          src="https://remotion.media/mouse-click.wav"
          from={15}
          durationInFrames={12}
        />
      </Track>
    </AbsoluteFill>
  );
};
