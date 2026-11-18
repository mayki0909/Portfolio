import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import fire from "../assets/ritual/fire.mp4";
import stones from "../assets/ritual/stones.mp4";
import stove from "../assets/ritual/stove.mp4";
import rest from "../assets/ritual/rest.jpg";
import vihta from "../assets/ritual/vihta.mp4";
import { clamp, dolium } from "../brand";
import { DOLIUM_OUTRO_DURATION, DoliumOutro } from "../DoliumOutro";
import { Mist, Steam } from "../film";
import { Caption, Footage, RitualScene, Still, WINDOW } from "./parts";

export const SCENE_FRAMES = 105;
/** Where each caption starts: once the transition into its scene has finished. */
const CAPTION = 18;
/** Frames between shots in a scene, dissolved. */
const DISSOLVE = 6;

/** 01 · Ogenj: the stove in the barrel, then the fire behind its glass. */
export const Ogenj = () => (
  <RitualScene
    caption={
      <Caption number="01" label="Ogenj" line="Zakurite peč." start={CAPTION} />
    }
  >
    <Footage src={stove} clipFrames={26} focus={0.5} from={0} durationInFrames={58} />
    <Footage
      src={fire}
      clipFrames={27}
      focus={0.55}
      from={52}
      durationInFrames={SCENE_FRAMES - 52}
      fadeIn={DISSOLVE}
    />
  </RitualScene>
);

/** 02 · Para: water on the hot stones raises a burst of steam, then the birch whisks. */
export const Para = () => (
  <RitualScene
    caption={
      <Caption number="02" label="Para" line="Polijte kamne." start={CAPTION} />
    }
  >
    <Footage src={stones} clipFrames={25} focus={0.62} from={0} durationInFrames={62} />
    <Footage
      src={vihta}
      clipFrames={25}
      focus={0.6}
      from={56}
      durationInFrames={SCENE_FRAMES - 56}
      fadeIn={DISSOLVE}
    />
    {/* Window pixels: the stones fill the lower part of the shot. */}
    <Steam
      seed="pour"
      x={140}
      y={780}
      width={620}
      count={18}
      start={24}
      every={2}
      life={64}
      rise={760}
      size={640}
      peak={0.7}
    />
  </RitualScene>
);

/** 03 · Počitek: resting in the barrel, looking out of its window onto the forest. */
export const Pocitek = () => (
  <RitualScene
    caption={
      <Caption
        number="03"
        label="Počitek"
        line="Prepustite se toplini."
        start={CAPTION}
      />
    }
  >
    {/* The website's hero photo (saunas-shop/public/assets/Hero.png, 1440×903). */}
    <Still src={rest} aspect={1440 / 903} focus={0.5} />
  </RitualScene>
);

/** Frames the outro's opening photo plays as the last scene before its logo comes in. */
export const MIR_HOLD = 60;
export const MIR_FRAMES = DOLIUM_OUTRO_DURATION + MIR_HOLD;
/** The window opens up to full bleed over these frames. */
const OPEN = [14, 48] as const;

/**
 * 04 · Mir: the outro's barrel sauna by the lake starts in the window, opens up to full bleed,
 * and plays under the last caption before the outro's logo comes in.
 */
export const Mir = () => {
  const frame = useCurrentFrame();
  const closed = 1 - interpolate(frame, OPEN, [0, 1], {
    ...clamp,
    easing: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  });
  const inset = {
    top: WINDOW.y * closed,
    right: (1080 - WINDOW.x - WINDOW.width) * closed,
    bottom: (1920 - WINDOW.y - WINDOW.height) * closed,
    left: WINDOW.x * closed,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: dolium.night }}>
      <Mist opacity={0.8} />
      <AbsoluteFill
        style={{
          clipPath: `inset(${inset.top}px ${inset.right}px ${inset.bottom}px ${inset.left}px round ${4 * closed}px)`,
        }}
      >
        <DoliumOutro hold={MIR_HOLD} />
      </AbsoluteFill>
      {/* Keeps the caption legible over the photo, and leaves with it. */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 14% at 50% 70%, rgba(18, 16, 25, 0.6), rgba(18, 16, 25, 0))",
          opacity:
            interpolate(frame, [OPEN[0], OPEN[1]], [0, 1], clamp) *
            interpolate(frame, [MIR_HOLD + 22, MIR_HOLD + 34], [1, 0], clamp),
        }}
      />
      <Caption
        number="04"
        label="Mir"
        line="Vaša savna. Vaš ritual."
        start={28}
        end={MIR_HOLD + 22}
      />
    </AbsoluteFill>
  );
};
