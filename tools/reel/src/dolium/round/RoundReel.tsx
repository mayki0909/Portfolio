import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Easing } from "remotion";
import { DOLIUM_OUTRO_DURATION, DoliumOutro } from "../DoliumOutro";
import {
  CoolDown,
  LongestNight,
  NIGHT_FRAMES,
  OneRound,
  Pour,
  REST_FRAMES,
  ROUND_FRAMES,
  STEAM_FRAMES,
  Water,
  WATER_FRAMES,
} from "./scenes";

const TRANSITION_FRAMES = 14;

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

export const ROUND_DURATION =
  NIGHT_FRAMES +
  ROUND_FRAMES +
  STEAM_FRAMES +
  REST_FRAMES +
  WATER_FRAMES +
  DOLIUM_OUTRO_DURATION -
  TRANSITION_FRAMES * 5;

/**
 * About 17 s Instagram reel for Savne Dolium, posted 21 Dec, the winter solstice.
 * One round of sauna: how long, how to throw water, cool down, drink, no alcohol.
 * Same dark framed look as RitualReel. No sound; add music in the Instagram app.
 */
export const RoundReel = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="01 Noč" durationInFrames={NIGHT_FRAMES}>
      <LongestNight />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="02 Krog" durationInFrames={ROUND_FRAMES}>
      <OneRound />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="03 Para" durationInFrames={STEAM_FRAMES}>
      <Pour />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="04 Mir" durationInFrames={REST_FRAMES}>
      <CoolDown />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="05 Voda" durationInFrames={WATER_FRAMES}>
      <Water />
    </TransitionSeries.Sequence>
    {dissolve()}
    <TransitionSeries.Sequence name="Outro" durationInFrames={DOLIUM_OUTRO_DURATION}>
      <DoliumOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
