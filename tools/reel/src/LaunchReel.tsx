import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, type SlideDirection } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import { LogoIntro } from "./intro/LogoIntro";
import { LogoOutro } from "./outro/LogoOutro";
import { Accessories } from "./scenes/Accessories";
import { Announce } from "./scenes/Announce";
import { Buyback } from "./scenes/Buyback";
import { RepairReveal } from "./scenes/RepairReveal";

/** Returns the element itself: TransitionSeries only accepts its own Sequence and Transition children. */
const slideIn = (direction: SlideDirection) => (
  <TransitionSeries.Transition
    presentation={slide({ direction })}
    timing={linearTiming({
      durationInFrames: 15,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    })}
  />
);

/**
 * 13.5 s Instagram reel: the new kranfix.si is live, with repairs, accessories and buyback.
 * Scenes 90 + 75 + 75 + 75 + 75 + 90 frames, minus five 15-frame transitions = 405 frames.
 */
export const LaunchReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={90}>
      <LogoIntro />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Announce" durationInFrames={75}>
      <Announce />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Repair" durationInFrames={75}>
      <RepairReveal />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Accessories" durationInFrames={75}>
      <Accessories />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Buyback" durationInFrames={75}>
      <Buyback />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Outro" durationInFrames={90}>
      <LogoOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
