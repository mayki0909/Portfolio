import rentInterior from "../../assets/posts/rent-interior.jpg";
import stoveFire from "../../assets/posts/stove-fire.jpg";
import { CtaSlide, PhotoCover, TipSlide } from "../slides";
import { DOMAIN, HEAT_UP, Soft } from "../shared";

/**
 * 7 Dec carousel: heating a wood-fired sauna faster. Every tip is from the shop's own blog post
 * "Kako čim hitreje segreti savno na drva?" (savne-dolium.si/blog/nasveti-za-hitro-in-ucinkovito-segrevanje,
 * Directus `Blog`, read 18 Nov 2026); the heating time is the FAQ's (`HEAT_UP`).
 */

const SERIES = "Savna na drva";

export const HEATING_TIPS = [
  {
    title: "Kurite s suhimi drvi.",
    body: "Vlažnost lesa naj ne presega 20 %. Polena iz mreže razcepite na 2 do 4 dele.",
  },
  {
    title: "Izberite trd les.",
    body: "Hrast, javor, breza in bukev savno ogrejejo hitreje kot smreka, bor ali jelša.",
  },
  {
    title: "Ognju pustite zrak.",
    body: "Pred kurjenjem očistite kurišče in izpraznite pepelnik. Drva zložite ohlapno, v različnih smereh.",
  },
  {
    title: "Kurišče do dveh tretjin.",
    body: "Napolnjeno naj bo med polovico in dvema tretjinama. Drva dodajte na 10 do 15 minut.",
  },
  {
    title: "Peči ne pregrejte.",
    body: "Kovina naj ne zažari rdeče. Vrata parne sobe odpirajte in zapirajte čim hitreje.",
  },
] as const;

export const HeatingCover = () => (
  <PhotoCover
    photo={stoveFire}
    focus="50% 60%"
    label="Nasveti"
    titleSize={96}
    title={
      <>
        Kako hitreje segreti
        <br />
        <Soft>savno na drva?</Soft>
      </>
    }
    lead="Pet nasvetov za hitrejšo in bolj enakomerno toploto."
  />
);

export const HeatingTip = ({ tip }: { readonly tip: number }) => {
  const { title, body } = HEATING_TIPS[tip - 1];
  return (
    <TipSlide series={SERIES} title={title} body={body} />
  );
};

export const HeatingCta = () => (
  <CtaSlide
    theme="light"
    titleSize={92}
    title={
      <>
        Sod savna se segreje
        <br />
        <Soft>v {HEAT_UP}.</Soft>
      </>
    }
    lead="Celoten vodnik o kurjenju savne na drva je na našem blogu."
    button={`${DOMAIN}/blog`}
    photo={rentInterior}
    focus="50% 45%"
  />
);
