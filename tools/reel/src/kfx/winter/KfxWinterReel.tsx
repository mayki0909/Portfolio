import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, type SlideDirection } from "@remotion/transitions/slide";
import { ease } from "../brand";
import { KFX_OUTRO_DEFAULTS, KfxOutro } from "../KfxOutro";
import { Book } from "../service/Book";
import { Hook } from "./Hook";
import { Perks } from "./Perks";

const TRANSITION_FRAMES = 15;
const SCENES = {
  hook: 105,
  perks: 180,
  book: 150,
  outro: 90,
} as const;

/** Scenes minus the three transitions between them. */
export const KFX_WINTER_DURATION =
  Object.values(SCENES).reduce((sum, frames) => sum + frames, 0) -
  3 * TRANSITION_FRAMES;

/** Returns the element itself: TransitionSeries only accepts its own Sequence and Transition children. */
const slideIn = (direction: SlideDirection) => (
  <TransitionSeries.Transition
    presentation={slide({ direction })}
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES, easing: ease })}
  />
);

/**
 * 16 s Instagram reel for 23 Nov: winter is the time for a service. Opens straight on the snowy scooter
 * (no logo sting, so the hook is the first frame), then what KFX's service offers, the service reel's
 * "Rezerviraj termin" scene, and KfxOutro.
 */
export const KfxWinterReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES.hook}>
      <Hook />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Perks" durationInFrames={SCENES.perks}>
      <Perks />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Book" durationInFrames={SCENES.book}>
      <Book />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Outro" durationInFrames={SCENES.outro}>
      <KfxOutro {...KFX_OUTRO_DEFAULTS} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
