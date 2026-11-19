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

/**
 * One shot of footage, slowed so the whole clip fills the shot, sized to the window's height
 * (close to its own resolution) and cropped around `focus`, a share of its width.
 * `fadeIn` dissolves it in over the shot before it.
 */
export const Footage = ({
  src,
  clipFrames,
  focus,
  focusY = 0.42,
  zoom = 1,
  from,
  durationInFrames,
  fadeIn = 0,
}: {
  readonly src: string;
  readonly clipFrames: number;
  readonly focus: number;
  readonly focusY?: number;
  /** Extra scale so a wide clip can crop a logo or a dull edge out of a portrait frame. */
  readonly zoom?: number;
  readonly from: number;
  readonly durationInFrames: number;
  readonly fadeIn?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Slightly slower than an exact fit, so the clip never runs out before the shot ends.
  const playbackRate =
    (clipFrames / CLIP_FPS / (durationInFrames / fps)) * 0.97;

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
          objectFit="cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectPosition: `${focus * 100}% ${focusY * 100}%`,
            transform: zoom === 1 ? undefined : `scale(${zoom})`,
            transformOrigin: `${focus * 100}% ${focusY * 100}%`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

/** A still photo, cropped around `focus` (a share of its width) and covering the window. */
export const Still = ({
  src,
  focus,
}: {
  readonly src: string;
  readonly focus: number;
}) => {
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `${focus * 100}% 46%`,
      }}
    />
  );
};

/**
 * The framed picture: a slow push-in, a darker filmic grade and a vignette.
 * `closed` is 1 for the frame and 0 for full bleed, so the opening shot can
 * start on the fire and settle into the window.
 */
export const Window = ({
  children,
  closed = 1,
}: {
  readonly children: ReactNode;
  readonly closed?: number;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const left = WINDOW.x * closed;
  const top = WINDOW.y * closed;
  const width = 1080 - (1080 - WINDOW.width) * closed;
  const height = 1920 - (1920 - WINDOW.height) * closed;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        overflow: "hidden",
        borderRadius: 4 * closed,
        boxShadow: `0 ${40 * closed}px ${120 * closed}px rgba(0, 0, 0, ${0.55 * closed})`,
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
  title,
  number,
  label,
  line,
  start,
  end,
}: {
  /** Large italic line for the opening, before the numbered step takes its place. */
  readonly title?: string;
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
  const titleOpacity =
    title === undefined
      ? 0
      : interpolate(frame, [6, 18, start - 8, start + 8], [0, 1, 1, 0], clamp);
  const stepOpacity = interpolate(frame, [start, start + 16], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: CAPTION_TOP,
        left: 80,
        right: 80,
        textAlign: "center",
        opacity: 1 - out,
        filter: `blur(${out * 8}px)`,
      }}
    >
      {title !== undefined ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            fontFamily: dmSerif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 84,
            lineHeight: 1.12,
            color: dolium.primaryLight,
            opacity: titleOpacity,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ opacity: stepOpacity }}>
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
          }}
        >
          {number} — {label}
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: dmSerif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 84,
            lineHeight: 1.12,
            color: dolium.primaryLight,
            ...focusIn(frame, start + 6, 10, 20),
          }}
        >
          {line}
        </div>
      </div>
    </div>
  );
};

/** A scene: the night background with mist, the window, its caption, and film grain over everything. */
export const RitualScene = ({
  children,
  caption,
  closed = 1,
}: {
  readonly children: ReactNode;
  readonly caption: ReactNode;
  /** 1 is the framed window, 0 is full bleed. */
  readonly closed?: number;
}) => (
  <AbsoluteFill style={{ backgroundColor: dolium.night }}>
    <Mist opacity={0.8} />
    <Window closed={closed}>{children}</Window>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(to top, ${night(0.78)} 0%, ${night(0)} 46%)`,
        opacity: 1 - closed,
      }}
    />
    {caption}
    <Grain />
  </AbsoluteFill>
);
