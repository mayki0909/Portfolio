import type { ReactNode } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { brand, glide, manrope } from "../brand";
import { clamp } from "../location/shared";
import {
  INK,
  Label,
  LINE,
  MUTED,
  OptionCard,
  RED,
  SELECTED,
  SitePage,
  Tap,
  Title,
} from "../site/ui";

/**
 * kranfix.si/popravila's booking inside the drawn phone, after apps/webshop/components/repair/*
 * with the site's own words and prices (lib/repairs.ts). Every screen takes `t`, the frame within
 * its step. Tap points are in page coordinates.
 */
type ScreenProps = { readonly t: number };

const ease = { ...clamp, easing: glide };

/** lib/repairs.ts bookingSteps. */
const STEPS = ["Naprava", "Model", "Napaka", "Možnosti", "Podatki"] as const;

export const Page = ({
  active,
  children,
}: {
  readonly active: number;
  readonly children: ReactNode;
}) => (
  <SitePage steps={STEPS} active={active}>
    {children}
  </SitePage>
);

/** The hook's broken phone: cracks radiating from one impact. Drawn on the bare screen, not the page. */
export const CrackedScreen = () => (
  <AbsoluteFill style={{ backgroundColor: "#0c0c0f" }}>
    <svg width="408" height="868" viewBox="0 0 408 868">
      <g
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M290 300 L408 210" />
        <path d="M290 300 L360 0" />
        <path d="M290 300 L170 0" />
        <path d="M290 300 L0 190" />
        <path d="M290 300 L0 470" />
        <path d="M290 300 L120 868" />
        <path d="M290 300 L330 868" />
        <path d="M290 300 L408 560" />
        <path d="M250 255 L330 260 L322 345 L246 340 Z" strokeWidth="2" />
        <path d="M205 210 L375 228 L362 400 L198 388 Z" strokeWidth="2" />
        <path
          d="M100 120 L120 220 M60 560 L150 600 M330 640 L380 700"
          strokeWidth="2"
        />
      </g>
      <circle cx="290" cy="300" r="10" fill="rgba(255,255,255,0.9)" />
    </svg>
  </AbsoluteFill>
);

/* ---------- 1. Device ---------- */

/** lib/repairs.ts deviceTypes. */
const DEVICES = [
  { title: "Telefon", text: "iPhone, Samsung, Xiaomi in drugi" },
  { title: "Tablica", text: "iPad in Android tablice" },
  { title: "Računalnik", text: "MacBook in prenosniki" },
  { title: "Ura", text: "Samsung in druge pametne ure" },
  { title: "Konzola", text: "Switch, PlayStation, Xbox" },
  { title: "Nekaj drugega", text: "Opišite napravo v naslednjem koraku" },
] as const;

export const DEVICE_TAP = 40;

export const DeviceScreen = ({ t }: ScreenProps) => (
  <Page active={0}>
    <Title>Katera naprava?</Title>
    <div
      style={{
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
      }}
    >
      {DEVICES.map((device, i) => {
        const selected = i === 0 && t >= DEVICE_TAP + 2;
        return (
          <div
            key={device.title}
            style={{
              height: 96,
              padding: "12px 14px",
              borderRadius: 14,
              border: `2px solid ${selected ? RED : LINE}`,
              backgroundColor: selected ? SELECTED : "#fff",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontFamily: manrope, fontWeight: 700, fontSize: 20 }}>
              {device.title}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                lineHeight: 1.3,
                color: MUTED,
              }}
            >
              {device.text}
            </div>
          </div>
        );
      })}
    </div>
    <Tap t={t} at={DEVICE_TAP} x={74} y={103} />
  </Page>
);

/* ---------- 2. Brand and model ---------- */

const BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "Huawei",
  "Drugo",
] as const;
/** lib/repairs.ts phone list (Apple, newest first, a few of them). */
const MODELS = [
  "iPhone 16",
  "iPhone 15",
  "iPhone 14",
  "iPhone 13",
  "iPhone SE (2022)",
] as const;
export const BRAND_TAP = 18;
export const MODEL_TAP = 58;

export const ModelScreen = ({ t }: ScreenProps) => {
  const brandPicked = t >= BRAND_TAP + 2;
  const listIn = interpolate(t, [BRAND_TAP + 6, BRAND_TAP + 14], [0, 1], ease);
  return (
    <Page active={1}>
      <Label>Telefon</Label>
      <div style={{ marginTop: 8 }}>
        <Title>Znamka in model</Title>
      </div>
      <div
        style={{ marginTop: 8, fontSize: 17, lineHeight: 1.35, color: MUTED }}
      >
        Izberite znamko in model. Če ga ni na seznamu, ga vpišite.
      </div>
      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {BRANDS.map((name, i) => {
          const selected = i === 0 && brandPicked;
          return (
            <div
              key={name}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                border: `2px solid ${selected ? RED : LINE}`,
                backgroundColor: selected ? SELECTED : "#fff",
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: listIn,
          translate: `0px ${(1 - listIn) * 14}px`,
        }}
      >
        {MODELS.map((name, i) => (
          <OptionCard
            key={name}
            title={name}
            compact
            selected={i === 3 && t >= MODEL_TAP + 2}
          />
        ))}
      </div>
      <Tap t={t} at={BRAND_TAP} x={36} y={152} />
      <Tap t={t} at={MODEL_TAP} x={140} y={392} />
    </Page>
  );
};

/* ---------- 3. Repair ---------- */

/** lib/repairs.ts repairs with their published "od" prices (the lower tier for tiered ones); the first three. */
const REPAIRS = [
  {
    title: "Menjava zaslona",
    text: "Razbit, črn ali neodziven zaslon",
    price: "od 89 €",
  },
  {
    title: "Menjava baterije",
    text: "Hitro se prazni ali se izklaplja",
    price: "od 49 €",
  },
  {
    title: "Polnilni priključek",
    text: "Ne polni ali povezava prekinja",
    price: "od 79 €",
  },
] as const;
export const REPAIR_TAP = 38;

/** The site's running total under the steps. */
const Total = ({
  amount,
  opacity = 1,
}: {
  readonly amount: string;
  readonly opacity?: number;
}) => (
  <div
    style={{
      position: "absolute",
      top: 476,
      left: 0,
      right: 0,
      padding: "14px 18px",
      borderRadius: 14,
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      opacity,
    }}
  >
    <div style={{ fontSize: 18, color: MUTED }}>Informativno skupaj</div>
    <div
      style={{ fontFamily: manrope, fontWeight: 800, fontSize: 24, color: INK }}
    >
      {amount}
    </div>
  </div>
);

export const RepairsScreen = ({ t }: ScreenProps) => (
  <Page active={2}>
    <Label>Apple iPhone 13</Label>
    <div style={{ marginTop: 8 }}>
      <Title>Kaj je narobe?</Title>
    </div>
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {REPAIRS.map((repair, i) => (
        <OptionCard
          key={repair.title}
          title={repair.title}
          text={repair.text}
          price={repair.price}
          compact
          selected={i === 0 && t >= REPAIR_TAP + 2}
        />
      ))}
    </div>
    <Total
      amount="od 89 €"
      opacity={interpolate(t, [REPAIR_TAP + 4, REPAIR_TAP + 10], [0, 1], clamp)}
    />
    <Tap t={t} at={REPAIR_TAP} x={120} y={128} />
  </Page>
);

/* ---------- 4. Options: part, speed, hand-over ---------- */

export const PART_TAP = 24;
export const HANDOVER_TAP = 112;
/** How far the page scrolls to reach speed and hand-over. */
const SCROLL = 340;

const Section = ({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) => (
  <div style={{ marginTop: 18 }}>
    <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 10 }}>
      {title}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {children}
    </div>
  </div>
);

export const OptionsScreen = ({ t }: ScreenProps) => {
  const scroll = interpolate(t, [48, 72], [0, SCROLL], ease);
  return (
    <Page active={3}>
      <div style={{ position: "relative", height: 466, overflow: "hidden" }}>
        <div style={{ translate: `0px ${-scroll}px` }}>
          <Label>Menjava zaslona</Label>
          <Section title="Del">
            <OptionCard
              title="Premium"
              text="Originalni ali enakovreden del z daljšo garancijo"
              price="od 129 €"
              compact
            />
            <OptionCard
              title="Ugodnejša izbira"
              text="Preverjen nadomestni del"
              price="od 89 €"
              compact
              selected={t >= PART_TAP + 2}
            />
          </Section>
          <Section title="Hitrost">
            <OptionCard
              title="Standardno"
              text="Vključeno. Večino telefonov popravimo še isti dan."
              compact
              selected
            />
            <OptionCard
              title="Ekspres"
              text="Prednostna obravnava, ko je del na zalogi."
              price="+20 €"
              compact
            />
          </Section>
          <Section title="Oddaja">
            <OptionCard
              title="Prinesem v servis"
              text="Koroška cesta 4, 4000 Kranj."
              compact
              selected={t >= HANDOVER_TAP + 2}
            />
            <OptionCard
              title="Prevzem na naslovu"
              text="Dogovorimo se za prevzem v Kranju in okolici."
              compact
            />
          </Section>
        </div>
        <Tap t={t} at={PART_TAP} x={130} y={226} />
        {/* "Prinesem v servis" after the scroll, measured on a render. */}
        <Tap t={t} at={HANDOVER_TAP} x={130} y={380} />
      </div>
      <Total amount="od 89 €" />
    </Page>
  );
};

/* ---------- 5. Details and day, then done ---------- */

export const DAY_TAP = 50;
export const DONE_FROM = 76;
/** lib/repairs.ts dayLabel(): "Danes", "Jutri", then a short date. */
const DAYS = ["Danes", "Jutri", "pon., 30. nov."] as const;

const Field = ({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) => (
  <div style={{ marginTop: 16 }}>
    <div style={{ fontSize: 17, color: MUTED }}>{label}</div>
    <div
      style={{
        marginTop: 6,
        height: 54,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        border: `2px solid ${LINE}`,
        borderRadius: 12,
        fontSize: 21,
      }}
    >
      {value}
    </div>
  </div>
);

/** components/repair/done-step.tsx. */
export const DoneContent = () => (
  <div
    style={{
      marginTop: 110,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 22,
    }}
  >
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="55" fill={brand.live} />
      <path
        d="M31 57 l16 16 l33 -36"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <Title>Po pregledu potrdimo končno ceno in čas popravila.</Title>
  </div>
);

export const DetailsScreen = ({ t }: ScreenProps) => {
  if (t >= DONE_FROM) {
    return (
      <Page active={5}>
        <div
          style={{
            opacity: interpolate(t, [DONE_FROM, DONE_FROM + 6], [0, 1], clamp),
          }}
        >
          <DoneContent />
        </div>
      </Page>
    );
  }
  const name = "Jan Novak".slice(0, Math.max(0, Math.floor((t - 4) / 2)));
  return (
    <Page active={4}>
      <Title>Vaši podatki</Title>
      <Field label="Ime in priimek" value={name} />
      <Field label="Telefon" value="+386" />
      <div style={{ marginTop: 22, fontSize: 19, fontWeight: 600 }}>
        Želeni dan (neobvezno)
      </div>
      <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {DAYS.map((day, i) => {
          const selected = i === 1 && t >= DAY_TAP + 2;
          return (
            <div
              key={day}
              style={{
                padding: "9px 16px",
                borderRadius: 999,
                border: `2px solid ${selected ? RED : LINE}`,
                backgroundColor: selected ? SELECTED : "#fff",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
      <Tap t={t} at={DAY_TAP} x={140} y={318} />
    </Page>
  );
};
