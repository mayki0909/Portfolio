import barrelGarden from "../../assets/posts/barrel-garden.jpg";
import saunaLake from "../../assets/sauna-lake.jpg";
import { CtaSlide, PhotoCover, TipSlide } from "../slides";
import { DOMAIN, PHONE, Soft } from "../shared";

/**
 * 16 Dec carousel: caring for an outdoor sauna. Every rule is from the shop's FAQ (saunas-shop/constants.tsx,
 * "Kako pravilno skrbeti za zunanjo savno?", "Kako zaščititi zunanjo savno pred plesnijo?" and
 * "Kakšne temelje potrebujem?"), live on savne-dolium.si/faq.
 */

const SERIES = "Nega savne";

export const CARE_RULES = [
  {
    title: "Prezračevanje naj bo odprto.",
    body: "Zaprte prezračevalne odprtine so eden glavnih vzrokov za plesen. Redno preverite, da so čiste.",
  },
  {
    title: "Ne na vlažna tla.",
    body: "Savno postavite na betonsko podlago, asfalt ali temelje, ki jo ločijo od tal.",
  },
  {
    title: "Pravočasno uredite obroče.",
    body: "Tako se vrata ne povesijo in profili savne ostanejo nepoškodovani.",
  },
  {
    title: "Impregnacija vsaj enkrat na leto.",
    body: "Zaščitno sredstvo varuje zunanjost pred plesnijo in gnitjem ter ohrani videz lesa.",
  },
] as const;

export const CareCover = () => (
  <PhotoCover
    photo={barrelGarden}
    focus="45% 45%"
    label="Nasveti"
    title={
      <>
        Štiri pravila
        <br />
        <Soft>za zunanjo savno.</Soft>
      </>
    }
    lead="Da bo les lep in savna zdrava še dolgo."
  />
);

export const CareRule = ({ rule }: { readonly rule: number }) => {
  const { title, body } = CARE_RULES[rule - 1];
  return (
    <TipSlide series={SERIES} title={title} body={body} />
  );
};

export const CareCta = () => (
  <CtaSlide
    theme="light"
    title={
      <>
        Vprašanje
        <br />
        <Soft>o negi?</Soft>
      </>
    }
    lead="Odgovore na pogosta vprašanja o savnah in kadeh najdete na spletu."
    button={`${DOMAIN}/faq`}
    phone={PHONE}
    photo={saunaLake}
    focus="50% 60%"
  />
);
