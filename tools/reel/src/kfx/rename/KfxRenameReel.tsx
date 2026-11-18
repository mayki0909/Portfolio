import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, type SlideDirection } from "@remotion/transitions/slide";
import { ease } from "../brand";
import { KFX_OUTRO_DEFAULTS, KfxOutro } from "../KfxOutro";
import { Address } from "./Address";
import { Rename } from "./Rename";
import { Team } from "./Team";
import { Website } from "./Website";

const TRANSITION_FRAMES = 15;
const SCENES = {
  rename: 160,
  team: 90,
  address: 110,
  website: 120,
  outro: 90,
} as const;

/** Scenes minus the four transitions between them. */
export const KFX_RENAME_DURATION =
  Object.values(SCENES).reduce((sum, frames) => sum + frames, 0) -
  4 * TRANSITION_FRAMES;

/** Returns the element itself: TransitionSeries only accepts its own Sequence and Transition children. */
const slideIn = (direction: SlideDirection) => (
  <TransitionSeries.Transition
    presentation={slide({ direction })}
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES, easing: ease })}
  />
);

/**
 * 17 s Instagram reel: Krgofix is now KFX. Opens on the old logo instead of KfxIntro, since followers know
 * that one; it pulls away and KFX rides in. Then same team, the address, the new website, and KfxOutro.
 */
export const KfxRenameReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Rename" durationInFrames={SCENES.rename}>
      <Rename />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Team" durationInFrames={SCENES.team}>
      <Team />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Address" durationInFrames={SCENES.address}>
      <Address />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Website" durationInFrames={SCENES.website}>
      <Website domain={KFX_OUTRO_DEFAULTS.domain} />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Outro" durationInFrames={SCENES.outro}>
      <KfxOutro {...KFX_OUTRO_DEFAULTS} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
