import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, Interactive } from "remotion";
import { dmSans, dmSerif, dolium } from "../brand";
import {
  barrel,
  dolium as doliumLine,
  LOGO_VIEWBOX,
  savne,
  steamWisps,
} from "../logoPaths";

/**
 * Building blocks for Savne Dolium feed posts and Stories, in the site's type (DM Serif Display headlines,
 * DM Sans text) and colours (saunas-shop/styles/variables.scss). Light pages are the site's primaryLight;
 * dark pages are the `night` of the reels.
 *
 * Every fact a post shows is a constant in this file with its source. Checked 18 Nov 2026.
 */

/** Instagram feed post, 4:5. */
export const POST = { width: 1080, height: 1350 } as const;
/** Instagram / Facebook Story, 9:16. Content stays between y 380 and 1560, clear of the app's UI. */
export const STORY = { width: 1080, height: 1920 } as const;

export const PAD = 88;

/** saunas-shop/constants.tsx:3-6. */
export const PHONE = "+386 68 601 072";
export const DOMAIN = "savne-dolium.si";
export const INSTAGRAM = "@savne_dolium";

/**
 * Mobile sauna rental. Directus `RentPrices` on cms.savne-dolium.si (changed 9 Oct 2025, read 18 Nov 2026),
 * which /najem shows. The code fallbacks in components/Rent/RentSauna.tsx (55/70/200/350 €) are outdated.
 */
export const RENT = {
  weekDay: "95 €",
  weekendDay: "100 €",
  weekend: "250 €",
  week: "500 €",
} as const;

/** components/Rent/RentSauna.tsx:99. */
export const RENT_INCLUDED =
  "V ceno je všteto končno čiščenje. Dostava po dogovoru, glede na lokacijo.";

/** constants.tsx:172 (rental FAQ). */
export const RENT_REFUND =
  "Če se po najemu odločite za nakup savne, vam ceno najema povrnemo.";

/** constants.tsx:41 (FAQ "Kaj je savna v obliki soda?"). */
export const HEAT_UP = "30–40 minut";

/**
 * FAQ "Katere grelnike naj izberem: električne ali na drva?" (constants.tsx). Both heaters warm the stones,
 * and the stones warm the sauna, to about this temperature.
 */
export const STOVE_TEMP = "70–100 °C";

/**
 * Electrical supply, components/PostavitevTemeljev/KajUreditiSection.tsx ("Električni priključek").
 * A wood stove still needs 230 V if the sauna has lights.
 */
export const ELECTRIC_SUPPLY =
  "3-fazni priključek (400 V) ali 1-fazni (230 V), odvisno od moči peči";
export const SAUNA_LIGHTS = "230 V";

/**
 * Product prices: Directus `Saunas` and `Products`, read 18 Nov 2026. Sauna prices are the basic kit with
 * delivery ("Stroški dostave so vključeni v ceno"), without a stove: the configurator adds wood stoves
 * (+1.110 € to +1.990 €) or electric heaters (+360 €, +410 €). `discount` is a percentage the shop shows
 * as a struck-through price. Check every price on the site on the day of posting.
 */
export type Model = {
  readonly name: string;
  readonly length: string;
  /** "Kapaciteta" in the product's parameters. */
  readonly persons: number;
  readonly price: number;
  readonly discount?: number;
  readonly badge?: string;
};

export const MODELS = {
  vertikalna: { name: "Vertikalna savna", length: "Ø 2 m", persons: 2, price: 2900 },
  mini: { name: "Sod savna Mini", length: "1,6 m", persons: 3, price: 2790 },
  s2v: {
    name: "Sod savna S2V",
    length: "2,4 m",
    persons: 4,
    price: 3400,
    discount: 5,
    // shortDescription: "Najbolj priljubljena zunanja finska sod savna v naši ponudbi".
    badge: "Najbolj priljubljena",
  },
  s3: { name: "Sod savna S3", length: "3 m", persons: 6, price: 3650 },
  s4p: { name: "Sod savna s predsobo S4P", length: "4 m", persons: 8, price: 4550 },
} as const satisfies Record<string, Model>;

/** Slovenian price format: 3.230 €, 2.648,10 €. */
export const euro = (value: number) =>
  `${value.toLocaleString("de-DE", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })} €`;

export const priceOf = (model: Model) =>
  model.discount ? model.price * (1 - model.discount / 100) : model.price;

/** "2 osebi", "3 osebe", "6 oseb": Slovenian dual and plural. */
export const persons = (n: number) =>
  n === 1 ? "1 oseba" : n === 2 ? "2 osebi" : n <= 4 ? `${n} osebe` : `${n} oseb`;

export type Theme = "light" | "dark";

export const palette = (theme: Theme) =>
  theme === "dark"
    ? {
        bg: dolium.night,
        ink: dolium.primaryLight,
        body: dolium.secondaryLight,
        muted: dolium.secondaryDark,
        line: "rgba(236, 239, 249, 0.16)",
        card: "#1d1a28",
      }
    : {
        bg: dolium.primaryLight,
        ink: dolium.primaryDark,
        body: dolium.neutral30,
        muted: "#7E7B84",
        line: dolium.secondaryLight,
        card: dolium.white,
      };

/** The full logo (public/assets/Logo.svg): barrel, steam and the two-line wordmark. */
export const DoliumLogo = ({
  height,
  color = dolium.primaryDark,
}: {
  readonly height: number;
  readonly color?: string;
}) => (
  <svg
    width={(LOGO_VIEWBOX.width / LOGO_VIEWBOX.height) * height}
    height={height}
    viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
    style={{ display: "block", flexShrink: 0, overflow: "visible" }}
  >
    {[
      ...barrel.paths,
      ...savne.paths,
      ...doliumLine.paths,
      ...steamWisps.flatMap((wisp) => wisp.paths),
    ].map((d) => (
      <path key={d} d={d} fill={color} />
    ))}
  </svg>
);

/** Page in the given theme with the logo footer pinned to the bottom. */
export const PostFrame = ({
  children,
  theme = "light",
  footer = true,
  footerRight = DOMAIN,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly footer?: boolean;
  readonly footerRight?: ReactNode;
}) => (
  <AbsoluteFill
    style={{ backgroundColor: palette(theme).bg, fontFamily: dmSans }}
  >
    {children}
    {footer ? <Footer theme={theme} right={footerRight} /> : null}
  </AbsoluteFill>
);

/** Logo on the left, the domain on the right, above a hairline. */
export const Footer = ({
  theme = "light",
  right,
  bottom = 60,
}: {
  readonly theme?: Theme;
  readonly right: ReactNode;
  readonly bottom?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: PAD,
      right: PAD,
      bottom,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 26,
      borderTop: `2px solid ${palette(theme).line}`,
    }}
  >
    <DoliumLogo height={58} color={palette(theme).ink} />
    <Interactive.Div
      name="Footer text"
      style={{
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: palette(theme).muted,
      }}
    >
      {right}
    </Interactive.Div>
  </div>
);

/** DM Serif Display headline. Wrap the soft second line in `<Soft>` (italic). */
export const Headline = ({
  children,
  size,
  theme = "light",
  style,
}: {
  readonly children: ReactNode;
  readonly size: number;
  readonly theme?: Theme;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Headline"
    style={{
      fontFamily: dmSerif,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.04,
      letterSpacing: "-0.01em",
      color: palette(theme).ink,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

export const Soft = ({
  children,
  style,
}: {
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => <span style={{ fontStyle: "italic", ...style }}>{children}</span>;

/** Body text under a headline. */
export const Lead = ({
  children,
  theme = "light",
  size = 40,
  style,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly size?: number;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Lead"
    style={{
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.38,
      color: palette(theme).body,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

/** Outlined pill, like the site's buttons, for the series name ("NAJEM SAVNE"). */
export const Label = ({
  children,
  theme = "light",
  filled = false,
  style,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly filled?: boolean;
  readonly style?: CSSProperties;
}) => {
  const ink = palette(theme).ink;
  return (
    <Interactive.Div
      name="Label"
      style={{
        alignSelf: "flex-start",
        padding: "12px 26px",
        borderRadius: 100,
        border: `2px solid ${ink}`,
        backgroundColor: filled ? ink : "transparent",
        color: filled ? palette(theme).bg : ink,
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

/** The site's dark pill button, used for the call to action ("savne-dolium.si/najem"). */
export const Button = ({
  children,
  theme = "light",
  style,
}: {
  readonly children: ReactNode;
  readonly theme?: Theme;
  readonly style?: CSSProperties;
}) => (
  <Interactive.Div
    name="Button"
    style={{
      alignSelf: "flex-start",
      padding: "24px 44px",
      borderRadius: 100,
      backgroundColor: theme === "dark" ? dolium.primaryLight : dolium.primaryDark,
      color: theme === "dark" ? dolium.primaryDark : dolium.white,
      fontWeight: 500,
      fontSize: 36,
      ...style,
    }}
  >
    {children}
  </Interactive.Div>
);

/**
 * A photo filling a box (object-fit: cover), with `focus` as the object-position, and an optional fade into
 * `fadeTo` at the bottom so text can sit underneath.
 */
export const Photo = ({
  src,
  focus = "50% 50%",
  fadeTo,
  fadeFrom = 0.55,
  radius = 0,
  scale = 1,
  style,
}: {
  readonly src: string;
  readonly focus?: string;
  readonly fadeTo?: string;
  readonly fadeFrom?: number;
  readonly radius?: number;
  /** Zooms in so a mark on the photo can sit outside the frame. */
  readonly scale?: number;
  readonly style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      overflow: "hidden",
      borderRadius: radius,
      ...style,
    }}
  >
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: focus,
        transform: scale === 1 ? undefined : `scale(${scale})`,
        transformOrigin: focus,
        display: "block",
      }}
    />
    {fadeTo ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(180deg, transparent 0%, transparent ${fadeFrom * 100}%, ${fadeTo} 100%)`,
        }}
      />
    ) : null}
  </div>
);
