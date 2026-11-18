import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import { LogoOutro } from "../outro/LogoOutro";
import { Checks, CHECKS_DURATION } from "./Checks";
import { EndingScene } from "./Ending";

const TRANSITION_FRAMES = 15;
const ENDING_FRAMES = 90;
const OUTRO_FRAMES = 90;

/** 840 + 90 + 90 frames minus two 15-frame transitions = 990 frames, 33 s. */
export const REFURBISHED_DURATION =
  CHECKS_DURATION + ENDING_FRAMES + OUTRO_FRAMES - 2 * TRANSITION_FRAMES;

const slideUp = () => (
  <TransitionSeries.Transition
    presentation={slide({ direction: "from-bottom" })}
    timing={linearTiming({
      durationInFrames: TRANSITION_FRAMES,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    })}
  />
);

/**
 * "Kako preverimo obnovljen telefon?": the question, ten checks on a drawn phone, the site's three
 * promises, "Obnovljeni telefoni na kranfix.si", and the logo outro.
 */
export const RefurbishedReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Checks" durationInFrames={CHECKS_DURATION}>
      <Checks />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="Ending" durationInFrames={ENDING_FRAMES}>
      <EndingScene />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="Outro" durationInFrames={OUTRO_FRAMES}>
      <LogoOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
