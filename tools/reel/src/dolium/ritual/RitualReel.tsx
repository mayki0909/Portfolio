import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import {
  CLOSE_FRAMES,
  Les,
  Razgled,
  Vecer,
  VIEW_FRAMES,
  Vrt,
  VRT_FRAMES,
  WOOD_FRAMES,
} from "./scenes";

const TRANSITION_FRAMES = 8;

const push = (direction: "from-right" | "from-left") => (
  <TransitionSeries.Transition
    presentation={slide({ direction })}
    timing={linearTiming({
      durationInFrames: TRANSITION_FRAMES,
      easing: Easing.bezier(0.7, 0, 0.3, 1),
    })}
  />
);

export const RITUAL_DURATION =
  VRT_FRAMES + VIEW_FRAMES + WOOD_FRAMES + CLOSE_FRAMES - TRANSITION_FRAMES * 3;

/**
 * About 13 s. A daylight film of the sauna where it stands: the garden, the window,
 * the wood, the evening by the lake. Full frame, one line at a time, sliding cuts.
 * No steps, no framed window, no dimmed outro. No sound; add music in Instagram.
 */
export const RitualReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Vrt" durationInFrames={VRT_FRAMES}>
      <Vrt />
    </TransitionSeries.Sequence>
    {push("from-right")}
    <TransitionSeries.Sequence name="Razgled" durationInFrames={VIEW_FRAMES}>
      <Razgled />
    </TransitionSeries.Sequence>
    {push("from-left")}
    <TransitionSeries.Sequence name="Les" durationInFrames={WOOD_FRAMES}>
      <Les />
    </TransitionSeries.Sequence>
    {push("from-right")}
    <TransitionSeries.Sequence name="Večer" durationInFrames={CLOSE_FRAMES}>
      <Vecer />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
