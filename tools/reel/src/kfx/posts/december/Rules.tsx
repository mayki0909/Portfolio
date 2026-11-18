import type { ReactNode } from "react";
import { kfx } from "../../brand";
import {
  HelmetIcon,
  LightbulbIcon,
  RouteIcon,
  SmartphoneIcon,
  UserXIcon,
} from "../../icons";
import { BigFigure, IconVisual, ScooterCover, TipSlide } from "../slides";
import { Accent, IconTile, pageOf } from "../shared";

/**
 * 9 Dec carousel: e-scooter rules in 2026. Wording follows policija.si ("Varno z e-skirojem") and the
 * age limit in ZVoz-1G (Uradni list RS 16/2026, in force 28 Feb 2026). No insurance or registration
 * duty exists for e-scooters, so the post doesn't mention one.
 */
const PAGES = 7;
const SOURCE = "Vir: policija.si, Uradni list RS 16/2026";

/** Two crimson tiles side by side: no passenger, no phone. */
const NoPassengerNoPhone = () => (
  <div style={{ display: "flex", gap: 28 }}>
    <IconTile size={200} radius={48}>
      <UserXIcon size={110} color={kfx.white} />
    </IconTile>
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        borderRadius: 48,
        border: `6px solid ${kfx.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SmartphoneIcon size={100} color={kfx.ink} />
      <div
        style={{
          position: "absolute",
          width: 230,
          height: 10,
          borderRadius: 5,
          backgroundColor: kfx.primary,
          rotate: "-45deg",
        }}
      />
    </div>
  </div>
);

const RULES: readonly { visual: ReactNode; title: ReactNode; body: string }[] = [
  {
    visual: <BigFigure>15+</BigFigure>,
    title: "Voznik je star vsaj 15 let.",
    body: "Tako velja od 28. februarja 2026. Prej so lahko pod pogoji vozili tudi mlajši.",
  },
  {
    visual: <IconVisual Icon={HelmetIcon} />,
    title: "Do 18. leta s čelado.",
    body: "Mladi do 18. leta morajo nositi ustrezno pripeto kolesarsko čelado.",
  },
  {
    visual: <BigFigure size={190}>25 km/h</BigFigure>,
    title: "Največ 25 km/h.",
    body: "Skiro, ki je narejen za večjo hitrost, ne sme na cesto.",
  },
  {
    visual: <IconVisual Icon={RouteIcon} />,
    title: "Po kolesarskih površinah.",
    body: "Vozite po kolesarskem pasu, stezi ali poti. Kjer jih ni, po desnem robu ceste v naselju z omejitvijo do 50 km/h. Med pešci le s hitrostjo hoje.",
  },
  {
    visual: <IconVisual Icon={LightbulbIcon} />,
    title: "Ponoči z lučmi.",
    body: "Spredaj bela luč, zadaj rdeča luč in rdeč odsevnik, ob strani rumeni ali oranžni odsevniki.",
  },
  {
    visual: <NoPassengerNoPhone />,
    title: "Sami in brez telefona.",
    body: "Na e-skiroju ne smete voziti sopotnika. Med vožnjo ne uporabljajte telefona.",
  },
];

/** 1: cover over the hero scooter. */
export const RulesCover = () => (
  <ScooterCover
    label="Pravila 2026"
    title={
      <>
        E-skiro v letu
        <br />
        <Accent>2026.</Accent>
      </>
    }
    lead="Šest pravil za vožnjo po cesti."
    footerRight={pageOf(1, PAGES)}
  />
);

/** 2–7: one rule per slide. The source sits on every rule, since slides get shared one at a time. */
export const RulesRule = ({ rule }: { readonly rule: number }) => {
  const { visual, title, body } = RULES[rule - 1];
  return (
    <TipSlide
      number={rule}
      series="E-skiro v letu 2026"
      visual={visual}
      title={title}
      body={body}
      note={SOURCE}
      footerRight={pageOf(rule + 1, PAGES)}
    />
  );
};
