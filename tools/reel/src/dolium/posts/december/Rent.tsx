import { dolium } from "../../brand";
import calendarIcon from "../../assets/posts/icons/Calendar.svg";
import locationIcon from "../../assets/posts/icons/LocationBig.svg";
import notepadIcon from "../../assets/posts/icons/Notepad.svg";
import saunaPersonIcon from "../../assets/posts/icons/SaunaPerson.svg";
import rentHills from "../../assets/posts/rent-hills.jpg";
import rentInterior from "../../assets/posts/rent-interior.jpg";
import rentTrailer from "../../assets/posts/rent-trailer.jpg";
import {
  ChecklistSlide,
  CtaSlide,
  PriceSlide,
  StepsSlide,
} from "../slides";
import {
  DOMAIN,
  Headline,
  Label,
  PAD,
  PHONE,
  Photo,
  PostFrame,
  RENT,
  RENT_INCLUDED,
  RENT_REFUND,
  Soft,
} from "../shared";

/**
 * The mobile sauna rental: the 3 Dec carousel.
 * Steps from components/Rent/Process.tsx, the stove and trailer from components/Rent/RentSauna.tsx and
 * constants.tsx (rental FAQ), prices from `RENT` in ../shared.
 */

const SERIES = "Najem savne";

export const RentCover = () => (
  <PostFrame theme="dark">
    <Photo
      src={rentTrailer}
      focus="50% 62%"
      fadeTo={dolium.night}
      fadeFrom={0.45}
      style={{ left: 0, right: 0, top: 0, height: 900 }}
    />
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: 190,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label theme="dark">{SERIES}</Label>
      <Headline size={120} theme="dark" style={{ marginTop: 30 }}>
        Savna, ki pride
        <br />
        <Soft>k vam.</Soft>
      </Headline>
    </div>
  </PostFrame>
);

/** components/Rent/Process.tsx, with the site's own icons. */
export const RentSteps = () => (
  <StepsSlide
    series={SERIES}
    title="Kako poteka najem?"
    steps={[
      { icon: calendarIcon, text: "Rezervacijo opravite prek spleta." },
      { icon: locationIcon, text: "Savno dostavimo na vašo lokacijo." },
      {
        icon: notepadIcon,
        text: "Za vas jo prižgemo in vam jo dobro predstavimo.",
      },
      { icon: saunaPersonIcon, text: "Vi pa se samo sprostite in uživajte." },
    ]}
  />
);

/** RentSauna.tsx ("Sauna uporablja peč Harvia M3", no electricity) and the rental FAQ in constants.tsx. */
export const RentIncluded = () => (
  <ChecklistSlide
    series={SERIES}
    title="Kaj dobite?"
    photo={rentInterior}
    focus="50% 55%"
    items={[
      "Sod savno na prikolici",
      "Peč na drva Harvia M3",
      "Brez električnega priključka",
      "Končno čiščenje je vključeno",
    ]}
  />
);

export const RentPrices = () => (
  <PriceSlide
    series={SERIES}
    title="Cene najema"
    rows={[
      { label: "En dan", note: "ponedeljek–četrtek", price: RENT.weekDay },
      { label: "En dan", note: "petek–nedelja", price: RENT.weekendDay },
      { label: "Vikend paket", note: "petek–nedelja", price: RENT.weekend },
      { label: "Tedenski paket", note: "ponedeljek–nedelja", price: RENT.week },
    ]}
    note={RENT_INCLUDED}
  />
);

export const RentRefund = () => (
  <CtaSlide
    title={
      <>
        Najem vam
        <br />
        <Soft>povrnemo.</Soft>
      </>
    }
    lead={RENT_REFUND}
    button={`${DOMAIN}/najem`}
    phone={PHONE}
    photo={rentHills}
    focus="50% 60%"
  />
);
