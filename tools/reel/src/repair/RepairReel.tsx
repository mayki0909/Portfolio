import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import { EndCard } from "../EndCard";
import { LogoOutro } from "../outro/LogoOutro";
import { REPAIR_FLOW_DURATION, RepairFlow } from "./RepairFlow";

const TRANSITION_FRAMES = 15;
const END_FRAMES = 90;
const OUTRO_FRAMES = 90;

/** 741 + 90 + 90 frames minus two 15-frame transitions = 891 frames, 29.7 s. */
export const REPAIR_DURATION =
  REPAIR_FLOW_DURATION + END_FRAMES + OUTRO_FRAMES - 2 * TRANSITION_FRAMES;

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
 * "Razbit ekran? Popravilo rezerviraš v nekaj klikih.": the five booking steps of kranfix.si
 * on the drawn phone with the site's own prices, "Večino telefonov popravimo še isti dan.",
 * then "Rezerviraj popravilo na kranfix.si" and the logo outro.
 */
export const RepairReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence
      name="Flow"
      durationInFrames={REPAIR_FLOW_DURATION}
    >
      <RepairFlow />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="End card" durationInFrames={END_FRAMES}>
      <EndCard
        badge="Popravila"
        lines={["Rezerviraj", "popravilo"]}
        accent="na kranfix.si"
      />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="Outro" durationInFrames={OUTRO_FRAMES}>
      <LogoOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
