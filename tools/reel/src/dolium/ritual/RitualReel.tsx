import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Easing } from "remotion";
import { DoliumIntro } from "../DoliumIntro";
import { Mir, MIR_FRAMES, Ogenj, Para, Pocitek, SCENE_FRAMES } from "./scenes";

const TRANSITION_FRAMES = 20;
/** DoliumIntro finishes at about frame 78; the extra frames hold it before the first fade. */
const INTRO_FRAMES = 105;

/** Returns the element itself: TransitionSeries only accepts its own Sequence and Transition children. */
const dissolve = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({
      durationInFrames: TRANSITION_FRAMES,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
    })}
  />
);

export const RITUAL_DURATION =
  INTRO_FRAMES + SCENE_FRAMES * 3 + MIR_FRAMES - TRANSITION_FRAMES * 4;

/**
 * About 17 s Instagram reel for Savne Dolium, "Večerni ritual": an evening in your own sauna,
 * step by step, in a dark filmic look. Each step plays in a framed window with a numbered caption;
 * the last opens up to full bleed and runs straight into DoliumOutro.
 */
export const RitualReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={INTRO_FRAMES}>
      <DoliumIntro />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="01 Ogenj" durationInFrames={SCENE_FRAMES}>
      <Ogenj />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="02 Para" durationInFrames={SCENE_FRAMES}>
      <Para />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="03 Počitek" durationInFrames={SCENE_FRAMES}>
      <Pocitek />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="04 Mir + Outro" durationInFrames={MIR_FRAMES}>
      <Mir />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
