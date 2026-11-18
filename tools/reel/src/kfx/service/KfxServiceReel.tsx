import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, type SlideDirection } from "@remotion/transitions/slide";
import { KfxIntro } from "../KfxIntro";
import { KFX_OUTRO_DEFAULTS, KfxOutro } from "../KfxOutro";
import { ease } from "../brand";
import { Book } from "./Book";
import { Hero } from "./Hero";
import { Steps } from "./Steps";

const TRANSITION_FRAMES = 15;
const SCENES = {
  intro: 90,
  hero: 90,
  steps: 180,
  book: 150,
  outro: 90,
} as const;

/** Scenes minus the four transitions between them. */
export const KFX_SERVICE_DURATION =
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
 * 18 s Instagram reel for KFX: how a service works, from the website's service page.
 * Intro, the mechanic and KFX's promises, the four steps, book a slot, outro.
 */
export const KfxServiceReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={SCENES.intro}>
      <KfxIntro />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Hero" durationInFrames={SCENES.hero}>
      <Hero />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Steps" durationInFrames={SCENES.steps}>
      <Steps />
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
