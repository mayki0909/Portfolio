import electricHeater from "../../assets/posts/electric-heater.jpg";
import windowLake from "../../assets/posts/window-lake.jpg";
import { CtaSlide, PhotoCover, TipSlide } from "../slides";
import { DOMAIN, ELECTRIC_SUPPLY, Soft, STOVE_TEMP } from "../shared";

/**
 * Carousel before the 5 Dec "Drva ali elektrika?" Story. Facts are the FAQ answer
 * "Katere grelnike naj izberem: električne ali na drva?" (constants.tsx) and the supply line in
 * components/PostavitevTemeljev/KajUreditiSection.tsx. The stove categories on /trgovina still show
 * "Kmalu v ponudbi", so the slide sends people to the sauna configurator, not to that category.
 */

const SERIES = "Električna peč";

export const ELECTRIC_TIPS = [
  {
    title: "Temperaturo uravnavate.",
    body: "Po potrebi jo znižate ali zvišate. Pri peči na drva je to težje.",
  },
  {
    title: "Brez drv in pepela.",
    body: "Ni kurjenja in dodatnega dela z ognjem. Grelnik je lažji za vzdrževanje.",
  },
  {
    title: "Priključek po moči.",
    body: `Za električno peč potrebujete ${ELECTRIC_SUPPLY}.`,
  },
] as const;

export const ElectricCover = () => (
  <PhotoCover
    photo={electricHeater}
    focus="100% 100%"
    scale={2.4}
    label={SERIES}
    titleSize={108}
    title={
      <>
        Električna
        <br />
        <Soft>peč.</Soft>
      </>
    }
    lead="Enostavnejše segrevanje, brez drv."
  />
);

export const ElectricTip = ({ tip }: { readonly tip: number }) => {
  const { title, body } = ELECTRIC_TIPS[tip - 1];
  return (
    <TipSlide series={SERIES} title={title} body={body} />
  );
};

export const ElectricCta = () => (
  <CtaSlide
    theme="light"
    titleSize={92}
    title={
      <>
        Kamni grejejo
        <br />
        <Soft>savno.</Soft>
      </>
    }
    lead={`Električni grelec in peč na drva segrejeta savno na okoli ${STOVE_TEMP}. Peč izberete v konfiguratorju.`}
    button={DOMAIN}
    photo={windowLake}
    focus="50% 55%"
  />
);
