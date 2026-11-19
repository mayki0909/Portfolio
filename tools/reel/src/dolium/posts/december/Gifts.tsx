import accessoriesSteam from "../../assets/posts/accessories-steam.jpg";
import ladle from "../../assets/posts/ladle.jpg";
import brezovaPalica from "../../assets/posts/accessories/brezova-palica.jpg";
import naslonjalo from "../../assets/posts/accessories/naslonjalo.jpg";
import termometer from "../../assets/posts/accessories/termometer.jpg";
import vedro from "../../assets/posts/accessories/vedro.jpg";
import zajemalka from "../../assets/posts/accessories/zajemalka.jpg";
import { CtaSlide, GiftSlide, PhotoCover, ProductCard } from "../slides";
import {
  DOMAIN,
  euro,
  Headline,
  Label,
  PAD,
  PHONE,
  PostFrame,
  Soft,
} from "../shared";

/**
 * 9 Dec carousel: sauna accessories as gifts. Names, prices and photos from Directus `Products`
 * (read 18 Nov 2026), shown under "Dodatki za savne". The cart promises "Rok dobave 3-4 tedne" for every
 * order, so the post makes no promise about delivery before Christmas.
 */

const SERIES = "Darila";

export const GIFTS = {
  zajemalka: { photo: zajemalka, name: "Lesena zajemalka", price: euro(20) },
  vedro: { photo: vedro, name: "Leseno vedro 3 L", price: euro(30) },
  palica: { photo: brezovaPalica, name: "Brezova palica", price: euro(22) },
  termometer: {
    photo: termometer,
    name: "Termometer in higrometer",
    price: euro(20),
  },
  naslonjalo: {
    photo: naslonjalo,
    name: "Leseno naslonjalo za glavo z blazino",
    price: euro(40),
  },
} as const;

export const GiftsCover = () => (
  <PhotoCover
    photo={accessoriesSteam}
    focus="40% 50%"
    label={SERIES}
    title={
      <>
        Darila za
        <br />
        <Soft>ljubitelje savne.</Soft>
      </>
    }
    lead="Za tiste, ki savno že imajo, in za tiste, ki jo bodo kmalu."
  />
);

export const GiftsWater = () => (
  <GiftSlide
    series={SERIES}
    title="Za polivanje kamnov"
    products={[GIFTS.zajemalka, GIFTS.vedro]}
  />
);

export const GiftsRitual = () => (
  <GiftSlide
    series={SERIES}
    title="Za pravi finski ritual"
    products={[GIFTS.palica, GIFTS.termometer]}
  />
);

/** One wide card: the headrest is a photo on a bench, not a cut-out, so it fills its picture. */
export const GiftsRest = () => (
  <PostFrame>
    <div style={{ position: "absolute", top: 96, left: PAD }}>
      <Label>{SERIES}</Label>
    </div>
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        top: 210,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Headline size={84}>Za počitek med krogi</Headline>
      <div style={{ marginTop: 48, display: "flex" }}>
        <ProductCard {...GIFTS.naslonjalo} cover height={720} />
      </div>
    </div>
  </PostFrame>
);

export const GiftsCta = () => (
  <CtaSlide
    title={
      <>
        Naročite
        <br />
        <Soft>na spletu.</Soft>
      </>
    }
    lead="Za darilo pred prazniki nas pokličite, da preverimo rok dobave."
    button={DOMAIN}
    phone={PHONE}
    photo={ladle}
    focus="62% 40%"
  />
);
