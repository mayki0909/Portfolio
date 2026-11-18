import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  Track,
  useCurrentFrame,
} from "remotion";
import { brand, geist, glide, manrope } from "../brand";
import {
  MARK_VIEWBOX,
  markPaths,
  WORD_VIEWBOX,
  wordPaths,
} from "../intro/logoPaths";

/** Same lockup size as LogoIntro, so the two stings match. */
const LOGO_HEIGHT = 240;
const MARK_WIDTH = (MARK_VIEWBOX.width / MARK_VIEWBOX.height) * LOGO_HEIGHT;
const WORD_WIDTH = (WORD_VIEWBOX.width / WORD_VIEWBOX.height) * LOGO_HEIGHT;
/** Same mark-to-word gap as the webshop's `<Logo>`. */
const GAP = (56 / 256.013) * LOGO_HEIGHT;
/** How far the mark travels to sit centred on its own once the wordmark is gone. */
const CENTRE_OFFSET = (WORD_WIDTH + GAP) / 2;

/**
 * The website footer's Kranj skyline (footer-city.png, 1658×949; the skyline sits in its bottom 60%).
 * Narrower than in LaunchReel so all three towers stay in frame.
 */
const CITY_WIDTH = 1500;
const CITY_HEIGHT = (CITY_WIDTH * 949) / 1658;

/** The logo's own fills (logo-mark-color.svg, logo-word-color.svg). */
const CRIMSON = "#AF1A44";
const BLACK = "#000000";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
const accelerate = Easing.bezier(0.4, 0, 1, 1);

/** Frames over which the mark slides to the centre while the wordmark retracts. */
const RETRACT = [28, 48] as const;
/** The mark lands: click, pulse and spark. */
const LAND = 46;

/** Rises into place over 16 frames, like the tagline in LogoIntro. */
const riseIn = (frame: number, start: number, distance: number) => ({
  opacity: interpolate(frame, [start, start + 16], [0, 1], {
    ...clamp,
    easing: glide,
  }),
  translate: interpolate(
    frame,
    [start, start + 16],
    [`0px ${distance}px`, "0px 0px"],
    { ...clamp, easing: glide },
  ),
});

const Mark = () => (
  <svg
    width={MARK_WIDTH}
    height={LOGO_HEIGHT}
    viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
    style={{ display: "block" }}
  >
    <path d={markPaths.bottomLeft} fill={BLACK} />
    <path d={markPaths.bottomRight} fill={BLACK} />
    <path d={markPaths.top} fill={CRIMSON} />
  </svg>
);

/** Three short strokes off the mark's top-right corner when it lands, as in LogoIntro. */
const Spark = () => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [LAND + 2, LAND + 10], [0, 1], {
    ...clamp,
    easing: expoOut,
  });
  const tail = interpolate(frame, [LAND + 6, LAND + 16], [0, 1], {
    ...clamp,
    easing: glide,
  });

  if (frame < LAND + 2 || frame > LAND + 16) {
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

/** The reverse of LogoIntro: the I's crimson top lifts off, then X, I, F and KRAN slide back behind the mark. */
const Wordmark = () => {
  const frame = useCurrentFrame();
  // Follows the "Mark" translate below, so letters vanish just right of the moving mark.
  const markOffset = interpolate(frame, RETRACT, [0, CENTRE_OFFSET], {
    ...clamp,
    easing: glide,
  });
  const clipX = markOffset * (WORD_VIEWBOX.width / WORD_WIDTH);
  const slideOut = (start: number, distance: number) => {
    const progress = interpolate(frame, [start, start + 16], [0, 1], {
      ...clamp,
      easing: accelerate,
    });
    return {
      opacity: 1 - progress,
      transform: `translate(${progress * -distance} 0)`,
    };
  };
  const accentLift = interpolate(frame, [24, 32], [0, 1], {
    ...clamp,
    easing: accelerate,
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
        {/* Clip only the left edge, so the letters disappear behind the mark. */}
        <clipPath id="outro-word-clip">
          <rect
            x={clipX}
            y={-400}
            width={WORD_VIEWBOX.width + 200}
            height={1000}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#outro-word-clip)">
        <path d={wordPaths.kran} fill={CRIMSON} {...slideOut(32, 220)} />
        <path d={wordPaths.f} fill={BLACK} {...slideOut(30, 160)} />
        <path d={wordPaths.iStem} fill={BLACK} {...slideOut(28, 160)} />
        <path d={wordPaths.x} fill={BLACK} {...slideOut(26, 160)} />
        <path
          d={wordPaths.iAccent}
          fill={CRIMSON}
          opacity={1 - accentLift}
          transform={`translate(0 ${accentLift * -150})`}
        />
      </g>
    </svg>
  );
};

/**
 * 3 s logo sting (1080×1920) to close reels and other videos.
 * The full logo rises in, folds back into its mark, and kranfix.si and the services follow.
 */
export const LogoOutro = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.white,
        justifyContent: "center",
        alignItems: "center",
        // Lifts the content clear of the skyline.
        paddingBottom: 240,
      }}
    >
      {/* Fades in while the wordmark folds away, then keeps drifting up to the end. */}
      <Img
        src={staticFile("home/footer-city.png")}
        style={{
          position: "absolute",
          left: (1080 - CITY_WIDTH) / 2,
          bottom: -30,
          width: CITY_WIDTH,
          height: CITY_HEIGHT,
          opacity: interpolate(frame, [RETRACT[0], RETRACT[0] + 30], [0, 1], {
            ...clamp,
            easing: glide,
          }),
          translate: interpolate(
            frame,
            [RETRACT[0], 90],
            ["0px 90px", "0px 0px"],
            {
              ...clamp,
              easing: Easing.bezier(0.2, 0, 0.2, 1),
            },
          ),
        }}
      />

      <Interactive.Div
        name="Content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          scale: interpolate(frame, [0, 90], [1, 1.03], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Div
          name="Lockup"
          style={{ display: "flex", alignItems: "center", gap: GAP }}
        >
          <Interactive.Div
            name="Mark"
            style={{
              position: "relative",
              zIndex: 1,
              opacity: interpolate(frame, [0, 16], [0, 1], {
                ...clamp,
                easing: expoOut,
              }),
              translate: interpolate(
                frame,
                [0, 16, RETRACT[0], RETRACT[1]],
                ["0px 70px", "0px 0px", "0px 0px", `${CENTRE_OFFSET}px 0px`],
                { ...clamp, easing: glide },
              ),
              scale: interpolate(
                frame,
                [LAND, LAND + 5, LAND + 14],
                [1, 1.06, 1],
                { ...clamp, output: "perceptual-scale" },
              ),
            }}
          >
            <Mark />
            <Spark />
          </Interactive.Div>
          <Interactive.Div
            name="Wordmark"
            style={{
              opacity: interpolate(frame, [3, 19], [0, 1], {
                ...clamp,
                easing: expoOut,
              }),
              translate: interpolate(frame, [3, 19], ["0px 70px", "0px 0px"], {
                ...clamp,
                easing: glide,
              }),
            }}
          >
            <Wordmark />
          </Interactive.Div>
        </Interactive.Div>

        <Interactive.Div
          name="Domain"
          style={{
            marginTop: 84,
            fontFamily: manrope,
            fontWeight: 800,
            fontSize: 140,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: brand.ink,
            ...riseIn(frame, 50, 50),
          }}
        >
          kranfix.si
        </Interactive.Div>

        <Interactive.Div
          name="Services"
          style={{
            marginTop: 32,
            fontFamily: geist,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.3,
            color: brand.body,
            ...riseIn(frame, 58, 40),
          }}
        >
          Popravila · Nakup · Odkup · Dodatki
        </Interactive.Div>
      </Interactive.Div>

      {/* CC0 sound effects from Remotion's library (remotion.dev/docs/sfx). */}
      <Track name="Whooshes">
        <Audio
          name="Entrance whoosh"
          src="https://remotion.media/whoosh.wav"
          durationInFrames={6}
          volume={0.5}
        />
        <Audio
          name="Retract whoosh"
          src="https://remotion.media/whoosh.wav"
          from={RETRACT[0] - 2}
          durationInFrames={6}
          volume={0.6}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Land click"
          src="https://remotion.media/mouse-click.wav"
          from={LAND}
          durationInFrames={12}
        />
      </Track>
    </AbsoluteFill>
  );
};
