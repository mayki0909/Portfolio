import rentHills from "../../assets/posts/rent-hills.jpg";
import stoveFire from "../../assets/posts/stove-fire.jpg";
import { CtaSlide, PhotoCover, TipSlide } from "../slides";
import { DOMAIN, HEAT_UP, SAUNA_LIGHTS, Soft } from "../shared";

/**
 * Carousel before the 5 Dec "Drva ali elektrika?" Story. Facts are the same FAQ answer as the electric
 * carousel, plus the lights line in KajUreditiSection.tsx: a wood stove needs no supply to run, but lights
 * still need 230 V. Heating time is HEAT_UP, the barrel-sauna FAQ.
 */

const SERIES = "Peč na drva";

export const WOOD_TIPS = [
  {
    title: "Peč brez elektrike.",
    body: "Za delovanje peči električni priključek ni potreben.",
  },
  {
    title: "Luči rabijo elektriko.",
    body: `Tudi pri peči na drva luči v savni potrebujejo dovod ${SAUNA_LIGHTS}.`,
  },
  {
    title: "Vonj po lesu.",
    body: "Goreč les ustvari tradicionalno vzdušje. Temperaturo je težje voditi kot pri električnem grelcu.",
  },
] as const;

export const WoodCover = () => (
  <PhotoCover
    photo={stoveFire}
    focus="70% 100%"
    scale={2.2}
    label={SERIES}
    titleSize={116}
    title={
      <>
        Peč
        <br />
        <Soft>na drva.</Soft>
      </>
    }
    lead="Vonj po lesu, brez priključka za peč."
  />
);

export const WoodTip = ({ tip }: { readonly tip: number }) => {
  const { title, body } = WOOD_TIPS[tip - 1];
  return (
    <TipSlide series={SERIES} title={title} body={body} />
  );
};

export const WoodCta = () => (
  <CtaSlide
    theme="light"
    titleSize={88}
    title={
      <>
        Toplo v
        <br />
        <Soft>{HEAT_UP}.</Soft>
      </>
    }
    lead="Sod savna se segreje v tem času. Peč na drva izberete v konfiguratorju, ko naročite savno."
    button={DOMAIN}
    photo={rentHills}
    focus="50% 58%"
  />
);
