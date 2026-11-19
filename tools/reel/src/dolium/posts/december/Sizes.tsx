import mini from "../../assets/posts/products/mini.jpg";
import s2v from "../../assets/posts/products/s2v.jpg";
import s3 from "../../assets/posts/products/s3.jpg";
import s4p from "../../assets/posts/products/s4p.jpg";
import vertikalna from "../../assets/posts/products/vertikalna.jpg";
import { CtaSlide, PhotoCover, ProductSlide } from "../slides";
import { DOMAIN, MODELS, Soft } from "../shared";

/**
 * 18 Dec carousel: which barrel sauna for how many people. Models, capacity ("Kapaciteta"), prices and
 * photos from Directus `Saunas` (read 18 Nov 2026); see `MODELS` in ../shared.
 */

const SERIES = "Izbira savne";

export const SIZES = [
  { model: MODELS.vertikalna, photo: vertikalna, focus: "50% 55%" },
  { model: MODELS.mini, photo: mini, focus: "50% 50%" },
  { model: MODELS.s2v, photo: s2v, focus: "50% 55%" },
  { model: MODELS.s3, photo: s3, focus: "50% 55%" },
  { model: MODELS.s4p, photo: s4p, focus: "50% 55%" },
] as const;

export const SizesCover = () => (
  <PhotoCover
    photo={s4p}
    focus="50% 50%"
    label={SERIES}
    title={
      <>
        Za koliko oseb
        <br />
        <Soft>bo vaša savna?</Soft>
      </>
    }
    lead="Pet sod savn, od dveh do osmih oseb."
  />
);

export const SizesModel = ({ index }: { readonly index: number }) => {
  const { model, photo, focus } = SIZES[index - 1];
  return (
    <ProductSlide
      series={SERIES}
      model={model}
      photo={photo}
      focus={focus}
    />
  );
};

export const SizesCta = () => (
  <CtaSlide
    theme="light"
    title={
      <>
        Sestavite
        <br />
        <Soft>svojo savno.</Soft>
      </>
    }
    lead="Cene so za osnovni komplet z dostavo. Peč na drva ali električni grelec, les in dodatke izberete v konfiguratorju."
    button={DOMAIN}
    photo={mini}
    focus="50% 55%"
  />
);
