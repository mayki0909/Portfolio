import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import photo from "./assets/sauna-lake.jpg";
import { clamp, dmSans, dmSerif, dolium, ease, expoOut } from "./brand";
import { focusIn, Grain, Mist, night } from "./film";
import {
  barrel,
  dolium as doliumLine,
  LOGO_VIEWBOX,
  savne,
  steamWisps,
} from "./logoPaths";

/** Length without a hold; add `hold` when it plays longer. */
export const DOLIUM_OUTRO_DURATION = 120;

export type DoliumOutroProps = {
  /**
   * Frames the opening photo plays before it dims and the logo comes in (0 on its own).
   * RitualReel holds it so the reel's last scene can play on it.
   */
  readonly hold?: number;
};

const LOGO_WIDTH = 640;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;
const LOGO_COLOR = dolium.primaryLight;

/**
 * A barrel sauna by a lake at golden hour (saunas-shop/public/navbar/sod-savna.jpg, 1824×1368),
 * scaled to the frame's height. The camera drifts from the chimney towards the lit door.
 */
const PHOTO_HEIGHT = 1920;
const PHOTO_WIDTH = (PHOTO_HEIGHT * 1824) / 1368;
/** Where the camera looks, as a share of the photo's width, at the start and the end. */
const FOCUS = [0.56, 0.7] as const;
const PUSH_IN = [1, 1.1] as const;

/** Frames (before any hold) over which the photo dims and goes soft behind the logo. */
const DIM = [34, 72] as const;
const LOGO = 40;
const STEAM = 60;
const TAGLINE = 64;
const RULE = 74;
const DOMAIN = 80;

const smooth = Easing.bezier(0.45, 0, 0.55, 1);

type Box = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/** The photo, its grade, and the dim that brings the logo forward. */
const Scene = ({ hold }: { readonly hold: number }) => {
  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();
  const camera = interpolate(frame, [0, durationInFrames], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const focus = FOCUS[0] + (FOCUS[1] - FOCUS[0]) * camera;
  const dim = interpolate(frame, [DIM[0] + hold, DIM[1] + hold], [0, 1], {
    ...clamp,
    easing: smooth,
  });
  // A short fade up from night at the start, then the dim.
  const veil = Math.max(
    interpolate(frame, [0, 10], [1, 0], { ...clamp, easing: ease }),
    dim * 0.5,
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          scale: interpolate(camera, [0, 1], PUSH_IN, {
            output: "perceptual-scale",
          }),
        }}
      >
        <Img
          src={photo}
          style={{
            position: "absolute",
            top: 0,
            left: width / 2 - focus * PHOTO_WIDTH,
            width: PHOTO_WIDTH,
            height: PHOTO_HEIGHT,
            filter: `brightness(${1 - dim * 0.3}) saturate(${1.05 - dim * 0.2}) contrast(1.06) blur(${dim * 9}px)`,
          }}
        />
      </AbsoluteFill>
      {/* Cinematic grade: dark top and bottom (clear of Instagram's UI) and a vignette. */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(180deg, ${night(0.6)} 0%, ${night(0)} 24%, ${night(0)} 64%, ${night(0.8)} 100%), radial-gradient(ellipse 85% 70% at 50% 46%, ${night(0)} 45%, ${night(0.6)} 100%)`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: dolium.night, opacity: veil }} />
    </AbsoluteFill>
  );
};

/** One wisp of the logo's steam: revealed from the barrel upwards, then it keeps drifting gently. */
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
  const grow = interpolate(frame, [start, start + 24], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const sway =
    Math.sin((Math.max(0, frame - start) / fps) * Math.PI + index * 1.7) * 0.4;
  const id = `dolium-outro-wisp-${index}`;

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
            <path key={d} d={d} fill={LOGO_COLOR} />
          ))}
        </g>
      </g>
    </>
  );
};

/**
 * 4 s premium end card (1080×1920) to close Savne Dolium reels and other videos.
 * A barrel sauna by a lake at golden hour, with a slow camera drift, rising mist and film grain,
 * dims and falls out of focus as the logo comes into focus over it, then the tagline,
 * a hairline and the domain follow.
 */
export const DoliumOutro = ({ hold = 0 }: DoliumOutroProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const logo = LOGO + hold;
  const domain = DOMAIN + hold;
  const rule = RULE + hold;
  const tracking = interpolate(frame, [domain, domain + 34], [0.7, 0.42], {
    ...clamp,
    easing: expoOut,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: dolium.night }}>
      <Scene hold={hold} />
      <Mist />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 160,
        }}
      >
        <Interactive.Div
          name="Content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            scale: interpolate(frame, [logo, durationInFrames], [1, 1.02], {
              ...clamp,
              output: "perceptual-scale",
            }),
          }}
        >
          <Interactive.Div
            name="Lockup"
            style={{
              ...focusIn(frame, logo, 16, 0),
              scale: interpolate(frame, [logo, logo + 40], [1.06, 1], {
                ...clamp,
                easing: expoOut,
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
              {[...barrel.paths, ...savne.paths, ...doliumLine.paths].map(
                (d) => (
                  <path key={d} d={d} fill={LOGO_COLOR} />
                ),
              )}
              {steamWisps.map((wisp, index) => (
                <Wisp
                  key={wisp.box.x}
                  index={index}
                  box={wisp.box}
                  paths={wisp.paths}
                  start={STEAM + hold + index * 5}
                />
              ))}
            </svg>
          </Interactive.Div>

          <Interactive.Div
            name="Tagline"
            style={{
              marginTop: 76,
              fontFamily: dmSerif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 56,
              lineHeight: 1.2,
              color: dolium.primaryLight,
              ...focusIn(frame, TAGLINE + hold, 8, 18),
            }}
          >
            Razkošje popolne sprostitve
          </Interactive.Div>

          <Interactive.Div
            name="Rule"
            style={{
              marginTop: 52,
              width: 240,
              height: 2,
              backgroundColor: dolium.secondaryLight,
              opacity: 0.7,
              scale: `${interpolate(frame, [rule, rule + 26], [0, 1], {
                ...clamp,
                easing: expoOut,
              })} 1`,
            }}
          />

          <Interactive.Div
            name="Domain"
            style={{
              marginTop: 52,
              fontFamily: dmSans,
              fontWeight: 500,
              fontSize: 28,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: `${tracking}em`,
              // Balances the space letter-spacing leaves after the last letter.
              paddingLeft: `${tracking}em`,
              color: dolium.secondaryLight,
              opacity: interpolate(frame, [domain, domain + 24], [0, 1], {
                ...clamp,
                easing: ease,
              }),
            }}
          >
            savne-dolium.si
          </Interactive.Div>
        </Interactive.Div>
      </AbsoluteFill>

      <Grain />
    </AbsoluteFill>
  );
};
