import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  Track,
  useCurrentFrame,
} from "remotion";
import hero from "./assets/hero.jpg";
import { clamp, ease, expoOut, inter, kfx } from "./brand";
import {
  BASELINE,
  CRIMSON,
  kf,
  LOGO_VIEWBOX,
  xBlade,
  xLock,
} from "./logoPaths";
import { rise } from "./motion";

export type KfxOutroProps = {
  /** The site's address. */
  readonly domain: string;
};

/** Also written out in Root.tsx's defaultProps, so Remotion Studio can edit it: change both. */
export const KFX_OUTRO_DEFAULTS: KfxOutroProps = { domain: "kfxservis.si" };

/** Same lockup size as KfxIntro, so the two stings match. */
const LOGO_WIDTH = 820;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;

/**
 * The website's hero photo (krgofix/apps/webshop/public/assets/hero.png, 1440×800), sized so the scooter
 * stands right of centre at the bottom of the frame.
 */
const PHOTO_HEIGHT = 900;
const PHOTO_WIDTH = (PHOTO_HEIGHT * 1440) / 800;
const PHOTO_LEFT = -540;

/** Speed lines whip past behind the logo, left to right. */
const PASS = 20;
const DOMAIN = 40;
const SERVICES = 48;

/** Speed lines, in logo units: height, length, thickness, delay after PASS, and colour. */
const STREAKS = [
  {
    y: 6,
    length: 420,
    width: 3,
    delay: 3,
    color: kfx.footerMuted,
    opacity: 0.35,
  },
  { y: 22, length: 620, width: 6, delay: 0, color: CRIMSON, opacity: 1 },
  {
    y: 40,
    length: 360,
    width: 2.5,
    delay: 5,
    color: kfx.footerMuted,
    opacity: 0.3,
  },
  { y: 56, length: 540, width: 7, delay: 2, color: CRIMSON, opacity: 0.9 },
  {
    y: 74,
    length: 300,
    width: 3,
    delay: 6,
    color: kfx.footerMuted,
    opacity: 0.35,
  },
  { y: 92, length: 480, width: 5, delay: 1, color: CRIMSON, opacity: 0.8 },
] as const;

/** The two lines under the domain: services, then what KFX sells and services. */
const servicesLine = {
  fontFamily: inter,
  fontWeight: 500,
  fontSize: 42,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
  color: kfx.footerMuted,
} as const;

const Streaks = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {STREAKS.map((streak) => {
        const start = PASS + streak.delay;
        // From off the left edge of the frame to off the right (the frame spans about -52 to 577 logo units).
        const head = interpolate(
          frame,
          [start, start + 14],
          [-80, 640 + streak.length],
          {
            ...clamp,
            easing: Easing.bezier(0.5, 0, 0.5, 1),
          },
        );
        if (frame < start || frame > start + 14) {
          return null;
        }
        return (
          <line
            key={streak.y}
            x1={head - streak.length}
            y1={streak.y}
            x2={head}
            y2={streak.y}
            stroke={streak.color}
            strokeWidth={streak.width}
            strokeLinecap="round"
            opacity={streak.opacity}
          />
        );
      })}
    </>
  );
};

/**
 * 3 s logo sting (1080×1920) to close KFX reels and other videos, styled after the website footer:
 * the white logo rises in on the footer's near-black, speed lines whip past and it leans into them,
 * then the domain and services rise in over the site's hero scooter.
 */
export const KfxOutro = ({ domain }: KfxOutroProps) => {
  const frame = useCurrentFrame();
  // Leans and nudges forward as the streaks pass, then settles.
  const lean = interpolate(frame, [PASS + 2, PASS + 8, PASS + 22], [0, 7, 0], {
    ...clamp,
    easing: ease,
  });
  const nudge = interpolate(
    frame,
    [PASS + 2, PASS + 8, PASS + 22],
    [0, 10, 0],
    {
      ...clamp,
      easing: ease,
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kfx.footer,
        justifyContent: "center",
        alignItems: "center",
        // Lifts the content clear of the scooter.
        paddingBottom: 560,
      }}
    >
      <Interactive.Div
        name="Photo"
        style={{
          position: "absolute",
          left: PHOTO_LEFT,
          bottom: 0,
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          opacity: interpolate(frame, [PASS, PASS + 30], [0, 1], {
            ...clamp,
            easing: ease,
          }),
          translate: interpolate(frame, [PASS, 90], ["0px 80px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.2, 0, 0.2, 1),
          }),
        }}
      >
        <Img src={hero} style={{ width: "100%", height: "100%" }} />
        {/*
          The site's hero gradient, plus a fade into the footer colour along the top edge.
          It starts 4px above the photo so the photo's top row never peeks out at sub-pixel offsets.
        */}
        <div
          style={{
            position: "absolute",
            inset: "-4px 0 0 0",
            backgroundImage: `linear-gradient(180deg, ${kfx.footer} 0%, rgba(23, 23, 23, 0.6) 30%, rgba(23, 23, 23, 0) 60%), linear-gradient(59.61deg, rgba(0, 0, 0, 0.9) 7.37%, rgba(27, 18, 20, 0) 100.4%)`,
          }}
        />
      </Interactive.Div>

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
          style={{
            opacity: interpolate(frame, [0, 16], [0, 1], {
              ...clamp,
              easing: expoOut,
            }),
            translate: interpolate(frame, [0, 16], ["0px 70px", "0px 0px"], {
              ...clamp,
              easing: ease,
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
            <Streaks />
            {/* logo-white.svg: the whole logo in white on dark backgrounds. */}
            <g
              transform={`translate(${nudge} 0) translate(0 ${BASELINE}) skewX(${-lean}) translate(0 ${-BASELINE})`}
              fill={kfx.white}
            >
              <path d={kf} />
              <path d={xBlade} />
              <path d={xLock} />
            </g>
          </svg>
        </Interactive.Div>

        <Interactive.Div
          name="Domain"
          style={{
            marginTop: 96,
            fontFamily: inter,
            fontWeight: 800,
            fontSize: 140,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: kfx.white,
            ...rise(frame, DOMAIN, 50),
          }}
        >
          {domain}
        </Interactive.Div>

        <Interactive.Div
          name="Services"
          style={{
            marginTop: 36,
            ...servicesLine,
            ...rise(frame, SERVICES, 40),
          }}
        >
          Servis · Rezervni deli · Najem
        </Interactive.Div>
        <Interactive.Div
          name="Vehicles"
          style={{
            marginTop: 8,
            ...servicesLine,
            ...rise(frame, SERVICES + 5, 40),
          }}
        >
          E-skiroji in E-kolesa
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
          name="Pass whoosh"
          src="https://remotion.media/whoosh.wav"
          from={PASS - 1}
          durationInFrames={8}
          volume={0.7}
        />
      </Track>
      <Track name="Clicks">
        <Audio
          name="Domain click"
          src="https://remotion.media/mouse-click.wav"
          from={DOMAIN + 6}
          durationInFrames={12}
          volume={0.7}
        />
      </Track>
    </AbsoluteFill>
  );
};
