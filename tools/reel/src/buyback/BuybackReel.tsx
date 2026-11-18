import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Easing } from "remotion";
import { brand } from "../brand";
import { EndCard } from "../EndCard";
import { LogoOutro } from "../outro/LogoOutro";
import { Flow, FLOW_DURATION } from "./Flow";

const TRANSITION_FRAMES = 15;
const END_FRAMES = 90;
const OUTRO_FRAMES = 90;

/** 696 + 90 + 90 frames minus two 15-frame transitions = 846 frames, 28.2 s. */
export const BUYBACK_DURATION =
  FLOW_DURATION + END_FRAMES + OUTRO_FRAMES - 2 * TRANSITION_FRAMES;

export type BuybackReelProps = {
  /**
   * The estimate shown in step 3, labelled "Primer". 280 € is iPhone 15, 128 GB, grade B
   * ("Zelo dobro") in supabase/migrations/20261010140219_buyback.sql: check it against the live
   * site and render with --props='{"estimate":"300 €"}' if it changed.
   */
  readonly estimate: string;
};

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
 * "Koliko je vreden tvoj stari telefon?": the four steps of kranfix.si/odkup on the drawn phone,
 * the final price confirmed after inspection, then "Preveri ceno na kranfix.si" and the logo outro.
 * Its own accents are the site's buyback green; the site inside the phone keeps its crimson.
 */
export const BuybackReel = ({ estimate }: BuybackReelProps) => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Flow" durationInFrames={FLOW_DURATION}>
      <Flow estimate={estimate} />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="End card" durationInFrames={END_FRAMES}>
      <EndCard
        badge="Odkup telefonov"
        lines={["Preveri", "ceno"]}
        accent="na kranfix.si"
        color={brand.refix}
      />
    </TransitionSeries.Sequence>
    {slideUp()}
    <TransitionSeries.Sequence name="Outro" durationInFrames={OUTRO_FRAMES}>
      <LogoOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
