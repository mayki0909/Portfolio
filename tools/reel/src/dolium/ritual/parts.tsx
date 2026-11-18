import { Video } from "@remotion/media";
import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp, dmSans, dmSerif, dolium, ease, expoOut } from "../brand";
import { focusIn, Grain, Mist, night } from "../film";

/** The framed picture each scene sits in, in frame pixels; the last scene opens it up to full bleed. */
export const WINDOW = { x: 90, y: 190, width: 900, height: 1020 } as const;
/** Top of the caption under the window, clear of Instagram's caption and buttons. */
const CAPTION_TOP = 1278;

/** The clips are cut from saunas-shop/public/hero.mp4, 1920×1080 at 25 fps. */
const CLIP_FPS = 25;
const CLIP_WIDTH = 1920;
const CLIP_HEIGHT = 1080;

/**
 * One shot of footage, slowed so the whole clip fills the shot, sized to the window's height
 * (close to its own resolution) and cropped around `focus`, a share of its width.
 * `fadeIn` dissolves it in over the shot before it.
 */
export const Footage = ({
  src,
  clipFrames,
  focus,
  from,
  durationInFrames,
  fadeIn = 0,
}: {
  readonly src: string;
  readonly clipFrames: number;
  readonly focus: number;
  readonly from: number;
  readonly durationInFrames: number;
  readonly fadeIn?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Slightly slower than an exact fit, so the clip never runs out before the shot ends.
  const playbackRate =
    (clipFrames / CLIP_FPS / (durationInFrames / fps)) * 0.97;
  const width = (CLIP_WIDTH * WINDOW.height) / CLIP_HEIGHT;

  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          opacity:
            fadeIn > 0
              ? interpolate(frame, [from, from + fadeIn], [0, 1], clamp)
              : 1,
        }}
      >
        <Video
          src={src}
          muted
          playbackRate={playbackRate}
          style={{
            position: "absolute",
            top: 0,
            left: WINDOW.width / 2 - focus * width,
            width,
            height: WINDOW.height,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

/** A still photo sized to the window's height and cropped around `focus`, a share of its width. */
export const Still = ({
  src,
  aspect,
  focus,
}: {
  readonly src: string;
  readonly aspect: number;
  readonly focus: number;
}) => {
  const width = WINDOW.height * aspect;
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        top: 0,
        left: WINDOW.width / 2 - focus * width,
        width,
        height: WINDOW.height,
      }}
    />
  );
};

/** The framed picture: a slow push-in, a darker filmic grade and a vignette. */
export const Window = ({ children }: { readonly children: ReactNode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left: WINDOW.x,
        top: WINDOW.y,
        width: WINDOW.width,
        height: WINDOW.height,
        overflow: "hidden",
        borderRadius: 4,
        boxShadow: "0 40px 120px rgba(0, 0, 0, 0.55)",
      }}
    >
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, durationInFrames], [1, 1.07], {
            ...clamp,
            output: "perceptual-scale",
          }),
          filter: "brightness(0.9) contrast(1.08) saturate(0.95)",
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 75% at 50% 45%, ${night(0)} 50%, ${night(0.55)} 100%)`,
        }}
      />
    </div>
  );
};

/**
 * "01 — OGENJ" over a line in serif italic, under the window. The label tracks in and the line comes
 * into focus; with `end`, both fade out from that frame.
 */
export const Caption = ({
  number,
  label,
  line,
  start,
  end,
}: {
  readonly number: string;
  readonly label: string;
  readonly line: string;
  readonly start: number;
  readonly end?: number;
}) => {
  const frame = useCurrentFrame();
  const tracking = interpolate(frame, [start, start + 30], [0.7, 0.42], {
    ...clamp,
    easing: expoOut,
  });
  const out =
    end === undefined
      ? 0
      : interpolate(frame, [end, end + 12], [0, 1], { ...clamp, easing: ease });

  return (
    <div
      style={{
        position: "absolute",
        top: CAPTION_TOP,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: 1 - out,
        filter: `blur(${out * 8}px)`,
      }}
    >
      <div
        style={{
          fontFamily: dmSans,
          fontWeight: 500,
          fontSize: 26,
          lineHeight: 1,
          textTransform: "uppercase",
          letterSpacing: `${tracking}em`,
          paddingLeft: `${tracking}em`,
          color: dolium.secondaryLight,
          opacity: interpolate(frame, [start, start + 20], [0, 1], {
            ...clamp,
            easing: ease,
          }),
        }}
      >
        {number} — {label}
      </div>
      <div
        style={{
          marginTop: 30,
          fontFamily: dmSerif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 76,
          lineHeight: 1.15,
          color: dolium.primaryLight,
          ...focusIn(frame, start + 6, 10, 20),
        }}
      >
        {line}
      </div>
    </div>
  );
};

/** A scene: the night background with mist, the window, its caption, and film grain over everything. */
export const RitualScene = ({
  children,
  caption,
}: {
  readonly children: ReactNode;
  readonly caption: ReactNode;
}) => (
  <AbsoluteFill style={{ backgroundColor: dolium.night }}>
    <Mist opacity={0.8} />
    <Window>{children}</Window>
    {caption}
    <Grain />
  </AbsoluteFill>
);
