import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, type SlideDirection } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import { LogoIntro } from "../intro/LogoIntro";
import { LogoOutro } from "../outro/LogoOutro";
import { Address } from "./scenes/Address";
import { Hours } from "./scenes/Hours";
import { Neighbour } from "./scenes/Neighbour";
import { NewHome } from "./scenes/NewHome";

const TRANSITION_FRAMES = 15;

/** Returns the element itself: TransitionSeries only accepts its own Sequence and Transition children. */
const slideIn = (direction: SlideDirection) => (
  <TransitionSeries.Transition
    presentation={slide({ direction })}
    timing={linearTiming({
      durationInFrames: TRANSITION_FRAMES,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    })}
  />
);

/**
 * 16 s Instagram reel: Kranfix's new location at Koroška cesta 4, next to A1.
 * Scenes 90 + 90 + 105 + 90 + 90 + 90 frames, minus five 15-frame transitions = 480 frames.
 */
export const LocationReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={90}>
      <LogoIntro />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="New home" durationInFrames={90}>
      <NewHome />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Address" durationInFrames={105}>
      <Address />
    </TransitionSeries.Sequence>
    {slideIn("from-right")}
    <TransitionSeries.Sequence name="Next to A1" durationInFrames={90}>
      <Neighbour />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Hours" durationInFrames={90}>
      <Hours />
    </TransitionSeries.Sequence>
    {slideIn("from-bottom")}
    <TransitionSeries.Sequence name="Outro" durationInFrames={90}>
      <LogoOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
