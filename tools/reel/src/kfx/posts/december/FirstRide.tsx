import type { ComponentType } from "react";
import {
  BookOpenIcon,
  DiscIcon,
  GaugeIcon,
  HelmetIcon,
} from "../../icons";
import {
  BigFigure,
  BookCta,
  IconVisual,
  ScooterCover,
  TipSlide,
} from "../slides";
import { Accent, pageOf } from "../shared";

/**
 * 22 Dec carousel: an e-scooter under the tree, five things before the first ride. General advice that
 * defers to the manufacturer's manual; the rules are the same as in the 9 Dec carousel.
 */
const PAGES = 7;

type Step = {
  readonly Icon?: ComponentType<{ size: number; color: string }>;
  readonly figure?: string;
  readonly title: string;
  readonly body: string;
};

const STEPS: readonly Step[] = [
  {
    Icon: BookOpenIcon,
    title: "Preberite navodila.",
    body: "Baterijo pred prvo vožnjo napolnite tako, kot piše v navodilih proizvajalca.",
  },
  {
    Icon: GaugeIcon,
    title: "Preverite tlak v gumah.",
    body: "Pravi tlak piše na boku pnevmatike ali v navodilih. Na mrazu je tlak nižji.",
  },
  {
    Icon: DiscIcon,
    title: "Preizkusite zavore.",
    body: "Prve metre zavirajte pri majhni hitrosti, da začutite, kako skiro ustavi.",
  },
  {
    Icon: HelmetIcon,
    title: "Nadenite si čelado.",
    body: "Do 18. leta je obvezna. Priporočamo jo vsem.",
  },
  {
    figure: "15+",
    title: "Preverite pravila.",
    body: "Na cesti sme e-skiro voziti le, kdor je star vsaj 15 let. Največja hitrost je 25 km/h.",
  },
];

/** 1: cover, the hero scooter in snow. */
export const FirstRideCover = () => (
  <ScooterCover
    label="Prva vožnja"
    title={
      <>
        Pod jelko je bil
        <br />
        <Accent>e-skiro?</Accent>
      </>
    }
    lead="Pet stvari pred prvo vožnjo."
    footerRight={pageOf(1, PAGES)}
    snow
  />
);

/** 2–6: one step per slide. */
export const FirstRideStep = ({ step }: { readonly step: number }) => {
  const { Icon, figure, title, body } = STEPS[step - 1];
  return (
    <TipSlide
      number={step}
      series="Pred prvo vožnjo"
      visual={Icon ? <IconVisual Icon={Icon} /> : <BigFigure>{figure}</BigFigure>}
      title={title}
      body={body}
      footerRight={pageOf(step + 1, PAGES)}
    />
  );
};

/** 7: something not right? Free diagnostics. */
export const FirstRideCta = () => (
  <BookCta
    title={
      <>
        Kaj ne
        <br />
        <Accent>deluje?</Accent>
      </>
    }
    lead="Diagnostika pri nas je brezplačna. Drulovka 51, Kranj."
    footerRight={pageOf(PAGES, PAGES)}
  />
);
